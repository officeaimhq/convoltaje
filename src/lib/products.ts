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
  manuals?: { nombre: string; url: string }[];
}

export const CONVOLTAJE_PRODUCTS: Product[] = [
  {
    id: "conv-1",
    name: "Sistema 6K PLUS",
    description: "Ideal para Aire Acondicionado y el resto de la casa. Incluye 8 Paneles Solares, 6kw de Inversor MUST y 15KW de Batería Lifepop4 MUST",
    price: 6950,
    originalPrice: 7500,
    image: "/images/logoconvoltaje.jpg",
    category: "Sistemas Solares Completos",
    discount: 7,
    slug: "sistema-6k-plus",
    images: [
      "/images/logoconvoltaje.jpg",
      "/images/logoconvoltaje.jpg",
      "/images/logoconvoltaje.jpg"
    ],
    specs: [
      "8 Paneles Solares de alta eficiencia",
      "Inversor MUST 6kW",
      "Batería LiFePO4 MUST 15kWh",
      "Sistema 110V compatible con toda Cuba",
      "Ideal para aire acondicionado + electrodomésticos del hogar",
      "Instalación profesional incluida",
      "Garantía 3 meses — equipos e instalación"
    ],
    manuals: [{ nombre: "Manual Inversor MUST Axpert MAX II 6.5-8kW (ES)", url: "https://www.solarstore.cl/wp-content/uploads/2024/06/AXPERT-MAX-II-MANUAL.-espanol.pdf" }]
  },
  {
    id: "conv-2",
    name: "Sistema Básico - 1500W",
    description: "¡Tu primer paso para dejar los apagones! Sistema completamente 110v, ideal para quienes quieren comenzar a vivir con energía limpia. Permite mantener una nevera funcionando durante el día gracias a sus paneles solares, y por la noche dormirás tranquilo con ventiladores y luces alimentados por su batería. Perfecto para hogares pequeños que quieren tranquilidad básica durante los cortes eléctricos.",
    price: 1745,
    originalPrice: 1950,
    image: "/images/logoconvoltaje.jpg",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 11,
    slug: "sistema-basico-1500w",
    images: [
      "/images/logoconvoltaje.jpg",
      "/images/logoconvoltaje.jpg",
      "/images/logoconvoltaje.jpg"
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
      "Garantía 3 meses — equipos e instalación"
    ],
    supports: "Nevera, ventiladores, luces LED, carga de celulares",
    manuals: [{ nombre: "Manual Inversor MUST 3000W (ES)", url: "https://cdn.autosolar.es/pdf/manuales/Manual-Inversor-3000W-MPPT-50A-MUST.pdf" }]
  },
  {
    id: "conv-3",
    name: "Sistema Solar - Medio 3000W",
    description: "Más potencia, más comodidad. Pensado para hogares que necesitan algo más. Permite el funcionamiento de una nevera, aire acondicionado 110v durante el día, TV, microondas y ventiladores, con mejor autonomía nocturna. Un salto importante en estabilidad, ideal si necesitas cubrir electrodomésticos medianos sin complicaciones.",
    price: 2750,
    originalPrice: 3050,
    image: "/images/logoconvoltaje.jpg",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 10,
    slug: "sistema-solar-medio-3000w",
    images: [
      "/images/logoconvoltaje.jpg"
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
      "Garantía 3 meses — equipos e instalación"
    ],
    supports: "Aire acondicionado 110v, nevera, TV, microondas, ventiladores",
    manuals: [{ nombre: "Manual Inversor MUST Axpert MAX 3.6-7.2kW (ES)", url: "https://www.solarstore.cl/wp-content/uploads/2024/05/AXPERT-MAX-3.6-7.2-MANUAL-ESPANOL.pdf" }]
  },
  {
    id: "conv-4",
    name: "Sistema Solar Aire Acondicionado 3000W",
    description: "Ideal para hogares completos. Gracias a su inversor de fase dividida, ofrece corriente 110V y 220V simultáneos, cubriendo necesidades más avanzadas. Hasta 4 baterías y 4 paneles de 550W permiten alimentar aire acondicionado durante el día y varios equipos por la noche, incluyendo 2 neveras, luces, TV y ventiladores. Una solución poderosa sin llegar al nivel de negocio.",
    price: 3950,
    originalPrice: 4425,
    image: "/images/logoconvoltaje.jpg",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 11,
    slug: "sistema-solar-ac-3000w",
    images: [
      "/images/logoconvoltaje.jpg"
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
      "Garantía 3 meses — equipos e instalación"
    ],
    supports: "Aire acondicionado, 2 neveras, TV, microondas, ventiladores, laptops",
    manuals: [{ nombre: "Manual Inversor MUST Axpert MAX 3.6-7.2kW (ES)", url: "https://www.solarstore.cl/wp-content/uploads/2024/05/AXPERT-MAX-3.6-7.2-MANUAL-ESPANOL.pdf" }]
  },
  {
    id: "conv-5",
    name: "Sistema Avanzado 6000W",
    description: "Pensado para quienes no quieren límites. Diseñado para hogares grandes o pequeños negocios, da libertad total para usar hasta 8 neveras, múltiples aires acondicionados, luces y electrodomésticos sin interrupciones. Con su potencia y autonomía, puedes olvidarte por completo del horario de los apagones. La red eléctrica será solo un recuerdo.",
    price: 5950,
    originalPrice: 6850,
    image: "/images/logoconvoltaje.jpg",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 13,
    slug: "sistema-avanzado-6000w",
    images: [
      "/images/logoconvoltaje.jpg",
      "/images/logoconvoltaje.jpg"
    ],
    specs: [
      "Inversor Zonglón 6kW",
      "6 Paneles Solares",
      "Caja de protecciones solares incluida",
      "Sistema 110V/220V compatible con toda Cuba",
      "Apto para pequeños negocios",
      "Instalación profesional incluida",
      "Garantía 3 meses — equipos e instalación"
    ],
    supports: "2 aires acondicionados, 8 neveras, luces, TV, microondas, carga de equipos",
    manuals: [{ nombre: "Manual Inversor MUST Axpert MAX II 6.5-8kW (ES)", url: "https://www.solarstore.cl/wp-content/uploads/2024/06/AXPERT-MAX-II-MANUAL.-espanol.pdf" }]
  },
  {
    id: "conv-6",
    name: "Sistema Premium 10000W",
    description: "ConVoltaje: la solución definitiva. El tope de gama. 12 paneles solares, gran banco de baterías y un inversor MUST de 10kW lo convierten en una central energética para negocios, residencias grandes o propiedades autosuficientes. Ideal para quien quiere liberarse por completo de la red eléctrica y operar con total independencia, día y noche, aún en condiciones de alto consumo.",
    price: 9850,
    originalPrice: 11235,
    image: "/images/logoconvoltaje.jpg",
    category: "Sistemas Solares Completos",
    popular: true,
    discount: 12,
    slug: "sistema-premium-10000w",
    images: [
      "/images/logoconvoltaje.jpg",
      "/images/logoconvoltaje.jpg"
    ],
    specs: [
      "Inversor MUST 10kW",
      "12 Paneles Solares",
      "15kWh en baterías",
      "Sistema 110V/220V compatible con toda Cuba",
      "Ideal para negocios y residencias grandes",
      "Soporta cámaras, motores y equipos industriales",
      "Instalación profesional incluida",
      "Garantía 1 año — equipos e instalación"
    ],
    supports: "Casa completa + cámaras + motores + hasta 4 aires acondicionados + 10 neveras (de noche: 1 aire acondicionado)",
    manuals: [{ nombre: "Manual Inversor MUST Axpert MAX II 6.5-8kW (ES)", url: "https://www.solarstore.cl/wp-content/uploads/2024/06/AXPERT-MAX-II-MANUAL.-espanol.pdf" }]
  },
  {
    id: "conv-11",
    name: "Sistema Híbrido 5000W",
    description: "Solución híbrida versátil para integrar energía solar y la red eléctrica de forma eficiente.",
    price: 4950,
    image: "/images/logoconvoltaje.jpg",
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
    image: "/images/logoconvoltaje.jpg",
    category: "Sistemas Solares Completos",
    outOfStock: true,
    slug: "sistema-basico-plus",
    images: ["/images/logoconvoltaje.jpg"],
    specs: []
  },
  {
    id: "conv-7",
    name: "EcoFlow DELTA 2",
    description: "Capacidad: 1024 Wh. Potencia: 1800 W. Recarga rápida: 0-80% en 50 minutos.",
    price: 950,
    originalPrice: 1100,
    image: "https://nl.ecoflow.com/cdn/shop/files/ecoflow-delta-2-portable-power-station-52097645347159.png",
    category: "PowerStations",
    popular: true,
    discount: 14,
    slug: "ecoflow-delta-2",
    images: ["https://nl.ecoflow.com/cdn/shop/files/ecoflow-delta-2-portable-power-station-52097645347159.png"],
    manuals: [{ nombre: "Manual EcoFlow DELTA 2 (ES)", url: "https://manuals.ecoflow.com/eu/product/delta-2-portable-power-station?lang=es_ES" }]
  },
  {
    id: "conv-8",
    name: "EcoFlow DELTA 2 Max",
    description: "Capacidad: 2048 Wh. Potencia: 2400 W. Ideal para respaldo del hogar.",
    price: 1800,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFEAXAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQQFBwIDBgj/xABBEAABAwICBAoFCAsAAAAAAAABAAIDBBEFIQYSMUEHEzZRYXF0kbGyIjJyksEUFRYmNVNUoSMlMzREUlViY3PR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAQEBAAAAAAAAAAAAAAAAABEBMf/aAAwDAQACEQMRAD8AvFCEh2FBUGK6TY2/FqyH5ymZFHO9jGx2ZZocQNgusqesq5s5quokv/PK4/FQc4/WdV/ud4rbVOxAQtbh7bEjOTVuR1LUYdHAbVUgccjZwuVJsfFq5vj7wqulwmtneZJ5nSuO0ySZ/mk+Y5t7We+EWLLqns1SWuaeoqM15IqeMske0lt7tcQuG+Y59waOp4UhQRYxSkMhkdPCNsbzrNt0HaEE3LjeLUx/Q4lVttu40kdxVgcHuKVmK4LJNiE5mlZO5gcWgHVsDuHSVWNbfeCDvB3LveCj7JrD/n+CmmO4QhCjQSHYUqEFB1csUeK1bZJGNIneCHOtb0jzrZiNTHJh0UUU7HBz7vax4NxnttuuuO0i5VYt26bzlP6Mji2dR+C0kTVNQNmY1wfE2+4hR2kNXDghiY6I1Uj2l7mwt9Ruy56Cb9xS4VpDDh1bP8pcBEz1gRe4BvbaEwrtKKCtqHTGcxuuCXZgnLa0ZgnK1nEDvKJuwz+ltN/Tp+4KfwHEIqttNXQtMLXPsdYgWF7G/QuTr8TwuakLIIGRyW3MaAMucZqT0YdbR+Af3O8yiutxOqp3SvAqITnukCsDgnN8FqnDNpqMiNmwKiMazlf1q6eAjkZN22TwamkWMhCFFCEIQeVdIeVWLdum85TumNms9k+ITTSLlXi/bpvOVuhdZrfZ+IVxG2SgpJ3OdLTMeXesSNqG4Php/goe5F28e0mR17D0A7I5cyyaLF54yQ63O7Z1KjH5ow38FD7qcsjip4BFDG2ONuxrRYbVrc9rWelI4G/rG3/LJHPHFizr5bedBFYwbyOV1cBPIyXtsng1Ulipu9yu3gJ5Fy9tk8GoqxkIQoBCEIPKekh+teL9um85Wcbsm+z8QtWkp+teL9um85SMds9n4qoeNewkExguAsHXN1uhlhGtxrHuy9HVcBY9NwckwD0+oKGrr21DqSDjRBHryekBqjnzOZyOWaWdGJcwghzA4HcUkj7g2FhbZdN9dBfkepAyxI3cVePATyKk7bJ4NVFV5u5XpwEciX9tk8GoqxkIQoBCEIPJ+k2WleL9um85WnjA22tldtvzU3wg6O4lg2k2Iy1NBMaWoqJJoalrCWPa52t6w2EXsQc8lzUFVBJ6F2X5iQVUPg5bIqiWIPEUj2B7S14a4jWHMehM7Rfdxe6Etovu4vdCBzrrF0gbtOZyAWi0X3cXuhI58MLS4iJg57AINdYblXxwD3+hL7/AIyTwaqEiLq6XUpIJKh5Ng2Jhee4L0bwSYJW4FohHBiUHyeommfMYTtYDYAHpsL26UV2iEIUAhCEGLvVPUqy4QP2MnWhCCrxtWR2IQqE3FS2i32mxKhBemA/ubepSaEKAQhCD//Z",
    category: "PowerStations",
    popular: true,
    slug: "ecoflow-delta-2-max",
    images: ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFEAXAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQQFBwIDBgj/xABBEAABAwICBAoFCAsAAAAAAAABAAIDBBEFIQYSMUEHEzZRYXF0kbGyIjJyksEUFRYmNVNUoSMlMzREUlViY3PR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAQEBAAAAAAAAAAAAAAAAABEBMf/aAAwDAQACEQMRAD8AvFCEh2FBUGK6TY2/FqyH5ymZFHO9jGx2ZZocQNgusqesq5s5quokv/PK4/FQc4/WdV/ud4rbVOxAQtbh7bEjOTVuR1LUYdHAbVUgccjZwuVJsfFq5vj7wqulwmtneZJ5nSuO0ySZ/mk+Y5t7We+EWLLqns1SWuaeoqM15IqeMske0lt7tcQuG+Y59waOp4UhQRYxSkMhkdPCNsbzrNt0HaEE3LjeLUx/Q4lVttu40kdxVgcHuKVmK4LJNiE5mlZO5gcWgHVsDuHSVWNbfeCDvB3LveCj7JrD/n+CmmO4QhCjQSHYUqEFB1csUeK1bZJGNIneCHOtb0jzrZiNTHJh0UUU7HBz7vax4NxnttuuuO0i5VYt26bzlP6Mji2dR+C0kTVNQNmY1wfE2+4hR2kNXDghiY6I1Uj2l7mwt9Ruy56Cb9xS4VpDDh1bP8pcBEz1gRe4BvbaEwrtKKCtqHTGcxuuCXZgnLa0ZgnK1nEDvKJuwz+ltN/Tp+4KfwHEIqttNXQtMLXPsdYgWF7G/QuTr8TwuakLIIGRyW3MaAMucZqT0YdbR+Af3O8yiutxOqp3SvAqITnukCsDgnN8FqnDNpqMiNmwKiMazlf1q6eAjkZN22TwamkWMhCFFCEIQeVdIeVWLdum85TumNms9k+ITTSLlXi/bpvOVuhdZrfZ+IVxG2SgpJ3OdLTMeXesSNqG4Php/goe5F28e0mR17D0A7I5cyyaLF54yQ63O7Z1KjH5ow38FD7qcsjip4BFDG2ONuxrRYbVrc9rWelI4G/rG3/LJHPHFizr5bedBFYwbyOV1cBPIyXtsng1Ulipu9yu3gJ5Fy9tk8GoqxkIQoBCEIPKekh+teL9um85Wcbsm+z8QtWkp+teL9um85SMds9n4qoeNewkExguAsHXN1uhlhGtxrHuy9HVcBY9NwckwD0+oKGrr21DqSDjRBHryekBqjnzOZyOWaWdGJcwghzA4HcUkj7g2FhbZdN9dBfkepAyxI3cVePATyKk7bJ4NVFV5u5XpwEciX9tk8GoqxkIQoBCEIPJ+k2WleL9um85WnjA22tldtvzU3wg6O4lg2k2Iy1NBMaWoqJJoalrCWPa52t6w2EXsQc8lzUFVBJ6F2X5iQVUPg5bIqiWIPEUj2B7S14a4jWHMehM7Rfdxe6Etovu4vdCBzrrF0gbtOZyAWi0X3cXuhI58MLS4iJg57AINdYblXxwD3+hL7/AIyTwaqEiLq6XUpIJKh5Ng2Jhee4L0bwSYJW4FohHBiUHyeommfMYTtYDYAHpsL26UV2iEIUAhCEGLvVPUqy4QP2MnWhCCrxtWR2IQqE3FS2i32mxKhBemA/ubepSaEKAQhCD//Z"],
    manuals: [{ nombre: "Manual EcoFlow DELTA 2 Max (ES)", url: "https://ecoflow-service-us-prod.oss-us-west-1.aliyuncs.com/cms/manual/1704188312270/EcoFlow%20DELTA%202%20Max%20-%20Manual%20de%20usuario(es).pdf" }]
  },
  {
    id: "conv-9",
    name: "Bluetti AC200P",
    description: "Capacidad: 2000 Wh. Potencia: 2000 W. Pantalla táctil intuitiva.",
    price: 860,
    originalPrice: 950,
    image: "https://www.bluettipower.eu/cdn/shop/files/AC200PL-ZT1.png?v=1710490177&width=1200",
    category: "PowerStations",
    discount: 9,
    slug: "bluetti-ac200p",
    images: ["https://www.bluettipower.eu/cdn/shop/files/AC200PL-ZT1.png?v=1710490177&width=1200"],
    manuals: [{ nombre: "Manual Bluetti AC200P (ES)", url: "https://www.manualslib.es/manual/674258/Bluetti-Ac200P.html" }]
  },
  {
    id: "conv-10",
    name: "Anker Solix F2000",
    description: "Capacidad: 2048 Wh. Potencia: 2300 W. Recarga 0-80% en 1.4 horas.",
    price: 1100,
    image: "https://www.onlinecamerashop.nl//media/nextgenimages/media/catalog/product/cache/350c0dac84622638a906c7177340801e/2/0/20d8f5342c9a21c250d1547fb9db5abb74d6704de36c87931d5cc21f009a492c-c769c233.webp",
    category: "PowerStations",
    slug: "anker-solix-f2000",
    images: ["https://www.onlinecamerashop.nl//media/nextgenimages/media/catalog/product/cache/350c0dac84622638a906c7177340801e/2/0/20d8f5342c9a21c250d1547fb9db5abb74d6704de36c87931d5cc21f009a492c-c769c233.webp"],
    manuals: [{ nombre: "Manual Anker Solix F2000 (ES/EN)", url: "https://cdn.solarpowersupply.eu/files/A1780_EU_Manual_210x145mm_20230927-20231218.pdf" }]
  },
  {
    id: "conv-13",
    name: "EcoFlow RIVER 2",
    description: "Capacidad: 256 Wh. Potencia: 300 W (X-Boost 600 W). Ultra portátil y carga rápida en 1 hora.",
    price: 750,
    image: "https://eu.ecoflow.com/cdn/shop/products/ecoflow-river-2-portable-power-station-42462876860580.png",
    category: "PowerStations",
    popular: true,
    slug: "ecoflow-river-2",
    images: ["https://eu.ecoflow.com/cdn/shop/products/ecoflow-river-2-portable-power-station-42462876860580.png"],
    manuals: [{ nombre: "Manual EcoFlow RIVER 2 (ES)", url: "https://manuals.ecoflow.com/eu/product/river-2-portable-power-station?lang=es_ES" }]
  },
  {
    id: "conv-14",
    name: "Conectores MC4",
    description: "Para la mayoría de los paneles solares del mercado.",
    price: 3,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "conectores-mc4",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-15",
    name: "Pinza Crimpeadora para Conectores MC4",
    description: "Herramienta especializada para crimpar conectores solares.",
    price: 75,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "pinza-crimpeadora",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-16",
    name: "Disyuntor CC 125A",
    description: "Disyuntor bipolar de corriente continua.",
    price: 50,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "disyuntor-cc-125a",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-17",
    name: "Caja de Protecciones Solares",
    description: "Protección completa para el sistema solar.",
    price: 140,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "caja-de-protecciones-solares",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-18",
    name: "Inversor 1500W",
    description: "Inversor de voltaje para aplicaciones solares pequeñas.",
    price: 280,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "inversor-1500w",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-19",
    name: "Cable Solar",
    description: "Cable fotovoltaico por metro.",
    price: 5,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "cable-solar",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-20",
    name: "Inversor SUMARY 3000W",
    description: "Inversor Sumary de alta eficiencia.",
    price: 750,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "inversor-sumary-3000w",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-21",
    name: "Inversor MUST 3000W",
    description: "Inversor cargador MUST 3KW.",
    price: 680,
    image: "/images/logoconvoltaje.jpg",
    category: "Insumos",
    slug: "inversor-must-3000w",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "conv-22",
    name: "Masilla Epóxica para anclajes solares",
    description: "Para una fijación segura y resistente de las estructuras solares.",
    price: 55,
    image: "/images/logoconvoltaje.jpg",
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
    image: "/images/logoconvoltaje.jpg",
    category: "Ropa Personalizada",
    slug: "pulover-de-nino",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-2",
    name: "Mousepad",
    description: "Transforma tu espacio de trabajo con nuestros mousepads personalizables.",
    price: 600,
    image: "/images/logoconvoltaje.jpg",
    category: "Accesorios",
    popular: true,
    slug: "mousepad",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-3",
    name: "Billeteras Personalizadas para Papá",
    description: "Sorprende a papá con una billetera única. Personalízala con su foto favorita.",
    price: 2600,
    image: "/images/logoconvoltaje.jpg",
    category: "Regalos",
    popular: true,
    slug: "billetera-para-papa",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-4",
    name: "Bolsas de Regalo Variadas",
    description: "El toque perfecto para cualquier ocasión especial. Modelos con brillo, estampados elegantes y temáticos.",
    price: 500,
    image: "/images/logoconvoltaje.jpg",
    category: "Regalos",
    slug: "bolsas-de-regalo-variadas",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-5",
    name: "Ropa Interior Masculina",
    description: "Personaliza tus boxers con el diseño que más te guste. Tallas L y M disponibles.",
    price: 1900,
    image: "/images/logoconvoltaje.jpg",
    category: "Ropa Personalizada",
    slug: "ropa-interior-masculina",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-6",
    name: "Tazas Personalizadas",
    description: "Una taza sublimada de cerámica personalizada. Acabado de alta calidad y duradero.",
    price: 1800,
    image: "/images/logoconvoltaje.jpg",
    category: "Hogar",
    popular: true,
    slug: "tazas-personalizadas",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-7",
    name: "Pulóvers Personalizados",
    description: "Luce tu estilo único con nuestros púloveres blancos personalizables.",
    price: 1800,
    image: "/images/logoconvoltaje.jpg",
    category: "Ropa Personalizada",
    popular: true,
    slug: "pulovers-personalizados",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-8",
    name: "Llaveros de MDF",
    description: "Añade un toque personal a tus llaves con nuestros llaveros personalizables.",
    price: 400,
    image: "/images/logoconvoltaje.jpg",
    category: "Accesorios",
    slug: "llaveros-de-mdf",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-9",
    name: "Jarras Térmicas Personalizadas",
    description: "Mantén tus bebidas a la temperatura perfecta con nuestras jarras térmicas personalizables.",
    price: 3600,
    image: "/images/logoconvoltaje.jpg",
    category: "Hogar",
    slug: "jarras-termicas-personalizadas",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-10",
    name: "Cuadros de PVC",
    description: "Transforma tus espacios con nuestros cuadros de PVC personalizables.",
    price: 1800,
    image: "/images/logoconvoltaje.jpg",
    category: "Decoración",
    popular: true,
    slug: "cuadros-de-pvc",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-11",
    name: "Cojines Personalizados",
    description: "Añade un toque especial a tu hogar con nuestros cojines personalizables.",
    price: 1500,
    image: "/images/logoconvoltaje.jpg",
    category: "Hogar",
    slug: "cojines-personalizados",
    images: ["/images/logoconvoltaje.jpg"]
  },
  {
    id: "tinta-12",
    name: "Pomos Metálicos",
    description: "Descubre nuestros pomos metálicos de 750 ml. Diseña el tuyo con nombres, frases o imágenes.",
    price: 2600,
    image: "/images/logoconvoltaje.jpg",
    category: "Hogar",
    popular: true,
    slug: "pomos-metalicos",
    images: ["/images/logoconvoltaje.jpg"]
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
