
import { ArrowLeft, Heart, Brain, Shield, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
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

  const leadership = [
    {
      name: "Mrs. Bharti Yadav",
      position: "Principal",
      image: "https://www.shikharschool.in/imgs/pr25.png",
      message: "Empower yourselves with a great education, then get out there and use that education to build a country worthy of our boundless promise.",
      fullMessage: "We the Principal, Faculties and students of Shikhar Shishu Sadan, express our deep sense of gratitude to God almighty for providing us all excellent facilities need for a CBSE school. Teachers have always been considered as the pillars and makers of the society. Our teachers are however professionally trained group and the pulse of our society. We even understand to take care of the students and guide them in meaningful learning. The parents are the most strengthening power of moulding the future of children. Their consistent support empowers us to do more and more. I pay my gratitude to them for their faith in us. I am confident enough that Shikhar Shishu Sadan will make themselves stronger day by day, adding a new leaf to the garden of the school."
    },
    {
      name: "Mr. Narandra Gupta",
      position: "Manager",
      image: "https://www.shikharschool.in/imgs/mg25.png",
      message: "I am proud to declare Shikhar School, as one of the most modern centre of learning in many respects.",
      fullMessage: "Shikhar imparts holistic education in its most literal sense, keeping in mind the learners interests and aspirations and their future in this competitive society. Students of Shikhar find suitable spaces in the ever-growing society in diverse spheres. While expanding quantitatively on a regular basis, year after year, the school takes sky-high leaps qualitatively too. In the fast changing world of this earlier part of the 21st century, public education is also changing as part of the changes, the role of schools and education will also be different both in the educational system and in the society. Together with them the role of teachers too changes. We at Shikhar, are well equipped to face the social challenges and demands towards education keeping our modern aims and social contracts."
    },
    {
      name: "Mr. Sunil Kumar Gupta",
      position: "Treasurer",
      image: "https://www.shikharschool.in/imgs/tr25.png",
      message: "Education is not just about the subjects that are learnt and taught in school. Becoming educated is not restricted to being in school and then in college.",
      fullMessage: "Gathering certificates and feeling proud of oneself.it is a lifelong exercise that can be unbelievably exciting if only we wish to jump onto the train of experience and take a trip to every conceivable place on the earth. Shikhar's philosophy is based on the principle that each child will achieve their personal best in all areas of their development. Education involves the progress of self-motivated, responsible and self-disciplined children. From a very young age we bring children, through purposeful activities to independent learning and self-initiative, enabling them to achieve their highest potential. Self-esteem is achieved and skills vital to fully functioning member of society are developed."
    },
    {
      name: "Mr. Devesh Ghalot",
      position: "Vice - Principal",
      image: "https://www.shikharschool.in/imgs/vprincipal22.jpg",
      message: "Education is a shared commitment between dedicated teachers, motivated students and enthusiastic parent with high expectations.",
      fullMessage: "Today the role of a school is not only to pursue academic excellence but also to motivate and empower its students to be lifelong learners, critical thinkers and productive members of an ever- changing global society. More than a decade back Shikhar Shishu Sadan pledged to transform education. The school that is being run under the aegis of well-established management 'Western education and rural development trust' has earned its own niche. At Shikhar, we provide a platform and atmosphere to our student for multi-faceted development where children are encouraged to channelize their potential in the pursuit of excellence. This can only be possible in a holistic, student centric environment. The talents, skills and abilities of each student need to be identified, nourished and encouraged so that he/she is able to reach greater heights. Students need to be provided with a platform to think express and exhibit their skills. It is necessary to empower them to negotiate several issues that confront them, with the teacher being a facilitator."
    },
    {
      name: "Mr. R. N. Singh",
      position: "Sr. Co-ordinator",
      image: "https://www.shikharschool.in/imgs/cordinator.jpg",
      message: "We believe that each and every student has a gift to share with the world, we work hard to unlock their highest potential.",
      fullMessage: "To keep pace with a dynamically changing word our teaching methodology is well designed to leverage and challenges posed by globalization and changing technology and economy. Our pedagogy is technology integrated and ensure full-fledged knowledge of theory and Practice. With a long and recording history of achievement behind us, Shikhar Shishu Sadan Public school continued to move forward together with confidence, pride and enthusiasm."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <section className="py-20 bg-white">
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

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
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

            {/* Leadership Section */}
            <div className="mb-20">
              <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                Our <span className="text-school-orange">Leadership</span>
              </h3>
              <div className="space-y-12">
                {leadership.map((leader, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        <div className="text-center lg:text-left">
                          <img 
                            src={leader.image} 
                            alt={leader.name}
                            className="w-48 h-48 rounded-full mx-auto lg:mx-0 object-cover mb-4 shadow-lg"
                          />
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h4>
                          <p className="text-school-orange font-semibold text-lg">{leader.position}</p>
                        </div>
                        <div className="lg:col-span-2">
                          <div className="bg-gradient-to-r from-school-blue/10 to-school-orange/10 rounded-lg p-6 mb-6">
                            <p className="text-lg font-medium text-gray-900 italic leading-relaxed">
                              "{leader.message}"
                            </p>
                          </div>
                          <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                              {leader.fullMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
