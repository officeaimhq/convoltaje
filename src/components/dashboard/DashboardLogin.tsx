import { ChevronDown, Settings } from "lucide-react";
import { useLocation } from "wouter";

export default function DashboardLogin() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    setLocation("/admin/panel");
  };

  return (
    <div className="min-h-screen bg-[#0d233a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Fondo con engranajes y herramientas (SVG pattern) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45.5,35.5 c-1.5,0-3,0.3-4.4,0.7l-3.3-6.6c-0.6-1.3-2.1-1.8-3.4-1.2l-4.1,1.9c-1.3,0.6-1.9,2.2-1.3,3.5l3.2,6.5 c-2.3,2.2-3.8,5.1-4.2,8.4l-7.2,1c-1.4,0.2-2.4,1.5-2.2,2.9l0.9,4.4c0.2,1.4,1.5,2.4,2.9,2.2l7.1-1 c1,3.2,3,5.9,5.7,7.8l-1.9,7c-0.4,1.4,0.4,2.8,1.8,3.2l4.3,1.2c1.4,0.4,2.8-0.4,3.2-1.8l1.8-6.9c2.8,0,5.5-0.5,8-1.5 l4.4,5.8c0.9,1.1,2.5,1.3,3.7,0.4l3.6-2.7c1.1-0.9,1.4-2.5,0.4-3.7l-4.5-5.9c2-2,3.4-4.5,4.1-7.3l7-1.4c1.4-0.3,2.3-1.6,2-3 l-0.9-4.4c-0.3-1.4-1.6-2.3-3-2l-6.9,1.4c-1.3-3-3.4-5.6-6-7.4l2.5-6.8c0.5-1.3-0.2-2.8-1.5-3.3l-4.2-1.6 C55.3,34.4,53.8,35,53.3,36.4L51,43C49.3,42.7,47.4,42.5,45.5,35.5z M44.6,58.4c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8 S49,58.4,44.6,58.4z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px'
        }} 
      />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        {/* Logo del Panel */}
        <div className="mb-6">
           <img 
             src="/images/Logo-admin.png" 
             alt="Admin Logo" 
             className="w-40 h-40 object-contain drop-shadow-xl" 
             style={{ 
               mixBlendMode: 'lighten',
               WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)',
               maskImage: 'radial-gradient(circle, black 50%, transparent 70%)'
             }}
           />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">Panel de Administración</h1>
        <p className="text-white/60 mb-10 px-4 text-sm md:text-base leading-relaxed">
          Estas a punto de entrar al lugar donde tus datos hacen la diferencia.
        </p>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Usuario" 
            className="w-full bg-[#2c4d83] border border-[#4167a4] rounded-lg py-3.5 px-4 text-center text-white/70 placeholder-white/70 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full bg-[#2c4d83] border border-[#4167a4] rounded-lg py-3.5 px-4 text-center text-white/70 placeholder-white/70 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            required
          />
          <button 
            type="submit"
            className="mt-2 w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 rounded-lg transition-colors shadow-lg"
          >
            Entrar
          </button>
        </form>

        {/* Selector de Negocio */}
        <div className="flex flex-col items-center mt-2">
          <button className="flex items-center gap-2 text-white font-bold tracking-widest text-sm transition-colors mb-2 border border-transparent hover:border-white/20 px-4 py-2 rounded-lg">
            CONVOLTAJE <ChevronDown className="w-4 h-4" />
          </button>
          <p className="text-[11px] md:text-xs text-white/50 max-w-[250px]">
            Puedes cambiar de negocio antes de introducir tus credenciales
          </p>
        </div>

        {/* Volver */}
        <button 
          onClick={() => setLocation("/admin")}
          className="mt-12 text-xs text-blue-400 hover:text-cyan-400 transition-colors"
        >
          &larr; Volver a la selección de negocios
        </button>
      </div>
    </div>
  );
}
