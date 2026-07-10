// Solar Calculator Data Types & Configuration
// Based on Convoltaje's EcoPower Kit Catalog

export type HousingType = "apartamento" | "casa" | "negocio";
export type PurchaseType = "unitaria" | "mayorista";

export interface Appliance {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
  locked?: boolean; // For appliances like refrigerator that are always on
}

export interface CalculatorState {
  housingType: HousingType | null;
  appliances: Appliance[];
  sunHours: number;
}

export interface EcoPowerKit {
  id: string;
  name: string;
  inverterPower: number; // in kW
  batteryCapacity: number; // in kWh
  minDailyConsumption: number; // in kWh
  maxDailyConsumption: number; // in kWh
  description: string;
  price: number;
  features: string[];
}

// Base consumption by housing type (kWh/day)
export const HOUSING_BASE_CONSUMPTION: Record<HousingType, number> = {
  apartamento: 1.5,
  casa: 3.0,
  negocio: 5.0,
};

// Default appliances with their specifications
export const DEFAULT_APPLIANCES: Record<string, Omit<Appliance, "id">> = {
  tv: {
    name: "Televisor",
    watts: 150,
    quantity: 1,
    hoursPerDay: 6,
  },
  led: {
    name: "Bombilla LED",
    watts: 10,
    quantity: 5,
    hoursPerDay: 8,
  },
  fan: {
    name: "Ventilador",
    watts: 50,
    quantity: 1,
    hoursPerDay: 8,
  },
  fridge: {
    name: "Refrigerador",
    watts: 200,
    quantity: 1,
    hoursPerDay: 24,
    locked: true,
  },
  laptop: {
    name: "Laptop",
    watts: 65,
    quantity: 1,
    hoursPerDay: 4,
  },
  phone: {
    name: "Smartphone",
    watts: 5,
    quantity: 2,
    hoursPerDay: 3,
  },
  router: {
    name: "Router WiFi",
    watts: 15,
    quantity: 1,
    hoursPerDay: 24,
  },
  ac: {
    name: "Aire Acondicionado",
    watts: 1500,
    quantity: 1,
    hoursPerDay: 8,
  },
  washer: {
    name: "Lavadora",
    watts: 500,
    quantity: 1,
    hoursPerDay: 2,
  },
  oven: {
    name: "Horno Eléctrico",
    watts: 2000,
    quantity: 1,
    hoursPerDay: 1,
  },
  moto: {
    name: "Carga de Moto Eléctrica 🛵",
    watts: 600,
    quantity: 1,
    hoursPerDay: 5,
  },
  bomba: {
    name: "Bomba de Agua 💧",
    watts: 500,
    quantity: 1,
    hoursPerDay: 1,
  },
};

// EcoPower Kit Catalog (aligned with Convoltaje inventory)
export const ECOPOWER_KITS: EcoPowerKit[] = [
  {
    id: "explorer-500",
    name: "Sistema Básico - 1500W",
    inverterPower: 0.5,
    batteryCapacity: 1.0,
    minDailyConsumption: 0.5,
    maxDailyConsumption: 2.0,
    description: "Ideal para dispositivos esenciales y emergencias",
    price: 1745,
    features: [
      "500W Inversor",
      "1kWh Batería",
      "Perfecto para apartamentos pequeños",
      "Instalación rápida",
    ],
  },
  {
    id: "home-3600",
    name: "Sistema Solar - Medio 3000W",
    inverterPower: 3.6,
    batteryCapacity: 5.1,
    minDailyConsumption: 2.0,
    maxDailyConsumption: 5.0,
    description: "Para hogares con consumo moderado",
    price: 2750,
    features: [
      "3.6kW Inversor",
      "5.1kWh Batería",
      "Ideal para casas medianas",
      "Expandible",
    ],
  },
  {
    id: "flex-7200",
    name: "Sistema Solar Aire Acondicionado 3000W",
    inverterPower: 7.2,
    batteryCapacity: 10.2,
    minDailyConsumption: 5.0,
    maxDailyConsumption: 8.0,
    description: "Sistema modular y expandible",
    price: 3950,
    features: [
      "7.2kW Inversor",
      "10.2kWh Batería",
      "Modular/Expandible",
      "Soporta aire acondicionado",
    ],
  },
  {
    id: "flex-7200-pro",
    name: "Sistema Avanzado 6000W",
    inverterPower: 7.2,
    batteryCapacity: 15.4,
    minDailyConsumption: 8.0,
    maxDailyConsumption: 12.0,
    description: "Alto rendimiento con gran autonomía",
    price: 5950,
    features: [
      "7.2kW Inversor",
      "15.4kWh Batería",
      "Mayor autonomía",
      "Ideal para casas grandes",
    ],
  },
  {
    id: "home-7200",
    name: "Sistema 6K PLUS",
    inverterPower: 7.2,
    batteryCapacity: 16.1,
    minDailyConsumption: 10.0,
    maxDailyConsumption: 15.0,
    description: "Máxima autonomía y rendimiento",
    price: 6950,
    features: [
      "7.2kW Inversor",
      "16.1kWh Batería",
      "Alta autonomía",
      "8 Paneles solares incluidos",
    ],
  },
  {
    id: "titan-12000",
    name: "Sistema Premium 10000W",
    inverterPower: 12.0,
    batteryCapacity: 15.4,
    minDailyConsumption: 15.0,
    maxDailyConsumption: 25.0,
    description: "Solución comercial de alto rendimiento",
    price: 9850,
    features: [
      "12kW Inversor",
      "15.4kWh Batería",
      "12 Paneles solares",
      "Para comercios y grandes casas",
    ],
  },
];

// Calculator formulas
export const CALCULATOR_CONSTANTS = {
  SAFETY_FACTOR: 1.3, // 30% safety margin
  AVERAGE_SUN_HOURS: 6, // Cuba average
  REGIONAL_SUN_HOURS: {
    occidente: 5,
    centro: 5.5,
    oriente: 6.5,
  },
};

// Calculate daily consumption in kWh
export function calculateDailyConsumption(
  housingType: HousingType,
  appliances: Appliance[]
): number {
  const baseConsumption = HOUSING_BASE_CONSUMPTION[housingType];
  const applianceConsumption = appliances.reduce((total, app) => {
    return total + (app.watts * app.quantity * app.hoursPerDay) / 1000;
  }, 0);
  return baseConsumption + applianceConsumption;
}

// Calculate required solar array power in kW
export function calculateRequiredPower(
  dailyConsumption: number,
  sunHours: number
): number {
  return (
    (dailyConsumption * CALCULATOR_CONSTANTS.SAFETY_FACTOR) / sunHours
  );
}

// Find best matching kit
export function findBestKit(dailyConsumption: number): EcoPowerKit | null {
  // Add safety margin to consumption for kit matching
  const adjustedConsumption = dailyConsumption * CALCULATOR_CONSTANTS.SAFETY_FACTOR;

  // Find kits that can handle this consumption
  const suitableKits = ECOPOWER_KITS.filter(
    (kit) =>
      adjustedConsumption >= kit.minDailyConsumption &&
      adjustedConsumption <= kit.maxDailyConsumption
  );

  // If no exact match, find the smallest kit that exceeds the requirement
  if (suitableKits.length === 0) {
    const largerKits = ECOPOWER_KITS.filter(
      (kit) => kit.maxDailyConsumption >= adjustedConsumption
    );
    return largerKits.length > 0 ? largerKits[0] : ECOPOWER_KITS[ECOPOWER_KITS.length - 1];
  }

  // Return the smallest suitable kit
  return suitableKits.reduce((smallest, current) =>
    current.maxDailyConsumption < smallest.maxDailyConsumption
      ? current
      : smallest
  );
}

// Calculate monthly consumption
export function calculateMonthlyConsumption(dailyConsumption: number): number {
  return dailyConsumption * 30;
}

// Find complementary products based on kit and consumption
export function findComplementaryProducts(
  kit: EcoPowerKit,
  dailyConsumption: number
): string[] {
  const recommendations: string[] = [];

  // Recommend additional battery if high consumption
  if (dailyConsumption > 10) {
    recommendations.push("Batería adicional para mayor autonomía");
  }

  // Recommend PowerStation for portable power
  if (dailyConsumption > 5) {
    recommendations.push("PowerStation portátil para emergencias");
  }

  // Recommend monitoring system
  recommendations.push("Sistema de monitoreo en tiempo real");

  // Recommend installation service
  recommendations.push("Servicio de instalación profesional");

  return recommendations;
}
