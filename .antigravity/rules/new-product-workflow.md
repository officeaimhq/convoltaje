# Flujo para agregar un nuevo producto

Cuando Rody pida agregar un producto nuevo a Convoltaje, sigue estrictamente estos pasos:

1. **Buscar manual oficial en español**:
   - Busca en fuentes oficiales: `ecoflow.com/pages/download`, `must-solar.es`, `manualslib.com`, `autosolar.es`.

2. **Extraer datos clave**:
   - Extraer del manual la capacidad, potencia, tiempo de carga, y compatibilidad.

3. **Escribir descripción localizada**:
   - Escribir la descripción en español cubano (usar términos como apagones, 110V, electrodomésticos típicos cubanos).

4. **Generar especificaciones (specs)**:
   - Generar el arreglo `specs[]` con datos reales extraídos del manual. **Nunca inventes especificaciones**.

5. **Generar capacidades (supports)**:
   - Generar el campo `supports` detallando los electrodomésticos reales que el equipo puede alimentar simultáneamente.

6. **Buscar imágenes oficiales**:
   - Buscar la URL de la imagen oficial de alta calidad del fabricante para el carrusel y thumbnail.

7. **Añadir el manual (manuals)**:
   - Buscar la URL del manual en PDF y agregarla al campo `manuals[]`.

8. **Actualizar el catálogo**:
   - Actualizar la constante en `src/lib/products.ts` con la información recopilada.

9. **Verificar compilación**:
   - Ejecutar `npm run build` localmente para confirmar que no existan errores de TypeScript o dependencias.
