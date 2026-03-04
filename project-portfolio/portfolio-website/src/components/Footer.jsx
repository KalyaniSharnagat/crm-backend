import React from 'react';
import { Heart, Code, Coffee, Github, Linkedin, Mail, ArrowUp, Zap, Star } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/KalyaniSharnagat' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kalyani-sharnagat-b8086a276/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: 'https://mail.google.com/mail/sharnagatkalyani0812@gmail.com', label: 'GitHub', color: 'hover:text-gray-400', label: 'Email', color: 'hover:text-red-400' },
  ];

  const quickLinks = [
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/skills' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { label: 'Web Development', href: '#' },
    // { label: 'Mobile Apps', href: '#' },
    { label: 'API Development', href: '#' },
    { label: 'Consulting', href: '#' },
  ];

  return (


    <footer className="relative bg-black/60 backdrop-blur-xl border-t border-purple-500/20 mt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      <div className="floating-particles opacity-30"></div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-500 animate-pulse3d">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
              </div>

              <div>
                <span className="text-3xl font-black holographic">Kalyani Sharnagat</span>
                <div className="text-sm text-purple-400 font-mono tracking-wider">FULLSTACK DEVELOPER</div>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-lg">
              Passionate fullstack developer specializing in modern web technologies.
              Creating innovative solutions that bridge the gap between design and functionality,
              delivering exceptional user experiences with clean, scalable code.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`group w-12 h-12 glass-dark border border-purple-500/30 rounded-xl flex items-center justify-center text-white ${social.color} transform hover:scale-125 hover:rotate-12 transition-all duration-300 card-3d`}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:animate-pulse3d" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white holographic flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white holographic flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Services</span>
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <div className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></div>
                    <span>{service.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>



        {/* Bottom Section */}
        <div className=" mt-5 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-purple-500/20">
          <div className="flex items-center space-x-3 text-gray-400 text-sm mb-4 md:mb-0">
            {/* <span>Powered By</span> */}
            {/* <Heart className="w-4 h-4 text-red-500 animate-pulse" /> */}
            {/* <span>and</span> */}
            {/* <Coffee className="w-4 h-4 text-yellow-500 animate-float3d" /> */}
            {/* <span>by</span> */}
            {/* <span className="text-purple-400 font-medium">Right searve Infotech System Pvt.Ltd</span> */}
          </div>

          <div className="flex items-center space-x-6 ">
            <span className="text-gray-500 text-sm"><a href='https://rsinfotechsys.com/'>
              © 2026 Kalyani Sharnagat. All rights reserved.</a>
            </span>
            <button
              onClick={scrollToTop}
              className="group w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-125 hover:rotate-12 transition-all duration-300 btn-3d"
              title="Back to top"
            >
              <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
            </button>
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="mt-8 pt-8 border-t border-purple-500/20 bg-gradient-to-r from-black/50 to-purple-900/20 rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="flex items-center space-x-1">
                <span>🌐</span>
                <span>Pvt.Ltd, Director</span>
              </span>
              <span>📧 saurabh_jagthap@devmaster.com</span>
              <span>📱 +1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-900/20 px-4 py-2 rounded-full border border-green-500/30">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-green-400 font-medium">Available for hire</span>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;