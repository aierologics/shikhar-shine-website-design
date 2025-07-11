
import { BookOpen, Palette, Music, Calculator, Globe, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProgramsSection = () => {
  const programs = [
    {
      icon: BookOpen,
      title: "English & Literature",
      description: "Comprehensive language development with focus on reading, writing, and communication skills.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Calculator,
      title: "Mathematics",
      description: "Building strong numerical foundations with practical problem-solving approaches.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Globe,
      title: "Science & Discovery",
      description: "Hands-on experiments and exploration to foster scientific thinking and curiosity.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Palette,
      title: "Arts & Crafts",
      description: "Creative expression through various art forms to develop imagination and motor skills.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Music,
      title: "Music & Dance",
      description: "Cultural education through traditional and modern music and dance forms.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Social Studies",
      description: "Understanding community, culture, and developing social awareness and citizenship.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const grades = [
    {
      grade: "Pre-Primary",
      age: "3-5 years",
      description: "Foundation learning through play-based activities and basic skill development."
    },
    {
      grade: "Primary",
      age: "6-10 years",
      description: "Core academic subjects with emphasis on reading, writing, and arithmetic."
    },
    {
      grade: "Upper Primary",
      age: "11-14 years",
      description: "Advanced learning with specialized subjects and preparation for higher education."
    }
  ];

  return (
    <section id="programs" className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-school-orange">Academic Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer a comprehensive curriculum designed to nurture every aspect of your child's 
            development through engaging and age-appropriate learning experiences.
          </p>
        </div>

        {/* Grade Levels */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {grades.map((grade, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="text-3xl font-bold text-school-blue mb-2">{grade.grade}</div>
                <div className="text-school-orange font-semibold mb-4">{grade.age}</div>
                <p className="text-gray-600 leading-relaxed">{grade.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subject Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardContent className="p-8">
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${program.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <program.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Features */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Programs?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Teachers</h4>
              <p className="text-gray-600 text-sm">Qualified and experienced educators</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="font-semibold text-gray-900 mb-2">Modern Curriculum</h4>
              <p className="text-gray-600 text-sm">Updated and relevant course content</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Individual Focus</h4>
              <p className="text-gray-600 text-sm">Personalized attention for each student</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
              <p className="text-gray-600 text-sm">Track record of academic excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
