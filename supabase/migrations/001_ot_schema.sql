-- ============================================================
-- ConVoltaje — Migration 001: Schema Completo de Base de Datos
-- Fecha: 2026-07-19
-- Basado en: Feedback de José Medina + Calendario real de OTs
-- Principio: La OT (Orden de Trabajo) es la entidad central
-- ============================================================
--
-- FORMATO OT REAL (tomado del calendario de José):
--   OT-0107 = día 01, mes 07
--   OT-3107/Yudith, 6K Plus Oferta, Alamar, efectivo
--   B:Alejandro/Daniel/Ayudante  T:Fide/Felix
--
-- LEYENDA DE TIPOS DE TRABAJO (emojis del calendario):
--   💚 instalacion_kit    → Kit solar completo
--   💛 levantamiento       → Visita técnica/levantamiento
--   💙 mano_de_obra        → Servicio con o sin materiales propios
-- ============================================================

-- ============================================================
-- TABLA 0: PERFILES (base de todos los usuarios del sistema)
-- Reemplaza el mockUsers de useAuthStore.ts
-- ============================================================
CREATE TABLE IF NOT EXISTS perfiles (
  id             UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,

  -- Identidad
  nombre         TEXT NOT NULL,
  telefono       VARCHAR(8) UNIQUE,          -- Sin +53, es el username de login
  email          TEXT,
  facebook_id    TEXT,

  -- Rol en la empresa
  -- Roles mapeados 1:1 con useAuthStore.ts + nuevos (proyectista, transportista)
  rol            TEXT NOT NULL DEFAULT 'cliente'
                   CHECK (rol IN (
                     'ceo',                 -- Angel Eduardo — acceso total
                     'director_marketing',  -- Jose — reportes, catalogo, calendario
                     'proyectista',         -- Samuel — levantamientos presenciales (NUEVO)
                     'comercial',           -- Niurki, Railyn, Diana, DC1
                     'director_tecnico',    -- Yasiel — quejas y brigadas
                     'tecnico',             -- Brigada de campo
                     'transportista',       -- Fide/Felix, Tomy, Leo, Camilo (NUEVO)
                     'almacenero',          -- Gestion de inventario fisico
                     'cliente'              -- Portal externo
                   )),

  -- Info publica visible en el portal del cliente
  foto_url               TEXT,
  calificacion_promedio  DECIMAL(3,2) DEFAULT 0.00,
  total_instalaciones    INTEGER DEFAULT 0,
  descripcion_corta      TEXT,              -- Para tarjeta de comercial en el portal

  -- Datos del cliente (solo rol='cliente')
  municipio   TEXT,
  provincia   TEXT,
  direccion   TEXT,                         -- Opcional — confirmado por Jose

  -- Preferencia de contacto del cliente
  metodo_contacto TEXT CHECK (metodo_contacto IN (
    'whatsapp', 'telegram', 'llamada'
  )) DEFAULT 'whatsapp',

  -- Control
  activo      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 1: ORDENES DE TRABAJO (OT) — ENTIDAD CENTRAL
-- "Cada cliente es una carpeta. Una OT para darle vinculacion." — Jose
-- ============================================================
CREATE TABLE IF NOT EXISTS ordenes_trabajo (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Numero de OT en formato real del negocio: OT-XXYY (dia+mes)
  -- Ejemplos del calendario: OT-0107, OT-3107, OT-3807
  numero_ot   VARCHAR(10) UNIQUE NOT NULL,

  -- VINCULOS PRINCIPALES
  cliente_id          UUID REFERENCES perfiles(id) ON DELETE SET NULL,
  comercial_id        UUID REFERENCES perfiles(id) ON DELETE SET NULL,
  director_tecnico_id UUID REFERENCES perfiles(id) ON DELETE SET NULL,

  -- KIT Y TIPO DE TRABAJO
  -- Tipos tomados directamente del calendario real de Jose
  tipo_trabajo TEXT NOT NULL CHECK (tipo_trabajo IN (
    'instalacion_kit',           -- Kit solar completo (ej: 6K Plus, 3K 110v)
    'levantamiento',             -- Levantamiento tecnico/visita de factibilidad
    'mano_de_obra',              -- MO sin kit propio
    'servicio_aterramiento',     -- Pack aterramiento especifico
    'integracion_paneles',       -- Agregar paneles a sistema existente
    'integracion_baterias',      -- Agregar baterias a sistema existente
    'visita_tecnica_presencial', -- Visita del Proyectista (50 USD)
    'servicio_garantia'          -- Atencion post-instalacion en garantia
  )),

  kit_id               TEXT,     -- ej: 'kit-solar-3kw', 'kit-solar-6kw'
  descripcion_trabajo  TEXT,     -- Descripcion libre

  -- Marcas elegidas por el cliente (si eligio marca especifica)
  marca_inversor_preferida  TEXT,
  marca_bateria_preferida   TEXT,
  marca_panel_preferido     TEXT,
  acepta_cualquier_marca    BOOLEAN DEFAULT true,

  -- UBICACION
  municipio  TEXT,
  provincia  TEXT,
  direccion  TEXT,

  -- FINANCIERO
  forma_pago TEXT CHECK (forma_pago IN (
    'efectivo', 'zelle', 'paypal', 'transfermovil', 'enzona', 'otro'
  )),
  monto_estimado   DECIMAL(10,2),
  monto_final      DECIMAL(10,2),
  monto_pagado     DECIMAL(10,2) DEFAULT 0,
  pago_validado    BOOLEAN DEFAULT false,
  captura_pago_url TEXT,

  -- ESTADO DE LA OT
  estado TEXT NOT NULL DEFAULT 'borrador' CHECK (estado IN (
    'borrador',     -- Creada por el cliente, sin confirmar
    'confirmada',   -- Comercial confirmo fecha y equipo
    'en_proceso',   -- Brigada esta en el lugar
    'pospuesta',    -- Cambio de fecha (eventualidad)
    'cancelada',    -- Cancelada con motivo
    'completada',   -- Instalacion terminada, pago validado
    'en_garantia'   -- Post-instalacion, dentro de periodo de garantia
  )),

  -- FECHAS
  fecha_instalacion      TIMESTAMPTZ,
  fecha_instalacion_alt  TIMESTAMPTZ,
  fecha_creacion         TIMESTAMPTZ DEFAULT NOW(),
  fecha_completada       TIMESTAMPTZ,

  -- SITUACIONES ESPECIALES (de la ficha tecnica)
  solicita_alarma             BOOLEAN DEFAULT false,
  solicita_aterramiento       BOOLEAN DEFAULT false,
  solicita_mejora_electrica   BOOLEAN DEFAULT false,
  tiene_autorizacion_vecinos  BOOLEAN,

  -- NOTIFICACIONES
  cliente_notificado_confirmacion BOOLEAN DEFAULT false,
  cliente_notificado_brigada      BOOLEAN DEFAULT false,
  cliente_notificado_cambio       BOOLEAN DEFAULT false,

  -- CONTROL
  created_by  UUID REFERENCES perfiles(id),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ot_cliente    ON ordenes_trabajo(cliente_id);
CREATE INDEX idx_ot_comercial  ON ordenes_trabajo(comercial_id);
CREATE INDEX idx_ot_estado     ON ordenes_trabajo(estado);
CREATE INDEX idx_ot_fecha      ON ordenes_trabajo(fecha_instalacion);
CREATE INDEX idx_ot_numero     ON ordenes_trabajo(numero_ot);

-- ============================================================
-- TABLA 2: BRIGADA DE TECNICOS POR OT
-- "B:Alejandro/Daniel/Ayudante" del formato del calendario
-- ============================================================
CREATE TABLE IF NOT EXISTS ot_brigada (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ot_id       UUID NOT NULL REFERENCES ordenes_trabajo(id) ON DELETE CASCADE,
  tecnico_id  UUID NOT NULL REFERENCES perfiles(id),

  rol_brigada TEXT DEFAULT 'tecnico' CHECK (rol_brigada IN (
    'lider', 'tecnico', 'ayudante'
  )),

  asignado_por UUID REFERENCES perfiles(id),
  created_at   TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (ot_id, tecnico_id)
);

-- ============================================================
-- TABLA 3: TRANSPORTE POR OT
-- "T:Fide/Felix" del formato del calendario
-- ============================================================
CREATE TABLE IF NOT EXISTS ot_transporte (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ot_id             UUID NOT NULL REFERENCES ordenes_trabajo(id) ON DELETE CASCADE,
  transportista_id  UUID NOT NULL REFERENCES perfiles(id),
  vehiculo          TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (ot_id, transportista_id)
);

-- ============================================================
-- TABLA 4: INVENTARIO
-- Extiende useInventoryStore.ts con estados de disponibilidad
-- y reservas por OT (critico para el mercado cubano)
-- ============================================================
CREATE TABLE IF NOT EXISTS inventario (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo      TEXT UNIQUE,
  nombre      TEXT NOT NULL,

  categoria   TEXT NOT NULL CHECK (categoria IN (
    'inversor', 'bateria', 'panel', 'cable', 'accesorio',
    'estructura', 'herramienta',
    'pack_alarma',        -- Situacion especial: seguridad anti-robo
    'pack_aterramiento',  -- Situacion especial: seguridad anti-rayos
    'material_electrico', -- Situacion especial: mejora electrica
    'otro'
  )),

  marca    TEXT,
  modelo   TEXT,

  -- Stock desglosado (critico para reservas)
  cantidad_total      INTEGER DEFAULT 0,
  cantidad_disponible INTEGER DEFAULT 0,
  cantidad_reservada  INTEGER DEFAULT 0,
  cantidad_minima     INTEGER DEFAULT 1,

  precio_compra   DECIMAL(10,2),
  precio_venta    DECIMAL(10,2),
  unidad          TEXT DEFAULT 'unidad',

  -- Estado de disponibilidad (visible para el cliente en el portal)
  estado TEXT DEFAULT 'disponible' CHECK (estado IN (
    'disponible',       -- Verde: en almacen ahora
    'por_llegar',       -- Naranja: en transito
    'pedido_especial'   -- Azul: se puede pedir especialmente
  )),

  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 5: RESERVAS DE INVENTARIO POR OT
-- Al crear OT -> reservar cupo + notificacion al almacen
-- ============================================================
CREATE TABLE IF NOT EXISTS ot_inventario (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ot_id       UUID NOT NULL REFERENCES ordenes_trabajo(id) ON DELETE CASCADE,
  item_id     UUID NOT NULL REFERENCES inventario(id),
  cantidad    INTEGER NOT NULL DEFAULT 1,

  tipo TEXT NOT NULL DEFAULT 'reservado' CHECK (tipo IN (
    'reservado',   -- Cupo reservado al crear la OT
    'confirmado',  -- Producto especifico confirmado dias antes
    'usado',       -- Usado en la instalacion real
    'devuelto'     -- Devuelto al almacen (cancelacion)
  )),

  -- "establecer notificacion de compra al almacen" — Jose
  notificacion_almacen_enviada BOOLEAN DEFAULT false,

  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 6: LEVANTAMIENTOS
-- remoto (cliente desde el portal) y presencial (Samuel)
-- Incluye flujo de aprobacion de 5 pasos descrito por Jose
-- ============================================================
CREATE TABLE IF NOT EXISTS levantamientos (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ot_id            UUID REFERENCES ordenes_trabajo(id) ON DELETE CASCADE,

  tipo TEXT NOT NULL CHECK (tipo IN ('remoto', 'presencial')),

  proyectista_id UUID REFERENCES perfiles(id),

  -- DATOS TECNICOS
  tipo_azotea        TEXT,   -- 'placa', 'teja', 'edificio', 'otra'
  tipo_azotea_custom TEXT,   -- Campo abierto aprobado por Jose
  orientacion_azotea TEXT,
  acceso_azotea      TEXT,

  ubicacion_cuadro   TEXT,
  estado_cuadro      TEXT,

  lugar_sistema      TEXT,

  -- DISTANCIAS (el cliente estima en metros)
  distancia_azotea_cuadro    INTEGER,
  distancia_cuadro_sistema   INTEGER,
  distancia_sistema_exterior INTEGER,

  -- SITUACIONES ESPECIALES
  tiene_autorizacion_vecinos  BOOLEAN,
  quiere_alarma               BOOLEAN DEFAULT false,
  quiere_aterramiento         BOOLEAN DEFAULT false,
  quiere_mejora_electrica     BOOLEAN DEFAULT false,

  -- FLUJO DE APROBACION (5 pasos de Jose)
  -- Proyectista llena -> PDF generado -> Comercial notificada
  -- -> Comercial valida y agrega presupuesto -> Cliente recibe oferta
  estado TEXT DEFAULT 'borrador' CHECK (estado IN (
    'borrador',
    'enviado',
    'revisado_comercial',
    'con_presupuesto',
    'aprobado'
  )),

  -- NOTAS Y PRESUPUESTO
  notas_cliente     TEXT,
  notas_proyectista TEXT,
  notas_comercial   TEXT,

  pdf_url         TEXT,
  kit_sugerido_id TEXT,

  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 7: FOTOS DEL LEVANTAMIENTO
-- Convertidas a WebP 1200px antes de subir
-- Convencion de nombres de Jose: foto_sistema_6k_equipo_marca_must.webp
-- ============================================================
CREATE TABLE IF NOT EXISTS levantamiento_fotos (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  levantamiento_id  UUID NOT NULL REFERENCES levantamientos(id) ON DELETE CASCADE,

  url            TEXT NOT NULL,
  leyenda        TEXT,
  formato        TEXT DEFAULT 'webp',
  nombre_archivo TEXT,

  seccion TEXT CHECK (seccion IN (
    'azotea', 'cuadro_electrico', 'lugar_sistema', 'exterior', 'otra'
  )),

  subida_por UUID REFERENCES perfiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 8: EVENTUALIDADES (log de cambios de la OT)
-- Modulo transversal — cualquier cambio en el flujo registrado
-- ============================================================
CREATE TABLE IF NOT EXISTS ot_eventualidades (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ot_id   UUID NOT NULL REFERENCES ordenes_trabajo(id) ON DELETE CASCADE,

  tipo TEXT NOT NULL CHECK (tipo IN (
    'cambio_fecha', 'cambio_kit', 'cambio_brigada',
    'suspension_temporal', 'modificacion_ficha',
    'cancelacion', 'retraso_instalacion',
    'material_extra', 'queja', 'nota_general'
  )),

  descripcion     TEXT NOT NULL,
  fecha_anterior  TIMESTAMPTZ,
  fecha_nueva     TIMESTAMPTZ,

  registrado_por     UUID REFERENCES perfiles(id),
  notificado_cliente BOOLEAN DEFAULT false,
  canal_notificacion TEXT CHECK (canal_notificacion IN (
    'portal', 'whatsapp', 'telegram', 'manual'
  )),

  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 9: QUEJAS
-- "YASIEL: QUEJAS PDTES" — gestionado por el Director Tecnico
-- Compatible con schema.ts existente (complaints)
-- ============================================================
CREATE TABLE IF NOT EXISTS quejas (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  ot_id       UUID REFERENCES ordenes_trabajo(id) ON DELETE SET NULL,
  cliente_id  UUID REFERENCES perfiles(id),

  nombre_cliente   TEXT NOT NULL,
  telefono_cliente TEXT,
  ubicacion        TEXT,

  tipo_sistema      TEXT,
  fecha_instalacion TIMESTAMPTZ,
  meses_garantia    INTEGER,

  sintoma         TEXT NOT NULL,
  error_inversor  TEXT,
  es_ecoflow      BOOLEAN DEFAULT false,

  priority_category TEXT CHECK (priority_category IN (
    'incendio', 'instalacion_incompleta',
    'mal_funcionamiento', 'atencion_inadecuada'
  )) NOT NULL,

  -- Estado gestionado por Yasiel (Director Tecnico)
  estado TEXT DEFAULT 'nueva' CHECK (estado IN (
    'nueva', 'diagnostico', 'visita', 'dictamen',
    'resolucion', 'resuelta', 'rechazada', 'escalada'
  )),

  asignada_a  UUID REFERENCES perfiles(id),
  checklist   JSONB DEFAULT '[]',

  created_at   TIMESTAMPTZ DEFAULT NOW(),
  resuelta_at  TIMESTAMPTZ
);

-- ============================================================
-- TABLA 10: PAGOS
-- Todo manual, sin pasarelas. El cliente sube captura al portal.
-- Compatible con payments en schema.ts existente
-- ============================================================
CREATE TABLE IF NOT EXISTS pagos (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ot_id UUID REFERENCES ordenes_trabajo(id) ON DELETE CASCADE,

  tipo TEXT NOT NULL CHECK (tipo IN (
    'efectivo', 'transfermovil', 'enzona',
    'zelle', 'paypal', 'otro'
  )),

  monto   DECIMAL(10,2) NOT NULL,
  moneda  TEXT DEFAULT 'USD' CHECK (moneda IN ('USD', 'CUP', 'MLC', 'EUR')),

  captura_url TEXT,   -- El cliente sube screenshot al portal
  notas       TEXT,

  estado TEXT DEFAULT 'pendiente' CHECK (estado IN (
    'pendiente', 'en_revision', 'confirmado', 'rechazado'
  )),

  revisado_por   UUID REFERENCES perfiles(id),
  registrado_por UUID REFERENCES perfiles(id),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 11: TIMELINE DEL CLIENTE
-- Hitos del proceso visibles en el portal
-- ============================================================
CREATE TABLE IF NOT EXISTS ot_timeline (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ot_id UUID NOT NULL REFERENCES ordenes_trabajo(id) ON DELETE CASCADE,

  hito TEXT NOT NULL CHECK (hito IN (
    'registro_completado',
    'sistema_seleccionado',
    'ficha_tecnica_enviada',
    'fecha_agendada',
    'brigada_confirmada',      -- Con foto y nombre de tecnicos
    'instalacion_en_curso',
    'pago_registrado',
    'garantia_entregada',
    'instalacion_completa'
  )),

  completado    BOOLEAN DEFAULT false,
  fecha_hito    TIMESTAMPTZ,
  descripcion   TEXT,
  datos_extra   JSONB,         -- ej: {tecnicos: [{nombre, foto_url}]}

  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA 12: SALVA OFFLINE
-- CRITICO para Cuba — tecnicos sin internet el dia de instalacion
-- Estrategia: PWA + IndexedDB (local) -> sync a esta tabla cuando hay red
-- La salva incluye las OTs del dia, datos de clientes, checklist e inventario
-- ============================================================
CREATE TABLE IF NOT EXISTS salvas_offline (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES perfiles(id),

  datos_json    JSONB NOT NULL,      -- Snapshot completo del dia
  ots_incluidas TEXT[],              -- Array de numero_ot: ['OT-0107', 'OT-3107']

  fecha_salva  TIMESTAMPTZ DEFAULT NOW(),
  valida_hasta TIMESTAMPTZ,          -- Normalmente: fecha_salva + 24h

  sincronizada BOOLEAN DEFAULT false,
  sync_at      TIMESTAMPTZ
);

-- ============================================================
-- TABLA 13: CONFIGURACION DEL SISTEMA
-- Parametros del negocio editables sin tocar codigo
-- ============================================================
CREATE TABLE IF NOT EXISTS configuracion (
  clave      TEXT PRIMARY KEY,
  valor      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES perfiles(id)
);

INSERT INTO configuracion (clave, valor) VALUES
  ('rotacion_comercial', '["Niurki", "Railyn", "Diana", "DC1"]'),
  ('marcas_insignia', '["Must", "Power Mister", "Infinity Solar", "Climax"]'),
  ('precio_visita_tecnica_usd', '50'),
  ('garantia_kits_pequenos_meses', '3'),    -- 1kW-6kW: 3 meses
  ('garantia_kits_grandes_meses', '12'),    -- 10kW+: 12 meses (1 ano)
  ('whatsapp_comercial_fallback', '"+5355144097"')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY
-- Cada rol ve solo lo que le corresponde
-- ============================================================
ALTER TABLE ordenes_trabajo   ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos               ENABLE ROW LEVEL SECURITY;
ALTER TABLE quejas              ENABLE ROW LEVEL SECURITY;
ALTER TABLE levantamientos     ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario          ENABLE ROW LEVEL SECURITY;
ALTER TABLE salvas_offline     ENABLE ROW LEVEL SECURITY;

-- El cliente solo ve su propia OT
CREATE POLICY "cliente_ve_su_ot" ON ordenes_trabajo FOR SELECT
  USING (
    auth.uid() = cliente_id
    OR EXISTS (
      SELECT 1 FROM perfiles p WHERE p.id = auth.uid()
      AND p.rol IN ('ceo', 'director_marketing', 'proyectista', 'director_tecnico')
    )
    OR auth.uid() = comercial_id
    OR EXISTS (
      SELECT 1 FROM ot_brigada b
      WHERE b.ot_id = ordenes_trabajo.id AND b.tecnico_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM ot_transporte t
      WHERE t.ot_id = ordenes_trabajo.id AND t.transportista_id = auth.uid()
    )
  );

-- El tecnico solo descarga su propia salva offline
CREATE POLICY "tecnico_ve_su_salva" ON salvas_offline FOR ALL
  USING (auth.uid() = usuario_id);

-- Perfiles: todos pueden ver perfiles activos; solo editar el propio
CREATE POLICY "perfiles_lectura_publica" ON perfiles FOR SELECT
  USING (activo = true OR auth.uid() = id);

-- ============================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================

-- Generar numero de OT automaticamente: OT-XXYY (dia+mes)
-- Ejemplo: 1 de julio -> OT-0107. Si ya existe: OT-0107-B, OT-0107-C
CREATE OR REPLACE FUNCTION generar_numero_ot()
RETURNS TEXT AS $$
DECLARE
  hoy       DATE := CURRENT_DATE;
  base      TEXT;
  contador  INTEGER := 0;
  candidato TEXT;
BEGIN
  base := 'OT-' || TO_CHAR(hoy, 'DDMM');
  candidato := base;
  WHILE EXISTS (SELECT 1 FROM ordenes_trabajo WHERE numero_ot = candidato) LOOP
    contador := contador + 1;
    candidato := base || '-' || CHR(64 + contador);
  END LOOP;
  RETURN candidato;
END;
$$ LANGUAGE plpgsql;

-- Al crear OT: insertar primer hito en el timeline
CREATE OR REPLACE FUNCTION on_ot_creada()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO ot_timeline (ot_id, hito, completado, fecha_hito)
  VALUES (NEW.id, 'registro_completado', true, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ot_creada
  AFTER INSERT ON ordenes_trabajo
  FOR EACH ROW EXECUTE FUNCTION on_ot_creada();

-- Actualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_ordenes
  BEFORE UPDATE ON ordenes_trabajo FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_perfiles
  BEFORE UPDATE ON perfiles FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_levantamientos
  BEFORE UPDATE ON levantamientos FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_inventario
  BEFORE UPDATE ON inventario FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ESTRATEGIA DE MIGRACION: mockToSupabase()
-- Como pasar los datos de localStorage/Zustand a Supabase
-- ============================================================
-- useAuthStore.ts   -> perfiles      (OJO: Samuel pasa a rol='proyectista')
-- useInventoryStore -> inventario     (agregar cantidad_disponible y estados)
-- useCalendarStore  -> ordenes_trabajo + ot_brigada + ot_transporte
-- useCrmStore       -> ordenes_trabajo (los "deals" son OTs en estado borrador)
-- useQuejasStore    -> quejas          (vincular ot_id si disponible)
-- payments/refunds  -> pagos           (vincular ot_id en lugar de deal_id)
-- ============================================================
