---
name: project-restore
description: Revierte el código a una salva anterior de forma segura
triggers:
  - "/restaurar"
  - "restore"
  - "volver atras"
  - "restaurar"
---

# Project Restore Workflow

Esta skill se debe ejecutar inmediatamente cada vez que el usuario pida volver atrás a una salva o "/restaurar".

**Instrucciones de Ejecución:**

1. **Crear Rama de Respaldo:**
   ANTES de revertir nada, ejecuta SIEMPRE este comando para proteger el código actual:
   `git checkout -b backup-$(date +%Y%m%d-%H%M)`
   Luego vuelve a la rama principal:
   `git checkout main`
2. **Listar y Elegir:**
   Usa `git log --oneline -n 10` y muestra las opciones al usuario. Espera su respuesta si no ha dado el hash específico.
3. **Revertir Código (Por defecto Seguro):**
   - **MÉTODO POR DEFECTO:** Usa `git revert --no-commit [hash]..HEAD` y luego haz el commit (o directamente `git revert` si es un solo commit) para deshacer cambios sin destruir el historial.
   - **MÉTODO DESTRUCTIVO:** SOLO si el usuario pide explícitamente hacerlo destructivo o `git reset --hard`, ejecuta `git reset --hard [hash]`.
4. **Guardar en Engram:**
   Llama a la herramienta `mem_save` de Engram para que quede el registro de que se volvió atrás.
5. **Loguear en Obsidian:**
   Agrega una advertencia en el log de sesión de hoy: `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Sesiones/YYYY-MM-DD.md`.
   Formato: `- ⚠️ **Restore:** Se revirtió el código al checkpoint [hash/nombre].`
6. **Git Push:**
   Haz push de la rama main a GitHub: `git push origin main` (con `--force` si se usó reset destructivo y el usuario lo confirma).
7. **Confirmación:**
   Responde al usuario confirmando que se hizo el restore, la rama backup está creada, se actualizó la memoria y el log en Obsidian.
