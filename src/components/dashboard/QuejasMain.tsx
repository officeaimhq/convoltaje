import { useState } from "react";
import { 
  Flame, Calendar, MapPin, User, Plus, Phone, 
  CheckCircle2, ClipboardList, Clock, CheckSquare, 
  Square, Trash2, MessageSquare, AlertTriangle, ShieldCheck, 
  ShieldAlert, Copy, RefreshCw, BookOpen, AlertOctagon
} from "lucide-react";
import { toast } from "sonner";
import { differenceInDays, parseISO, format, addDays, addMonths } from "date-fns";
import { es } from "date-fns/locale";

export interface Complaint {
  id: string;
  clientName: string;
  phone: string;
  location: string;
  provincia: string;
  systemType: string;
  installationDate: string; // YYYY-MM-DD
  warrantyMonths: number; // 1, 3 o 12 meses
  symptom: string;
  status: "diagnostico" | "visita" | "dictamen" | "resolucion" | "resuelta" | "rechazada";
  assignedTech?: string;
  errorMust?: string; // Código de error MUST si aplica (ej. Error 08, Error 07)
  checklist: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  isEcoFlow?: boolean;
}

const defaultComplaints: Complaint[] = [
  {
    id: "queja-1",
    clientName: "Marta Valdés",
    phone: "+5353829104",
    location: "Calle 10 #1405, Vedado, La Habana",
    provincia: "La Habana",
    systemType: "Sistema 6K PLUS",
    installationDate: "2026-06-15", // Hace menos de un mes
    warrantyMonths: 3, // Sistemas de hasta 6kW = 3 meses de garantía
    symptom: "El inversor MUST se apaga constantemente y muestra el Error 08 (Sobretensión del bus de CC) en la pantalla. Pitido continuo molesto.",
    status: "visita",
    assignedTech: "Yasiel (Director Técnico)",
    errorMust: "Error 08 (Sobretensión de Bus)",
    checklist: [
      { id: "ch-1", label: "Evidencia visual recibida (foto/video de pantalla)", completed: true },
      { id: "ch-2", label: "Diagnóstico remoto por Yasiel (Error 08)", completed: true },
      { id: "ch-3", label: "Inspección técnica provincial en sitio", completed: false },
      { id: "ch-4", label: "Dictamen: Reposición autorizada por Ángel", completed: false },
      { id: "ch-5", label: "Montaje de inversor de reemplazo y pruebas", completed: false },
      { id: "ch-6", label: "Firma de conformidad y cierre de garantía", completed: false }
    ]
  },
  {
    id: "queja-2",
    clientName: "Pedro Martínez",
    phone: "+5354928172",
    location: "Cárdenas, Matanzas",
    provincia: "Matanzas",
    systemType: "Sistema Básico - 1500W",
    installationDate: "2026-03-10", // Hace 4 meses (Garantía expiró el 10 de junio)
    warrantyMonths: 3,
    symptom: "El inversor no enciende después de una tormenta eléctrica con descargas el fin de semana. Los breakers de paneles estaban abajo.",
    status: "dictamen",
    assignedTech: "Carlos (Técnico Matanzas)",
    checklist: [
      { id: "ch-1", label: "Evidencia visual recibida (foto/video de pantalla)", completed: true },
      { id: "ch-2", label: "Diagnóstico remoto por Yasiel (Fallo de encendido)", completed: true },
      { id: "ch-3", label: "Inspección técnica provincial en sitio", completed: true },
      { id: "ch-4", label: "Dictamen: Expiró garantía. Presupuesto reparación enviado.", completed: false },
      { id: "ch-5", label: "Reparación/Sustitución con costo completada", completed: false },
      { id: "ch-6", label: "Firma de conformidad y cobro del servicio", completed: false }
    ]
  },
  {
    id: "queja-3",
    clientName: "Roberto Blanco",
    phone: "+5352819304",
    location: "San Antonio de los Baños, Artemisa",
    provincia: "Artemisa",
    systemType: "EcoFlow DELTA 2 Max (integrado)",
    installationDate: "2026-07-02", // Hace unos días (Garantía activa de 1 mes)
    warrantyMonths: 1, // Powerstation integrada a sistema = 1 mes de garantía
    symptom: "La EcoFlow se apaga repentinamente al encender la olla arrocera de noche, a pesar de estar al 80% de carga.",
    status: "diagnostico",
    isEcoFlow: true,
    checklist: [
      { id: "ch-1", label: "Evidencia visual recibida (foto/video de pantalla)", completed: true },
      { id: "ch-2", label: "Diagnóstico remoto por Yasiel (Sobrecarga de potencia)", completed: false },
      { id: "ch-3", label: "Inspección técnica provincial en sitio", completed: false },
      { id: "ch-4", label: "Dictamen: Reposición autorizada por Ángel", completed: false },
      { id: "ch-5", label: "Montaje de inversor de reemplazo y pruebas", completed: false },
      { id: "ch-6", label: "Firma de conformidad y cierre de garantía", completed: false }
    ]
  }
];

export default function QuejasMain() {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem("convoltaje_complaints");
    return saved ? JSON.parse(saved) : defaultComplaints;
  });

  const [activeTab, setActiveTab] = useState<"lista" | "manual">("lista");
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [provincia, setProvincia] = useState("La Habana");
  const [systemType, setSystemType] = useState("Sistema Básico - 1500W");
  const [installationDate, setInstallationDate] = useState("");
  const [symptom, setSymptom] = useState("");
  const [errorMust, setErrorMust] = useState("");

  const saveToStorage = (updated: Complaint[]) => {
    setComplaints(updated);
    localStorage.setItem("convoltaje_complaints", JSON.stringify(updated));
  };

  // Helper: check if warranty is active and get expiration details
  const getWarrantyInfo = (instDateStr: string, months: number) => {
    try {
      const instDate = parseISO(instDateStr);
      const expDate = addMonths(instDate, months);
      const today = new Date();
      const isActive = today <= expDate;
      const daysLeft = differenceInDays(expDate, today);
      return {
        isActive,
        expirationDate: format(expDate, "d 'de' MMMM, yyyy", { locale: es }),
        daysLeft: isActive ? daysLeft : Math.abs(daysLeft)
      };
    } catch (e) {
      return { isActive: false, expirationDate: "Desconocida", daysLeft: 0 };
    }
  };

  // Toggle checklist item
  const handleToggleCheck = (complaintId: string, checkId: string) => {
    const updated = complaints.map(c => {
      if (c.id === complaintId) {
        const updatedChecklist = c.checklist.map(item => {
          if (item.id === checkId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });

        // Modificar estado automáticamente basado en qué tarea de control se ha marcado
        let newStatus = c.status;
        const index = updatedChecklist.findIndex(item => item.id === checkId);
        
        if (index === 1 && updatedChecklist[1].completed) { // Diagnóstico remoto hecho
          newStatus = "visita";
        } else if (index === 2 && updatedChecklist[2].completed) { // Visita hecha
          newStatus = "dictamen";
        } else if (index === 3 && updatedChecklist[3].completed) { // Dictamen aprobado
          newStatus = "resolucion";
        } else if (index === 5 && updatedChecklist[5].completed) { // Cierre de queja
          newStatus = "resuelta";
          toast.success(`¡Queja de ${c.clientName} Resuelta! Archivada con éxito.`);
        }

        return { 
          ...c, 
          status: newStatus,
          checklist: updatedChecklist 
        };
      }
      return c;
    });

    saveToStorage(updated);
  };

  // Create new complaint
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone || !location || !installationDate || !symptom) {
      toast.error("Por favor, llena los campos obligatorios.");
      return;
    }

    // Determine warranty months based on system type
    let warrantyMonths = 3; // Default 3 meses (sistemas ≤ 6kW)
    if (systemType.includes("Premium") || systemType.includes("10000W")) {
      warrantyMonths = 12; // 1 año para ≥10kW
    } else if (systemType.includes("EcoFlow suelta") || systemType.includes("suelta")) {
      warrantyMonths = 0; // Sin garantía
    } else if (systemType.includes("EcoFlow") || systemType.includes("DELTA") || systemType.includes("integrated")) {
      warrantyMonths = 1; // 1 mes si es integrada
    }

    const newComplaint: Complaint = {
      id: `queja-${Date.now()}`,
      clientName,
      phone,
      location,
      provincia,
      systemType,
      installationDate,
      warrantyMonths,
      symptom,
      status: "diagnostico",
      errorMust: errorMust || undefined,
      checklist: [
        { id: "ch-1", label: "Evidencia visual recibida (foto/video de pantalla)", completed: false },
        { id: "ch-2", label: "Diagnóstico remoto por Yasiel", completed: false },
        { id: "ch-3", label: "Inspección técnica provincial en sitio", completed: false },
        { id: "ch-4", label: "Dictamen de garantía aprobado por Convoltaje", completed: false },
        { id: "ch-5", label: "Reposición o solución técnica completada", completed: false },
        { id: "ch-6", label: "Firma de conformidad y cierre de garantía", completed: false }
      ]
    };

    const updated = [newComplaint, ...complaints];
    saveToStorage(updated);

    // Reset Form
    setClientName("");
    setPhone("");
    setLocation("");
    setInstallationDate("");
    setSymptom("");
    setErrorMust("");
    setShowAddForm(false);
    toast.success("Queja registrada e ingresada al pipeline de soporte.");
  };

  // Copy template to clipboard
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Texto copiado al portapapeles.");
  };

  // Get active selected complaint data
  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  // Generate dynamic message templates based on selected client/complaint
  const getTemplates = (c: Complaint) => {
    if (!c) return [];
    
    const wInfo = getWarrantyInfo(c.installationDate, c.warrantyMonths);
    const errorDetails = c.errorMust ? ` con indicación de *${c.errorMust}*` : "";

    return [
      {
        title: "Mensaje 1 - Recepción de Queja (Día 1)",
        desc: "Se envía inmediatamente cuando el cliente notifica el fallo por primera vez.",
        text: `Estimado(a) ${c.clientName}, le saluda su comercial de Convoltaje ⚡. Lamentamos mucho el inconveniente presentado con su sistema solar. Entendemos lo importante que es contar con energía eléctrica para su familia, por lo que atenderemos su reporte con total prioridad.

Para proceder, nuestro Director Técnico, el ingeniero Yasiel, requiere evaluar el fallo. ¿Sería tan amable de enviarme lo siguiente por esta vía?
1️⃣ Un video de 10 segundos donde se observe la pantalla del inversor encendido y los interruptores (breakers) del tablero de protecciones.
2️⃣ Una foto clara de la pantalla del inversor (especialmente si muestra algún código de error o luz roja de alarma).

Una vez que nos envíe esta información, Yasiel le ofrecerá un diagnóstico preliminar en menos de 4 horas para coordinar los pasos a seguir. Estamos a su completa disposición.`
      },
      {
        title: "Mensaje 2 - Coordinación de Visita Técnica",
        desc: "Se envía tras el diagnóstico de Yasiel para agendar la visita física del técnico de la provincia.",
        text: `Estimado(a) ${c.clientName}, el ingeniero Yasiel ya revisó el video del inversor${errorDetails}. El diagnóstico preliminar indica que se requiere una inspección presencial para verificar las conexiones de las baterías y los strings de los paneles solares.

Como su sistema cuenta con la **Garantía Real de Convoltaje activa** (vence el ${wInfo.expirationDate}), esta revisión y cualquier repuesto necesario están cubiertos al 100% por nuestra empresa, sin costo alguno para usted.

Hemos coordinado la visita de nuestro técnico provincial para el próximo *${format(addDays(new Date(), 2), "EEEE d 'de' MMMM", { locale: es })}* en el horario de la mañana. ¿Le resulta conveniente recibirlo en ese horario?`
      },
      {
        title: "Mensaje 3 - Dictamen Aceptado (Cubre Garantía)",
        desc: "Se envía cuando se confirma que aplica la garantía real para reposición del equipo.",
        text: `Estimado(a) ${c.clientName}, le escribo para informarle sobre la inspección técnica realizada. El técnico constató que el fallo del inversor se debe a un componente defectuoso interno, por lo cual **aplica la garantía real de Convoltaje**.

El Director Ángel ya autorizó la salida de un inversor MUST nuevo de nuestro almacén central para su reposición inmediata. Mañana en la mañana el equipo técnico acudirá a su vivienda para retirar el equipo defectuoso, montar el nuevo inversor y dejar su sistema funcionando al 100%, sin costo adicional.

Para nuestra empresa, el cumplimiento del compromiso y la seriedad con nuestros clientes en Cuba son prioridad. Agradecemos su comprensión.`
      },
      {
        title: "Mensaje 4 - Dictamen Rechazado (Fuera de Garantía o Mala Manipulación)",
        desc: "Se envía si la garantía expiró o si el daño fue causado por eventos no cubiertos (rayos, soldadoras, etc.).",
        text: `Estimado(a) ${c.clientName}, le escribo para comunicarle el dictamen técnico tras la revisión presencial en su vivienda.

El técnico provincial y el ingeniero Yasiel evaluaron la tarjeta de potencia del inversor y determinaron que el daño se debió a:
${wInfo.isActive 
  ? `❌ Una sobrecarga masiva externa provocada por la conexión de un equipo de alto consumo (soldadora de arco), lo cual excede la capacidad del sistema y anula la garantía de instalación y equipos.` 
  : `❌ El sistema ya se encuentra fuera del plazo de la garantía de instalación (la cual expiró el ${wInfo.expirationDate}).`}

Por este motivo, no aplica la reposición del equipo libre de costo por parte de Convoltaje. No obstante, le ofrecemos el servicio de reparación técnica. El costo estimado de los componentes de reemplazo y la mano de obra del técnico es de *$250 USD*.

Por favor, infórmenos si desea que autoricemos la reparación para coordinar el trabajo esta misma semana.`
      },
      {
        title: "Mensaje 5 - Seguimiento y Acompañamiento Diario",
        desc: "Mensaje diario de cortesía para mantener al cliente informado del estado.",
        text: `Estimado(a) ${c.clientName}, espero que se encuentre muy bien. Le escribo para mantenerle al tanto del estado de su caso.

Actualmente nos encontramos en la fase de *${
          c.status === "diagnostico" ? "Diagnóstico técnico remoto" :
          c.status === "visita" ? "Asignación y traslado del técnico provincial" :
          c.status === "dictamen" ? "Evaluación del dictamen de cobertura" : "Preparación del equipo de reposición en almacén"
        }*. Todo el equipo de Convoltaje está trabajando para solucionar la interrupción de su servicio solar a la mayor brevedad.

Mañana le contactaré nuevamente a esta hora con una nueva actualización, o antes si el técnico nos reporta novedades. Si tiene alguna duda o consulta, puede escribirme por aquí. ¡Le deseamos un excelente día!`
      }
    ];
  };

  const templatesList = getTemplates(selectedComplaint);

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">Quejas y Garantías</h2>
          <p className="text-white/60 text-xs">Gestión técnica y soporte post-venta en Cuba.</p>
        </div>
        
        {activeTab === "lista" && (
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-[#FF6B35] hover:bg-[#e05a2b] rounded-xl text-white transition-all shadow-lg shadow-[#FF6B35]/20"
          >
            <Plus size={14} />
            <span>{showAddForm ? "Cerrar" : "Nuevo"}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1 bg-black/25 rounded-2xl p-1 border border-white/5 mb-6">
        <button
          onClick={() => setActiveTab("lista")}
          className={`rounded-xl py-2.5 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5
            ${activeTab === "lista" 
              ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
        >
          <ClipboardList size={14} />
          <span>Pipeline de Quejas</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("manual");
            if (!selectedComplaintId && complaints.length > 0) {
              setSelectedComplaintId(complaints[0].id);
            }
          }}
          className={`rounded-xl py-2.5 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5
            ${activeTab === "manual" 
              ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
        >
          <BookOpen size={14} />
          <span>Manual de Respuestas</span>
        </button>
      </div>

      {/* Formulario de Nueva Queja */}
      {showAddForm && activeTab === "lista" && (
        <form onSubmit={handleAddSubmit} className="bg-[#0a1e3f]/80 border border-white/10 rounded-[24px] p-5 mb-6 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-[#00D9FF] border-b border-white/5 pb-2">Registrar Queja de Cliente</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Cliente *</label>
              <input 
                type="text" 
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Marta Valdés"
                className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00D9FF]/40"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Teléfono *</label>
              <input 
                type="text" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+5353829104"
                className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Provincia</label>
              <select 
                value={provincia}
                onChange={e => setProvincia(e.target.value)}
                className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D9FF]/40"
              >
                <option value="La Habana">La Habana</option>
                <option value="Mayabeque">Mayabeque</option>
                <option value="Artemisa">Artemisa</option>
                <option value="Matanzas">Matanzas</option>
                <option value="Pinar del Río">Pinar del Río</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Sistema Solar</label>
              <select 
                value={systemType}
                onChange={e => setSystemType(e.target.value)}
                className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00D9FF]/40"
              >
                <option value="Sistema Básico - 1500W">Sistema Básico - 1500W</option>
                <option value="Sistema Solar - Medio 3000W">Sistema Solar - Medio 3000W</option>
                <option value="Sistema Solar Aire Acondicionado 3000W">Sistema Solar AC 3000W</option>
                <option value="Sistema Avanzado 6000W">Sistema Avanzado 6000W</option>
                <option value="Sistema 6K PLUS">Sistema 6K PLUS</option>
                <option value="Sistema Premium 10000W">Sistema Premium 10000W</option>
                <option value="EcoFlow DELTA 2 Max (integrado)">EcoFlow DELTA 2 Max (integrado)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Fecha de Instalación *</label>
              <input 
                type="date" 
                value={installationDate}
                onChange={e => setInstallationDate(e.target.value)}
                className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Error MUST (Opcional)</label>
              <input 
                type="text" 
                value={errorMust}
                onChange={e => setErrorMust(e.target.value)}
                placeholder="Ej: Error 08, Error 07"
                className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Síntomas / Detalle del Fallo *</label>
              <textarea 
                value={symptom}
                onChange={e => setSymptom(e.target.value)}
                placeholder="Explicación del comportamiento del inversor o baterías..."
                rows={3}
                className="bg-black/35 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00D9FF]/40 font-sans"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#FF6B35] hover:bg-[#e05a2b] rounded-xl text-xs font-bold text-white transition-all shadow-lg mt-2"
          >
            Registrar Queja e Iniciar Diagnóstico
          </button>
        </form>
      )}

      {/* Pestaña 1: Pipeline de Quejas */}
      {activeTab === "lista" && (
        <div className="space-y-4">
          {complaints.map(c => {
            const isExpanded = selectedComplaintId === c.id;
            const wInfo = getWarrantyInfo(c.installationDate, c.warrantyMonths);
            
            // Calculate progress percentage
            const totalChecks = c.checklist.length;
            const completedChecks = c.checklist.filter(item => item.completed).length;
            const progressPercent = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;

            // Border based on warranty status
            const borderClass = wInfo.isActive 
              ? "border-red-500/25 shadow-[inset_0_1px_4px_rgba(239,68,68,0.1)]" 
              : "border-white/10";

            return (
              <div 
                key={c.id}
                className={`w-full bg-[#0a1e3f]/40 border ${borderClass} rounded-[24px] overflow-hidden shadow-lg transition-all duration-300`}
              >
                {/* Header */}
                <div 
                  onClick={() => setSelectedComplaintId(isExpanded ? null : c.id)}
                  className="p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                        {c.systemType}
                      </span>
                      {wInfo.isActive ? (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-500/25 text-red-400 text-[8px] font-bold uppercase tracking-wide">
                          <ShieldCheck size={8} /> Garantía Activa
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/10 text-white/40 text-[8px] font-bold uppercase tracking-wide">
                          <ShieldAlert size={8} /> Sin Garantía
                        </span>
                      )}
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-white/30 capitalize">
                      {c.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 flex items-center justify-between">
                    <span>{c.clientName}</span>
                    {c.errorMust && (
                      <span className="text-xs bg-[#FF6B35]/25 text-[#FF6B35] font-black px-2 py-0.5 rounded-md flex items-center gap-0.5">
                        <AlertOctagon size={10} /> {c.errorMust}
                      </span>
                    )}
                  </h3>

                  <div className="flex flex-col gap-1.5 text-xs text-white/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-white/40" />
                      <span>{c.location} ({c.provincia})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-white/40" />
                      {wInfo.isActive ? (
                        <span className="text-red-400 font-semibold">Vence en {wInfo.daysLeft} días (Garantía Real)</span>
                      ) : (
                        <span className="text-white/40">Garantía vencida hace {wInfo.daysLeft} días</span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white/5 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full
                        ${wInfo.isActive ? "bg-red-500" : "bg-[#00D9FF]"}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Detailed view */}
                {isExpanded && (
                  <div className="px-4 pb-5 pt-1 border-t border-white/5 bg-[#071630]/30 space-y-4 animate-fade-in">
                    
                    <div className="grid grid-cols-2 gap-3 text-xs border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[10px] text-white/40 block font-bold">FECHA INSTALACIÓN</span>
                        <span className="text-white font-medium">{c.installationDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/40 block font-bold">TÉCNICO SOPORTE</span>
                        <span className="text-white font-medium">{c.assignedTech || "Yasiel (Director Técnico)"}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-white/40 block font-bold">DESCRIPCIÓN DEL FALLO</span>
                        <p className="text-white/70 leading-relaxed font-sans mt-0.5 bg-black/15 p-3 rounded-xl border border-white/5">{c.symptom}</p>
                      </div>
                    </div>

                    {/* Interactive workflow checklist */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-white/40 block font-bold tracking-wider mb-2">Checklist de Atención y Garantía</span>
                      <div className="space-y-2 bg-black/25 rounded-2xl p-3 border border-white/5">
                        {c.checklist.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => handleToggleCheck(c.id, item.id)}
                            className="flex items-center gap-2.5 py-1.5 cursor-pointer select-none group"
                          >
                            {item.completed ? (
                              <CheckSquare size={16} className="text-[#00D9FF] shrink-0" />
                            ) : (
                              <Square size={16} className="text-white/30 group-hover:text-white/50 shrink-0" />
                            )}
                            <span className={`text-xs transition-colors
                              ${item.completed ? 'text-white/50 line-through' : 'text-white/95'}`}
                            >
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => {
                          setActiveTab("manual");
                          setSelectedComplaintId(c.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold text-[#00D9FF] transition-all active:scale-[0.98]"
                      >
                        <BookOpen size={14} />
                        <span>Ver Respuestas</span>
                      </button>
                      <button 
                        onClick={() => {
                          const message = `Hola ${c.clientName}, te escribo de Convoltaje. Ya el técnico Yasiel está revisando el reporte del error.`;
                          const encodedMessage = encodeURIComponent(message);
                          const whatsappUrl = `https://wa.me/${c.phone.replace(/\D/g, "")}?text=${encodedMessage}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-xs font-bold text-white transition-all active:scale-[0.98]"
                      >
                        <MessageSquare size={14} />
                        <span>WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`¿Estás seguro de eliminar el reporte de ${c.clientName}?`)) {
                            const updated = complaints.filter(i => i.id !== c.id);
                            saveToStorage(updated);
                            setSelectedComplaintId(null);
                            toast.success("Reporte eliminado.");
                          }
                        }}
                        className="p-2.5 bg-red-950/40 border border-red-500/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded-xl transition-all"
                        title="Eliminar Reporte"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pestaña 2: Manual de Respuestas de WhatsApp */}
      {activeTab === "manual" && (
        <div className="space-y-6">
          
          {/* Selector de Cliente Activo */}
          <div className="bg-[#0a1e3f]/60 border border-white/10 rounded-[20px] p-4">
            <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider block mb-2">Seleccionar Cliente para Generar Respuestas:</label>
            <select
              value={selectedComplaintId || ""}
              onChange={e => setSelectedComplaintId(e.target.value)}
              className="w-full bg-black/35 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D9FF]/40"
            >
              {complaints.map(c => (
                <option key={c.id} value={c.id}>{c.clientName} - {c.systemType} ({c.errorMust || "Fallo"})</option>
              ))}
            </select>
          </div>

          {/* Advertencia / Política de Garantía */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-[20px] text-xs text-amber-300 leading-relaxed">
            <span className="font-bold flex items-center gap-1 mb-1 text-amber-400">
              <AlertTriangle size={14} /> Recordatorio del Negocio (Cuba):
            </span>
            La garantía Convoltaje cubre el 100% de los repuestos y la mano de obra del equipo e instalación por fallos internos del sistema. Si expiró el tiempo, o si el daño fue por una descarga atmosférica o mal uso (ej: conectar equipos de alto amperaje no recomendados), la garantía se rechaza y se cotiza la reparación. El contacto diario con el cliente es obligatorio mientras persista el corte del servicio solar.
          </div>

          {/* Templates list */}
          <div className="space-y-4">
            {templatesList.map((tpl, idx) => (
              <div key={idx} className="bg-[#071630]/60 border border-white/5 rounded-[24px] p-4 space-y-3 shadow-md">
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#00D9FF]">{tpl.title}</h4>
                    <p className="text-[10px] text-white/40 mt-0.5">{tpl.desc}</p>
                  </div>
                  <button
                    onClick={() => handleCopyText(tpl.text)}
                    className="p-2 hover:bg-white/5 text-white/60 hover:text-white rounded-lg border border-white/10 transition-colors flex items-center justify-center"
                    title="Copiar Mensaje"
                  >
                    <Copy size={12} />
                  </button>
                </div>

                <div className="bg-black/25 rounded-2xl p-3 border border-white/5 text-xs text-white/80 font-sans leading-relaxed whitespace-pre-wrap select-all font-light">
                  {tpl.text}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
