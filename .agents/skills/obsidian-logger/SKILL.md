---
name: "obsidian-logger"
description: "Skill para automatizar el registro estructurado de cambios en Obsidian al finalizar una tarea, evitando pushes a Netlify y protegiendo los créditos."
---

# Obsidian Logger Skill

Esta skill asegura el cumplimiento estricto de la política de ahorro de créditos de Netlify y automatiza el registro de progresos en la bóveda de Obsidian. Se debe activar OBLIGATORIAMENTE cada vez que se finaliza un bloque de desarrollo de código o una tarea solicitada por el usuario.

## Reglas de Oro (Crítica)
1. **NO PUSH A GITHUB**: Nunca hacer `git push` de forma automática tras un commit. Los despliegues consumen créditos de Netlify. Solo el usuario puede ordenar explícitamente la ejecución de un push a producción. Todos los `git commit` deben ser 100% locales.
2. **Confirmación Previa**: No escribas el log en Obsidian inmediatamente tras terminar la tarea de código. Primero pregunta al usuario si desea proceder con la generación del log.

## Protocolo de Ejecución

Cuando finalices una tarea o bloque de código:

1. **Paso 1: Parada y Confirmación**
   - Escribe al usuario confirmando que el código o tarea local está lista.
   - Pregunta: *"¿Quieres que genere el log de lo que se cambió y lo registre en Obsidian?"*

2. **Paso 2: Generación del Log (Tras aprobación)**
   - Si el usuario aprueba, crea un resumen de los cambios.
   - El formato OBLIGATORIO para la entrada es:
     ```markdown
     - [FECHA ACTUAL] **[Título Claro y Descriptivo de los Cambios]**
       - Detalles de los cambios realizados.
       - Archivos modificados o creados.
     ```
     *(Sustituye [FECHA ACTUAL] con la fecha del día, ej: 10 de Julio de 2026).*

3. **Paso 3: Inserción en Obsidian**
   - Usa un script de Node.js o el método seguro correspondiente para añadir (append) esta entrada al archivo de la sesión actual en: `/Users/rodyfigueroa/Movies/Viralist Obsidian/ReloNL/Convoltaje/Sesiones/YYYY-MM-DD.md`
   - Si el archivo del día no existe, infórmalo y pregunta si lo creas.
   - Confírmale al usuario que el log ha sido guardado exitosamente.
