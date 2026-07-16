import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'comercial' | 'tecnico' | 'contable' | 'admin';

export interface UserSession {
  id: string;
  name: string;
  role: UserRole;
  title: string; // Título o cargo real en la empresa
  avatar: string;
  avatarOrigin?: string; // Dirección del zoom (ej: 'center 25%')
  avatarZoom?: number;   // Escala de zoom (ej: 2.2)
  clientsCount?: number;
  reviewsCount?: number;
  phone?: string;
}

interface AuthState {
  currentUser: UserSession | null;
  availableUsers: UserSession[];
  login: (userId: string) => void;
  logout: () => void;
}

const mockUsers: UserSession[] = [
  {
    id: "u1",
    name: "Ángel Eduardo",
    role: "admin",
    title: "CEO / Dueño",
    avatar: "/images/fotos-plantilla-convoltaje/logo-convoltaje.jpg",
    avatarOrigin: "center",
    avatarZoom: 1.0,
    clientsCount: 2000,
    reviewsCount: 350
  },
  {
    id: "u2",
    name: "Laura",
    role: "admin",
    title: "Vice Directora",
    avatar: "", // En blanco (iniciales)
    avatarOrigin: "center",
    avatarZoom: 1.0,
    clientsCount: 0,
    reviewsCount: 0
  },
  {
    id: "u3",
    name: "José Luis",
    role: "contable",
    title: "Contador / Marketing",
    avatar: "/images/fotos-plantilla-convoltaje/Jose\u0301 Medina (Contador : Marketing.jpeg",
    avatarOrigin: "center 22%",
    avatarZoom: 2.4,
    clientsCount: 0,
    reviewsCount: 0
  },
  {
    id: "u4",
    name: "Yasiel",
    role: "tecnico",
    title: "Director Técnico",
    avatar: "", // En blanco (iniciales)
    avatarOrigin: "center",
    avatarZoom: 1.0,
    clientsCount: 0,
    reviewsCount: 0
  },
  {
    id: "u5",
    name: "Samuel",
    role: "admin",
    title: "Administrador",
    avatar: "/images/fotos-plantilla-convoltaje/samuel-explain.jpg",
    avatarOrigin: "center 20%",
    avatarZoom: 2.3,
    clientsCount: 1250,
    reviewsCount: 180
  },
  {
    id: "u6",
    name: "Niurki",
    role: "comercial",
    title: "Comercial Principal",
    avatar: "/images/fotos-plantilla-convoltaje/Niurki Comercial.jpg",
    avatarOrigin: "center 22%",
    avatarZoom: 2.2,
    clientsCount: 580,
    reviewsCount: 90,
    phone: "+5353097058"
  },
  {
    id: "u7",
    name: "Diana Rosa",
    role: "comercial",
    title: "Comercial",
    avatar: "/images/fotos-plantilla-convoltaje/Diana Rosa comercial.jpg",
    avatarOrigin: "center 22%",
    avatarZoom: 2.2,
    clientsCount: 320,
    reviewsCount: 45,
    phone: "+5355507913"
  },
  {
    id: "u8",
    name: "Daniel",
    role: "tecnico",
    title: "Técnico - Pinar del Río",
    avatar: "/images/fotos-plantilla-convoltaje/Daniel, Pinar del Rio Tecnico.jpg",
    avatarOrigin: "center 20%",
    avatarZoom: 2.3,
    clientsCount: 0,
    reviewsCount: 15
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      availableUsers: mockUsers,
      login: (userId: string) => set((state) => {
        const user = state.availableUsers.find(u => u.id === userId);
        return { currentUser: user || null };
      }),
      logout: () => set({ currentUser: null })
    }),
    {
      name: 'convoltaje-auth-storage-v2',
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
