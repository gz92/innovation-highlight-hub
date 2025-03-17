
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/Navbar";
import ParallaxBackground from "./components/ParallaxBackground";
import Home from "./pages/Home";
import ProjectBrowser from "./pages/ProjectBrowser";
import Index from "./pages/Index";
import SubmitInnovation from "./pages/SubmitInnovation";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Get the base URL from the environment or use a default for GitHub Pages
const baseUrl = import.meta.env.BASE_URL || '/innovation-highlight-hub/';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={baseUrl}>
          <ParallaxBackground>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectBrowser />} />
              <Route path="/project-details" element={<Index />} />
              <Route path="/submit" element={<SubmitInnovation />} />
              <Route path="/services" element={<Services />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ParallaxBackground>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
