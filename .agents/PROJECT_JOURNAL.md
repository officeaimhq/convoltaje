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

- Arreglo del toast de Tintaflash: se agregó el contenedor `<Toaster />` de `sonner` en `App.tsx` para permitir que el toast de "Próximamente" en `Header.tsx` se visualice.
- Flujo de ventas hacia Calculadora: Se eliminó el botón de CTA de WhatsApp redundante en el banner final de `ConvoltajeSection.tsx` y se cambió el copy para invitar a usar la calculadora, agregando un botón que hace scroll suave hacia ella.
- Refinamiento Visual en Catálogo: Se confirmó que el precio en `ProductCard.tsx` es grande y siempre visible por encima del CTA, gracias a las clases `flex-grow` y `line-clamp-2` que truncan descripciones largas.
- Independencia del Kit Recomendado: Se refactorizó y comprobó que `UpsellRecommendations.tsx` (que ofrece el descuento en paquete) maneja su precio total de manera totalmente separada de la tarjeta principal del Kit (en `Step4Results.tsx`), de manera que no confunda al usuario con números cruzados.
- Callejón sin salida arreglado: Se ocultó condicionalmente el botón "Siguiente" en el paso 4 de la calculadora, convirtiendo los botones "Descargar PDF" y "Solicitar este Sistema" en los pasos de cierre oficiales (que generan el PDF sin flash y envían WhatsApp).

## Estado Final de Hoy (MVP Completo y Desplegado)
- **Deploy exitoso en Netlify**: [https://convoltaje.netlify.app/](https://convoltaje.netlify.app/) (Conectado a github.com/Ramonbonachea8102/convoltaje)
- Hero con fondo WebGL animado, glassmorphism y textos de alto impacto.
- Catálogo interactivo con precios reales, imágenes del cliente y páginas de detalle por producto.
- Comparador de hasta 3 kits lado a lado.
- Calculadora solar (4 pasos) + prefactura PDF real con datos del cliente y datos comerciales.
- Ficha técnica en PDF descargable por producto.
- Carrusel de 7 testimonios de clientes con citas.
- FAQ con contenido real de videos de Convoltaje.
- Garantías actualizadas a 90 días.
- WhatsApp oficial unificado (+5355144097).

## Sesión de Antigravity (2026-07-11)
- **Correcciones de Garantía**: Actualizados los términos de garantía real de Convoltaje en `faq-data.ts`, `KitComparisonTable.tsx` y `products.ts` para reflejar la realidad del negocio en Cuba (garantía directa de Convoltaje de 3 meses para sistemas de hasta 6kW, y 1 año para sistemas de 10kW o superiores). Eliminados los rastros del número de WhatsApp incorrecto.
- **Rediseño del Calendario**: Modificada la vista semanal en `CalendarCore.tsx` a tarjetas verticales responsivas de días. Cada día colapsado muestra una pila de píldoras de colores vivos con la nomenclatura `"userXX · tipo"`, y al hacer clic se expande en acordeón para mostrar el listado de obras detallado.
- **Módulo de Instalaciones CRM**: Diseñado e implementado el nuevo panel modular en `InstallationsMain.tsx` (agregando tabs para agrupar por estado de obras, checklist técnico interactivo que calcula dinámicamente el progreso visual en tiempo real, detalles expandibles con llamada/WhatsApp y formulario de registro según el protocolo de la empresa). Integrado en `DashboardPanel.tsx`.

## Próximos Pasos (Próxima Sesión)
1. Esperar feedback de Ángel sobre los nuevos términos de garantía, el rediseño del Calendario y el módulo de Instalaciones.
2. Hacer push a producción si se aprueban los cambios de hoy.
3. Continuar con otros módulos del CRM (como inventario, pipeline de clientes o plantillas de ventas).
4. Implementar la librería de manuales de usuario definitiva.
5. Definir arte oficial de "Samuel el Panel" o cambiar el enfoque visual del Hero.
