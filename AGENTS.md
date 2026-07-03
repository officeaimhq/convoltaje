# Convoltaje Landing Page

## Descripción del Proyecto
Landing page para Convoltaje (sistemas de energía solar, PowerStations e insumos) en Cuba. Cuenta con catálogo, calculadora solar interactiva y generación de prefacturas en PDF.

## Estructura del Proyecto
- `src/components/`: Componentes de interfaz compartidos
- `src/components/calculator/`: Pasos interactivos de la calculadora solar
- `src/hooks/`: Custom hooks
- `src/lib/`: Lógica de utilidades, generación de PDFs, catálogo y configuraciones
- `archive/`: Código no utilizado actualmente pero preservado

## Stack
React + Vite + TypeScript + Tailwind + shadcn/ui + wouter

## Reglas del Proyecto
1. El catálogo de productos vive en `src/lib/products.ts` — la fuente de verdad para precios y productos es [elyerromenu.com](https://elyerromenu.com/b/convoltaje).
2. El número de WhatsApp oficial debe ser consistente en todo el código (+5355144097).
3. La generación de PDF de prefacturas debe usar contenido real, nunca usar `alert()`.
4. Tintaflash está fuera de scope por ahora — no tocar `TintaflashSection.tsx` ni archivos relacionados sin instrucción explícita.
5. Cualquier cambio de UI debe respetar el sistema de diseño: 
   - Colores: primary `#0F3A7D`, secondary/cyan `#00D9FF`, accent coral `#FF6B35`
   - Fuentes: Poppins para display/accent e Inter para body.
6. **Regla de Borrado**: Antes de borrar o mover archivos, SIEMPRE hay que confirmar con el usuario si no está 100% claro que no se usan.
7. **Control de Versiones (Git)**: Cada cambio o conjunto de tareas probado y confirmado por el usuario debe terminar en un commit de Git con un mensaje descriptivo y claro. No hacer push ni vincular a remotos sin consultar primero.
8. **Cómo correr el proyecto**: Ejecutar `npm install && npm run dev`

## Contexto y Reglas Extendidas
Adicionalmente, revisa los siguientes archivos en `.agents/rules/` para guías detalladas:
- `.agents/rules/project-context.md`: Contexto del negocio y el proyecto.
- `.agents/rules/mobile-first.md`: **OBLIGATORIO LEER ANTES DE CUALQUIER CAMBIO DE UI**. Contiene checklist y reglas de validación responsive.
- `.agents/rules/known-issues.md`: Lista viva de problemas y verificaciones pendientes.

## Lista de Tareas Pendientes Conocidas
1. Rody debe confirmar visualmente los cambios recientes (toast de Tintaflash, CTA de catálogo y separación de precios de paquete).
2. Setup de repositorio en GitHub y despliegue continuo en Netlify.
3. Imagen de "Samuel el Panel" para el Hero sigue siendo un placeholder temporal (solucionapagon.jpg) — falta decidir si se genera arte oficial de la mascota o se cambia el enfoque visual del Hero.
4. Revisar el contenido completo del Sistema Híbrido 5000W (no tiene imagen propia en el catálogo del cliente, usa ícono genérico por ahora).
5. Tintaflash sigue fuera de scope — solo tiene un toast de "Próximamente".
6. Pendiente grande de producto (fuera del scope de UI): el cliente quiere un sistema de captura de leads más robusto — base de datos automatizada (tipo Excel/CRM) de las conversaciones con la comercial, y un sistema de encuestas de satisfacción post-venta que le lleguen directamente al dueño para evaluar el desempeño del equipo comercial. Esto no se ha empezado, está en fase de definición con el usuario.
7. Validar el flujo completo en un teléfono real de punta a punta (Hero → catálogo → calculadora → PDF → WhatsApp) antes de presentárselo al dueño de Convoltaje.
