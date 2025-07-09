
import { Calendar, Megaphone, Pin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NoticeBoardSection = () => {
  const notices = [
    {
      id: 1,
      title: "Independence Day Holiday",
      content: "School will remain closed on 15th August for Independence Day celebration.",
      date: "2024-08-10",
      type: "holiday",
      priority: "high"
    },
    {
      id: 2,
      title: "New Admission Forms Available",
      content: "Admission forms for academic year 2025-26 are now available online and at the school office.",
      date: "2024-07-25",
      type: "admission",
      priority: "high"
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      content: "Monthly PTM scheduled for all classes on 20th August 2024 from 9:00 AM to 12:00 PM.",
      date: "2024-08-05",
      type: "meeting",
      priority: "medium"
    },
    {
      id: 4,
      title: "Science Exhibition",
      content: "Annual Science Exhibition will be held on 25th August. Students are encouraged to participate.",
      date: "2024-08-01",
      type: "event",
      priority: "medium"
    },
    {
      id: 5,
      title: "Sports Day Registration",
      content: "Registration for Sports Day events is now open. Contact your class teacher for more details.",
      date: "2024-07-30",
      type: "sports",
      priority: "low"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'holiday':
        return <Calendar className="h-4 w-4 text-school-orange" />;
      case 'admission':
        return <Megaphone className="h-4 w-4 text-school-blue" />;
      case 'meeting':
        return <Pin className="h-4 w-4 text-school-gold" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'sports':
        return <Pin className="h-4 w-4 text-red-600" />;
      default:
        return <Pin className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📋 Notice Board
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and important information from our school.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {notices.map((notice) => (
              <Card 
                key={notice.id} 
                className={`border-l-4 ${getPriorityColor(notice.priority)} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getTypeIcon(notice.type)}
                    {notice.title}
                    <span className="ml-auto text-sm text-gray-500 font-normal">
                      {new Date(notice.date).toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{notice.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For more information, please contact the school office at <strong>+91 9837774888</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoardSection;
