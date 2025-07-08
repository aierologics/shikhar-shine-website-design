
import { Heart, Brain, Shield, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We nurture each child with love, understanding, and individual attention to help them thrive."
    },
    {
      icon: Brain,
      title: "Holistic Development",
      description: "Our curriculum focuses on intellectual, emotional, social, and physical growth of every student."
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "We provide a secure, supportive atmosphere where children feel confident to explore and learn."
    },
    {
      icon: Star,
      title: "Excellence in Education",
      description: "We maintain high academic standards while making learning enjoyable and meaningful."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-school-blue">Shikhar Shishu Sadan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded with a vision to provide quality education, Shikhar Shishu Sadan has been 
            a beacon of learning excellence for over a decade. We are committed to shaping 
            young minds and building strong foundations for lifelong success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-school-blue to-school-lightBlue rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              To provide comprehensive education that empowers students to become confident, 
              creative, and caring individuals who contribute positively to society. We strive 
              to create an environment where every child can reach their full potential.
            </p>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              To be a leading educational institution that sets the standard for excellence 
              in primary education, fostering a love for learning that lasts a lifetime and 
              preparing students for future challenges.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-school-blue/10 to-school-orange/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-school-blue mb-2">15+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-school-orange mb-2">50+</div>
                  <div className="text-sm text-gray-600">Dedicated Teachers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-school-gold mb-2">500+</div>
                  <div className="text-sm text-gray-600">Alumni Success</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-school-lightBlue mb-2">10+</div>
                  <div className="text-sm text-gray-600">Academic Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
