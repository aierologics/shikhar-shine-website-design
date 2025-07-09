
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StaffDetails = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">    
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-school-blue mb-4">Staff Details</h1>
            <p className="text-xl text-gray-600">Shikhar Shishu Sadan Sr. Sec. School, Dhampur(Bijnore)</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-school-blue">Staff Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center py-8">
                Staff details and information will be updated here soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StaffDetails;
