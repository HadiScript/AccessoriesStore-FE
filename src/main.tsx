import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";

import "./global.css";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx";

import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <Toaster visibleToasts={1} position="top-right" richColors />
        <AppRoutes />
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </Router>
);
