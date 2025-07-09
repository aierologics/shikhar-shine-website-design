
import { BookOpen, Users, Palette, Music, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SchoolLifeSection = () => {
  const activities = [
    {
      id: 1,
      title: "Academic Excellence",
      description: "Comprehensive curriculum with focus on conceptual learning and practical application",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      image: "📚"
    },
    {
      id: 2,
      title: "Cultural Programs",
      description: "Regular cultural events, festivals, and artistic performances to nurture creativity",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      image: "🎭"
    },
    {
      id: 3,
      title: "Sports & Fitness",
      description: "Well-equipped sports facilities and regular physical education for healthy development",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      image: "⚽"
    },
    {
      id: 4,
      title: "Music & Arts",
      description: "Dedicated music room and art studio for developing artistic talents and creativity",
      icon: Music,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      image: "🎵"
    },
    {
      id: 5,
      title: "Global Perspective",
      description: "Exposure to different cultures and global awareness through various programs",
      icon: Globe,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      image: "🌍"
    },
    {
      id: 6,
      title: "Community Service",
      description: "Encouraging students to give back to society through various social service initiatives",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      image: "❤️"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🌟 School Life & Activities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a vibrant school life with diverse activities that foster holistic development and create lasting memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.id} className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${activity.bgColor} p-6 text-center group-hover:bg-opacity-80 transition-all duration-300`}>
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {activity.image}
                    </div>
                    <IconComponent className={`h-8 w-8 ${activity.color} mx-auto group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-school-blue transition-colors duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🏫 A Day in Our School
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl">🌅</div>
                <div className="font-semibold text-school-blue">Morning Assembly</div>
                <div className="text-sm text-gray-600">8:00 AM</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">📖</div>
                <div className="font-semibold text-school-blue">Academic Classes</div>
                <div className="text-sm text-gray-600">8:30 AM - 2:00 PM</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🍽️</div>
                <div className="font-semibold text-school-blue">Lunch Break</div>
                <div className="text-sm text-gray-600">12:00 PM - 1:00 PM</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🎨</div>
                <div className="font-semibold text-school-blue">Activities</div>
                <div className="text-sm text-gray-600">2:00 PM - 3:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolLifeSection;
