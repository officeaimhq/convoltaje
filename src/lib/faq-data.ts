export interface FAQItem {
  id: string;
  category: "instalacion" | "baterias" | "consumo" | "garantia" | "general";
  question: string;
  answer: string;
  icon?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  // Instalación
  {
    id: "faq-1",
    category: "instalacion",
    question: "¿Cuánto tiempo tarda la instalación de un sistema solar?",
    answer:
      "La instalación típica de un sistema solar completo toma entre 10-15 días hábiles. Esto incluye: inspección del sitio (1-2 días), preparación de estructuras (2-3 días), instalación de paneles (2-3 días), conexión de baterías (2-3 días), pruebas y puesta en marcha (2-3 días). El tiempo puede variar según la complejidad del proyecto y las condiciones climáticas.",
  },
  {
    id: "faq-2",
    category: "instalacion",
    question: "¿Necesito hacer modificaciones en mi casa para instalar paneles solares?",
    answer:
      "Las modificaciones dependen de tu tipo de vivienda. En apartamentos, generalmente instalamos en azoteas o terrazas sin modificaciones estructurales. En casas, podemos instalar en techos, patios o estructuras independientes. Nuestro equipo realiza una evaluación gratuita para determinar la mejor ubicación sin afectar la estructura de tu propiedad.",
  },
  {
    id: "faq-3",
    category: "instalacion",
    question: "¿Qué mantenimiento requiere un sistema solar?",
    answer:
      "El mantenimiento es mínimo. Recomendamos: limpieza de paneles cada 3-6 meses (especialmente en temporada de polvo), inspección visual mensual de conexiones, revisión anual profesional de todo el sistema. Los paneles tienen una vida útil de 25-30 años con degradación mínima (~0.5% anual). Las baterías requieren revisión cada 2-3 años.",
  },
  {
    id: "faq-4",
    category: "instalacion",
    question: "¿Puedo instalar paneles solares en un apartamento?",
    answer:
      "Sí, absolutamente. Muchos de nuestros clientes viven en apartamentos. Instalamos en azoteas comunitarias, terrazas privadas o balcones. Es importante obtener autorización de la junta directiva si es azotea compartida. Ofrecemos sistemas portátiles y modulares para espacios limitados.",
  },

  // Baterías
  {
    id: "faq-5",
    category: "baterias",
    question: "¿Cuál es la vida útil de las baterías?",
    answer:
      "Nuestras baterías de litio tienen una vida útil de 8-10 años con garantía de 5 años. Después de este período, mantienen aproximadamente 80-85% de su capacidad. Esto significa que incluso después de 10 años, tu batería seguirá funcionando eficientemente. El costo de reemplazo es significativamente menor que el sistema inicial.",
  },
  {
    id: "faq-6",
    category: "baterias",
    question: "¿Qué diferencia hay entre baterías de litio y plomo-ácido?",
    answer:
      "Las baterías de litio (que usamos en Convoltaje) ofrecen: mayor densidad energética, ciclos de vida 3-5 veces más largos, cero mantenimiento, mejor rendimiento en temperaturas extremas, y recuperación más rápida. Las baterías de plomo-ácido son más económicas inicialmente pero requieren mantenimiento regular, tienen menor vida útil (3-5 años) y ocupan más espacio.",
  },
  {
    id: "faq-7",
    category: "baterias",
    question: "¿Qué pasa si la batería se descarga completamente?",
    answer:
      "Nuestros sistemas tienen protección automática que evita descargas completas. Cuando la batería llega a 10% de capacidad, el sistema desconecta automáticamente los equipos no esenciales. Esto protege la batería y extiende su vida útil. Puedes recargar manualmente en cualquier momento usando paneles solares o la red eléctrica si está disponible.",
  },
  {
    id: "faq-8",
    category: "baterias",
    question: "¿Las baterías funcionan en climas cálidos como Cuba?",
    answer:
      "Perfectamente. Nuestras baterías están diseñadas específicamente para climas tropicales. Incluyen sistemas de ventilación y regulación térmica que mantienen la temperatura óptima incluso en días muy calurosos. De hecho, el clima cálido de Cuba es ideal para paneles solares, que generan más energía con temperaturas moderadas.",
  },

  // Consumo
  {
    id: "faq-9",
    category: "consumo",
    question: "¿Cómo calculo mi consumo energético diario?",
    answer:
      "Usa nuestra calculadora solar interactiva que está en esta página. Simplemente: 1) Selecciona tu tipo de vivienda, 2) Agrega los equipos que usas con cantidad y horas de uso, 3) Indica las horas de sol en tu región, 4) Obtendrás tu consumo diario y la recomendación de kit perfecto. Si prefieres hacerlo manualmente: Consumo (kWh) = (Watts × Horas de uso) / 1000.",
  },
  {
    id: "faq-10",
    category: "consumo",
    question: "¿Un aire acondicionado consume mucha energía?",
    answer:
      "Sí, los aires acondicionados son los electrodomésticos que más energía consumen (~1500W). 6 horas de uso diario = 9 kWh/día. Sin embargo, nuestros sistemas de 7.2kW pueden manejar esto sin problemas. Para máxima eficiencia, recomendamos usar aire acondicionado durante las horas más calurosas (10am-4pm) cuando los paneles generan más energía.",
  },
  {
    id: "faq-11",
    category: "consumo",
    question: "¿Qué equipos consumen más energía en una casa?",
    answer:
      "Los principales consumidores son: Aire acondicionado (1500W), Horno eléctrico (2000W), Lavadora (500W), Refrigerador (200W), Televisor (150W), Laptop (65W). La mayoría de estos funcionan durante horas específicas, excepto el refrigerador que está 24/7. Nuestra calculadora te ayuda a identificar exactamente cuánto consume cada uno.",
  },
  {
    id: "faq-12",
    category: "consumo",
    question: "¿Puedo usar mi sistema solar para cargar vehículos eléctricos?",
    answer:
      "Sí, pero requiere un sistema más grande. Un auto eléctrico típico consume 15-20 kWh para cargar completamente. Recomendamos nuestro sistema Premium 10000W para esto. Además, es ideal cargar durante el día cuando los paneles generan máxima energía. Podemos diseñar un sistema híbrido que maneje tanto consumo doméstico como carga de vehículos.",
  },

  // Garantía
  {
    id: "faq-13",
    category: "garantia",
    question: "¿Qué incluye la garantía del sistema?",
    answer:
      "Nuestros sistemas incluyen: Garantía de paneles solares: 25 años (degradación máxima 0.8% anual), Garantía de baterías: 5 años (cobertura completa), Garantía de inversor: 5 años, Garantía de instalación: 2 años (mano de obra). Además ofrecemos servicio técnico 24/7 por WhatsApp.",
  },
  {
    id: "faq-14",
    category: "garantia",
    question: "¿Qué cubre la garantía si hay daños por tormenta?",
    answer:
      "La garantía estándar cubre defectos de fabricación. Para daños por tormentas, recomendamos contratar un seguro adicional que cubre eventos climáticos extremos. Ofrecemos paquetes de seguros a partir de $50/año que cubren daños por rayos, huracanes y inundaciones. Consulta con nuestro equipo comercial para más detalles.",
  },
  {
    id: "faq-15",
    category: "garantia",
    question: "¿Qué pasa si mi sistema falla después de la garantía?",
    answer:
      "Ofrecemos planes de mantenimiento extendido y reparación a costos muy accesibles. La mayoría de reparaciones son menores (reemplazo de conexiones, limpieza, etc.). Los componentes principales (paneles, baterías, inversores) rara vez fallan. Contamos con piezas de repuesto en stock y técnicos certificados disponibles.",
  },

  // General
  {
    id: "faq-16",
    category: "general",
    question: "¿Cuál es el costo inicial de un sistema solar?",
    answer:
      "Los precios varían según el tamaño del sistema: Sistema Básico (1.5kW): $1,745 USD, Sistema Medio (3kW): $2,750 USD, Sistema Grande (6kW): $3,950-6,950 USD, Sistema Premium (10kW): $9,850 USD. Ofrecemos planes de financiamiento sin interés hasta 12 meses. Usa nuestra calculadora para obtener una prefactura personalizada.",
  },
  {
    id: "faq-17",
    category: "general",
    question: "¿Cuánto dinero ahorraré con energía solar?",
    answer:
      "El ahorro depende de tu consumo actual. Un cliente promedio ahorra $80-150 USD mensuales en electricidad. Con un sistema de $3,500 USD, el retorno de inversión es de 2-3 años. Después, toda la energía es prácticamente gratis. Además, aumenta el valor de tu propiedad en 3-4%.",
  },
  {
    id: "faq-18",
    category: "general",
    question: "¿Necesito permisos del gobierno para instalar paneles?",
    answer:
      "En Cuba, los requisitos varían por municipio. Nuestro equipo se encarga de toda la documentación y permisos necesarios. Generalmente necesitas: Autorización de la propiedad, Inspección técnica, Registro en la empresa eléctrica local. Todo esto lo manejamos nosotros, tú solo firmas los documentos.",
  },
  {
    id: "faq-19",
    category: "general",
    question: "¿Puedo expandir mi sistema solar después?",
    answer:
      "Absolutamente. Todos nuestros sistemas son modulares y expandibles. Puedes agregar más paneles, baterías adicionales o un inversor más grande en el futuro. Esto es ventajoso porque puedes comenzar con un sistema básico y crecer según tus necesidades. Nuestro equipo puede diseñar la expansión sin afectar el sistema existente.",
  },
  {
    id: "faq-20",
    category: "general",
    question: "¿Qué pasa si tengo días nublados seguidos?",
    answer:
      "Nuestros sistemas están diseñados para esto. Las baterías almacenan energía de días soleados para usar en días nublados. Un sistema bien dimensionado puede mantener 2-3 días de autonomía sin sol. Además, en Cuba tenemos más de 300 días soleados al año, así que esto es muy raro. Si necesitas más seguridad, recomendamos un sistema más grande o conexión a la red eléctrica como respaldo.",
  },
];

export const FAQ_CATEGORIES = [
  { id: "instalacion", label: "Instalación", icon: "🔧" },
  { id: "baterias", label: "Baterías", icon: "🔋" },
  { id: "consumo", label: "Consumo Energético", icon: "⚡" },
  { id: "garantia", label: "Garantía", icon: "✅" },
  { id: "general", label: "General", icon: "❓" },
];
