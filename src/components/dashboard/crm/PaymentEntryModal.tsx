import React, { useState } from 'react';
import { X, DollarSign, Image as ImageIcon, FileText, CreditCard } from 'lucide-react';
import { usePaymentsStore } from '@/hooks/usePaymentsStore';
import { toast } from 'sonner';

interface PaymentEntryModalProps {
  dealId: string;
  dealName: string;
  dealValue: number;
  onClose: () => void;
}

export default function PaymentEntryModal({ dealId, dealName, dealValue, onClose }: PaymentEntryModalProps) {
  const { addPayment } = usePaymentsStore();
  const [amount, setAmount] = useState<string>(dealValue.toString());
  const [currency, setCurrency] = useState<'USD' | 'CUP' | 'MLC' | 'EUR'>('MLC');
  const [method, setMethod] = useState<'Transferencia' | 'Efectivo' | 'Zelle' | 'Saldo'>('Transferencia');
  const [notes, setNotes] = useState<string>('');
  
  // Para el mock del comprobante
  const [hasScreenshot, setHasScreenshot] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      toast.error('Por favor, ingresa un monto válido.');
      return;
    }

    if (method !== 'Efectivo' && !hasScreenshot) {
      toast.error('Se requiere un comprobante para pagos no en efectivo.');
      return;
    }

    addPayment({
      deal_id: dealId,
      amount: Number(amount),
      currency: currency,
      payment_method: method.toLowerCase() as 'transferencia' | 'efectivo' | 'zelle' | 'saldo',
      status: 'en_revision',
      screenshot_url: hasScreenshot ? 'mock_transfer_new.jpg' : null,
      reviewer_id: null,
      confirmed_screenshot_url: null,
      notes: notes || `Pago de ${dealName}`
    });

    toast.success('Pago registrado y enviado a revisión.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b1b33]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b3c8f] border border-white/10 rounded-[20px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/20 text-[#00D9FF] flex items-center justify-center">
              <DollarSign size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">Registrar Pago</h3>
              <p className="text-[10px] text-[#00D9FF] font-medium mt-0.5">{dealName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Monto</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-white/40 text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-7 pr-3 text-sm text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#00D9FF]/50"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Moneda</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'USD' | 'CUP' | 'MLC' | 'EUR')}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white font-mono focus:outline-none focus:border-[#00D9FF]/50 appearance-none"
              >
                <option value="MLC">MLC</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CUP">CUP</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Método de Pago</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Transferencia', 'Efectivo', 'Zelle', 'Saldo'] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5
                    ${method === m 
                      ? 'bg-[#00D9FF]/20 border-[#00D9FF]/50 text-[#00D9FF]' 
                      : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10'
                    }`}
                >
                  <CreditCard size={14} className={method === m ? 'opacity-100' : 'opacity-50'} />
                  {m}
                </button>
              ))}
            </div>
          </div>

          {method !== 'Efectivo' && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Comprobante de Pago</label>
              <div 
                onClick={() => setHasScreenshot(!hasScreenshot)}
                className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all
                  ${hasScreenshot 
                    ? 'border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66]' 
                    : 'border-white/10 bg-black/20 hover:bg-white/5 text-white/40'
                  }`}
              >
                {hasScreenshot ? (
                  <>
                    <ImageIcon size={24} className="text-[#00FF66]" />
                    <span className="text-xs font-bold">Comprobante adjuntado (Mock)</span>
                    <span className="text-[10px] opacity-70">Clic para remover</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={24} className="opacity-50" />
                    <span className="text-xs font-medium">Clic para simular carga de imagen</span>
                    <span className="text-[10px] opacity-50">JPG, PNG, PDF (Max 5MB)</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Notas (Opcional)</label>
            <div className="relative">
              <div className="absolute top-2.5 left-3 text-white/40 pointer-events-none">
                <FileText size={14} />
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00D9FF]/50 resize-none"
                placeholder="Referencia de la transferencia, banco, etc."
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#0088FF] text-[#0b1b33] font-black text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg"
            >
              Confirmar y Enviar a Revisión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
