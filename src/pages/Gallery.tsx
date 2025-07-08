
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=400&fit=crop",
      alt: "Students in Science Laboratory",
      title: "Science Laboratory Session",
      description: "Students exploring chemistry experiments"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&h=400&fit=crop",
      alt: "Annual Sports Day",
      title: "Annual Sports Day",
      description: "Celebrating achievements in athletics"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=400&fit=crop",
      alt: "Art and Craft Exhibition",
      title: "Art & Craft Exhibition",
      description: "Showcasing student creativity"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&h=400&fit=crop",
      alt: "Music Concert",
      title: "Annual Music Concert",
      description: "Students performing musical talents"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=400&fit=crop",
      alt: "Library Reading Session",
      title: "Library Reading Hour",
      description: "Promoting reading culture"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=400&fit=crop",
      alt: "Graduation Ceremony",
      title: "Graduation Ceremony",
      description: "Celebrating academic achievements"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044297?w=500&h=400&fit=crop",
      alt: "Cultural Festival",
      title: "Cultural Festival",
      description: "Traditional dance performances"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=400&fit=crop",
      alt: "Computer Lab Session",
      title: "Computer Programming Class",
      description: "Learning digital skills"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=400&fit=crop",
      alt: "Book Fair",
      title: "Annual Book Fair",
      description: "Promoting literacy and learning"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-school-blue hover:text-school-orange transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-school-blue mb-6">
              School <span className="text-school-orange">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Capturing precious moments and celebrating achievements at Shikhar Shishu Sadan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-school-blue to-school-lightBlue text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Share Your Memories</h2>
                <p className="text-lg mb-6">
                  Have photos from school events? We'd love to feature them in our gallery!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="text-center">
                    <p className="font-semibold">Email us at:</p>
                    <p>shikharschool1964@rediffmail.com</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Call us at:</p>
                    <p>+91 9837774888</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
