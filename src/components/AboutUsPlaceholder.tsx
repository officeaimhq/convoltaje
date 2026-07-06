import { Users } from "lucide-react";

export default function AboutUsPlaceholder() {
  return (
    <section id="nosotros" className="py-24 bg-slate-50 flex items-center justify-center border-y border-slate-200">
      <div className="container mx-auto px-4 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-cyan-100 rounded-full flex items-center justify-center">
          <Users className="w-12 h-12 text-cyan-600" />
        </div>
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Quiénes Somos</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Próximamente — Conoce al equipo de Convoltaje. Estamos trabajando en esta sección para contarte nuestra historia, misión y presentarte a los expertos detrás de nuestras soluciones solares.
        </p>
      </div>
    </section>
  );
}
