
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Nurturing 
              <span className="text-school-blue"> Bright </span>
              Minds for a 
              <span className="text-school-orange"> Better </span>
              Tomorrow
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At Shikhar Shishu Sadan, we believe every child is unique and deserves 
              quality education that fosters creativity, critical thinking, and character 
              development in a nurturing environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-school-blue hover:bg-school-blue/90 text-white px-8 py-4 text-lg"
                onClick={scrollToContact}
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-school-orange text-school-orange hover:bg-school-orange hover:text-white px-8 py-4 text-lg"
              >
                Virtual Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-school-blue/10 rounded-full mb-3 mx-auto">
                  <BookOpen className="h-6 w-6 text-school-blue" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-school-orange/10 rounded-full mb-3 mx-auto">
                  <Users className="h-6 w-6 text-school-orange" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-school-gold/10 rounded-full mb-3 mx-auto">
                  <Award className="h-6 w-6 text-school-gold" />
                </div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative animate-fade-in">
            <div className="relative">
              <img 
                src="/lovable-uploads/26ea3a81-b7f3-40c6-9fdf-a5fbc0868d77.png" 
                alt="Shikhar Shishu Sadan" 
                className="w-full max-w-md mx-auto animate-float"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-school-blue/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-school-orange/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-school-gold/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
