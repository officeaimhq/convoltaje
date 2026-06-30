# Project Journal

## Resumen de la Última Sesión
- Reestructuramos el proyecto de archivos sueltos en la raíz a una estructura estándar Vite + React + TypeScript (package.json, vite.config.ts, tsconfig.json, src/ organizado en components, lib, hooks).
- Instalamos shadcn/ui y resolvimos todos los imports rotos.
- Migramos de Tailwind v3 a v4 y arreglamos el build.
- Creamos AGENTS.md y .agents/rules/ (project-context.md, mobile-first.md, known-issues.md) como memoria persistente del proyecto.
- Corregimos el catálogo de productos: agregamos EcoFlow RIVER 2, Sistema Híbrido 5000W, Sistema Básico Plus con imágenes reales sacadas del catálogo oficial.
- Unificamos el número de WhatsApp oficial a +5355507913 en todo el código.
- Arreglamos el logo (estaba usando una imagen rota, ahora usa la URL real del catálogo) y corregimos la confusión entre el logo y la mascota "Samuel el Panel".
- Revisamos y ajustamos mobile-first: HeroSection, ConvoltajeSection/ProductCard, SolarCalculator (los 4 pasos), KitComparisonTable, FloatingWhatsApp.
- Arreglamos el botón "Saber Más" que no tenía onClick.
- Diagnosticamos y arreglamos el bug crítico de generación de PDF: el elemento HTML nunca se insertaba en el DOM antes de capturarlo con html2canvas, resultando en PDFs vacíos. Se corrigió insertándolo fuera de pantalla con document.body.appendChild() antes de generar, y removiéndolo después.
- Hicimos las imágenes de producto circulares y uniformes en ProductCard.

## Próximos Pasos (Próxima Sesión)
1. Confirmar manualmente (Rody) que el PDF de prefactura ahora se genera con contenido visible real, no solo que el archivo no esté vacío.
2. Imagen de "Samuel el Panel" para el Hero sigue siendo un placeholder temporal (solucionapagon.jpg) — falta decidir si se genera arte oficial de la mascota o se cambia el enfoque visual del Hero.
3. Revisar el contenido completo del Sistema Híbrido 5000W (no tiene imagen propia en el catálogo del cliente, usa ícono genérico por ahora).
4. Tintaflash sigue fuera de scope — solo tiene un toast de "Próximamente".
5. Pendiente grande de producto (fuera del scope de UI): el cliente quiere un sistema de captura de leads más robusto — base de datos automatizada (tipo Excel/CRM) de las conversaciones con la comercial, y un sistema de encuestas de satisfacción post-venta que le lleguen directamente al dueño para evaluar el desempeño del equipo comercial. Esto no se ha empezado, está en fase de definición con el usuario.
6. Validar el flujo completo en un teléfono real de punta a punta (Hero → catálogo → calculadora → PDF → WhatsApp) antes de presentárselo al dueño de Convoltaje.
