import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { config } from "@/config/env";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";

function AppRouter() {
  return (
    <Router base={config.basePath}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <AppRouter />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
