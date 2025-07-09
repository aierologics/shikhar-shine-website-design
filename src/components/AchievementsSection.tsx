
import { Trophy, Star, Award, Medal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      title: "State Level Science Competition",
      student: "Arjun Sharma",
      class: "Class X",
      position: "1st Place",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      id: 2,
      title: "District Mathematics Olympiad",
      student: "Priya Singh",
      class: "Class IX",
      position: "2nd Place",
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 3,
      title: "Inter-School Debate Championship",
      student: "Rohit Kumar",
      class: "Class XI",
      position: "Best Speaker",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 4,
      title: "State Level Art Competition",
      student: "Anisha Patel",
      class: "Class VIII",
      position: "1st Place",
      icon: Medal,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 5,
      title: "National Level Essay Writing",
      student: "Vikash Yadav",
      class: "Class XII",
      position: "3rd Place",
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      id: 6,
      title: "Regional Sports Meet",
      student: "Kavya Joshi",
      class: "Class X",
      position: "Gold Medal",
      icon: Medal,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🏆 Student Achievements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the outstanding accomplishments of our talented students who bring pride to our school.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={achievement.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${achievement.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 ${achievement.color}`} />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Student:</span> {achievement.student}</p>
                    <p><span className="font-medium">Class:</span> {achievement.class}</p>
                    <p className={`font-semibold ${achievement.color}`}>
                      🎉 {achievement.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-school-blue/10 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-school-blue" />
            <span className="text-school-blue font-semibold">100% Board Exam Pass Rate in 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
