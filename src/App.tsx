
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Index from "./pages/Index";
import AdminLayout from "./components/AdminLayout";
import AdminPanel from "./pages/AdminPanel";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admissions" element={<AdminAdmissions />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="timetable" element={<AdminTimetable />} />
            <Route path="fees" element={<div>Fee Structure Management - Coming Soon</div>} />
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
