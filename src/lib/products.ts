// Product data for Convoltaje and Tintaflash

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  popular?: boolean;
  discount?: number;
  outOfStock?: boolean;
  slug: string;
  images: string[];
  specs?: string[];
  supports?: string;
}

export const CONVOLTAJE_PRODUCTS: Product[] = [
  {
    id: "conv-1",
    name: "Sistema 6K PLUS",
    description: "Ideal para Aire Acondicionado y el resto de la casa. Incluye 8 Paneles Solares, 6kw de Inversor MUST y 15KW de Batería Lifepop4 MUST",
    price: 6950,
    originalPrice: 7500,
    image: "https://img2.elyerromenu.com/images/convoltaje/sistema-6k-plus/img-s.webp",
    category: "Sistemas Solares Completos",
    discount: 7,
    slug: "sistema-6k-plus",
    images: [
      "https://img2.elyerromenu.com/images/convoltaje/sistema-6k-plus/img.webp",
      "https://img2.elyerromenu.com/images/convoltaje/sistema-6k-plus-9lmy/img.webp",
      "https://img2.elyerromenu.com/images/convoltaje/sistema-6k-plus-8e2a/img.webp"
    ],
    specs: [
      "8 Paneles Solares de alta eficiencia",
      "Inversor MUST 6kW",
      "Batería LiFePO4 MUST 15kWh",
      "Sistema 110V compatible con toda Cuba",
      "Ideal para aire acondicionado + electrodomésticos del hogar",
      "Instalación profesional incluida",
      "Garantía de instalación 90 días"
    ]
  },
  {
    id: "conv-2",
    name: "Sistema Básico - 1500W",
    description: "¡Tu primer paso para dejar los apagones! Sistema completamente 110v, ideal para quienes quieren comenzar a vivir con energía limpia. Permite mantener una nevera funcionando durante el día gracias a sus paneles solares, y por la noche dormirás tranquilo con ventiladores y luces alimentados por su batería. Perfecto para hogares pequeños que quieren tranquilidad básica durante los cortes eléctricos.",
    price: 1745,
    originalPrice: 1950,
    image: "https://img2.elyerromenu.com/images/convoltaje/sistema-basico-plus-u-18e/img.webp",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 11,
    slug: "sistema-basico-1500w",
    images: [
      "https://img2.elyerromenu.com/images/convoltaje/sistema-basico-plus-u-18e/img.webp",
      "https://img2.elyerromenu.com/images/convoltaje/paneles-basicos-1200w-z3bk/img.webp",
      "https://img2.elyerromenu.com/images/convoltaje/paneles-basicos-1200w-3ywo/img.webp"
    ],
    specs: [
      "Inversor Onda Sinusoidal 1500W",
      "Controlador Solar MPPT 45Amp Automático",
      "Panel Solar 610Wp Monocristalino",
      "Bases soporte para paneles regulables",
      "Pizarra eléctrica de protecciones 20A",
      "Batería LiFePO4 SMART 12V 100Ah 4000 ciclos",
      "Cable solar 4mm² 12AWG (10 metros)",
      "Interruptor doble tiro 64Amp",
      "Conectores MC4 (2 pares)",
      "Breakers 2P CC125 Amp + Caja porta breakers",
      "Tuberías y canaletas de PVC incluidas",
      "Sistema 110V compatible con toda Cuba",
      "Instalación profesional incluida",
      "Garantía de instalación 90 días"
    ],
    supports: "Nevera, ventiladores, luces LED, carga de celulares"
  },
  {
    id: "conv-3",
    name: "Sistema Solar - Medio 3000W",
    description: "Más potencia, más comodidad. Pensado para hogares que necesitan algo más. Permite el funcionamiento de una nevera, aire acondicionado 110v durante el día, TV, microondas y ventiladores, con mejor autonomía nocturna. Un salto importante en estabilidad, ideal si necesitas cubrir electrodomésticos medianos sin complicaciones.",
    price: 2750,
    originalPrice: 3050,
    image: "https://img2.elyerromenu.com/images/convoltaje/sistema-basico-plus-u-18e/img.webp",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 10,
    slug: "sistema-solar-medio-3000w",
    images: [
      "https://img2.elyerromenu.com/images/convoltaje/sistema-basico-plus-u-18e/img.webp"
    ],
    specs: [
      "1 Inversor solar 3000W",
      "2 Paneles Solares Bifaciales",
      "3 Purles Galvanizados 3M",
      "2 Protecciones CC 125A y 32A",
      "1 Batería LiFePO4 2.4kWh",
      "30 metros Cable Solar",
      "7 Terminales de Batería",
      "2 pares Conectores MC4",
      "16 Expansiones mecánicas M8",
      "50 Expansiones rapitá M6",
      "1 Cuchilla doble tiro 32A 2 polos",
      "20 metros Cable Eléctrico 10AWG",
      "5 metros Tubería PVC ¾ negra",
      "1 Caja estanca para breakers 6WAY",
      "1 Canaleta ancha",
      "2 Breakers AC 63A y Disco Corte",
      "30 Bridas",
      "Instalación profesional incluida",
      "Garantía de instalación 90 días"
    ],
    supports: "Aire acondicionado 110v, nevera, TV, microondas, ventiladores"
  },
  {
    id: "conv-4",
    name: "Sistema Solar Aire Acondicionado 3000W",
    description: "Ideal para hogares completos. Gracias a su inversor de fase dividida, ofrece corriente 110V y 220V simultáneos, cubriendo necesidades más avanzadas. Hasta 4 baterías y 4 paneles de 550W permiten alimentar aire acondicionado durante el día y varios equipos por la noche, incluyendo 2 neveras, luces, TV y ventiladores. Una solución poderosa sin llegar al nivel de negocio.",
    price: 3950,
    originalPrice: 4425,
    image: "https://img2.elyerromenu.com/images/convoltaje/sistema-solar-aire-acondicionado/img.webp",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 11,
    slug: "sistema-solar-ac-3000w",
    images: [
      "https://img2.elyerromenu.com/images/convoltaje/sistema-solar-aire-acondicionado/img.webp",
      "https://img2.elyerromenu.com/images/convoltaje/sistema-solar-aire-acondicionado-gg1/img.webp"
    ],
    specs: [
      "1 Inversor solar 3000W 220V",
      "3 metros Cable de Batería",
      "4 Paneles Solares Bifaciales",
      "5 Purles Galvanizados 3M",
      "1 Protecciones CC 125A y 32A",
      "1 Batería LiFePO4 5kWh",
      "30 metros Cable Solar",
      "5 Terminales de Batería",
      "2 pares Conectores MC4",
      "22 Expansiones mecánicas M8",
      "50 Expansiones rapitá M6",
      "1 Cuchilla doble tiro 32A 2 polos",
      "20 metros Cable Eléctrico 10AWG",
      "5 metros Tubería PVC ¾ negra",
      "1 Caja estanca para breakers 6WAY",
      "2 Canaletas anchas",
      "2 Breakers AC 63A y Disco Corte",
      "30 Bridas",
      "Instalación profesional incluida",
      "Garantía de instalación 90 días"
    ],
    supports: "Aire acondicionado, 2 neveras, TV, microondas, ventiladores, laptops"
  },
  {
    id: "conv-5",
    name: "Sistema Avanzado 6000W",
    description: "Pensado para quienes no quieren límites. Diseñado para hogares grandes o pequeños negocios, da libertad total para usar hasta 8 neveras, múltiples aires acondicionados, luces y electrodomésticos sin interrupciones. Con su potencia y autonomía, puedes olvidarte por completo del horario de los apagones. La red eléctrica será solo un recuerdo.",
    price: 5950,
    originalPrice: 6850,
    image: "https://img2.elyerromenu.com/images/convoltaje/sistema-avanzado-5000w/img.webp",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 13,
    slug: "sistema-avanzado-6000w",
    images: [
      "https://img2.elyerromenu.com/images/convoltaje/sistema-avanzado-5000w/img.webp",
      "https://img2.elyerromenu.com/images/convoltaje/sistema-avanzado-5000w-ofo/img.webp"
    ],
    specs: [
      "Inversor Zonglón 6kW",
      "6 Paneles Solares",
      "Caja de protecciones solares incluida",
      "Sistema 110V/220V compatible con toda Cuba",
      "Apto para pequeños negocios",
      "Instalación profesional incluida",
      "Garantía de instalación 90 días"
    ],
    supports: "2 aires acondicionados, 8 neveras, luces, TV, microondas, carga de equipos"
  },
  {
    id: "conv-6",
    name: "Sistema Premium 10000W",
    description: "ConVoltaje: la solución definitiva. El tope de gama. 12 paneles solares, gran banco de baterías y un inversor MUST de 10kW lo convierten en una central energética para negocios, residencias grandes o propiedades autosuficientes. Ideal para quien quiere liberarse por completo de la red eléctrica y operar con total independencia, día y noche, aún en condiciones de alto consumo.",
    price: 9850,
    originalPrice: 11235,
    image: "https://img2.elyerromenu.com/images/convoltaje/sistema-premium-10000w/img.webp",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 12,
    slug: "sistema-premium-10000w",
    images: [
      "https://img2.elyerromenu.com/images/convoltaje/sistema-premium-10000w/img.webp",
      "https://img2.elyerromenu.com/images/convoltaje/sistema-premium-10000w-0m6k/img.webp"
    ],
    specs: [
      "Inversor MUST 10kW",
      "12 Paneles Solares",
      "15kWh en baterías",
      "Sistema 110V/220V compatible con toda Cuba",
      "Ideal para negocios y residencias grandes",
      "Soporta cámaras, motores y equipos industriales",
      "Instalación profesional incluida",
      "Garantía de instalación 90 días"
    ],
    supports: "Casa completa + cámaras + motores + hasta 4 aires acondicionados + 10 neveras (de noche: 1 aire acondicionado)"
  },
  {
    id: "conv-11",
    name: "Sistema Híbrido 5000W",
    description: "Solución híbrida versátil para integrar energía solar y la red eléctrica de forma eficiente.",
    price: 4950,
    image: "",
    category: "Sistemas Solares Completos",
    popular: true,
    slug: "sistema-hibrido-5000w",
    images: []
  },
  {
    id: "conv-12",
    name: "Sistema Básico Plus",
    description: "Este sistema está temporalmente agotado. Contáctanos por WhatsApp para consultar disponibilidad o explorar alternativas similares.",
    price: 2250,
    image: "https://img2.elyerromenu.com/images/convoltaje/sistema-basico-plus-u-18e/img.webp",
    category: "Sistemas Solares Completos",
    outOfStock: true,
    slug: "sistema-basico-plus",
    images: ["https://img2.elyerromenu.com/images/convoltaje/sistema-basico-plus-u-18e/img.webp"],
    specs: []
  },
  {
    id: "conv-7",
    name: "EcoFlow DELTA 2",
    description: "Capacidad: 1024 Wh. Potencia: 1800 W. Recarga rápida: 0-80% en 50 minutos.",
    price: 950,
    originalPrice: 1100,
    image: "https://img2.elyerromenu.com/images/convoltaje/ecoflow-delta-2-estacion-de-energia-portatil-inteligente/img-s.webp",
    category: "PowerStations",
    popular: true,
    discount: 14,
    slug: "ecoflow-delta-2",
    images: ["https://img2.elyerromenu.com/images/convoltaje/ecoflow-delta-2-estacion-de-energia-portatil-inteligente/img-s.webp"]
  },
  {
    id: "conv-8",
    name: "EcoFlow DELTA 2 Max",
    description: "Capacidad: 2048 Wh. Potencia: 2400 W. Ideal para respaldo del hogar.",
    price: 1800,
    image: "https://img2.elyerromenu.com/images/convoltaje/ecoflow-delta-2-max-estacion-de-energia-de-alta-capacidad/img-s.webp",
    category: "PowerStations",
    popular: true,
    slug: "ecoflow-delta-2-max",
    images: ["https://img2.elyerromenu.com/images/convoltaje/ecoflow-delta-2-max-estacion-de-energia-de-alta-capacidad/img-s.webp"]
  },
  {
    id: "conv-9",
    name: "Bluetti AC200P",
    description: "Capacidad: 2000 Wh. Potencia: 2000 W. Pantalla táctil intuitiva.",
    price: 860,
    originalPrice: 950,
    image: "https://img2.elyerromenu.com/images/convoltaje/bluetti-ac200p/img-s.webp",
    category: "PowerStations",
    discount: 9,
    slug: "bluetti-ac200p",
    images: ["https://img2.elyerromenu.com/images/convoltaje/bluetti-ac200p/img-s.webp"]
  },
  {
    id: "conv-10",
    name: "Anker Solix F2000",
    description: "Capacidad: 2048 Wh. Potencia: 2300 W. Recarga 0-80% en 1.4 horas.",
    price: 1100,
    image: "https://img2.elyerromenu.com/images/convoltaje/anker-solix-f2000/img-s.webp",
    category: "PowerStations",
    slug: "anker-solix-f2000",
    images: ["https://img2.elyerromenu.com/images/convoltaje/anker-solix-f2000/img-s.webp"]
  },
  {
    id: "conv-13",
    name: "EcoFlow RIVER 2",
    description: "Capacidad: 256 Wh. Potencia: 300 W (X-Boost 600 W). Ultra portátil y carga rápida en 1 hora.",
    price: 750,
    image: "https://img2.elyerromenu.com/images/convoltaje/ecoflow-river-2-p/img.webp",
    category: "PowerStations",
    popular: true,
    slug: "ecoflow-river-2",
    images: ["https://img2.elyerromenu.com/images/convoltaje/ecoflow-river-2-p/img.webp"]
  },
  {
    id: "conv-14",
    name: "Conectores MC4",
    description: "Para la mayoría de los paneles solares del mercado.",
    price: 3,
    image: "https://img2.elyerromenu.com/images/convoltaje/conectores-mc4-d/img.webp",
    category: "Insumos",
    slug: "conectores-mc4",
    images: ["https://img2.elyerromenu.com/images/convoltaje/conectores-mc4-d/img.webp"]
  },
  {
    id: "conv-15",
    name: "Pinza Crimpeadora para Conectores MC4",
    description: "Herramienta especializada para crimpar conectores solares.",
    price: 75,
    image: "https://img2.elyerromenu.com/images/convoltaje/pinza-crimpeadora-para-conectores-mc4-n/img.webp",
    category: "Insumos",
    slug: "pinza-crimpeadora",
    images: ["https://img2.elyerromenu.com/images/convoltaje/pinza-crimpeadora-para-conectores-mc4-n/img.webp"]
  },
  {
    id: "conv-16",
    name: "Disyuntor CC 125A",
    description: "Disyuntor bipolar de corriente continua.",
    price: 50,
    image: "https://img2.elyerromenu.com/images/convoltaje/disyuntor-cc-125a-s/img.webp",
    category: "Insumos",
    slug: "disyuntor-cc-125a",
    images: ["https://img2.elyerromenu.com/images/convoltaje/disyuntor-cc-125a-s/img.webp"]
  },
  {
    id: "conv-17",
    name: "Caja de Protecciones Solares",
    description: "Protección completa para el sistema solar.",
    price: 140,
    image: "https://img2.elyerromenu.com/images/convoltaje/caja-de-protecciones-solares-mo4/img.webp",
    category: "Insumos",
    slug: "caja-de-protecciones-solares",
    images: ["https://img2.elyerromenu.com/images/convoltaje/caja-de-protecciones-solares-mo4/img.webp"]
  },
  {
    id: "conv-18",
    name: "Inversor 1500W",
    description: "Inversor de voltaje para aplicaciones solares pequeñas.",
    price: 280,
    image: "https://img2.elyerromenu.com/images/convoltaje/inversor-1500w-x/img.webp",
    category: "Insumos",
    slug: "inversor-1500w",
    images: ["https://img2.elyerromenu.com/images/convoltaje/inversor-1500w-x/img.webp"]
  },
  {
    id: "conv-19",
    name: "Cable Solar",
    description: "Cable fotovoltaico por metro.",
    price: 5,
    image: "https://img2.elyerromenu.com/images/convoltaje/cable-solar-s/img.webp",
    category: "Insumos",
    slug: "cable-solar",
    images: ["https://img2.elyerromenu.com/images/convoltaje/cable-solar-s/img.webp"]
  },
  {
    id: "conv-20",
    name: "Inversor SUMARY 3000W",
    description: "Inversor Sumary de alta eficiencia.",
    price: 750,
    image: "https://img2.elyerromenu.com/images/convoltaje/inversor-sumary-3000w-p/img.webp",
    category: "Insumos",
    slug: "inversor-sumary-3000w",
    images: ["https://img2.elyerromenu.com/images/convoltaje/inversor-sumary-3000w-p/img.webp"]
  },
  {
    id: "conv-21",
    name: "Inversor MUST 3000W",
    description: "Inversor cargador MUST 3KW.",
    price: 680,
    image: "https://img2.elyerromenu.com/images/convoltaje/inversor-must-3kw/img-s.webp",
    category: "Insumos",
    slug: "inversor-must-3000w",
    images: ["https://img2.elyerromenu.com/images/convoltaje/inversor-must-3kw/img-s.webp"]
  },
  {
    id: "conv-22",
    name: "Masilla Epóxica para anclajes solares",
    description: "Para una fijación segura y resistente de las estructuras solares.",
    price: 55,
    image: "",
    category: "Insumos",
    slug: "masilla-epoxica",
    images: []
  },
];

export const TINTAFLASH_PRODUCTS: Product[] = [
  {
    id: "tinta-1",
    name: "Púlover de Niño",
    description: "Haz que los pequeños brillen con nuestros púloveres personalizables. Diseña el tuyo con colores, nombres o divertidos gráficos.",
    price: 1800,
    image: "https://img1.elyerromenu.com/images/tintaflash/pulover-de-nino-x/img-s.webp",
    category: "Ropa Personalizada",
    slug: "pulover-de-nino",
    images: ["https://img1.elyerromenu.com/images/tintaflash/pulover-de-nino-x/img-s.webp"]
  },
  {
    id: "tinta-2",
    name: "Mousepad",
    description: "Transforma tu espacio de trabajo con nuestros mousepads personalizables.",
    price: 600,
    image: "https://img1.elyerromenu.com/images/tintaflash/mousepad-k/img-s.webp",
    category: "Accesorios",
    popular: true,
    slug: "mousepad",
    images: ["https://img1.elyerromenu.com/images/tintaflash/mousepad-k/img-s.webp"]
  },
  {
    id: "tinta-3",
    name: "Billeteras Personalizadas para Papá",
    description: "Sorprende a papá con una billetera única. Personalízala con su foto favorita.",
    price: 2600,
    image: "https://img1.elyerromenu.com/images/tintaflash/billeteras-personalizadas-para-papa-c/img-m.webp",
    category: "Regalos",
    popular: true,
    slug: "billetera-para-papa",
    images: ["https://img1.elyerromenu.com/images/tintaflash/billeteras-personalizadas-para-papa-c/img-m.webp"]
  },
  {
    id: "tinta-4",
    name: "Bolsas de Regalo Variadas",
    description: "El toque perfecto para cualquier ocasión especial. Modelos con brillo, estampados elegantes y temáticos.",
    price: 500,
    image: "https://img1.elyerromenu.com/images/tintaflash/bolsas-de-regalo-variadas/img-s.webp",
    category: "Regalos",
    slug: "bolsas-de-regalo-variadas",
    images: ["https://img1.elyerromenu.com/images/tintaflash/bolsas-de-regalo-variadas/img-s.webp"]
  },
  {
    id: "tinta-5",
    name: "Ropa Interior Masculina",
    description: "Personaliza tus boxers con el diseño que más te guste. Tallas L y M disponibles.",
    price: 1900,
    image: "https://img1.elyerromenu.com/images/tintaflash/ropa-interior-masculina-8/img-m.webp",
    category: "Ropa Personalizada",
    slug: "ropa-interior-masculina",
    images: ["https://img1.elyerromenu.com/images/tintaflash/ropa-interior-masculina-8/img-m.webp"]
  },
  {
    id: "tinta-6",
    name: "Tazas Personalizadas",
    description: "Una taza sublimada de cerámica personalizada. Acabado de alta calidad y duradero.",
    price: 1800,
    image: "https://img1.elyerromenu.com/images/tintaflash/tazas-personalizadas-3/img-m.webp",
    category: "Hogar",
    popular: true,
    slug: "tazas-personalizadas",
    images: ["https://img1.elyerromenu.com/images/tintaflash/tazas-personalizadas-3/img-m.webp"]
  },
  {
    id: "tinta-7",
    name: "Pulóvers Personalizados",
    description: "Luce tu estilo único con nuestros púloveres blancos personalizables.",
    price: 1800,
    image: "https://img1.elyerromenu.com/images/tintaflash/pulovers-personalizados-6/img-m.webp",
    category: "Ropa Personalizada",
    popular: true,
    slug: "pulovers-personalizados",
    images: ["https://img1.elyerromenu.com/images/tintaflash/pulovers-personalizados-6/img-m.webp"]
  },
  {
    id: "tinta-8",
    name: "Llaveros de MDF",
    description: "Añade un toque personal a tus llaves con nuestros llaveros personalizables.",
    price: 400,
    image: "https://img1.elyerromenu.com/images/tintaflash/llaveros-de-mdf/img-s.webp",
    category: "Accesorios",
    slug: "llaveros-de-mdf",
    images: ["https://img1.elyerromenu.com/images/tintaflash/llaveros-de-mdf/img-s.webp"]
  },
  {
    id: "tinta-9",
    name: "Jarras Térmicas Personalizadas",
    description: "Mantén tus bebidas a la temperatura perfecta con nuestras jarras térmicas personalizables.",
    price: 3600,
    image: "https://img1.elyerromenu.com/images/tintaflash/jarras-termicas-personalizadas-j/img-s.webp",
    category: "Hogar",
    slug: "jarras-termicas-personalizadas",
    images: ["https://img1.elyerromenu.com/images/tintaflash/jarras-termicas-personalizadas-j/img-s.webp"]
  },
  {
    id: "tinta-10",
    name: "Cuadros de PVC",
    description: "Transforma tus espacios con nuestros cuadros de PVC personalizables.",
    price: 1800,
    image: "https://img1.elyerromenu.com/images/tintaflash/cuadros-de-pvc/img-m.webp",
    category: "Decoración",
    popular: true,
    slug: "cuadros-de-pvc",
    images: ["https://img1.elyerromenu.com/images/tintaflash/cuadros-de-pvc/img-m.webp"]
  },
  {
    id: "tinta-11",
    name: "Cojines Personalizados",
    description: "Añade un toque especial a tu hogar con nuestros cojines personalizables.",
    price: 1500,
    image: "https://img1.elyerromenu.com/images/tintaflash/cojines-personalizados-5/img-s.webp",
    category: "Hogar",
    slug: "cojines-personalizados",
    images: ["https://img1.elyerromenu.com/images/tintaflash/cojines-personalizados-5/img-s.webp"]
  },
  {
    id: "tinta-12",
    name: "Pomos Metálicos",
    description: "Descubre nuestros pomos metálicos de 750 ml. Diseña el tuyo con nombres, frases o imágenes.",
    price: 2600,
    image: "https://img1.elyerromenu.com/images/tintaflash/pomos-metalicos-9/img-s.webp",
    category: "Hogar",
    popular: true,
    slug: "pomos-metalicos",
    images: ["https://img1.elyerromenu.com/images/tintaflash/pomos-metalicos-9/img-s.webp"]
  },
];

export const WHATSAPP_NUMBERS = {
  convoltaje: "5355144097",
  tintaflash: "5355144097",
};

export const CONTACT_INFO = {
  email: "convoltaje@gmail.com",
  instagram: "https://www.instagram.com/convoltajecuba",
  facebook: "https://www.facebook.com/convoltajecuba",
  youtube: "https://www.youtube.com/@convoltajecuba",
  tiktok: "https://www.tiktok.com/@convoltaje",
};
