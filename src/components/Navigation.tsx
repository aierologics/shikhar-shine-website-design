import { useState } from 'react';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    {
      name: 'Official',
      submenu: [
        { name: 'TC Verification', path: '/tc-verification' },
        { name: 'Fee Details', path: '/fee-details' },
        { name: 'Staff Details', path: '/staff-details' },
        { name: 'Docs for Admission', path: '/docs-for-admission' },
      ],
    },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admissions', path: '/admissions' },
  ];
  const [isOfficialOpen, setIsOfficialOpen] = useState(false);


  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    localStorage.clear();
  };


  return (
    <>
      {/* Top Nav */}
      <div className="bg-school-blue text-white text-sm py-2  px-4 w-full top-0 z-50 flex justify-between items-center">
        <Link
          to="/mandatory-public-disclosure"
          className="hover:underline hover:text-white transition-colors"
        >
          Mandatory Public Disclosure
        </Link>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-1 rounded-md text-xs font-medium bg-school-orange text-white hover:bg-school-orange/90 transition"
                >
                  Admin Panel
                </Link>
              )}
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="text-white hover:text-red-300 p-0"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center px-3 py-1 text-xs font-medium bg-white text-school-blue rounded hover:bg-gray-100 transition"
            >
              <User className="mr-1 h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Main Nav (pushed below top nav height) */}
      <nav className="bg-white shadow-lg w-full top-[40px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & School Info */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/lovable-uploads/26ea3a81-b7f3-40c6-9fdf-a5fbc0868d77.png"
                  alt="Shikhar Shishu Sadan Logo"
                  className="h-12 w-12"
                />
                <div>
                  <div className="text-xl font-bold text-school-blue leading-snug">
                    Shikhar Shishu Sadan
                  </div>
                  <div className="text-xs text-gray-600">
                    Affiliated to C.B.S.E New Delhi
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) =>
                  item.submenu ? (
                    <div key={item.name} className="relative">
                      <button
                        onClick={() => setIsOfficialOpen((prev) => !prev)}
                        className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-school-lightBlue hover:text-school-blue transition-colors"
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isOfficialOpen ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                      {isOfficialOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-school-lightBlue hover:text-school-blue"
                              onClick={() => setIsOfficialOpen(false)} // optional: auto-close on link click
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                        ? 'bg-school-blue text-white'
                        : 'text-gray-700 hover:bg-school-lightBlue hover:text-school-blue'
                        }`}
                    >
                      {item.name}
                    </Link>
                  )
                )}

              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-school-blue"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === item.path
                    ? 'bg-school-blue text-white'
                    : 'text-gray-700 hover:bg-school-lightBlue hover:text-school-blue'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
