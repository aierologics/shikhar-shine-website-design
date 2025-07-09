
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation/>
      <div className="pt-16">
        <ContactSection/>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
