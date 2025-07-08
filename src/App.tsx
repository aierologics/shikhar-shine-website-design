
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import Admissions from "./pages/Admissions";
import FeeDetails from "./pages/FeeDetails";
import TCVerification from "./pages/TCVerification";
import MandatoryPublicDisclosure from "./pages/MandatoryPublicDisclosure";
import StaffDetails from "./pages/StaffDetails";
import AdmissionDocuments from "./pages/AdmissionDocuments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/fee-details" element={<FeeDetails />} />
          <Route path="/tc-verification" element={<TCVerification />} />
          <Route path="/mandatory-public-disclosure" element={<MandatoryPublicDisclosure />} />
          <Route path="/staff-details" element={<StaffDetails />} />
          <Route path="/admission-documents" element={<AdmissionDocuments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
