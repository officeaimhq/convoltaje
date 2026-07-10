import { useState } from 'react';
import { Copy, Check, MessageSquare, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';

interface Template {
  id: string;
  title: string;
  category: 'precio' | 'bienvenida' | 'cierre' | 'seguimiento';
  text: string;
}

const templates: Template[] = [
  {
    id: 't1',
    title: 'Bienvenida Inicial (Ángel Eduardo)',
    category: 'bienvenida',
    text: 'Hola, gracias por escribir a la empresa ConVoltaje ⚡. Soy Ángel Eduardo, será un placer ayudarte a encontrar la electricidad que necesita usted y su familia.'
  },
  {
    id: 't2',
    title: 'Respuesta a Precio / Cotización',
    category: 'precio',
    text: 'Con gusto le doy el precio 👍. Pero para darle un sistema que realmente le sirva necesito dos datos:\n1️⃣ ¿De qué provincia eres?\n2️⃣ ¿Qué equipos quiere energizar en apagón?\n\nConVoltaje diseña sistemas a la medida de nuestros clientes, con baterías certificadas, paneles de larga duración, instalación profesional con garantía real en Cuba. Y servicio posventa. Con esa información te recomiendo la opción exacta para ti.'
  },
  {
    id: 't3',
    title: 'Cierre de Venta / Coordinación de Cita',
    category: 'cierre',
    text: 'Si quieres, te preparo la reserva de este sistema o coordinamos una llamada con nuestro ingeniero, para que te explique cualquier duda que tengas o mejor enseño fotos de como queda ese sistema instalado. Dime tú ¿Cómo prefieres avanzar?'
  },
  {
    id: 't4',
    title: 'Seguimiento Técnico (Si tiene dudas)',
    category: 'seguimiento',
    text: '- ¿Aún te sientes con dudas sobre el sistema? Podemos aclararlas agendando una llamada con uno de nuestros técnicos.\n- También, si lo prefieres, te puedo mostrar fotos de este sistema ya instalado para que veas como quedará en tu casa.\n- ¿Te agendo una Reserva de este sistema? No solemos hacer reservas con clientes pero siento que este es el ideal para ti.\n\n¿Te parece? ¿Cómo prefieres avanzar?'
  }
];

export default function SalesTemplates() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('¡Copiado al portapapeles!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Plantillas de Venta</h2>
        <p className="text-white/60 text-xs">
          Copia rápida de respuestas predeterminadas para atención al cliente.
        </p>
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <div 
            key={template.id} 
            className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden"
          >
            {/* Header info */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00D9FF] flex items-center gap-1.5">
                <MessageSquare size={12} />
                {template.category}
              </span>
              <button
                onClick={() => handleCopy(template.text, template.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/5 rounded-xl transition-all"
              >
                {copiedId === template.id ? (
                  <>
                    <Check size={12} className="text-[#00FF66]" />
                    <span className="text-[#00FF66]">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Title */}
            <h4 className="text-sm font-bold text-white/90">
              {template.title}
            </h4>

            {/* Text area */}
            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
              <pre className="text-xs text-white/80 font-sans whitespace-pre-wrap leading-relaxed">
                {template.text}
              </pre>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
