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
    question: "¿Qué tipo de cable se usa en una instalación solar profesional?",
    answer:
      "En Convoltaje usamos exclusivamente cable solar certificado, diseñado para trabajar a la intemperie y resistir la radiación ultravioleta. Nunca usamos cable eléctrico común en nuestras instalaciones — aunque visualmente pueda parecerse, el cable eléctrico no está preparado para soportar las condiciones de un sistema solar y representa un riesgo serio. Si ves en tu casa a un instalador usando cable eléctrico donde debe ir cable solar, ese instalador no es profesional. En Convoltaje, cada detalle de la instalación se hace de forma profesional y medida.",
  },
  {
    id: "faq-2",
    category: "instalacion",
    question: "¿Por qué es peligroso usar dos cables finos en lugar de uno grueso?",
    answer:
      "Es una práctica que vemos en instalaciones de baja calidad y es directamente peligrosa. Un inversor de capacidad media puede manejar hasta 120 amperes de corriente. Unir dos cables finitos no equivale a tener un cable grueso certificado — el sistema puede sobrecalentarse, fallar, o generar un incendio. En Convoltaje usamos el calibre de cable correcto para cada punto del sistema, sin atajos.",
  },
  {
    id: "faq-3",
    category: "instalacion",
    question: "¿Cómo sé si la estructura de mis paneles solares está bien instalada?",
    answer:
      "Una señal de alarma inmediata: si usted puede mover o aflojar un panel solar con la mano, la instalación no es profesional. La estructura debe ser completamente rígida, capaz de soportar vientos fuertes y las condiciones climáticas de Cuba. En Convoltaje revisamos cada punto de fijación antes de dar por completada cualquier instalación.",
  },
  {
    id: "faq-4",
    category: "instalacion",
    question: "¿Cuánto tiempo tarda la instalación?",
    answer:
      "El tiempo promedio de instalación es de 10 a 15 días hábiles, sujeto a disponibilidad del equipamiento en almacén. Esto incluye la inspección del sitio, preparación de estructuras, instalación de paneles, conexión de baterías e inversor, y las pruebas de puesta en marcha. No damos el trabajo por terminado hasta que el sistema funciona al 100%.",
  },
  {
    id: "faq-5",
    category: "instalacion",
    question: "¿Qué incluye el servicio de instalación de Convoltaje?",
    answer:
      "Nuestro servicio es completamente llave en mano: incluye el suministro de todos los equipos, estructuras de montaje, cable solar certificado, cableado profesional completo, configuración del inversor y baterías, y la puesta en marcha del sistema. Trabajamos con técnicos e ingenieros calificados. No terminamos el trabajo hasta que el sistema esté funcionando correctamente.",
  },

  // Garantía
  {
    id: "faq-6",
    category: "garantia",
    question: "¿Qué garantía ofrece Convoltaje?",
    answer:
      "Convoltaje ofrece garantía REAL cubierta 100% por nosotros — no por el fabricante. Esto es importante: compramos los equipos en tiendas fuera de Cuba que no aceptan devoluciones ni reclamos, por lo que somos nosotros quienes respondemos directamente ante cualquier problema.\n\nLa garantía según el sistema es:\n• PowerStations sueltas: se venden en el estado en que se encuentran, sin garantía adicional.\n• PowerStation integrada a un sistema solar: 1 mes de garantía cubierta por Convoltaje.\n• Sistemas de 1kW hasta 6kW (Básico 1500W, Medio 3000W, AC 3000W, Híbrido 5000W, Avanzado 6000W, 6K PLUS): 3 meses de garantía real que cubre equipos e instalación.\n• Sistemas de 10kW o más (Premium 10kW y superiores): 1 año de garantía real que cubre equipos e instalación.\n\nEn todos los casos: no cobramos anticipo. El pago se realiza únicamente cuando el sistema está instalado y funcionando al 100%.",
  },
  {
    id: "faq-7",
    category: "garantia",
    question: "¿Tengo que pagar algo antes de que instalen el sistema?",
    answer:
      "No. Convoltaje trabaja bajo un modelo único: no solicitamos ningún anticipo ni pago previo. El pago se realiza únicamente cuando la instalación está completamente terminada y el sistema funciona al 100%. Esto refleja nuestra confianza en la calidad del trabajo que entregamos.",
  },
  {
    id: "faq-8",
    category: "garantia",
    question: "¿Ofrecen financiamiento o planes de pago?",
    answer:
      "No trabajamos con planes de financiamiento. Nuestro modelo es simple: el cliente paga el valor total del sistema una sola vez, al finalizar la instalación y confirmar que todo funciona correctamente. Sin cuotas, sin intereses, sin pagos por adelantado.",
  },

  // Consumo
  {
    id: "faq-9",
    category: "consumo",
    question: "¿Puedo usar aire acondicionado con un sistema solar?",
    answer:
      "Sí, y es una de las preguntas más frecuentes que nos hacen. Con el sistema adecuado, usted puede dormir con el aire acondicionado encendido todas las noches sin preocuparse por el consumo. La clave está en dimensionar bien el sistema; por eso tenemos nuestra calculadora solar en esta misma página, para que sepa exactamente qué sistema necesita según su consumo real.",
  },
  {
    id: "faq-10",
    category: "consumo",
    question: "¿Cómo sé cuánta energía necesito?",
    answer:
      "Utilice nuestra Calculadora Solar Inteligente en esta página. En 4 pasos simples usted calcula su consumo diario real según su tipo de vivienda y los equipos que utiliza, y el sistema le recomienda automáticamente el kit más adecuado para sus necesidades.",
  },

  // General
  {
    id: "faq-11",
    category: "general",
    question: "¿Por qué elegir Convoltaje y no otro instalador?",
    answer:
      "Tres razones principales: primero, trabajamos con materiales certificados y adecuados — cable solar, no cable eléctrico común; estructuras rígidas, no improvisadas. Segundo, no cobramos hasta que el sistema esté funcionando; si usted no queda satisfecho, no paga. Tercero, nuestros técnicos e ingenieros explican cada detalle del proceso y le enseñan a usar su sistema correctamente. En Cuba hay muchos instaladores; pocos trabajan con estos estándares.",
  },
  {
    id: "faq-12",
    category: "general",
    question: "¿Qué pasa si hay un problema después de la instalación?",
    answer:
      "Usted cuenta con la garantía correspondiente a su sistema solar sobre los equipos y la instalación. Cualquier problema relacionado con el trabajo realizado lo resolvemos sin costo adicional. Además, nuestro equipo está disponible por WhatsApp para responder dudas y orientarle sobre el uso correcto del sistema.",
  },

  // Baterías
  {
    id: "faq-13",
    category: "baterias",
    question: "¿Qué tipo de baterías usan?",
    answer:
      "Trabajamos con baterías certificadas de tecnología LiFePO4 (litio ferrofosfato), que son las más seguras y durables del mercado para sistemas solares residenciales. Son baterías diseñadas específicamente para este uso, no adaptaciones de otras tecnologías.",
  },
  {
    id: "faq-14",
    category: "baterias",
    question: "¿Los equipos que instalan son originales?",
    answer:
      "Sí. Trabajamos con marcas reconocidas internacionalmente como MUST, EcoFlow, Bluetti y Anker, con equipos originales y documentación de fábrica. Usted puede verificar la autenticidad de cualquier equipo que instalemos.",
  }
];

export const FAQ_CATEGORIES = [
  { id: "instalacion", label: "Instalación", icon: "🔧" },
  { id: "baterias", label: "Baterías", icon: "🔋" },
  { id: "consumo", label: "Consumo Energético", icon: "⚡" },
  { id: "garantia", label: "Garantía", icon: "✅" },
  { id: "general", label: "General", icon: "❓" },
];
