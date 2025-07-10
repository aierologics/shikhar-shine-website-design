import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import Admissions from "./pages/Admissions";
import FeeDetails from "./pages/FeeDetails";
import TCVerification from "./pages/TCVerification";
import MandatoryPublicDisclosure from "./pages/MandatoryPublicDisclosure";
import StaffDetails from "./pages/StaffDetails";
import AdmissionDocuments from "./pages/AdmissionDocuments";
import AdminPanel from "./pages/AdminPanel";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ContactSection from "./components/ContactSection";
import Contact from "./pages/Contact";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAdmissions from "./pages/AdminAdmissions";
import AdminUsers from "./pages/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/fee-details" element={<FeeDetails />} />
            <Route path="/tc-verification" element={<TCVerification />} />
            <Route path="/mandatory-public-disclosure" element={<MandatoryPublicDisclosure />} />
            <Route path="/staff-details" element={<StaffDetails />} />
            <Route path="/admission-documents" element={<AdmissionDocuments />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes with Sidebar Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="admissions" element={<AdminAdmissions />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="fees" element={<AdminPanel />} />
              <Route path="notices" element={<AdminPanel />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
