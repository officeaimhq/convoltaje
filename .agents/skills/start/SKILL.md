---
name: "start"
description: "Starts the local development servers for Vite/React and initializes the session timer."
---

# Start Skill

This skill automates starting the local development environment and tracking productivity metrics (time spent per session and tasks).

## Execution Protocol

Every time a session starts or the user runs this skill:

1. **Step 1: Terminate Existing Servers**
   Run the command to clear previous Vite instances:
   `pkill -f "vite" || true`

2. **Step 2: Start Dev Server**
   Start the local development server in the background:
   `npm run dev`
   Confirm that the server is active on `http://localhost:5173`.

3. **Step 3: Initialize Session Timer**
   - Check the current time.
   - Record the start timestamp in `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Control-Tiempo.md` under a new session log entry.
   - Example format for starting a session:
     ```markdown
     ### Session YYYY-MM-DD (Start: HH:MM)
     - [ ] Active development in progress...
     ```

4. **Step 4: Update Time Log on Completion**
   When logging changes with `obsidian-logger`:
   - Calculate the total time elapsed since session start.
   - For every feature/fix completed, estimate the specific minutes/hours dedicated.
   - Update both `Control-Tiempo.md` and the daily session log `Sesiones/YYYY-MM-DD.md` with:
     - **Time spent** (e.g., `[Duration: 1h 15m]`)
     - **Summary of changes**
