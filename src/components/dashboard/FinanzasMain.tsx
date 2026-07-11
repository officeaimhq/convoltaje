import { useState } from "react";
import { 
  TrendingUp, TrendingDown, DollarSign, Wallet, 
  Calendar, Users, ArrowUpRight, ArrowDownRight, 
  Plus, CheckCircle, Clock, Percent, ShieldCheck, 
  AlertTriangle, Landmark, HelpCircle, ToggleLeft, ToggleRight,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

export interface Transaction {
  id: string;
  concept: string;
  type: "ingreso" | "gasto_fijo" | "gasto_obra" | "comision";
  amount: number; // Siempre guardado en USD internamente
  originalAmount: number;
  originalCurrency: "USD" | "MLC" | "CUP";
  date: string; // YYYY-MM-DD
  paymentMethod: string; // "Efectivo", "Zelle", "Bizum", "Transferencia MLC", "CUP Efectivo"
  associatedCommercial?: string;
  status: "completado" | "pendiente";
}

const TASA_EL_TOQUE_MOCK = 675; // 670 CUP oficial + 5 CUP de ajuste

const defaultTransactions: Transaction[] = [
  {
    id: "tx-1",
    concept: "Ingreso - Venta de Sistema 6K PLUS (María Gómez)",
    type: "ingreso",
    amount: 9200,
    originalAmount: 9200,
    originalCurrency: "USD",
    date: "2026-07-05",
    paymentMethod: "Zelle",
    associatedCommercial: "Laura Vice",
    status: "completado"
  },
  {
    id: "tx-2",
    concept: "Ingreso - Venta de Sistema Premium 10kW (Héctor Valdés)",
    type: "ingreso",
    amount: 9850,
    originalAmount: 9850,
    originalCurrency: "USD",
    date: "2026-07-08",
    paymentMethod: "Zelle",
    associatedCommercial: "Laura Vice",
    status: "completado"
  },
  {
    id: "tx-3",
    concept: "Ingreso - Venta de Sistema Solar Medio 3000W (Carlos López)",
    type: "ingreso",
    amount: 3200,
    originalAmount: 2160000,
    originalCurrency: "CUP",
    date: "2026-07-09",
    paymentMethod: "CUP Efectivo",
    associatedCommercial: "Angel CEO",
    status: "completado"
  },
  {
    id: "tx-4",
    concept: "Gasto de Obra - Combustible para camión de técnicos (Mayabeque)",
    type: "gasto_obra",
    amount: 50,
    originalAmount: 33750,
    originalCurrency: "CUP",
    date: "2026-07-06",
    paymentMethod: "CUP Efectivo",
    status: "completado"
  },
  {
    id: "tx-5",
    concept: "Gasto de Obra - Viáticos alimentación taller en Playa",
    type: "gasto_obra",
    amount: 30,
    originalAmount: 20250,
    originalCurrency: "CUP",
    date: "2026-07-07",
    paymentMethod: "CUP Efectivo",
    status: "completado"
  },
  {
    id: "tx-6",
    concept: "Gasto de Obra - Tornillería y herrajes adicionales comprados en La Habana",
    type: "gasto_obra",
    amount: 75,
    originalAmount: 75,
    originalCurrency: "USD",
    date: "2026-07-08",
    paymentMethod: "Efectivo",
    status: "completado"
  },
  {
    id: "tx-7",
    concept: "Comisión - Laura Vice por venta de Sistema 6K PLUS",
    type: "comision",
    amount: 120,
    originalAmount: 120,
    originalCurrency: "USD",
    date: "2026-07-05",
    paymentMethod: "Zelle",
    associatedCommercial: "Laura Vice",
    status: "pendiente"
  },
  {
    id: "tx-8",
    concept: "Comisión - Laura Vice por venta de Premium 10kW",
    type: "comision",
    amount: 250,
    originalAmount: 250,
    originalCurrency: "USD",
    date: "2026-07-08",
    paymentMethod: "Zelle",
    associatedCommercial: "Laura Vice",
    status: "completado"
  },
  {
    id: "tx-9",
    concept: "Comisión - Diana (Matanzas) por venta de Sistema Básico a Pedro Martínez",
    type: "comision",
    amount: 50,
    originalAmount: 50,
    originalCurrency: "USD",
    date: "2026-07-10",
    paymentMethod: "Bizum",
    associatedCommercial: "⚡ Diana",
    status: "pendiente"
  }
];

// Gastos Fijos Corporativos de la empresa (Mensuales)
const defaultFixedExpenses = [
  { name: "Salario Fijo - Yasiel (Dir. Técnico)", amount: 500 },
  { name: "Salario Fijo - Laura (Vice Directora)", amount: 400 },
  { name: "Salario Fijo - José Luis (Mkt / Contable)", amount: 400 },
  { name: "Alquiler Taller y Almacén (La Habana)", amount: 300 },
  { name: "Presupuesto Publicidad Mensual Ads (José Luis)", amount: 250 },
  { name: "Infraestructura Cloud (Supabase, hosting, APIs)", amount: 50 }
];

export default function FinanzasMain() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("convoltaje_transactions");
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [fixedExpenses] = useState(defaultFixedExpenses);
  const [activeTab, setActiveTab] = useState<"resumen" | "transacciones" | "comisiones">("resumen");
  const [currencyMode, setCurrencyMode] = useState<"USD" | "CUP">("USD");
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [concept, setConcept] = useState("");
  const [type, setType] = useState<"ingreso" | "gasto_obra" | "comision">("ingreso");
  const [amountInput, setAmountInput] = useState("");
  const [currency, setCurrency] = useState<"USD" | "MLC" | "CUP">("USD");
  const [paymentMethod, setPaymentMethod] = useState("Zelle");
  const [commercial, setCommercial] = useState("Laura Vice");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Plan de Ventas Mensual de Convoltaje
  const SALES_PLAN_GOAL = 35000; // $35,000 USD de meta

  const saveToStorage = (updated: Transaction[]) => {
    setTransactions(updated);
    localStorage.setItem("convoltaje_transactions", JSON.stringify(updated));
  };

  // Convert USD values to CUP if toggle is active
  const formatCurrency = (usdVal: number) => {
    if (currencyMode === "CUP") {
      const cupVal = usdVal * TASA_EL_TOQUE_MOCK;
      return new Intl.NumberFormat("es-CU", { style: "currency", currency: "CUP", minimumFractionDigits: 0 }).format(cupVal);
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(usdVal);
  };

  // Totals calculations
  const totalSalesIncome = transactions
    .filter(t => t.type === "ingreso" && t.status === "completado")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalFixedExpenses = fixedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalWorksExpenses = transactions
    .filter(t => t.type === "gasto_obra")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalCommissions = transactions
    .filter(t => t.type === "comision")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalCommissionsPaid = transactions
    .filter(t => t.type === "comision" && t.status === "completado")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalCommissionsPending = transactions
    .filter(t => t.type === "comision" && t.status === "pendiente")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpensesCombined = totalFixedExpenses + totalWorksExpenses + totalCommissions;
  const netProfit = totalSalesIncome - totalExpensesCombined;
  const profitMarginPercent = totalSalesIncome > 0 ? Math.round((netProfit / totalSalesIncome) * 100) : 0;

  // Plan de Ventas Progress
  const salesPlanPercent = Math.min(Math.round((totalSalesIncome / SALES_PLAN_GOAL) * 100), 100);

  // Form submit handler
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept || !amountInput || !date) {
      toast.error("Por favor, llene todos los campos obligatorios.");
      return;
    }

    const numericAmount = parseFloat(amountInput);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Monto inválido.");
      return;
    }

    // Convert amount to USD internally
    let amountInUsd = numericAmount;
    if (currency === "CUP") {
      amountInUsd = numericAmount / TASA_EL_TOQUE_MOCK;
    }

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      concept,
      type,
      amount: amountInUsd,
      originalAmount: numericAmount,
      originalCurrency: currency,
      date,
      paymentMethod,
      associatedCommercial: type === "comision" || type === "ingreso" ? commercial : undefined,
      status: "completado"
    };

    const updated = [newTx, ...transactions];
    saveToStorage(updated);

    setConcept("");
    setAmountInput("");
    setShowAddForm(false);
    toast.success("Transacción registrada correctamente.");
  };

  // Toggle commission state
  const handleToggleCommission = (txId: string) => {
    const updated = transactions.map(t => {
      if (t.id === txId) {
        const newStatus = t.status === "completado" ? "pendiente" : "completado";
        toast.success(newStatus === "completado" ? "Comisión pagada y asentada." : "Comisión marcada como pendiente.");
        return { ...t, status: newStatus };
      }
      return t;
    });
    saveToStorage(updated);
  };

  // Delete transaction
  const handleDeleteTx = (id: string, concept: string) => {
    if (confirm(`¿Estás seguro de eliminar el registro financiero: "${concept}"?`)) {
      const updated = transactions.filter(t => t.id !== id);
      saveToStorage(updated);
      toast.success("Transacción eliminada del libro contable.");
    }
  };

  // Filter commissions for view
  const commissionsList = transactions.filter(t => t.type === "comision");

  return (
    <div className="w-full flex flex-col font-sans text-white pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">Finanzas Corporativas</h2>
          <p className="text-white/60 text-xs">El Espejo Financiero de Convoltaje para Ángel.</p>
        </div>

        {/* Currency Switcher */}
        <button
          onClick={() => setCurrencyMode(currencyMode === "USD" ? "CUP" : "USD")}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#0a1e3f]/60 hover:bg-[#0a1e3f] border border-white/10 rounded-xl text-xs transition-all active:scale-[0.98]"
        >
          {currencyMode === "USD" ? <ToggleLeft size={18} className="text-[#00D9FF]" /> : <ToggleRight size={18} className="text-[#FF6B35]" />}
          <span className="font-bold">Ver en {currencyMode === "USD" ? "CUP" : "USD"}</span>
        </button>
      </div>

      {/* Tasa El Toque + 5 CUP Alert */}
      <div className="p-3 bg-[#0a1e3f]/80 border border-white/5 rounded-2xl flex items-center justify-between text-xs text-white/70 mb-6">
        <div className="flex items-center gap-2">
          <Landmark size={14} className="text-[#00D9FF]" />
          <span>Tasa elTOQUE + 5 CUP ajustada hoy:</span>
        </div>
        <span className="font-mono font-bold text-[#FF6B35]">{TASA_EL_TOQUE_MOCK}.00 CUP/USD</span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-black/25 rounded-2xl p-1 border border-white/5 mb-6">
        <button
          onClick={() => {
            setActiveTab("resumen");
            setShowAddForm(false);
          }}
          className={`rounded-xl py-2.5 text-xs font-bold transition-all text-center
            ${activeTab === "resumen" 
              ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
        >
          Resumen Ángel
        </button>
        <button
          onClick={() => {
            setActiveTab("transacciones");
          }}
          className={`rounded-xl py-2.5 text-xs font-bold transition-all text-center
            ${activeTab === "transacciones" 
              ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
        >
          Libro Diario
        </button>
        <button
          onClick={() => {
            setActiveTab("comisiones");
            setShowAddForm(false);
          }}
          className={`rounded-xl py-2.5 text-xs font-bold transition-all text-center
            ${activeTab === "comisiones" 
              ? 'bg-[#00D9FF] text-[#0b1b33] shadow-md' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
        >
          Comisiones
        </button>
      </div>

      {/* Pestaña 1: Resumen Ángel (P&L y Plan de Ventas) */}
      {activeTab === "resumen" && (
        <div className="space-y-6">
          
          {/* Cumplimiento Plan de Ventas */}
          <div className="bg-[#0a1e3f]/40 border border-white/10 rounded-[24px] p-5 shadow-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">PLAN DE VENTAS MENSUAL</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Progreso de la Meta</h3>
              </div>
              <span className="text-xs bg-[#00D9FF]/20 text-[#00D9FF] font-black px-2 py-0.5 rounded-full">
                {salesPlanPercent}% Completado
              </span>
            </div>

            <div className="flex justify-between text-xs text-white/60 font-mono">
              <span>Llevamos: {formatCurrency(totalSalesIncome)}</span>
              <span>Meta: {formatCurrency(SALES_PLAN_GOAL)}</span>
            </div>

            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00D9FF] to-emerald-400 transition-all duration-700 rounded-full"
                style={{ width: `${salesPlanPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-white/40 italic">
              * Facturación unificada en base a ventas confirmadas e instaladas del mes de Julio.
            </p>
          </div>

          {/* Balance Ejecutivo (P&L) */}
          <div className="grid grid-cols-2 gap-3">
            
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-[20px] p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-emerald-400 font-bold block uppercase tracking-wider">INGRESOS DE VENTAS</span>
                <span className="text-xl font-bold text-emerald-300 mt-1 block">{formatCurrency(totalSalesIncome)}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400/70 mt-3">
                <ArrowUpRight size={12} />
                <span>Cobros 100% liquidados</span>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-500/20 rounded-[20px] p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-red-400 font-bold block uppercase tracking-wider">EGRESOS TOTALES</span>
                <span className="text-xl font-bold text-red-300 mt-1 block">{formatCurrency(totalExpensesCombined)}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-red-400/70 mt-3">
                <ArrowDownRight size={12} />
                <span>Fijos + variables + comisiones</span>
              </div>
            </div>

            <div className="col-span-2 bg-[#071630]/60 border border-white/10 rounded-[24px] p-5 flex items-center justify-between shadow-md">
              <div>
                <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">UTILIDAD NETA ESTIMADA</span>
                <span className={`text-2xl font-black mt-1 block ${netProfit >= 0 ? "text-[#00D9FF]" : "text-[#FF6B35]"}`}>
                  {formatCurrency(netProfit)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">MARGEN DE UTILIDAD</span>
                <span className="text-lg font-black text-white mt-1 block flex items-center justify-end gap-1">
                  <Percent size={14} className="text-white/40" /> {profitMarginPercent}%
                </span>
              </div>
            </div>

          </div>

          {/* Desglose de Gastos Fijos de la Empresa */}
          <div className="bg-[#0a1e3f]/40 border border-white/10 rounded-[24px] p-5 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">NÓMINAS Y GASTOS FIJOS MENSUALES</h3>
            
            <div className="space-y-2.5">
              {fixedExpenses.map((exp, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-white/70">{exp.name}</span>
                  <span className="font-mono font-bold text-white">{formatCurrency(exp.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-xs font-bold border-t border-white/5 pt-2 text-[#00D9FF]">
                <span>Total Nóminas y Fijos</span>
                <span className="font-mono">{formatCurrency(totalFixedExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Resumen de Comisiones */}
          <div className="bg-[#0a1e3f]/40 border border-white/10 rounded-[24px] p-5 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">ESTADO DE COMISIONES A COMERCIALES</h3>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                <span className="text-[9px] text-white/40 block font-bold uppercase tracking-wider">COMISIONES PAGADAS</span>
                <span className="text-sm font-bold text-emerald-400 font-mono mt-1 block">{formatCurrency(totalCommissionsPaid)}</span>
              </div>
              <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                <span className="text-[9px] text-white/40 block font-bold uppercase tracking-wider">COMISIONES PENDIENTES</span>
                <span className="text-sm font-bold text-amber-400 font-mono mt-1 block">{formatCurrency(totalCommissionsPending)}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Pestaña 2: Libro Diario (Transacciones) */}
      {activeTab === "transacciones" && (
        <div className="space-y-4">
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">{transactions.length} registros en total.</span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#FF6B35] hover:bg-[#e05a2b] rounded-xl text-[11px] font-bold transition-all"
            >
              <Plus size={12} />
              <span>{showAddForm ? "Cerrar" : "Añadir"}</span>
            </button>
          </div>

          {/* Formulario de Transacción */}
          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="bg-[#0a1e3f]/80 border border-white/10 rounded-[24px] p-5 space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-[#00D9FF] border-b border-white/5 pb-2 uppercase tracking-wider">Añadir Transacción</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Concepto *</label>
                  <input 
                    type="text" 
                    value={concept}
                    onChange={e => setConcept(e.target.value)}
                    placeholder="Ej. Ingreso - Venta kit 3kW a..."
                    className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Tipo *</label>
                  <select 
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="ingreso">Ingreso (Venta)</option>
                    <option value="gasto_obra">Gasto Variable de Obra</option>
                    <option value="comision">Comisión Comercial</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Monto *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={amountInput}
                    onChange={e => setAmountInput(e.target.value)}
                    placeholder="Monto"
                    className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Moneda *</label>
                  <select 
                    value={currency}
                    onChange={e => setCurrency(e.target.value as any)}
                    className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="USD">USD</option>
                    <option value="MLC">MLC</option>
                    <option value="CUP">CUP</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Método de Pago</label>
                  <select 
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                    className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Zelle">Zelle (USD)</option>
                    <option value="Efectivo">Efectivo (USD)</option>
                    <option value="Bizum">Bizum (USD)</option>
                    <option value="Transferencia MLC">Transferencia (MLC)</option>
                    <option value="CUP Efectivo">Efectivo (CUP)</option>
                  </select>
                </div>

                {(type === "ingreso" || type === "comision") && (
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Comercial Vinculado</label>
                    <select 
                      value={commercial}
                      onChange={e => setCommercial(e.target.value)}
                      className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Laura Vice">Laura Vice</option>
                      <option value="⚡ Jose">⚡ Jose (La Habana)</option>
                      <option value="⚡ Diana">⚡ Diana (Matanzas)</option>
                      <option value="⚡ Iliany">⚡ Iliany (Pinar del Río)</option>
                      <option value="⚡ Niurka">⚡ Niurka (Artemisa)</option>
                      <option value="⚡ Railyn">⚡ Railyn (Mayabeque)</option>
                      <option value="⚡ Alejandro">⚡ Alejandro (Cienfuegos)</option>
                      <option value="Angel CEO">Sin Comercial (Ángel CEO)</option>
                    </select>
                  </div>
                )}

                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Fecha *</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="bg-black/35 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#FF6B35] hover:bg-[#e05a2b] rounded-xl text-xs font-bold text-white transition-all shadow-lg mt-2"
              >
                Registrar Transacción
              </button>
            </form>
          )}

          {/* List of Ledger Entries */}
          <div className="space-y-3 animate-fade-in">
            {transactions.map(t => {
              const amountFormatted = formatCurrency(t.amount);
              
              let typeLabel = "Ingreso";
              let typeClass = "border-emerald-500/20 text-emerald-400 bg-emerald-500/5";
              if (t.type === "gasto_obra") {
                typeLabel = "Gasto Obra";
                typeClass = "border-red-500/20 text-red-400 bg-red-500/5";
              } else if (t.type === "gasto_fijo") {
                typeLabel = "Gasto Fijo";
                typeClass = "border-red-400/20 text-red-300 bg-red-400/5";
              } else if (t.type === "comision") {
                typeLabel = "Comisión";
                typeClass = "border-[#00D9FF]/20 text-[#00D9FF] bg-[#00D9FF]/5";
              }

              return (
                <div 
                  key={t.id}
                  className={`border ${typeClass.split(" ")[0]} bg-[#0a1e3f]/40 p-4 rounded-[20px] flex justify-between items-center shadow-md`}
                >
                  <div className="space-y-1 max-w-[70%]">
                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ${typeClass.split(" ").slice(1).join(" ")}`}>
                        {typeLabel}
                      </span>
                      <span className="text-[10px] text-white/30 font-mono">{t.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight truncate">{t.concept}</h4>
                    <p className="text-[10px] text-white/50">
                      Monto original: <span className="font-mono">{t.originalAmount} {t.originalCurrency}</span> · {t.paymentMethod}
                    </p>
                  </div>

                  <div className="text-right space-y-1.5">
                    <span className="text-sm font-black block font-mono">{amountFormatted}</span>
                    <div className="flex gap-1.5 justify-end">
                      {t.type === "comision" && (
                        <button
                          onClick={() => handleToggleCommission(t.id)}
                          className={`text-[8px] px-2 py-0.5 rounded-md font-bold uppercase transition-all
                            ${t.status === "completado" 
                              ? "bg-emerald-500/20 text-emerald-400" 
                              : "bg-amber-500/20 text-amber-400"
                            }`}
                        >
                          {t.status === "completado" ? "Pagado" : "Pendiente"}
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTx(t.id, t.concept)}
                        className="p-1 hover:bg-red-500/10 text-white/30 hover:text-red-400 rounded-md transition-colors"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Pestaña 3: Comisiones por Comercial */}
      {activeTab === "comisiones" && (
        <div className="space-y-4">
          <div className="p-4 bg-[#0a1e3f]/40 border border-white/10 rounded-[20px] space-y-3">
            <h3 className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider">Nómina de Comerciales por Provincia</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              De acuerdo con las comisiones oficiales, los comerciales reciben un porcentaje en USD por la venta de sistemas (Básico $50, Medio $80, 6K $120, 10kW $250). Liquidar las comisiones pendientes desde aquí.
            </p>
          </div>

          <div className="space-y-3">
            {commissionsList.length > 0 ? (
              commissionsList.map(comm => {
                const isPaid = comm.status === "completado";
                return (
                  <div 
                    key={comm.id}
                    className={`p-4 bg-[#0a1e3f]/40 border rounded-[20px] flex justify-between items-center transition-all
                      ${isPaid ? "border-emerald-500/10 opacity-70" : "border-[#00D9FF]/20"}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{comm.associatedCommercial}</span>
                        <span className="text-[9px] text-white/40">{comm.date}</span>
                      </div>
                      <p className="text-[10px] text-white/60 leading-tight max-w-[200px]">{comm.concept}</p>
                    </div>

                    <div className="text-right space-y-2">
                      <span className="text-sm font-black block font-mono">{formatCurrency(comm.amount)}</span>
                      <button
                        onClick={() => handleToggleCommission(comm.id)}
                        className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-xl transition-all active:scale-[0.98]
                          ${isPaid 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" 
                            : "bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/20"
                          }`}
                      >
                        {isPaid ? "Liquidada" : "Pagar"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center text-white/30 text-xs py-16">
                No hay comisiones registradas en el sistema.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
