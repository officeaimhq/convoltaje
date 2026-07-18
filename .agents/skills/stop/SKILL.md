---
name: "stop"
description: "Closes the development session: stops the local server, updates the daily plan in Obsidian (checking off completed tasks), appends session summary to the Obsidian log, and performs a local git commit."
triggers:
  - "/stop"
  - "close session"
  - "cerrar sesión"
  - "vamos a parar"
  - "paramos por hoy"
---

# Stop Skill

This skill ensures that all development servers are terminated, the Obsidian daily plan is updated with completed tasks, the session log is written, and a local checkpoint is saved.

## Execution Protocol

Every time a session is concluded (the user says "stop", "vamos a parar", "cerrar sesión", or similar):

---

### Step 1: Terminate Servers
Shutdown the local development server:
```
pkill -f "vite" || true
```

---

### Step 2: Update the Daily Plan in Obsidian ⭐ (NEW — MANDATORY)

This is the most important step. The daily plan lives at:
`/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/02-Plan-de-Trabajo/YYYY-MM-DD-Plan-Diario.md`

**You MUST do the following:**
1. Read the current daily plan file for today's date.
2. For every task that was completed during this session, change `- [ ]` to `- [x]`.
3. Add a new section **"Tareas emergentes completadas (no planificadas):"** with `- [x]` entries for anything done that was NOT in the original plan.
4. Fill in the **"Estado al final del día:"** line with a brief status (e.g., "✅ Sesión completada. Todas las tareas resueltas." or "⚠️ Sesión parcial. Quedaron pendientes X y Y.").
5. Add a **"Pendientes para la próxima sesión:"** section at the bottom with `- [ ]` entries for unfinished or newly discovered tasks.
6. Save the updated file (overwrite).

If there is no daily plan file for today, create one with the format:
```markdown
# Plan Diario: YYYY-MM-DD

**Objetivo del día:** [Inferred from session work]

**Tareas completadas en sesión:**
- [x] [Task 1]
- [x] [Task 2]

**Estado al final del día:** ✅ Sesión completada.

**Pendientes para la próxima sesión:**
- [ ] [Pending task]
```

---

### Step 3: Append to Session Log

Append a full summary of all changes made during the session to:
`/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Sesiones/YYYY-MM-DD.md`

Include:
- Estimated session start/end times and duration
- List of all completed tasks with context
- List of pending items for next session
- Any important discoveries or decisions made

---

### Step 4: Save Session Summary to Engram (MANDATORY)

Call `mem_session_summary` with:
- **goal**: What the session was about
- **accomplished**: Bullet list of completed tasks
- **discoveries**: Non-obvious findings, gotchas, decisions made
- **next_steps**: Clear list of what remains
- **relevant_files**: Files changed with a brief description

This ensures the next session can restore context from memory without re-reading the entire codebase.

---

### Step 5: Local Git Commit

Run a git commit to save all progress:
```
git add . && git commit -m "chore: session close YYYY-MM-DD — [brief description]"
```
If the working tree is already clean (nothing to commit), report this to the user. Do NOT push to GitHub unless the user explicitly asks.

---

### Step 6: Confirm to User

Report back with:
```
🛑 Sesión cerrada — [FECHA]

✅ Servidor detenido
✅ Plan diario actualizado (Obsidian)
✅ Log de sesión guardado
✅ Memoria Engram actualizada  
✅ Git commit: [hash] / Árbol limpio

📌 Top pendientes para la próxima sesión:
1. [Pending 1]
2. [Pending 2]
3. [Pending 3]
```
