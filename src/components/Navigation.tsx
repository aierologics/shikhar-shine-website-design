
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Fee Details', href: '/fee-details' },
    { name: 'TC Verification', href: '/tc-verification' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/26ea3a81-b7f3-40c6-9fdf-a5fbc0868d77.png" 
              alt="Shikhar Shishu Sadan Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold text-school-blue">
              Shikhar Shishu Sadan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-school-blue transition-colors duration-200 font-medium ${
                  isActive(item.href) ? 'text-school-blue border-b-2 border-school-blue' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/admissions">
              <Button className="bg-school-orange hover:bg-school-orange/90">
                Admissions
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-gray-700 hover:text-school-blue hover:bg-gray-50 rounded-md transition-colors duration-200 ${
                    isActive(item.href) ? 'text-school-blue bg-gray-50' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link to="/admissions" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-school-orange hover:bg-school-orange/90">
                    Admissions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
