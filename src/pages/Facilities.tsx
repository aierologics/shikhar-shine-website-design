
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import FacilitiesSection from '@/components/FacilitiesSection';
import Footer from '@/components/Footer';

const Facilities = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <FacilitiesSection />
      </div>

      <Footer />
    </div>
  );
};

export default Facilities;
