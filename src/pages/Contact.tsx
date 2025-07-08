
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-school-blue hover:text-school-orange transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
