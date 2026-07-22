---
name: "obsidian-logger"
description: "Skill for logging individual task completion, tracking execution time, and syncing status to Linear via MCP during an active session."
---

# Obsidian Logger Skill

This skill is used to log intermediate task completions or specific changes in Obsidian *during* an active session without stopping the servers or closing the session. Use this to keep a granular, chronological log of changes, trace how much time each specific change took, and keep Linear in sync.

## Execution Protocol

Every time you finish a specific task, bugfix, or feature within a session:

1. **Step 1: Estimate Task Duration**
   - Estimate how many minutes or hours were spent on this specific task (e.g., `30m`, `1h 15m`).

2. **Step 2: Format the Log Entry**
   - Create a structured entry using this format:
     ```markdown
     - **[CON-xxx] Task Name** [Duration: Xh Xm]
       - Detailed summary of changes.
       - Files modified or created.
     ```

3. **Step 3: Sync to Linear via MCP**
   - If the task has a Linear issue reference `CON-xxx` in the title:
     a. Call `update_issue_state` with `issueId: "CON-xxx"` and `stateId` for "Done" (`3a708840-bd5a-46c1-871a-b800e215bcb9`)
     b. Call `create_comment` with `issueId: "CON-xxx"` and body:
        ```
        ✅ Completado en sesión YYYY-MM-DD
        📁 Archivos: path/to/file.tsx, path/to/file.ts
        📝 Detalle: 2-3 líneas del cambio
        ```
   - If the task does NOT have a Linear issue reference, create one:
     a. Call `get_viewer` to get team ID
     b. Call `create_issue` with title, description and appropriate labels

   Linear MCP está disponible en:
   - **OpenCode**: `~/.config/opencode/opencode.jsonc` (stdio)
   - **Antigravity**: `~/.gemini/config/mcp_config.json` (Streamable HTTP)

4. **Step 4: Update the Daily Obsidian Log**
   - Append this entry under the active session heading in `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/04-Sesiones-Logs/YYYY-MM-DD.md`.
   - If the file for the current day does not exist, initialize it first.

5. **Step 5: Update Control-Tiempo.md**
   - Record the specific task and its time in the active session section of `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Control-Tiempo.md` to keep trace of productivity milestones.

## Reference: Linear Project Structure

| Recurso | Valor |
|---------|-------|
| Team ID | `be5365a8-0956-425e-aa8c-29a41becf206` |
| Done state ID | `3a708840-bd5a-46c1-871a-b800e215bcb9` |
| In Progress state ID | `31e6ccbc-aaa2-4d41-9734-6d4aec355582` |
| Blocked state ID | _(usar "In Review" `d6c58d7e-64c2-42a1-87dd-dbb5bdcae52f` como bloqueado)_ |

### Label names (para create_issue)
- Module: `CRM`, `Inventory`, `Installations`, `Finances`, `Queues`, `Calendar`, `PDF`, `Auth`, `Landing`, `Docs`, `Infra`
- Sprint: `Sprint-1`, `Sprint-2`, `Sprint-3`, `Backlog`
- Siempre poner Module + Sprint juntos al crear un issue nuevo

### Project IDs (para create_issue)
- Sprint 1: `26b7f93e-180d-45f9-add4-af7d6a32461b`
- Sprint 2: `67a58a33-7920-4808-bb98-ad2544d07a48`
- Sprint 3: `2df174fd-2bea-4c88-84ff-b3a989682033`
- Landing Page: `a1e98082-a649-4137-89d6-409db8818a48`
- Infraestructura: `0c8e8e01-4795-4101-aa32-3ace2dc231cf`
- 🔄 Histórico: Fase 0-3: `26ae19d4-6eb6-4b91-8f8b-f9c32147a1cf`

