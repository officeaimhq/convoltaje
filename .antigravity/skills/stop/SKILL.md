---
name: "stop"
description: "Closes the development session: stops local server, updates Obsidian daily plan & session logs, syncs Linear tasks/milestones, saves Engram session memory, and performs a git commit."
triggers:
  - "/stop"
  - "close session"
  - "cerrar sesión"
  - "vamos a parar"
  - "paramos por hoy"
---

# Stop Skill

This skill ensures that all development servers are terminated, the Obsidian daily plan is updated with completed tasks, session logs are written, Linear issues and milestones are updated, Engram session memory is saved, and a local checkpoint is saved.

## Execution Protocol

Every time a session is concluded (the user says "stop", "/stop", "vamos a parar", "cerrar sesión", or similar):

---

### Step 1: Terminate Servers
Shutdown the local development server:
```
pkill -f "vite" || true
```

---

### Step 2: Update the Daily Plan in Obsidian ⭐ (MANDATORY)

The daily plan lives at:
`/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/02-Plan-de-Trabajo/YYYY-MM-DD-Plan-Diario.md`

**You MUST do the following:**
1. Read the current daily plan file for today's date.
2. For every task that was completed during this session, change `- [ ]` to `- [x]`.
3. Add a new section **"Tareas emergentes completadas (no planificadas):"** with `- [x]` entries for anything done that was NOT in the original plan.
4. Fill in the **"Estado al final del día:"** line with a brief status.
5. Add a **"Pendientes para la próxima sesión:"** section at the bottom.
6. Save the updated file.

---

### Step 3: Append to Session Log

Append a full summary of all changes made during the session to:
`/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/04-Sesiones-Logs/YYYY-MM-DD.md`

---

### Step 4: Save Session Summary to Engram (MANDATORY)

Call `mem_session_summary` with:
- **goal**: What the session was about
- **accomplished**: Bullet list of completed tasks
- **discoveries**: Non-obvious findings, gotchas, decisions made
- **next_steps**: Clear list of what remains
- **relevant_files**: Files changed with a brief description

---

### Step 5: Synchronize with Linear ⭐ (MANDATORY)

Use Linear MCP tools (`list_issues`, `save_issue`, `save_comment`) to:
1. List open/in-progress issues for the Convoltaje project.
2. Update status of completed issues to "Done".
3. Post a comment on relevant issues or milestones summarizing session progress.

---

### Step 6: Local Git Commit & Push

Run git commit to save all progress, and execute production deployment if requested:
```
git add . && git commit -m "chore: session close YYYY-MM-DD — [brief description]"
```

---

### Step 7: Confirm to User

Report back with:
```
🛑 Sesión cerrada — [FECHA]

✅ Servidor detenido
✅ Plan diario actualizado (Obsidian)
✅ Log de sesión guardado
✅ Memoria Engram actualizada  
✅ Sincronización con Linear (Issues y Milestones actualizados)
✅ Git commit / Push completado

📌 Top pendientes para la próxima sesión:
1. [Pending 1]
2. [Pending 2]
3. [Pending 3]
```
