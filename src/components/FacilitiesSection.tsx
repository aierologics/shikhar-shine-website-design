
import { Library, Microscope, Palette, Music, Trophy, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FacilitiesSection = () => {
  const facilities = [
    {
      icon: Library,
      title: "Well-Stocked Library",
      description: "Extensive collection of books, digital resources, and quiet study spaces for enhanced learning.",
      image: "📚"
    },
    {
      icon: Microscope,
      title: "Science Laboratory",
      description: "Modern lab equipment for hands-on experiments and scientific exploration.",
      image: "🔬"
    },
    {
      icon: Palette,
      title: "Art & Craft Studio",
      description: "Creative spaces with all necessary materials for artistic expression and skill development.",
      image: "🎨"
    },
    {
      icon: Music,
      title: "Music Room",
      description: "Professional instruments and acoustic setup for music education and performances.",
      image: "🎵"
    },
    {
      icon: Trophy,
      title: "Sports Complex",
      description: "Multi-purpose sports facilities for physical education and recreational activities.",
      image: "🏃‍♂️"
    },
    {
      icon: Utensils,
      title: "Cafeteria",
      description: "Hygienic kitchen serving nutritious meals with a variety of healthy options.",
      image: "🍽️"
    }
  ];

  const additionalFeatures = [
    "Air-conditioned classrooms",
    "Digital learning boards",
    "Playground with safety equipment",
    "Medical room with qualified nurse",
    "Transportation facility",
    "Security with CCTV monitoring",
    "Parent-teacher meeting rooms",
    "Computer lab with latest technology"
  ];

  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            World-Class <span className="text-school-blue">Facilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our state-of-the-art infrastructure and modern facilities create an optimal 
            learning environment that supports academic excellence and personal growth.
          </p>
        </div>

        {/* Main Facilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {facility.image}
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-school-blue/10 rounded-full mb-4 mx-auto">
                  <facility.icon className="h-6 w-6 text-school-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-br from-school-blue/5 to-school-orange/5 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Additional <span className="text-school-orange">Features</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-2 h-2 bg-school-blue rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Security */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Safety & <span className="text-school-blue">Security</span>
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              The safety and security of our students is our top priority. We have implemented 
              comprehensive safety measures and protocols to ensure a secure learning environment.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-school-orange rounded-full"></div>
                <span className="text-gray-700">24/7 CCTV surveillance system</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-school-orange rounded-full"></div>
                <span className="text-gray-700">Trained security personnel</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-school-orange rounded-full"></div>
                <span className="text-gray-700">Controlled access entry system</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-school-orange rounded-full"></div>
                <span className="text-gray-700">Emergency response procedures</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-school-orange rounded-full"></div>
                <span className="text-gray-700">First aid and medical facilities</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-school-blue/10 to-school-orange/10 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-6">🛡️</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">100% Safe Environment</h4>
              <p className="text-gray-600 leading-relaxed">
                Our comprehensive safety measures ensure that parents can have complete 
                peace of mind while their children are in our care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
