---
name: "stop"
description: "Closes the development session: stops the local server, calculates total session duration, updates Control-Tiempo.md and Obsidian daily log, and performs a local git commit."
---

# Stop Skill

This skill ensures that all development servers are terminated, the time spent during the session is computed and logged, and a local checkpoint is created securely.

## Execution Protocol

Every time a session is concluded (the user says "close session", "stop", or similar):

1. **Step 1: Terminate Servers**
   Shutdown the local development server:
   `pkill -f "vite" || true`

2. **Step 2: Calculate Duration**
   - Check the current time.
   - Look up the start time recorded in `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Control-Tiempo.md`.
   - Calculate the total hours/minutes elapsed for the session.

3. **Step 3: Update Control-Tiempo.md**
   - Locate the active session entry in `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Control-Tiempo.md`.
   - Update the status from "En progreso..." to the final duration (e.g., `Duración: 1h 45m`).
   - Sum the new duration to the "Total de Horas Dedicadas" at the top of the file.

4. **Step 4: Append to Session Log**
   - Append a summary of all changes made during the session to the daily log in `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Sesiones/YYYY-MM-DD.md`.
   - Include the specific duration of the session at the top of the log.

5. **Step 5: Local Git Commit**
   - Run a git commit to save all progress locally without pushing to GitHub (to preserve Netlify build credits):
     `git add . && git commit -m "Checkpoint: session close YYYY-MM-DD"`
   - Provide the commit hash to the user.
