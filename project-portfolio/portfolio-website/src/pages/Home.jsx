import React, { useEffect, useState, useRef } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Globe,
  Cpu,
  Zap,
  Rocket,
  Download,
  Eye,
} from "lucide-react";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = [
    {
      icon: Code,
      delay: 0,
      size: "w-20 h-20",
      position: { top: "20%", left: "10%" },
    },
    {
      icon: Database,
      delay: 1,
      size: "w-16 h-16",
      position: { top: "60%", left: "15%" },
    },
    {
      icon: Globe,
      delay: 2,
      size: "w-24 h-24",
      position: { top: "30%", right: "10%" },
    },
    {
      icon: Cpu,
      delay: 3,
      size: "w-18 h-18",
      position: { top: "70%", right: "20%" },
    },
    {
      icon: Zap,
      delay: 4,
      size: "w-14 h-14",
      position: { top: "40%", left: "5%" },
    },
    {
      icon: Rocket,
      delay: 5,
      size: "w-22 h-22",
      position: { top: "80%", right: "5%" },
    },
  ];

  const skills = [
    "React.js",
    "Node.js",
    "Python",
    "MongoDB",
    "PostgreSQL",
    // "Docker",
    "AWS",
    "TypeScript",
  ];

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden bg-black">

      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>


      <div className="floating-particles"></div>


      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-purple-600/30 to-pink-600/30 animate-morphing blur-xl"></div>
        <div
          className="absolute bottom-32 right-20 w-56 h-56 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 animate-morphing blur-xl"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-green-600/30 to-teal-600/30 animate-morphing blur-xl"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Icons */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className={`absolute ${element.size} text-purple-400/20 animate-float3d perspective-1000`}
              style={{
                ...element.position,
                animationDelay: `${element.delay}s`,
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02
                  }px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01
                  }deg)`,
              }}
            >
              <Icon className="w-full h-full transform-style-3d" />
            </div>
          );
        })}
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className=" mt-5 relative z-10 min-h-screen flex items-center justify-center px-4 perspective-2000"
      >
        <div className="max-w-6xl mx-auto text-center transform-style-3d">
          {/* Profile*/}
          <div className="mb-12 relative">
            <div className="w-40 h-40 mx-auto relative flex items-center justify-center">
              <img
                src="public/kalyani-passphoto.png"
                alt="Developer"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-1000 delay-300 ${isLoaded ? "animate-fadeInUp3d" : "opacity-0"
                }`}
            >
              <h3 className="text-1xl md:text-3xl font-black mb-6 text-3d">
                <span className="block animate-glitch text-purple-400 text-2xl mb-2 tracking-widest font-mono">Hi, I am</span>
                <span className="holographic animate-gradientX text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl shadow-purple-500/50 px-6 py-2 rounded-2xl border-b-8 border-purple-500 inline-block animate-fadeInUp3d">
                  Kalyani Sharnagat
                </span>
                <span className="block mt-6 text-xl md:text-3xl text-pink-400 font-bold animate-slideInUp">Transforming Ideas Into Digital Reality 🚀</span>
              </h3>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${isLoaded ? "animate-fadeInUp3d" : "opacity-0"
                }`}
            >
              <p className="text-2xl md:text-4xl text-gray-300 mb-4 font-light">
                <span className="holographic">Fullstack Developer</span> &
                <span className="text-purple-400"> Creative Technologist</span>
              </p>

              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                I craft exceptional digital experiences using cutting-edge
                technologies. Passionate about clean code, innovative solutions,
                and bringing ideas to life through the power of modern web
                development.
              </p>
            </div>

            {/* Skills */}
            <div
              className={`transition-all duration-1000 delay-700 ${isLoaded ? "animate-fadeInUp3d" : "opacity-0"
                }`}
            >
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 text-purple-300 text-sm font-medium hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-pink-600/40 transform hover:scale-110 transition-all duration-300 cursor-pointer animate-float3d"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/*  Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-900 ${isLoaded ? "animate-fadeInUp3d" : "opacity-0"
                }`}
            >
              <a href="https://github.com/">
                <button className="group relative btn-3d px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-lg transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>View My Work</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </a>

              <a
                href="/path-to-your-resume.pdf"
                download="Saurabh_Jagthap_Resume.pdf"
                className="group relative inline-block"
              >
                <button className="btn-3d px-8 py-4 border-2 border-purple-500/50 rounded-xl font-bold text-white text-lg hover:bg-purple-600/20 transform hover:scale-105 transition-all duration-300 glass-dark">
                  <span className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download Resume</span>
                  </span>
                </button>
              </a>
            </div>

            {/* Social Links */}
            <div
              className={`flex justify-center space-x-8 transition-all duration-1000 delay-1100 ${isLoaded ? "animate-fadeInUp3d" : "opacity-0"
                }`}
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/",
                  color: "hover:text-gray-400",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/",
                  color: "hover:text-blue-400",
                },
                {
                  icon: Mail,
                  href: "https://www.gmail.com/",
                  color: "hover:text-red-400",
                },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`group relative p-4 rounded-xl bg-white/5 text-white ${social.color} transform hover:scale-125 transition-all duration-300 hover:rotate-12 glass-dark animate-float3d`}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <Icon className="w-7 h-7" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float3d">
        <div className="flex flex-col items-center space-y-3 text-white/60">
          <span className="text-sm font-medium animate-pulse">
            Explore More
          </span>
          <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-500 rounded-full mt-2 animate-bounce"></div>
          </div>
          <ChevronDown
            className="w-6 h-6 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>

      {/* Background Video/Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 animate-pulse"></div>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16 py-12 border-y border-purple-500/30 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-2xl">
        {[
          { number: "5+", label: "Years Experience" },
          { number: "100+", label: "Projects Completed" },
          { number: "50+", label: "Satisfied Clients" },
          { number: "99%", label: "Success Rate" },
        ].map((stat, index) => (
          <div key={index} className="text-center group card-3d">
            <div className="text-4xl font-black holographic mb-3 group-hover:animate-pulse3d transition-all duration-300">
              {stat.number}
            </div>
            <div className="text-gray-400 text-sm font-medium tracking-wide">
              {stat.label}
            </div>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
