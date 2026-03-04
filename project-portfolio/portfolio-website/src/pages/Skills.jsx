import React, { useState, useEffect } from 'react';
import { Code, Database, Globe, Smartphone, Server, Wrench, Zap, Brain, Shield, Cloud } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('frontend');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      description: 'Creating stunning user interfaces and experiences',
      skills: [
        { name: 'React.js', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '🔺' },
        { name: 'TypeScript', level: 88, icon: '📘' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨' },
        { name: 'Vue.js', level: 85, icon: '💚' },
        { name: 'JavaScript ES6+', level: 94, icon: '⚡' },
        { name: 'HTML5/CSS3', level: 96, icon: '🌐' },
        { name: 'SASS/SCSS', level: 87, icon: '💎' },
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-teal-500',
      description: 'Building robust and scalable server-side solutions',
      skills: [
        { name: 'Node.js', level: 92, icon: '🟢' },
        { name: 'Python', level: 89, icon: '🐍' },
        { name: 'Express.js', level: 90, icon: '🚀' },
        { name: 'Django', level: 85, icon: '🎯' },
        { name: 'REST APIs', level: 94, icon: '🔗' },
        { name: 'GraphQL', level: 82, icon: '📊' },
        { name: 'Microservices', level: 86, icon: '🔧' },
        { name: 'WebSockets', level: 88, icon: '⚡' },
      ]
    },
    {
      id: 'database',
      title: 'Database & Storage',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      description: 'Managing data with efficiency and security',
      skills: [
        { name: 'PostgreSQL', level: 90, icon: '🐘' },
        { name: 'MongoDB', level: 88, icon: '🍃' },
        { name: 'Redis', level: 85, icon: '🔴' },
        { name: 'MySQL', level: 87, icon: '🐬' },
        { name: 'Supabase', level: 91, icon: '⚡' },
        { name: 'Firebase', level: 89, icon: '🔥' },
        { name: 'Prisma ORM', level: 86, icon: '💎' },
        { name: 'Elasticsearch', level: 78, icon: '🔍' },
      ]
    },
    // {
    //   id: 'mobile',
    //   title: 'Mobile Development',
    //   icon: Smartphone,
    //   color: 'from-orange-500 to-red-500',
    //   description: 'Cross-platform mobile applications',
    //   skills: [
    //     { name: 'React Native', level: 88, icon: '📱' },
    //     { name: 'Flutter', level: 82, icon: '🦋' },
    //     { name: 'Ionic', level: 80, icon: '⚡' },
    //     { name: 'PWA', level: 90, icon: '🌐' },
    //     { name: 'Mobile UI/UX', level: 87, icon: '🎨' },
    //     { name: 'App Store Deploy', level: 85, icon: '🚀' },
    //     { name: 'Push Notifications', level: 83, icon: '🔔' },
    //     { name: 'Mobile Security', level: 81, icon: '🔒' },
    //   ]
    // },
    {
      id: 'devops',
      title: 'DevOps & Cloud',
      icon: Cloud,
      color: 'from-yellow-500 to-orange-500',
      description: 'Deployment, scaling, and infrastructure management',
      skills: [
        // { name: 'Docker', level: 89, icon: '🐳' },
        { name: 'AWS', level: 87, icon: '☁️' },
        { name: 'Kubernetes', level: 82, icon: '⚙️' },
        { name: 'CI/CD', level: 90, icon: '🔄' },
        { name: 'Terraform', level: 78, icon: '🏗️' },
        { name: 'Nginx', level: 85, icon: '🌐' },
        { name: 'Linux', level: 88, icon: '🐧' },
        { name: 'Monitoring', level: 84, icon: '📊' },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Others',
      icon: Wrench,
      color: 'from-indigo-500 to-purple-500',
      description: 'Development tools and methodologies',
      skills: [
        { name: 'Git/GitHub', level: 95, icon: '🐙' },
        { name: 'VS Code', level: 94, icon: '💻' },
        { name: 'Figma', level: 88, icon: '🎨' },
        { name: 'Jest/Testing', level: 87, icon: '🧪' },
        { name: 'Webpack', level: 85, icon: '📦' },
        { name: 'Agile/Scrum', level: 92, icon: '🏃' },
        { name: 'Code Review', level: 93, icon: '👀' },
        { name: 'Documentation', level: 89, icon: '📚' },
      ]
    },
  ];

  const certifications = [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023', icon: '☁️' },
    { name: 'React Developer Certification', issuer: 'Meta', year: '2023', icon: '⚛️' },
    { name: 'Google Cloud Professional', issuer: 'Google', year: '2022', icon: '🌐' },
    { name: 'MongoDB Certified Developer', issuer: 'MongoDB Inc.', year: '2022', icon: '🍃' },
  ];

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black relative overflow-hidden alltabmt">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      <div className="floating-particles"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-8xl font-extrabold text-white mb-10 text-3d animate-fadeInUp3d">
            <span className="block animate-glitch text-purple-400 text-2xl mb-2 tracking-widest font-mono">Tech Stack</span>
            My <span className="holographic animate-gradientX bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl shadow-purple-500/50 px-6 py-2 rounded-2xl border-b-8 border-purple-500 inline-block font-extrabold">Skills</span>
            <span className="block mt-6 text-xl md:text-3xl text-pink-400 font-bold animate-slideInUp">Crafting Digital Excellence</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Technologies and expertise that power exceptional digital solutions Exceptional digital solutions are powered by a blend of cutting-edge technologies and deep domain expertise.
          </p>
        </div>

        {/* Category Navigation */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 card-3d ${activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'glass-dark text-gray-300 hover:text-white border border-purple-500/20'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeCategory === category.id ? 'bg-white/20' : 'bg-purple-500/20'
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="hidden sm:block">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <div className={`inline-flex items-center space-x-4 px-8 py-4 rounded-2xl bg-gradient-to-r ${activeSkills.color} mb-6`}>
              <activeSkills.icon className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">{activeSkills.title}</h3>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">{activeSkills.description}</p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeSkills.skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group p-6 rounded-2xl glass-dark border border-purple-500/20 hover:border-purple-500/40 transform hover:scale-105 transition-all duration-300 card-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{skill.icon}</span>
                  <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Proficiency</span>
                    <span className="text-sm font-bold text-purple-400">{skill.level}%</span>
                  </div>

                  {/* 3D Progress Bar */}
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden perspective-1000">
                    <div
                      className={`h-full bg-gradient-to-r ${activeSkills.color} rounded-full transition-all duration-1000 ease-out transform-style-3d group-hover:animate-pulse3d`}
                      style={{
                        width: `${skill.level}%`,
                        boxShadow: `0 0 10px rgba(139, 92, 246, 0.5)`,
                        transform: 'rotateX(10deg)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 holographic">
            Certifications & Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl glass-purple border-2 border-purple-500/30 transform hover:scale-105 transition-all duration-300 card-3d group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:animate-pulse3d">{cert.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                  <p className="text-purple-400 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gray-400 text-xs">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Showcase */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 holographic">
            Favorite Tech Stack
          </h3>
          <div className="glass-dark rounded-3xl p-8 border border-purple-500/20">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'React', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
                { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-teal-500' },
                { name: 'TypeScript', icon: '📘', color: 'from-blue-600 to-indigo-600' },
                { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-700 to-purple-700' },
                // { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-cyan-400' },
                { name: 'AWS', icon: '☁️', color: 'from-orange-500 to-yellow-500' },
                { name: 'Tailwind', icon: '🎨', color: 'from-cyan-500 to-blue-500' },
                { name: 'Next.js', icon: '🔺', color: 'from-gray-700 to-gray-900' },
              ].map((tech, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-3 bg-gradient-to-r ${tech.color} rounded-xl text-white font-medium hover:scale-110 transform transition-all duration-300 cursor-pointer animate-float3d shadow-lg`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <div className="glass-purple rounded-3xl p-12 border-2 border-purple-500/30">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 holographic">
              Ready to Leverage These Skills?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how my expertise can help bring your project to life
            </p>
            <button className="btn-3d px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30">
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;