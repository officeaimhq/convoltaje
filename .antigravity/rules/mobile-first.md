# Regla Mobile-First

## Regla Obligatoria
**Todo componente nuevo o modificado debe probarse primero en viewport de 375px-414px (iPhone estándar) antes que en desktop.**

## Checklist para cambios de UI
- [ ] Texto legible sin zoom (mínimo 16px en body).
- [ ] Botones con área táctil de al menos 44x44px.
- [ ] Sin scroll horizontal nunca.
- [ ] Las imágenes de producto no deben romper el layout en pantallas chicas.
- [ ] El botón flotante de WhatsApp no debe tapar contenido importante.
- [ ] Los modales (LeadCaptureModal, PdfConfirmationModal) deben ser usables con una mano en mobile.
- [ ] La calculadora solar (4 pasos) debe navegarse cómodamente con el pulgar.

## Requisito para finalizar tarea
Antes de dar por terminada cualquier tarea de UI, debes correr el build y **describir cómo se ve en mobile**, no solo confirmar que compila.
