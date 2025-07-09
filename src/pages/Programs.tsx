
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ProgramsSection from '@/components/ProgramsSection';
import Footer from '@/components/Footer';

const Programs = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <ProgramsSection />
      </div>

      <Footer />
    </div>
  );
};

export default Programs;
