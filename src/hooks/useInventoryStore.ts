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
  {
    id: "inv1",
    code: "PAN-500W-M",
    name: "Panel Solar Monocristalino 500W",
    category: "Paneles Solares",
    stock: 142,
    costPrice: 120,
    salePrice: 180,
    minStock: 50
  },
  {
    id: "inv2",
    code: "INV-DEYE-5K",
    name: "Inversor Híbrido Deye 5kW",
    category: "Inversores",
    stock: 15,
    costPrice: 850,
    salePrice: 1200,
    minStock: 5
  },
  {
    id: "inv3",
    code: "BAT-LITH-48V",
    name: "Batería Litio 48V 100Ah",
    category: "Baterías",
    stock: 8,
    costPrice: 1100,
    salePrice: 1500,
    minStock: 10 // Alerta visual de bajo stock
  },
  {
    id: "inv4",
    code: "CAB-SOL-4MM",
    name: "Cable Solar 4mm (Metro)",
    category: "Accesorios",
    stock: 1500,
    costPrice: 0.8,
    salePrice: 1.5,
    minStock: 200
  },
  {
    id: "inv5",
    code: "EST-ALUM-4P",
    name: "Estructura Aluminio para 4 Paneles",
    category: "Estructuras",
    stock: 45,
    costPrice: 60,
    salePrice: 110,
    minStock: 20
  }
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
