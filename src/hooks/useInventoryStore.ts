import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProductCategory = 'Paneles Solares' | 'Inversores' | 'Baterías' | 'Accesorios' | 'Estructuras';

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: ProductCategory;
  stock: number;
  costPrice: number;
  salePrice: number;
  minStock: number;
}

interface InventoryState {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  adjustStock: (id: string, amount: number) => void;
}

const mockInventory: InventoryItem[] = [
  { id: "i1", code: "INV-DEYE-5KW", name: "Inversor Deye 5kW", category: "Inversores", stock: 15, costPrice: 800, salePrice: 1200, minStock: 5 },
  { id: "i2", code: "PAN-JINKO-550", name: "Panel Solar Jinko 550W", category: "Paneles Solares", stock: 120, costPrice: 150, salePrice: 220, minStock: 30 },
  { id: "i3", code: "BAT-PYLON-4.8", name: "Batería Pylontech 4.8kWh", category: "Baterías", stock: 25, costPrice: 1200, salePrice: 1800, minStock: 5 },
  { id: "i4", code: "ACC-CBL-6MM", name: "Cable Solar 6mm (Rollo 100m)", category: "Accesorios", stock: 50, costPrice: 80, salePrice: 150, minStock: 10 },
  { id: "i5", code: "INV-GROW-3KW", name: "Inversor Growatt 3kW", category: "Inversores", stock: 10, costPrice: 600, salePrice: 950, minStock: 3 },
  { id: "i6", code: "PAN-CAN-450", name: "Panel Canadian Solar 450W", category: "Paneles Solares", stock: 200, costPrice: 120, salePrice: 180, minStock: 30 },
  { id: "i7", code: "BAT-LITH-10", name: "Batería Litio 10kWh", category: "Baterías", stock: 8, costPrice: 2500, salePrice: 3800, minStock: 2 },
  { id: "i8", code: "ACC-MC4", name: "Conector MC4 (Par)", category: "Accesorios", stock: 500, costPrice: 2, salePrice: 5, minStock: 50 },
  { id: "i9", code: "INV-SMA-10KW", name: "Inversor SMA 10kW", category: "Inversores", stock: 5, costPrice: 1500, salePrice: 2400, minStock: 2 },
  { id: "i10", code: "PAN-TRINA-600", name: "Panel Trina Solar 600W", category: "Paneles Solares", stock: 80, costPrice: 180, salePrice: 270, minStock: 20 },
  { id: "i11", code: "INV-SOLAX-5KW", name: "Inversor Solax 5kW", category: "Inversores", stock: 20, costPrice: 750, salePrice: 1150, minStock: 5 },
  { id: "i12", code: "INV-HUA-8KW", name: "Inversor Huawei 8kW", category: "Inversores", stock: 12, costPrice: 1100, salePrice: 1700, minStock: 3 },
  { id: "i13", code: "INV-FRON-10KW", name: "Inversor Fronius 10kW", category: "Inversores", stock: 8, costPrice: 1600, salePrice: 2500, minStock: 2 },
  { id: "i14", code: "PAN-LONGI-540", name: "Panel Longi 540W", category: "Paneles Solares", stock: 150, costPrice: 140, salePrice: 210, minStock: 30 },
  { id: "i15", code: "PAN-SUNP-400", name: "Panel SunPower 400W", category: "Paneles Solares", stock: 100, costPrice: 160, salePrice: 250, minStock: 20 },
  { id: "i16", code: "PAN-JA-500", name: "Panel JA Solar 500W", category: "Paneles Solares", stock: 250, costPrice: 130, salePrice: 195, minStock: 40 },
  { id: "i17", code: "BAT-LG-10", name: "Batería LG Chem 10kWh", category: "Baterías", stock: 10, costPrice: 3000, salePrice: 4500, minStock: 2 },
  { id: "i18", code: "BAT-BYD-5", name: "Batería BYD 5.1kWh", category: "Baterías", stock: 15, costPrice: 1500, salePrice: 2300, minStock: 3 },
  { id: "i19", code: "BAT-ENPH-3", name: "Batería Enphase 3.3kWh", category: "Baterías", stock: 20, costPrice: 1100, salePrice: 1700, minStock: 4 },
  { id: "i20", code: "EST-ALU-COPLANAR", name: "Estructura Coplanar Aluminio (x4)", category: "Estructuras", stock: 100, costPrice: 45, salePrice: 80, minStock: 15 },
  { id: "i21", code: "EST-TRI-30DEG", name: "Estructura Triángulo 30° (x4)", category: "Estructuras", stock: 80, costPrice: 60, salePrice: 110, minStock: 15 },
  { id: "i22", code: "PROT-DC-1000V", name: "Cuadro Protección DC 1000V", category: "Accesorios", stock: 40, costPrice: 120, salePrice: 190, minStock: 10 },
  { id: "i23", code: "PROT-AC-230V", name: "Cuadro Protección AC 230V", category: "Accesorios", stock: 50, costPrice: 90, salePrice: 150, minStock: 10 },
  { id: "i24", code: "ACC-CON-WIFI", name: "Módulo de Monitoreo WiFi", category: "Accesorios", stock: 60, costPrice: 30, salePrice: 60, minStock: 15 },
  { id: "i25", code: "ACC-CBL-4MM", name: "Cable Solar 4mm (Rollo 100m)", category: "Accesorios", stock: 80, costPrice: 60, salePrice: 110, minStock: 15 }
];

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: mockInventory,
      
      addItem: (item) => set((state) => ({
        items: [...state.items, { ...item, id: Date.now().toString() }]
      })),
      
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, ...updates } : i)
      })),
      
      deleteItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      
      adjustStock: (id, amount) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, stock: i.stock + amount } : i)
      }))
    }),
    {
      name: 'convoltaje-inventory-storage',
    }
  )
);
