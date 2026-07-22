---
name: "self-auditor"
description: "Habilidad de auto-auditoría extrema para validar código, layouts responsivos, consistencia de roles y alineación de diseño antes de proponer cambios o finalizar tareas."
---

# Self-Auditor Skill

Esta skill actúa como un auditor interno de calidad y consistencia para Antigravity. Se debe ejecutar OBLIGATORIAMENTE antes de dar por finalizada cualquier tarea o proponer un plan de acción.

## Lista de Verificación de Auditoría (Checklist)

### 1. Consistencia de UX/UI y Dispositivos (Móvil vs Escritorio)
- **Eliminación de Elementos Redundantes**: Si se decide que una vista en móvil no lleva barra de navegación lateral o botones flotantes de menú, verificar que NO existan restos de código HTML/Tailwind (`lg:hidden`, `fixed`, etc.) que sigan renderizando esos elementos en móviles.
- **Vistas Especiales**: Comprobar que en móviles las tablas densas (como el pipeline de clientes o inventario de almacén) se transformen completamente en listas de tarjetas sencillas y fáciles de leer, evitando el scroll horizontal infinito.

### 2. Jerarquía de Roles y Seguridad (RBAC)
- **Roles Reales vs Permisos Técnicos**: Verificar que los nombres, cargos y fotos mostrados en la interfaz coincidan con la estructura real de la empresa (según `comisiones-y-equipo.md`).
- **Enrutamiento y Vistas**: Validar que cada rol tenga bloqueado el acceso a pestañas que no le corresponden, y que el Grid móvil oculte dinámicamente dichos botones.

### 3. Rendimiento y Assets Locales
- **Carga de Imágenes**: Asegurar que todos los avatares apunten a nombres de archivos correctos en disco, codificados de manera limpia para evitar colisiones en navegadores de teléfonos.
- **Bypass de Service Worker**: Garantizar que el Service Worker no esté sirviendo archivos 404 viejos de caché durante el desarrollo.

## Protocolo de Ejecución

Antes de responder al usuario o dar una tarea por completada, escribe mentalmente un análisis de auditoría donde respondas:
1. ¿Probé el layout en móvil real y eliminé el botón de menú hamburguesa sobrante?
2. ¿Los roles coinciden con el organigrama de Ángel (CEO/Dueño), Laura (Vice Directora), José (Marketing/Contable), Yasiel (Dir. Técnico), Samuel (Admin) y Comerciales/Técnicos?
3. ¿Las rutas de imágenes están libres de espacios y caracteres que rompan la carga?
