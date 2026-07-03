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

## Estado Final de Hoy (MVP Completo)
- Precios visibles en tarjetas (fix de overflow/flex)
- Formulario completo con dirección, fecha y comercial
- PDF con datos reales del cliente y logo de "Samuel el Panel" en el encabezado
- FAQ con contenido real de videos de Convoltaje
- Carrusel de 7 fotos de clientes con citas
- Garantías corregidas a 90 días
- Bloque informativo de garantía en tabla comparativa

## Próximos Pasos (Próxima Sesión)
1. Setup de repositorio en GitHub y despliegue continuo en Netlify.
2. Definir y avanzar en el sistema CRM de captura de leads y encuestas de satisfacción.
3. Decidir si se genera arte oficial de la mascota "Samuel el Panel" para el Hero (sigue el placeholder actual) o se cambia el enfoque visual.
4. Validación final del proyecto en vivo.
