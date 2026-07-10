---
name: "obsidian-logger"
description: "Skill for logging individual task completion and tracking execution time for specific changes in Obsidian during an active session."
---

# Obsidian Logger Skill

This skill is used to log intermediate task completions or specific changes in Obsidian *during* an active session without stopping the servers or closing the session. Use this to keep a granular, chronological log of changes and trace how much time each specific change took.

## Execution Protocol

Every time you finish a specific task, bugfix, or feature within a session:

1. **Step 1: Estimate Task Duration**
   - Estimate how many minutes or hours were spent on this specific task (e.g., `30m`, `1h 15m`).

2. **Step 2: Format the Log Entry**
   - Create a structured entry using this format:
     ```markdown
     - **[Task Name]** [Duration: Xh Xm]
       - Detailed summary of changes.
       - Files modified or created.
     ```

3. **Step 3: Update the Daily Obsidian Log**
   - Append this entry under the active session heading in `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Sesiones/YYYY-MM-DD.md`.
   - If the file for the current day does not exist, initialize it first.

4. **Step 4: Update Control-Tiempo.md**
   - Record the specific task and its time in the active session section of `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Control-Tiempo.md` to keep trace of productivity milestones.

