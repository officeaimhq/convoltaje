---
name: "push-to-production"
description: "Skill exclusiva para hacer despliegues (git push) a la rama de producción, activando el build de Netlify y consumiendo créditos. Uso restringido bajo orden explícita."
---

# Push to Production Skill (Control de Créditos de Netlify)

Esta skill es el ÚNICO mecanismo permitido para ejecutar un `git push` hacia la rama principal (producción) del proyecto. Su objetivo es evitar despliegues accidentales que consuman créditos de Netlify sin autorización expresa del usuario.

## Cuándo activar esta skill
Solo debes activar esta skill si el usuario dice explícitamente frases inequívocas como:
- "Quiero hacer push a producción"
- "Haz deploy a Netlify"
- "Sube los cambios a producción"
- "Activa el push-to-production"

## Protocolo de Ejecución Segura

1. **Confirmación de Seguridad (Doble Check)**
   - Si el usuario solicita un push pero su instrucción es ambigua o no dice claramente "estoy seguro de consumir créditos", DEBES detenerte y preguntarle: *"Atención: Estás a punto de hacer un push a producción. Esto activará el build en Netlify y consumirá créditos de despliegue. ¿Confirmas que deseas proceder con el `git push`?"*

2. **Ejecución del Push**
   - Una vez confirmada la acción sin lugar a dudas, ejecuta el comando de despliegue:
     `git push origin main` (o el remoto/rama configurado para producción).

3. **Reporte Final**
   - Informa al usuario que el código ha sido enviado al servidor.
   - Recuérdale que el proceso de compilación (build) en Netlify tomará unos minutos y que los cambios pronto estarán visibles en la URL pública.
