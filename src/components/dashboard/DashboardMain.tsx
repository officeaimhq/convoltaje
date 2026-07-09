import { Switch, Route } from "wouter";
import DashboardWelcome from "./DashboardWelcome";
import DashboardLogin from "./DashboardLogin";

// Componente placeholder para el panel principal una vez logueado (Fase 2)
function DashboardPanel() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <h1 className="text-2xl font-bold text-slate-800">Panel Principal (Calendario en construcción...)</h1>
    </div>
  );
}

export default function DashboardMain() {
  return (
    <Switch>
      {/* Las rutas aquí son relativas al dominio, ya que en App.tsx capturamos todo lo que empiece por /admin */}
      <Route path="/admin">
        <DashboardWelcome />
      </Route>
      <Route path="/admin/login" component={DashboardLogin} />
      <Route path="/admin/panel" component={DashboardPanel} />
      
      {/* Fallback interno del dashboard */}
      <Route>
        <DashboardWelcome />
      </Route>
    </Switch>
  );
}
