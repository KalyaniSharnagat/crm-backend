import React, { useState, useEffect } from 'react';
import { User, Award, Coffee, Heart, Code2, Lightbulb, Target, Zap, Brain, Rocket } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '1', label: 'Years Experience', icon: Award, color: 'from-purple-500 to-pink-500' },
    { number: '5+', label: 'Projects Completed', icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { number: '∞', label: 'Cups of Coffee', icon: Coffee, color: 'from-yellow-500 to-orange-500' },
    { number: '24/7', label: 'Passion for Code', icon: Heart, color: 'from-red-500 to-pink-500' },
  ];

  const qualities = [
    {
      icon: Lightbulb,
      title: 'Innovation Driven',
      description: 'I thrive on exploring cutting-edge technologies and implementing creative solutions to complex problems.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Code2,
      title: 'Clean Code Advocate',
      description: 'Writing maintainable, scalable, and efficient code is not just my job—it\'s my passion and commitment.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Brain,
      title: 'Continuous Learner',
      description: 'The tech world evolves rapidly, and I stay ahead by constantly learning and adapting to new technologies.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Target,
      title: 'Goal Oriented',
      description: 'I set clear objectives and work systematically to achieve them, ensuring every project meets its goals.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Performance Focused',
      description: 'Optimizing applications for speed, efficiency, and user experience is at the core of my development process.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Rocket,
      title: 'Future Ready',
      description: 'I build applications with scalability and future growth in mind, using modern architectures and best practices.',
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const tabs = [
    { id: 'story', label: 'My Story', icon: User },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'values', label: 'Values', icon: Heart },
  ];

  const tabContent = {
    story: {
      title: "The Journey of a Passionate Developer",
      content: `My journey into the world of technology began during my computer science studies, where I discovered the incredible power of code to transform ideas into reality. What started as curiosity quickly evolved into a deep passion for creating digital solutions that make a real difference.

      Over the past 5 years, I've had the privilege of working with diverse teams and clients, from innovative startups to established enterprises. Each project has been a learning opportunity, pushing me to explore new technologies and refine my craft.

      I specialize in full-stack development, with expertise spanning modern frontend frameworks like React and Vue.js, robust backend technologies including Node.js and Python, and cloud platforms like AWS and Docker. My approach combines technical excellence with creative problem-solving, ensuring that every solution is both functional and elegant.`
    },
    mission: {
      title: "Empowering Ideas Through Technology",
      content: `My mission is to bridge the gap between complex technical possibilities and real-world business needs. I believe that great software should not only work flawlessly but also provide intuitive user experiences that delight and empower users.

      I'm committed to staying at the forefront of technological innovation, continuously learning and adapting to new tools and methodologies. Whether it's implementing cutting-edge AI solutions, optimizing application performance, or designing scalable architectures, I approach each challenge with enthusiasm and dedication.

      Beyond individual projects, I'm passionate about contributing to the developer community through open-source contributions, mentoring, and knowledge sharing. I believe that collaboration and continuous learning are the keys to pushing the boundaries of what's possible in technology.`
    },
    values: {
      title: "Core Values That Drive Excellence",
      content: `Quality is non-negotiable in everything I do. I believe in writing clean, maintainable code that stands the test of time and can be easily understood and extended by other developers.

      Collaboration is at the heart of great software development. I work closely with designers, product managers, and other stakeholders to ensure that technical solutions align perfectly with business objectives and user needs.

      Innovation drives me to constantly explore new possibilities and challenge conventional approaches. I'm always looking for ways to leverage emerging technologies to create more efficient, scalable, and impactful solutions.

      Integrity means being honest about timelines, transparent about challenges, and committed to delivering on promises. I believe that trust is the foundation of successful long-term partnerships.`
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black relative overflow-hidden  alltabmt">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      <div className="floating-particles"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-8xl font-extrabold text-white mb-10 text-3d animate-fadeInUp3d">
            <span className="block animate-glitch text-purple-400 text-2xl mb-2 tracking-widest font-mono">Who Am I?</span>
            About <span className="holographic animate-gradientX bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl shadow-purple-500/50 px-6 py-2 rounded-2xl border-b-8 border-purple-500 inline-block font-extrabold">Me</span>
            <span className="block mt-6 text-xl md:text-3xl text-pink-400 font-bold animate-slideInUp">Passionate Developer. Creative Thinker. Lifelong Learner.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the passion, skills, and vision behind the code, I'm a passionate developer driven by creativity and a love for problem-solving. With a strong foundation in modern technologies, I craft efficient and user-centric digital solutions. My vision is to build impactful experiences that blend innovation with purpose.
          </p>
        </div>

        {/* Hero Section with 3D Profile */}
        <div className={`grid lg:grid-cols-2 gap-16 items-center mb-24 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          {/* Right Column - Content Tabs (now first) */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'glass-dark text-gray-300 hover:text-white'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Tab Content */}
            <div className="glass-dark rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 holographic">
                {tabContent[activeTab].title}
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {tabContent[activeTab].content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg">{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Left Column - 3D Profile (now second) */}
          <div className="relative perspective-100 order-1 lg:order-2">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="aspect-square rounded-3xl glass-purple p-8 backdrop-blur-xl border-2 border-purple-500/30 transform-style-3d card-3d">
                <div className="w-full h-full relative">
                  <img
                    src="public/kalyani-passphoto.png"
                    alt="Kalyani Sharnagat"
                    className="w-full h-full object-cover rounded-2xl border-4 border-purple-500/50 animate-pulse3d"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>

                  {/* Floating Tech Badges */}
                  {/* <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center animate-float3d shadow-lg shadow-blue-500/30">
                    <Code2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center animate-float3d delay-1000 shadow-lg shadow-green-500/30">
                    <Lightbulb className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-float3d delay-500 shadow-lg shadow-purple-500/30">
                    <Rocket className="w-6 h-6 text-white" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl glass-dark border border-purple-500/20 hover:border-purple-500/40 transform hover:scale-105 transition-all duration-300 card-3d group"
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:animate-pulse3d shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-3 holographic">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Qualities Grid */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 holographic">
            What Drives My Excellence
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualities.map((quality, index) => {
              const Icon = quality.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl glass-dark border border-purple-500/20 hover:border-purple-500/40 transform hover:scale-105 transition-all duration-300 card-3d group"
                >
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${quality.color} rounded-2xl flex items-center justify-center group-hover:animate-pulse3d shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 holographic">{quality.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{quality.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <div className="glass-purple rounded-3xl p-12 border-2 border-purple-500/30">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 holographic">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate and turn your vision into a powerful digital reality
            </p>
            <button className="btn-3d px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30">
              Let's Work Together
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;