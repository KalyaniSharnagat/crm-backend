import React, { useState, useEffect } from 'react';
import { Menu, X, Code, User, Briefcase, Mail, Award, Home } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: '/', label: 'Home', icon: Home },
    { id: '/about', label: 'About', icon: User },
    { id: '/skills', label: 'Skills', icon: Award },
    { id: '/projects', label: 'Projects', icon: Briefcase },
    { id: '/contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? 'bg-black/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10'
      : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center transform rotate-12 ">
                  <Code className="w-7 h-7 text-white"/>
                </div> */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur-lg opacity-50 animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold holographic">Kalyani Sharnagat</span>
                <div className="text-xs text-purple-400 font-mono tracking-wider">FULLSTACK DEVELOPER</div>
              </div>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`group relative flex items-center space-x-2 px-5 py-3 font-semibold transition-all duration-300 transform hover:scale-105 animate-fadeInUp3d perspective-1000 ${isActive
                      ? 'text-white border-b-4 border-purple-500'
                      : 'text-gray-300 hover:text-white'
                      } focus:outline-none focus:ring-0`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5 group-hover:animate-pulse3d transition-all duration-300" />
                    </div>
                    <span className="relative">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 animate-glitch" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-500 transform ${isMobileMenuOpen
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
        <div className="bg-black/95 backdrop-blur-xl border-t border-purple-500/20">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group flex items-center space-x-4 w-full px-4 py-4 text-base font-medium transition-all duration-300 transform hover:scale-105 animate-slideIn3d ${isActive
                    ? 'text-white border-b-4 border-purple-500'
                    : 'text-gray-300 hover:text-white'
                    } focus:outline-none focus:ring-0`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5 group-hover:animate-pulse3d" />
                  </div>
                  <span className="relative">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;