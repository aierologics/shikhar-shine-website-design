
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from './Navigation';
import Footer from './Footer';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"],
      color: "text-school-blue"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@shikharsadan.edu", "admissions@shikharsadan.edu"],
      color: "text-school-orange"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Education Street", "Learning District, City - 110001"],
      color: "text-school-blue"
    },
    {
      icon: Clock,
      title: "School Hours",
      details: ["Monday - Friday: 8:00 AM - 2:00 PM", "Saturday: 8:00 AM - 12:00 PM"],
      color: "text-school-orange"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
     <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get <span className="text-school-orange">In Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to give your child the best educational foundation? Contact us today to learn
              more about our programs and schedule a visit to our campus.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full ${info.color}`}>
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h4>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-school-blue/10 to-school-orange/10 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-school-blue mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Interactive Map</p>
                      <p className="text-gray-500 text-sm">Location on Google Maps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parent's Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          className="border-gray-300 focus:border-school-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Child's Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter child's name"
                          className="border-gray-300 focus:border-school-blue"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="border-gray-300 focus:border-school-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          className="border-gray-300 focus:border-school-blue"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Child's Age
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter child's age"
                        className="border-gray-300 focus:border-school-blue"
                        min="3"
                        max="14"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us about your inquiry or any specific questions you have..."
                        className="border-gray-300 focus:border-school-blue min-h-[120px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-school-orange hover:bg-school-orange/90 text-white py-3 text-lg"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <Card className="mt-6 border-0 shadow-lg bg-gradient-to-r from-school-blue to-school-lightBlue">
                <CardContent className="p-6 text-center text-white">
                  <h4 className="text-xl font-bold mb-2">Ready to Enroll?</h4>
                  <p className="mb-4">Schedule a campus visit and see our facilities firsthand!</p>
                  <Button variant="secondary" className="bg-white text-school-blue hover:bg-gray-100">
                    Schedule Visit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ContactSection;
