import { Switch, Route } from "wouter";
import DashboardWelcome from "./DashboardWelcome";
import DashboardLogin from "./DashboardLogin";

import DashboardPanel from "./DashboardPanel";

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
