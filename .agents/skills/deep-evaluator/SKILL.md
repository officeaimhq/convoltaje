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
