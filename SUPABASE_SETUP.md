# Integración con Supabase (Base de Datos Gratuita)

## ¿Por qué Supabase?

- ✅ **Totalmente Gratuito** - Tier gratuito incluye 500MB de almacenamiento
- ✅ **PostgreSQL Real** - Base de datos profesional
- ✅ **API REST Automática** - Sin necesidad de escribir backend
- ✅ **Autenticación Incluida** - OAuth, JWT, etc.
- ✅ **Almacenamiento de Archivos** - Para guardar PDFs
- ✅ **Tiempo Real** - Actualizaciones en vivo

## Pasos de Configuración

### 1. Crear Cuenta en Supabase

1. Ve a https://supabase.com
2. Haz clic en "Start your project"
3. Regístrate con GitHub o email
4. Crea un nuevo proyecto:
   - Nombre: `convoltaje-landing`
   - Región: Elige la más cercana a tu ubicación
   - Password: Guarda en lugar seguro

### 2. Crear Tablas

Una vez en el dashboard de Supabase:

#### Tabla: `leads`
```sql
CREATE TABLE leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  product_type VARCHAR(50) NOT NULL, -- 'convoltaje' o 'tintaflash'
  kit_id VARCHAR(100),
  product_id VARCHAR(100),
  message TEXT,
  quotation_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, quoted, converted, lost
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `quotations`
```sql
CREATE TABLE quotations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  lead_id BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  quotation_number VARCHAR(50) NOT NULL UNIQUE,
  kit_id VARCHAR(100),
  complementary_products TEXT, -- JSON array
  subtotal BIGINT NOT NULL, -- en centavos
  discount BIGINT DEFAULT 0,
  total BIGINT NOT NULL,
  pdf_url VARCHAR(500),
  pdf_key VARCHAR(200),
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, accepted, rejected, expired
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `design_uploads`
```sql
CREATE TABLE design_uploads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  lead_id BIGINT REFERENCES leads(id) ON DELETE SET NULL,
  product_id VARCHAR(100) NOT NULL,
  design_url VARCHAR(500) NOT NULL,
  design_key VARCHAR(200) NOT NULL,
  quantity INT DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Habilitar Almacenamiento

1. En el dashboard, ve a "Storage"
2. Crea dos buckets:
   - `quotations` - Para guardar PDFs
   - `designs` - Para guardar diseños de Tintaflash
3. Configura permisos públicos si es necesario

### 4. Obtener Credenciales

1. Ve a "Settings" → "API"
2. Copia:
   - `Project URL` (URL de la API)
   - `anon public` (Clave pública)
   - `service_role secret` (Clave privada - GUARDAR SEGURO)

### 5. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Backend (solo servidor)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Uso en el Código

### Cliente (Frontend)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Crear un lead
const { data, error } = await supabase
  .from('leads')
  .insert({
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+53 55 14 40 97',
    product_type: 'convoltaje',
    kit_id: 'eco-power-basic'
  })

// Obtener leads
const { data: leads } = await supabase
  .from('leads')
  .select('*')
  .eq('status', 'new')
```

### Servidor (Backend)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Crear cotización
const { data: quotation } = await supabase
  .from('quotations')
  .insert({
    lead_id: 1,
    quotation_number: 'CONV-20260627-ABC123',
    kit_id: 'eco-power-basic',
    subtotal: 1000000, // $10,000 en centavos
    discount: 150000,  // $1,500 en centavos
    total: 850000,     // $8,500 en centavos
    status: 'sent'
  })

// Guardar PDF
const { data: uploadData } = await supabase
  .storage
  .from('quotations')
  .upload(`${quotation.id}/prefactura.pdf`, pdfBuffer)
```

## Alternativas Gratuitas

Si prefieres otras opciones:

1. **Firebase** - Google Cloud, muy fácil de usar
2. **MongoDB Atlas** - NoSQL gratuito
3. **PlanetScale** - MySQL gratuito
4. **Railway** - Hosting + DB gratuito (primeros $5)

## Próximos Pasos

1. Crea la cuenta en Supabase
2. Configura las tablas
3. Obtén las credenciales
4. Actualiza el archivo `.env.local`
5. Instala el cliente: `pnpm add @supabase/supabase-js`

¿Necesitas ayuda con algún paso?
