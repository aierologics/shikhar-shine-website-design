
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Academic Programs", href: "#programs" },
    { name: "Facilities", href: "#facilities" },
    { name: "Admissions", href: "#contact" },
    { name: "Contact", href: "#contact" }
  ];



  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/lovable-uploads/26ea3a81-b7f3-40c6-9fdf-a5fbc0868d77.png"
                alt="Shikhar Shishu Sadan Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold">Shikhar Shishu Sadan</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Nurturing bright minds for a better tomorrow. We are committed to providing
              quality education that empowers students to reach their full potential.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-school-blue hover:bg-school-orange rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-school-orange transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-school-orange mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">KSHATRIYA NAGAR</p>
                  <p className="text-gray-300">DHAMPUR, BIJNOR, UTTAR PRADESH - 246761</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-school-orange flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+91 9837774888</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-school-orange flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@shikharsadan.in</p>
                  <p className="text-gray-300">admissions@shikharsadan.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* School Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">School Hours</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">Monday - Friday</p>
                <p className="text-gray-300">8:00 AM - 2:00 PM</p>
              </div>
              <div>
                <p className="text-white font-medium">Saturday</p>
                <p className="text-gray-300">8:00 AM - 12:00 PM</p>
              </div>
              <div>
                <p className="text-white font-medium">Sunday</p>
                <p className="text-gray-300">Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Shikhar Shishu Sadan. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-school-orange text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-school-orange text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
