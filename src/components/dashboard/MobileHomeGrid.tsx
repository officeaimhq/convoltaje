import { useAuthStore } from '@/hooks/useAuthStore';
import { 
  UserPlus, Wrench, Flame, BarChart3, 
  Package, Calendar, Sliders, Calculator, 
  ClipboardList, Bell, Star, Asterisk,
  AlertOctagon, MessageSquare, BookOpen
} from 'lucide-react';
import { AdminView } from './Sidebar';

interface MobileHomeGridProps {
  onSelectView: (view: AdminView) => void;
}

export default function MobileHomeGrid({ onSelectView }: MobileHomeGridProps) {
  const { currentUser } = useAuthStore();

  if (!currentUser) return null;

  // Lista completa de todos los botones posibles
  const allTiles = [
    {
      id: 'clientes',
      view: 'pipeline' as AdminView,
      label: 'Clientes',
      icon: UserPlus,
      badge: 16,
      roles: ['admin', 'comercial', 'contable']
    },
    {
      id: 'instalaciones',
      view: 'instalaciones' as AdminView,
      label: 'Instalaciones',
      icon: Wrench,
      badge: 1,
      roles: ['admin', 'comercial', 'tecnico']
    },
    {
      id: 'quejas',
      view: 'quejas' as AdminView,
      label: 'Quejas',
      icon: Flame,
      badge: 1,
      roles: ['admin', 'comercial']
    },
    {
      id: 'estadisticas',
      view: 'finanzas' as AdminView, // redirigimos finanzas a estadísticas
      label: 'Estadísticas',
      icon: BarChart3,
      roles: ['admin', 'comercial', 'contable']
    },
    {
      id: 'inventario',
      view: 'almacen' as AdminView,
      label: 'Inventario',
      icon: Package,
      badge: 5,
      roles: ['admin', 'comercial']
    },
    {
      id: 'calendario',
      view: 'calendario' as AdminView,
      label: 'Calendario',
      icon: Calendar,
      badge: 1,
      roles: ['admin', 'comercial', 'tecnico']
    },
    {
      id: 'ajustes',
      view: 'ajustes' as AdminView,
      label: 'Ajustes',
      icon: Sliders,
      roles: ['admin', 'comercial', 'tecnico', 'contable']
    },
    {
      id: 'calculadora',
      view: 'calculadora' as AdminView,
      label: 'Calculadora',
      icon: Calculator,
      roles: ['admin', 'comercial']
    },
    {
      id: 'plantillas',
      view: 'plantillas' as AdminView,
      label: 'Plantillas',
      icon: MessageSquare,
      roles: ['admin', 'comercial']
    },
    {
      id: 'errores',
      view: 'errores' as AdminView,
      label: 'Errores MUST',
      icon: AlertOctagon,
      roles: ['admin', 'tecnico']
    },
    {
      id: 'historial',
      view: 'historial' as AdminView,
      label: 'Historial',
      icon: ClipboardList,
      roles: ['admin', 'contable', 'tecnico']
    },
    {
      id: 'manuales',
      view: 'manuales' as AdminView,
      label: 'Manuales',
      icon: BookOpen,
      roles: ['admin', 'comercial', 'tecnico', 'contable']
    }
  ];

  // Filtrar los botones permitidos según el rol del usuario actual
  const filteredTiles = allTiles.filter(tile => tile.roles.includes(currentUser.role));

  return (
    <div className="w-full min-h-screen bg-[#0b3c8f] text-white flex flex-col p-4 md:p-6 font-sans relative overflow-hidden">
      
      {/* Profile Header */}
      <div className="flex items-center gap-4 mt-6 mb-8 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md relative z-10">
        
        {/* Avatar Container */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full border-4 border-[#00D9FF] overflow-hidden bg-white/10 relative">
            <img 
              src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`} 
              alt={currentUser.name} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`;
              }}
              className="w-full h-full object-cover"
              style={{
                transform: currentUser.avatarZoom ? `scale(${currentUser.avatarZoom})` : 'none',
                transformOrigin: currentUser.avatarOrigin || 'center'
              }}
            />
          </div>
          {/* Notification Bell Badge overlays */}
          <div className="absolute -bottom-1 -right-1 bg-[#ff3b30] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b3c8f]">
            5
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-normal text-white">
            Bienvenida <span className="font-bold">{currentUser.name}</span>
          </h2>
          <p className="text-[#00D9FF] text-xs font-semibold">
            {currentUser.title.replace(/^\(|\)$/g, '')}
          </p>
          
          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mt-2">
            {currentUser.clientsCount !== undefined && currentUser.clientsCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/10 text-white text-xs rounded-full border border-white/5">
                <Asterisk size={10} className="text-[#00D9FF]" />
                {currentUser.clientsCount} clientes
              </span>
            )}
            {currentUser.reviewsCount !== undefined && currentUser.reviewsCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/10 text-white text-xs rounded-full border border-white/5">
                <Star size={10} className="text-[#FFB800] fill-[#FFB800]" />
                {currentUser.reviewsCount} reseñas
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Menu Grid (3 columns on mobile, adapts to grid cols 3) */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 relative z-10 flex-1 content-start">
        {filteredTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <button
              key={tile.id}
              onClick={() => onSelectView(tile.view)}
              className="aspect-square bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-3 transition-all relative group active:scale-95"
            >
              {/* Badge count overlay */}
              {tile.badge && (
                <div className="absolute top-2 right-2 bg-[#00D9FF] text-[#0b1b33] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {tile.badge}
                </div>
              )}
              
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Icon size={20} className="text-[#00D9FF]" />
              </div>
              <span className="text-[11px] font-medium text-white truncate max-w-full">
                {tile.label}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
