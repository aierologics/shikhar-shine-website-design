
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProgramsSection from '@/components/ProgramsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="space-y-0">
        <AboutSection />
        <ProgramsSection />
        <FacilitiesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
