import { useState, useEffect, useRef } from 'react';
import { Calendar, Megaphone, Pin, X, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface Notice {
  id: string;
  title: string;
  content: string;
  notice_type: string;
  priority: string;
  date: string;
  notice_number?: number;
}

const NoticeBoardSection = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from('notices')
      .select('*, notice_number')
      .order('date', { ascending: false })
      .limit(5);

    if (!error) setNotices(data || []);
    setLoading(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'holiday': return <Calendar className="h-4 w-4 text-school-orange" />;
      case 'admission': return <Megaphone className="h-4 w-4 text-school-blue" />;
      case 'meeting': return <Pin className="h-4 w-4 text-school-gold" />;
      case 'event': return <Calendar className="h-4 w-4 text-green-600" />;
      case 'sports': return <Pin className="h-4 w-4 text-red-600" />;
      default: return <Pin className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Restore interactivity
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 mt-[-100px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">📋 Notice Board</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and important information from our school.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {notices.map((notice) => (
            <Card
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className={`cursor-pointer border-l-4 ${getPriorityColor(notice.priority)} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getTypeIcon(notice.notice_type)}
                  {notice.title}
                  <span className="ml-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {notice.notice_number !== undefined && (
                      <>SHIKHAR/{new Date(notice.date).getFullYear()}/{notice.notice_number}</>
                    )}
                  </span>
                  <span className="ml-auto text-sm text-gray-500 font-normal">
                    {new Date(notice.date).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{notice.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For more information, contact the school office at <strong>+91 9837774888</strong>
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded shadow-lg p-6 relative print:!static print:!p-0" ref={printRef}>
            {/* Header Controls (not shown in print) */}
            <div className="absolute top-3 right-3 flex gap-2 print:hidden">
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={handlePrint}
                className="text-gray-500 hover:text-blue-600"
              >
                <Printer className="h-5 w-5" />
              </button>
            </div>

            {/* Notice Format */}
            <div className="text-center relative">
              <img
                src="/lovable-uploads/26ea3a81-b7f3-40c6-9fdf-a5fbc0868d77.png"
                alt="School Logo"
                className="mx-auto h-14 mb-2"
              />
              <h2 className="text-xl font-bold text-gray-900">Shikhar Shishu Sadan Senior Secondary School</h2>
              <p className="text-sm text-gray-600">Affiliated to C.B.S.E New Delhi</p>
              <hr className="my-4 border-gray-300" />

            </div>


            <div className="text-center">
              <h3 className="text-xl font-bold underline mb-4">NOTICE</h3>
            </div>

            <div className="space-y-3 text-gray-800 text-sm">
              <p><strong>Title:</strong> {selectedNotice.title}</p>
              <p><strong>Notice Number:</strong> {selectedNotice.notice_number !== undefined ? `SHIKHAR/${new Date(selectedNotice.date).getFullYear()}/${selectedNotice.notice_number}` : 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(selectedNotice.date).toLocaleDateString()}</p>
              <p className="whitespace-pre-line">{selectedNotice.content}</p>
            </div>

            <div className="mt-6 text-right font-semibold relative">
              <p>Principal</p>
              <p>Shikhar Shishu Sadan</p>

              {/* Circular Stamp for Print */}
              <div className="hidden print:block absolute -bottom-36 right-0 w-32 h-32">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    {/* Top arc: clockwise semi-circle */}
                    <path id="topArc" d="M25,100 A75,75 0 0,1 175,100" />
                    {/* Bottom arc: counter-clockwise semi-circle (mirrored text) */}
                    <path id="bottomArc" d="M175,100 A75,75 0 0,1 25,100" />
                  </defs>

                  {/* Outer circle */}
                  <circle cx="100" cy="100" r="75" stroke="#1e40af" strokeWidth="3" fill="none" />

                  {/* Top text */}
                  <text fill="#1e40af" fontSize="10" fontWeight="bold" letterSpacing="2">
                    <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                      SHIKHAR SHISHU SADAN SCHOOL
                    </textPath>
                  </text>

                  {/* Bottom text (mirrored correctly) */}
                  <text fill="#1e40af" fontSize="10" fontWeight="bold" letterSpacing="2">
                    <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                      SENIOR SECONDARY • DEHRADUN
                    </textPath>
                  </text>

                  {/* Center text (e.g., Principal) */}
                  <text
                    x="100"
                    y="105"
                    fill="#1e40af"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    Principal
                  </text>
                </svg>
              </div>


            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default NoticeBoardSection;
