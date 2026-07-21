---
name: "deep-evaluator"
description: "Habilidades de análisis crítico extremo y auto-evaluación antes de tomar decisiones de arquitectura o diseño de UI/UX."
---

# Deep Evaluator Skill

Esta skill se activa OBLIGATORIAMENTE cada vez que se requiere hacer un plan de desarrollo, tomar una decisión de diseño de UI/UX o elegir una arquitectura técnica. Su objetivo es llevar el pensamiento al límite y asegurar que no se toma ninguna decisión superficial.

## Protocolo de Ejecución: El Límite del Pensamiento

Antes de escribir código o proponer un plan, debes realizar internamente el siguiente proceso y plasmar tus conclusiones en la respuesta:

1. **Deconstrucción del Problema:**
   - ¿Cuál es el problema real que el usuario intenta resolver?
   - ¿Qué asunciones estoy haciendo sobre los requerimientos que no han sido explícitamente confirmados?

2. **Análisis de UX/UI y Autenticidad (No Copiar):**
   - Si hay referencias visuales, identifica los **patrones estructurales** (ej. tablas, Kanban, sidebars) pero NUNCA el estilo visual exacto si tiene copyright.
   - ¿Cómo adapto esta estructura a la identidad visual única de la marca (ej. Convoltaje: modo cristal oscuro, acentos cian y coral)?
   - ¿Es esta interfaz realmente usable en móviles o solo funciona en escritorio? (Pensamiento Mobile-First).

3. **Arquitectura y Rendimiento:**
   - ¿Esta solución requiere nuevas librerías? Si es así, ¿puedo hacerlo con CSS puro y lógica nativa para no aumentar el peso del bundle?
   - ¿Cuáles son los cuellos de botella de renderizado? (Ej. listas muy largas en una tabla, exceso de re-renders).

4. **El Abogado del Diablo (Auto-Crítica Severa):**
   - ¿Por qué mi primera idea podría fallar estrepitosamente?
   - Si la red es lenta, si el usuario hace clics rápidos, si la base de datos devuelve un error: ¿está contemplado en el diseño?

5. **Decisión Final y Justificación:**
   - Presenta la conclusión de tu análisis de manera estructurada al usuario, explicando *por qué* has descartado las opciones fáciles y elegido esta ruta más robusta.

### 6. Priorización y Secuenciación de Tareas
Antes de proponer cualquier plan de implementación con múltiples módulos o cambios:
- **Clasificar por urgencia real:** No todo lo que aparece en un gap analysis tiene el mismo peso. Separar en:
  - 🔴 P1: Lo que el cliente (José/Ángel) pidió EXPLÍCITAMENTE en chats o reuniones
  - 🟡 P2: Lo que se deduce de sus requerimientos pero no pidieron directamente
  - 🟢 P3: Lo que solo apareció en análisis técnicos (gaps vs ERPs, mejores prácticas)
- **Agrupar en sprints:** Cada sprint debe entregar valor completo (no dejar módulos a medio hacer). Máximo 1-2 módulos P1 por sprint.
- **Justificar cada orden:** En la respuesta, explicar POR QUÉ el módulo A va antes que el B, citando la fuente (chat de José, gap analysis, requerimiento de Ángel).

### 7. Precisión de Especificaciones (No Interpretar, Citar)
Cuando el plan incluya features solicitadas por el cliente:
- **Citar textualmente** lo que dijo el cliente. No resumir ni parafrasear si cambia el significado.
- **Verificar que la implementación propuesta coincide 1:1** con lo que pidieron. Por ejemplo:
  - Si el cliente dijo "Cobrado sin problemas" O "Contactar al comercial", no implementar como un toggle binario.
  - Si el cliente dijo 3 cosas para el calendario (drag & drop + copiar + toggle vista), no mencionar solo 1.
- **Cuando haya duda, marcarla como Open Question**, no asumir.

### 8. Migración de Datos (Local → Producción)
Para cada nuevo store o módulo propuesto:
- **Definir el schema SQL** (tablas, columnas, tipos, relaciones, claves foráneas) al mismo tiempo que el store Zustand.
- **Incluir una estrategia de migración:** ¿cómo pasan los datos mock de localStorage a Supabase? Función `mockToSupabase()` o script de seed.
- **No construir más stores locales sin su equivalente en `schema.ts`.** Si el schema no está definido, el plan está incompleto.

### 9. Validación Contra Requerimientos Completos
Antes de dar un plan por finalizado:
- **Releer todas las fuentes:** Chats de WhatsApp del cliente, notas de sesiones de Obsidian, gap analysis. No trabajar de memoria.
- **Lista de chequeo:** ¿El plan cubre CADA punto que el cliente mencionó, o solo los que encajan con la primera idea?
- **Si el plan omite algo que el cliente pidió, señalarlo explícitamente** y explicar por qué se difiere (ej. "José pidió X, lo ponemos en Sprint 3 porque bloquea Y").
