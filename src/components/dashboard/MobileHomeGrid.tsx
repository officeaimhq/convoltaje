import { useAuthStore } from '@/hooks/useAuthStore';
import {
  UserPlus, Wrench, Flame, BarChart3,
  Package, Calendar, Sliders, CheckCircle2,
  ClipboardList, Star, Asterisk, LayoutGrid
} from 'lucide-react';
import { AdminView } from './Sidebar';

interface MobileHomeGridProps {
  onSelectView: (view: AdminView) => void;
}

// ─── Tile "Útiles" siempre en posición 9 (índice 8) ──────────────────
const UTILES_TILE = {
  id: 'utiles',
  view: 'utiles' as AdminView,
  label: 'Útiles',
  icon: LayoutGrid,
  badge: undefined as number | undefined,
};

// ─── Grids por rol (siempre 8 tiles primarios + tile 9 = Útiles) ──────
// Cada array tiene exactamente 8 items. El componente agrega Útiles como item 9.

const TILES_BY_ROLE: Record<string, { id: string; view: AdminView; label: string; icon: React.ElementType; badge?: number }[]> = {

  // ───── ADMIN (8 tiles principales) ─────────────────────────────────
  admin: [
    { id: 'clientes',      view: 'pipeline',      label: 'Clientes',      icon: UserPlus,      badge: 16 },
    { id: 'instalaciones', view: 'instalaciones',  label: 'Instalaciones', icon: Wrench,        badge: 1  },
    { id: 'quejas',        view: 'quejas',         label: 'Quejas',        icon: Flame,         badge: 1  },
    { id: 'estadisticas',  view: 'finanzas',       label: 'Estadísticas',  icon: BarChart3               },
    { id: 'inventario',    view: 'almacen',        label: 'Inventario',    icon: Package,       badge: 5  },
    { id: 'calendario',    view: 'calendario',     label: 'Calendario',    icon: Calendar,      badge: 1  },
    { id: 'ajustes',       view: 'ajustes',        label: 'Ajustes',       icon: Sliders                 },
    { id: 'validacion',    view: 'validacion',     label: 'Validación',    icon: CheckCircle2            },
  ],
  // Útiles → Calculadora, Plantillas, Errores MUST, Historial, Manuales

  // ───── COMERCIAL (8 tiles principales) ─────────────────────────────
  comercial: [
    { id: 'clientes',      view: 'pipeline',      label: 'Clientes',      icon: UserPlus,      badge: 16 },
    { id: 'instalaciones', view: 'instalaciones',  label: 'Instalaciones', icon: Wrench,        badge: 1  },
    { id: 'quejas',        view: 'quejas',         label: 'Quejas',        icon: Flame,         badge: 1  },
    { id: 'estadisticas',  view: 'finanzas',       label: 'Estadísticas',  icon: BarChart3               },
    { id: 'inventario',    view: 'almacen',        label: 'Inventario',    icon: Package,       badge: 5  },
    { id: 'calendario',    view: 'calendario',     label: 'Calendario',    icon: Calendar,      badge: 1  },
    { id: 'ajustes',       view: 'ajustes',        label: 'Ajustes',       icon: Sliders                 },
    { id: 'validacion',    view: 'validacion',     label: 'Validación',    icon: CheckCircle2            },
  ],
  // Útiles → Calculadora, Plantillas

  // ───── CONTABLE / JOSÉ LUIS (8 tiles principales) ──────────────────
  contable: [
    { id: 'clientes',     view: 'pipeline',    label: 'Clientes',      icon: UserPlus,   badge: 16 },
    { id: 'estadisticas', view: 'finanzas',    label: 'Estadísticas',  icon: BarChart3             },
    { id: 'inventario',   view: 'almacen',     label: 'Inventario',    icon: Package,    badge: 5  },
    { id: 'calendario',   view: 'calendario',  label: 'Calendario',    icon: Calendar,   badge: 1  },
    { id: 'ajustes',      view: 'ajustes',     label: 'Ajustes',       icon: Sliders               },
    { id: 'validacion',   view: 'validacion',  label: 'Validación',    icon: CheckCircle2          },
    { id: 'historial',    view: 'historial',   label: 'Historial',     icon: ClipboardList         },
    { id: 'instalaciones',view: 'instalaciones',label: 'Instalaciones',icon: Wrench,     badge: 1  },
  ],
  // Útiles → Calculadora, Manuales, Plantillas, Errores MUST

  // ───── TÉCNICO (solo 3 tiles — layout simplificado) ─────────────────
  tecnico: [
    { id: 'asignaciones', view: 'asignaciones', label: 'Asignaciones', icon: ClipboardList, badge: 2 },
    { id: 'validacion',   view: 'validacion',   label: 'Validación',   icon: CheckCircle2            },
    { id: 'herramientas', view: 'herramientas', label: 'Herramientas', icon: LayoutGrid              },
  ],
};

// ─── Estilos del tile según rol ─────────────────────────────────────
const TILE_STYLES: Record<string, string> = {
  tecnico: 'aspect-[4/5]', // tiles más grandes para técnicos (solo 3)
};

export default function MobileHomeGrid({ onSelectView }: MobileHomeGridProps) {
  const { currentUser } = useAuthStore();

  if (!currentUser) return null;

  const role = currentUser.role;
  const isTecnico = role === 'tecnico';

  const primaryTiles = TILES_BY_ROLE[role] ?? TILES_BY_ROLE['admin'];

  // Para todos los roles que NO son técnico, siempre agregamos el tile Útiles como 9.º
  const tiles = isTecnico ? primaryTiles : [...primaryTiles, UTILES_TILE];

  const tileClass = TILE_STYLES[role] ?? 'aspect-square';
  const gridCols  = isTecnico ? 'grid-cols-3' : 'grid-cols-3';

  // Group tiles
  const seguimientoIds = ['clientes', 'instalaciones', 'quejas', 'calendario', 'validacion', 'asignaciones', 'historial'];
  const seguimientoTiles = tiles.filter(t => seguimientoIds.includes(t.id));
  const gestionTiles = tiles.filter(t => !seguimientoIds.includes(t.id));

  return (
    <div className="w-full min-h-screen bg-[#0b3c8f] text-white flex flex-col p-4 md:p-6 font-sans relative overflow-hidden">

      {/* ── Profile Header ─────────────────────────────────── */}
      <div className="flex items-center gap-4 mt-6 mb-6 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md relative z-10">

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
          <div className="absolute -bottom-1 -right-1 bg-[#ff3b30] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b3c8f]">
            5
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-normal text-white tracking-tight">
            Bienvenido/a, <span className="font-black text-white">{currentUser.name}</span>
          </h2>
          <p className="text-[#00D9FF] text-sm font-bold mt-0.5">
            {currentUser.title.replace(/^\(|\)$/g, '')}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {currentUser.clientsCount !== undefined && currentUser.clientsCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 text-white font-bold text-xs rounded-full border border-white/5">
                <Asterisk size={12} className="text-[#00D9FF]" />
                {currentUser.clientsCount} clientes
              </span>
            )}
            {currentUser.reviewsCount !== undefined && currentUser.reviewsCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 text-white font-bold text-xs rounded-full border border-white/5">
                <Star size={12} className="text-[#FFB800] fill-[#FFB800]" />
                {currentUser.reviewsCount} reseñas
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid de Módulos ─────────────────────────────────── */}
      {/*
        REGLA: Max 9 tiles (3×3).
        - Técnico: 3 tiles (layout simplificado sin scroll)
        - Resto: 8 tiles principales + 1 tile "Útiles" = siempre 9
      */}
      {/* ── Seguimiento y Operaciones ────────────────────────── */}
      {seguimientoTiles.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-black text-white/50 uppercase tracking-widest mb-3 px-1">Seguimiento</h3>
          <div className={`grid ${gridCols} gap-3 relative z-10`}>
            {seguimientoTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <button
                  key={tile.id}
                  onClick={() => onSelectView(tile.view)}
                  className={`
                    ${tileClass} bg-white/5 hover:bg-white/10 border-white/10
                    border rounded-2xl flex flex-col items-center justify-center
                    text-center p-3 transition-all relative group active:scale-95
                  `}
                >
                  {tile.badge !== undefined && (
                    <div className="absolute top-2 right-2 bg-[#00D9FF] text-[#0b1b33] text-[11px] font-black px-1.5 py-0.5 rounded-full">
                      {tile.badge}
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform bg-white/5">
                    <Icon size={24} className="text-[#00D9FF]" />
                  </div>
                  <span className="text-[13px] font-medium text-white truncate max-w-full">
                    {tile.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Gestión y Administración ─────────────────────────── */}
      {gestionTiles.length > 0 && (
        <div>
          <h3 className="text-sm font-black text-white/50 uppercase tracking-widest mb-3 px-1">Gestión</h3>
          <div className={`grid ${gridCols} gap-3 relative z-10`}>
            {gestionTiles.map((tile) => {
              const Icon = tile.icon;
              const isUtiles = tile.id === 'utiles';
              return (
                <button
                  key={tile.id}
                  onClick={() => onSelectView(tile.view)}
                  className={`
                    ${tileClass}
                    ${isUtiles
                      ? 'bg-[#00D9FF]/10 hover:bg-[#00D9FF]/15 border-[#00D9FF]/20'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'}
                    border rounded-2xl flex flex-col items-center justify-center
                    text-center p-3 transition-all relative group active:scale-95
                  `}
                >
                  {tile.badge !== undefined && (
                    <div className="absolute top-2 right-2 bg-[#00D9FF] text-[#0b1b33] text-[11px] font-black px-1.5 py-0.5 rounded-full">
                      {tile.badge}
                    </div>
                  )}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-2
                    group-hover:scale-110 transition-transform
                    ${isUtiles ? 'bg-[#00D9FF]/10' : 'bg-white/5'}
                  `}>
                    <Icon
                      size={24}
                      className={isUtiles ? 'text-[#00D9FF]' : 'text-[#00D9FF]'}
                    />
                  </div>
                  <span className={`text-[13px] truncate max-w-full ${isUtiles ? 'text-[#00D9FF] font-bold' : 'text-white font-medium'}`}>
                    {tile.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
