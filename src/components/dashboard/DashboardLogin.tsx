import { useState } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useLocation } from 'wouter';
import { Settings } from 'lucide-react';

export default function DashboardLogin() {
  const { login } = useAuthStore();
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Validar el acceso de José (u3)
    if ((cleanPhone === '5354815692' || cleanPhone === '54815692') && password === '5692') {
      login('u3'); // u3 es José Luis
      setLocation('/admin/panel');
    } 
    // Acceso de admin por defecto (simulador rápido)
    else if (phone === 'admin' && password === 'admin') {
      login('u1'); // Ángel CEO
      setLocation('/admin/panel');
    }
    else {
      setError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#112133] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Fondo con engranajes simulando el patrón de la captura */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex flex-wrap justify-center content-center gap-12 p-4">
        {Array.from({ length: 48 }).map((_, i) => (
          <Settings key={i} size={100} className="text-white" />
        ))}
      </div>

      <div className="w-full max-w-sm z-10 flex flex-col items-center">
        {/* Ilustración de Samuel el Panel asomado a la ventana */}
        <div className="w-40 h-40 mb-2">
          <img 
            src="https://api.dicebear.com/7.x/bottts/svg?seed=samuel&backgroundColor=112133" // Placeholder amigable
            alt="Admin Mascot"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/bottts/svg?seed=admin';
            }}
          />
        </div>

        <h1 className="text-[22px] font-bold text-white mb-2 text-center">Panel de Administración</h1>
        <p className="text-[#8e9aab] text-[13px] text-center mb-8 px-4 leading-relaxed font-medium">
          Estas a punto de entrar al lugar donde tus datos<br/>hacen la diferencia.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#2c4060] border border-transparent focus:border-[#00D9FF] rounded-lg text-white placeholder-[#8e9aab] outline-none transition-colors font-medium"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#2c4060] border border-transparent focus:border-[#00D9FF] rounded-lg text-white placeholder-[#8e9aab] outline-none transition-colors font-medium"
              required
            />
          </div>

          {error && <p className="text-[#FF6B35] text-xs text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#00D9FF] hover:bg-[#00bfe6] text-[#0F3A7D] font-bold rounded-lg transition-colors mt-2 text-[15px]"
          >
            Entrar
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-2">
          <button className="flex items-center gap-1.5 text-white font-bold text-sm tracking-wider">
            CONVOLTAJE <span className="text-[10px] opacity-70">▼</span>
          </button>
          <p className="text-[#8e9aab] text-[11px] text-center mt-1">
            Puedes cambiar de negocio antes de introducir<br/>tus credenciales
          </p>
        </div>

        <button 
          onClick={() => setLocation('/')}
          className="mt-10 text-[#00D9FF]/80 hover:text-[#00D9FF] text-[13px] transition-colors font-medium"
        >
          ← Volver a la selección de negocios
        </button>
      </div>
    </div>
  );
}
