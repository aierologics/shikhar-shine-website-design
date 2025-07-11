
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminTeachers from "./pages/AdminTeachers";
import AdminClasses from "./pages/AdminClasses";
import AdminFeeDeposits from "./pages/AdminFeeDeposits";
import AdminHostels from "./pages/AdminHostels";
import AdminTransport from "./pages/AdminTransport";
import AdminInventory from "./pages/AdminInventory";
import AdminVisitors from "./pages/AdminVisitors";
import AdminExams from "./pages/AdminExams";
import AdminTimetable from "./pages/AdminTimetable";
import AdminAdmissions from "./pages/AdminAdmissions";
import AdminNotices from "./pages/AdminNotices";
import AdminGallery from "./pages/AdminGallery";
import AdminSettings from "./pages/AdminSettings";
import FeeDetails from "./pages/FeeDetails";
import { Contact } from "lucide-react";
import About from "./pages/About";
import AdmissionDocuments from "./pages/AdmissionDocuments";
import Admissions from "./pages/Admissions";
import Auth from "./pages/Auth";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import MandatoryPublicDisclosure from "./pages/MandatoryPublicDisclosure";
import Programs from "./pages/Programs";
import StaffDetails from "./pages/StaffDetails";
import TCVerification from "./pages/TCVerification";
import ContactSection from "./components/ContactSection";
import AdminFees from "./pages/AdminFees";

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
            <Route path="/contact" element={<ContactSection />} />
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
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admissions" element={<AdminAdmissions />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="timetable" element={<AdminTimetable />} />
            <Route path="fees" element={<AdminFees/>} />
            <Route path="fee-deposits" element={<AdminFeeDeposits />} />
            <Route path="hostels" element={<AdminHostels />} />
            <Route path="transport" element={<AdminTransport />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="visitors" element={<AdminVisitors />} />
            <Route path="exams" element={<AdminExams />} />
            <Route path="notices" element={<AdminNotices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
