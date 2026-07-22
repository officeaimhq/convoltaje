export type CubaRegion = 'occidental' | 'centro' | 'oriente';

export interface Municipio {
  nombre: string;
}

export interface Provincia {
  nombre: string;
  capital: string;
  municipios: Municipio[];
}

export interface RegionData {
  id: CubaRegion;
  nombre: string;
  sunHours: number;
  color: string; // hex color for the map
  provincias: Provincia[];
}

export const CUBA_REGIONS: RegionData[] = [
  {
    id: 'occidental',
    nombre: 'Occidental',
    sunHours: 5,
    color: '#22c55e',
    provincias: [
      {
        nombre: 'Pinar del Río',
        capital: 'Pinar del Río',
        municipios: [
          { nombre: 'Consolación del Sur' }, { nombre: 'Guane' }, { nombre: 'La Palma' },
          { nombre: 'Los Palacios' }, { nombre: 'Mantua' }, { nombre: 'Minas de Matahambre' },
          { nombre: 'Pinar del Río' }, { nombre: 'San Juan y Martínez' }, { nombre: 'San Luis' },
          { nombre: 'Sandino' }, { nombre: 'Viñales' },
        ]
      },
      {
        nombre: 'Artemisa',
        capital: 'Artemisa',
        municipios: [
          { nombre: 'Alquízar' }, { nombre: 'Artemisa' }, { nombre: 'Bauta' }, { nombre: 'Caimito' },
          { nombre: 'Guanajay' }, { nombre: 'Güira de Melena' }, { nombre: 'Mariel' },
          { nombre: 'San Antonio de los Baños' }, { nombre: 'Bahía Honda' }, { nombre: 'Candelaria' },
          { nombre: 'San Cristóbal' },
        ]
      },
      {
        nombre: 'La Habana',
        capital: 'La Habana',
        municipios: [
          { nombre: 'Arroyo Naranjo' }, { nombre: 'Boyeros' }, { nombre: 'Centro Habana' },
          { nombre: 'Cerro' }, { nombre: 'Cotorro' }, { nombre: 'Diez de Octubre' },
          { nombre: 'Guanabacoa' }, { nombre: 'Habana del Este' }, { nombre: 'Habana Vieja' },
          { nombre: 'La Lisa' }, { nombre: 'Marianao' }, { nombre: 'Playa' },
          { nombre: 'Plaza de la Revolución' }, { nombre: 'Regla' }, { nombre: 'San Miguel del Padrón' },
        ]
      },
      {
        nombre: 'Mayabeque',
        capital: 'San José de las Lajas',
        municipios: [
          { nombre: 'Batabanó' }, { nombre: 'Bejucal' }, { nombre: 'Güines' }, { nombre: 'Jaruco' },
          { nombre: 'Madruga' }, { nombre: 'Melena del Sur' }, { nombre: 'Nueva Paz' },
          { nombre: 'Quivicán' }, { nombre: 'San José de las Lajas' }, { nombre: 'San Nicolás de Bari' },
          { nombre: 'Santa Cruz del Norte' },
        ]
      },
      {
        nombre: 'Matanzas',
        capital: 'Matanzas',
        municipios: [
          { nombre: 'Calimete' }, { nombre: 'Cárdenas' }, { nombre: 'Ciénaga de Zapata' },
          { nombre: 'Colón' }, { nombre: 'Jagüey Grande' }, { nombre: 'Jovellanos' },
          { nombre: 'Limonar' }, { nombre: 'Los Arabos' }, { nombre: 'Martí' },
          { nombre: 'Matanzas' }, { nombre: 'Pedro Betancourt' }, { nombre: 'Perico' },
          { nombre: 'Unión de Reyes' },
        ]
      },
      {
        nombre: 'Isla de la Juventud',
        capital: 'Nueva Gerona',
        municipios: [{ nombre: 'Nueva Gerona' }]
      },
    ]
  },
  {
    id: 'centro',
    nombre: 'Central',
    sunHours: 5.5,
    color: '#3b82f6',
    provincias: [
      {
        nombre: 'Cienfuegos',
        capital: 'Cienfuegos',
        municipios: [
          { nombre: 'Abreus' }, { nombre: 'Aguada de Pasajeros' }, { nombre: 'Cienfuegos' },
          { nombre: 'Cruces' }, { nombre: 'Cumanayagua' }, { nombre: 'Palmira' },
          { nombre: 'Rodas' }, { nombre: 'Santa Isabel de las Lajas' },
        ]
      },
      {
        nombre: 'Villa Clara',
        capital: 'Santa Clara',
        municipios: [
          { nombre: 'Caibarién' }, { nombre: 'Camajuaní' }, { nombre: 'Cifuentes' },
          { nombre: 'Corralillo' }, { nombre: 'Encrucijada' }, { nombre: 'Manicaragua' },
          { nombre: 'Placetas' }, { nombre: 'Quemado de Güines' }, { nombre: 'Ranchuelo' },
          { nombre: 'Remedios' }, { nombre: 'Sagua la Grande' }, { nombre: 'Santa Clara' },
          { nombre: 'Santo Domingo' },
        ]
      },
      {
        nombre: 'Sancti Spíritus',
        capital: 'Sancti Spíritus',
        municipios: [
          { nombre: 'Cabaiguán' }, { nombre: 'Fomento' }, { nombre: 'Jatibonico' },
          { nombre: 'La Sierpe' }, { nombre: 'Sancti Spíritus' }, { nombre: 'Taguasco' },
          { nombre: 'Trinidad' }, { nombre: 'Yaguajay' },
        ]
      },
      {
        nombre: 'Ciego de Ávila',
        capital: 'Ciego de Ávila',
        municipios: [
          { nombre: 'Baraguá' }, { nombre: 'Bolivia' }, { nombre: 'Chambas' },
          { nombre: 'Ciego de Ávila' }, { nombre: 'Ciro Redondo' }, { nombre: 'Florencia' },
          { nombre: 'Majagua' }, { nombre: 'Morón' }, { nombre: 'Primero de Enero' },
          { nombre: 'Venezuela' },
        ]
      },
      {
        nombre: 'Camagüey',
        capital: 'Camagüey',
        municipios: [
          { nombre: 'Camagüey' }, { nombre: 'Carlos Manuel de Céspedes' }, { nombre: 'Esmeralda' },
          { nombre: 'Florida' }, { nombre: 'Guáimaro' }, { nombre: 'Jimaguayú' },
          { nombre: 'Minas' }, { nombre: 'Najasa' }, { nombre: 'Nuevitas' },
          { nombre: 'Santa Cruz del Sur' }, { nombre: 'Sibanicú' }, { nombre: 'Sierra de Cubitas' },
          { nombre: 'Vertientes' },
        ]
      },
    ]
  },
  {
    id: 'oriente',
    nombre: 'Oriental',
    sunHours: 6.5,
    color: '#f59e0b',
    provincias: [
      {
        nombre: 'Las Tunas',
        capital: 'Las Tunas',
        municipios: [
          { nombre: 'Amancio Rodríguez' }, { nombre: 'Colombia' }, { nombre: 'Jesús Menéndez' },
          { nombre: 'Jobabo' }, { nombre: 'Las Tunas' }, { nombre: 'Majibacoa' },
          { nombre: 'Manatí' }, { nombre: 'Puerto Padre' },
        ]
      },
      {
        nombre: 'Holguín',
        capital: 'Holguín',
        municipios: [
          { nombre: 'Antilla' }, { nombre: 'Báguanos' }, { nombre: 'Banes' }, { nombre: 'Cacocum' },
          { nombre: 'Calixto García' }, { nombre: 'Cueto' }, { nombre: 'Frank País' },
          { nombre: 'Gibara' }, { nombre: 'Holguín' }, { nombre: 'Mayarí' }, { nombre: 'Moa' },
          { nombre: 'Rafael Freyre' }, { nombre: 'Sagua de Tánamo' }, { nombre: 'Urbano Noris' },
        ]
      },
      {
        nombre: 'Granma',
        capital: 'Bayamo',
        municipios: [
          { nombre: 'Bartolomé Masó' }, { nombre: 'Bayamo' }, { nombre: 'Buey Arriba' },
          { nombre: 'Campechuela' }, { nombre: 'Cauto Cristo' }, { nombre: 'Guisa' },
          { nombre: 'Jiguaní' }, { nombre: 'Manzanillo' }, { nombre: 'Media Luna' },
          { nombre: 'Niquero' }, { nombre: 'Pilón' }, { nombre: 'Río Cauto' }, { nombre: 'Yara' },
        ]
      },
      {
        nombre: 'Santiago de Cuba',
        capital: 'Santiago de Cuba',
        municipios: [
          { nombre: 'Contramaestre' }, { nombre: 'Guamá' }, { nombre: 'Julio Antonio Mella' },
          { nombre: 'Palma Soriano' }, { nombre: 'San Luis' }, { nombre: 'Santiago de Cuba' },
          { nombre: 'Segundo Frente' }, { nombre: 'Songo-La Maya' }, { nombre: 'Tercer Frente' },
        ]
      },
      {
        nombre: 'Guantánamo',
        capital: 'Guantánamo',
        municipios: [
          { nombre: 'Baracoa' }, { nombre: 'Caimanera' }, { nombre: 'El Salvador' },
          { nombre: 'Guantánamo' }, { nombre: 'Imías' }, { nombre: 'Maisí' },
          { nombre: 'Manuel Tames' }, { nombre: 'Niceto Pérez' }, { nombre: 'San Antonio del Sur' },
          { nombre: 'Yateras' },
        ]
      },
    ]
  },
];

export function getProvinciasByRegion(regionId: CubaRegion): string[] {
  const region = CUBA_REGIONS.find(r => r.id === regionId);
  return region ? region.provincias.map(p => p.nombre) : [];
}

export function getAllMunicipios(): string[] {
  return CUBA_REGIONS.flatMap(r => r.provincias.flatMap(p => p.municipios.map(m => m.nombre)));
}
