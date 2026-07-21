---
name: project-checkpoint
description: Crea una salva del estado del proyecto (git commit, engram y obsidian log)
triggers:
  - "/salva"
  - "checkpoint"
  - "haz una salva"
  - "guarda el estado"
---

# Project Checkpoint Workflow

Esta skill se debe ejecutar inmediatamente cada vez que el usuario pida hacer un "checkpoint" o "/salva".

**Instrucciones de Ejecución:**

1. **Pedir o inferir descripción:** Si el usuario no dio una descripción para la salva, pregúntale brevemente. Si la dio, úsala.
2. **Git Commit:**
   Ejecuta: `git add . && git commit -m "Checkpoint: [Descripción]"`
3. **Guardar en Engram:**
   Llama a la herramienta `mem_save` de Engram. 
   - `title`: "Checkpoint: [Descripción]"
   - `type`: "decision"
   - `content`: "Se hizo una salva del código con los siguientes cambios: [resumen]."
4. **Loguear en Obsidian:**
   Agrega una línea en el log de sesión de hoy: `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Sesiones/YYYY-MM-DD.md`.
   Formato: `- 🛡️ **Checkpoint:** [Descripción] (Commit guardado)`
5. **Git Push:**
   Ejecuta: `git push origin main` (o tu comando push por defecto) para mantener siempre una copia en GitHub.
6. **Confirmación:**
   Responde al usuario confirmando que la salva se ha completado, subido a GitHub, guardada en memoria, y documentada en Obsidian.
