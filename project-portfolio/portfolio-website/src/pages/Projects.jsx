import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Filter, Globe, Smartphone, Code, Server, Star, Calendar, Users } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  const projects = [
    {
      id: 1,
      title: 'AI-Powered E-Commerce Platform',
      description: 'A next-generation e-commerce solution with AI-driven product recommendations, real-time inventory management, and advanced analytics dashboard.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'TensorFlow', 'AWS'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      stats: { stars: 245, forks: 67, users: '10K+' },
      year: '2025',
      status: 'Live'
    },
    {
      id: 2,
      title: 'Real-Time Collaboration Suite',
      description: 'A comprehensive collaboration platform with video conferencing, document sharing, real-time editing, and project management capabilities.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Socket.io', 'WebRTC', 'MongoDB', 'Redis', 'Kubernetes'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      stats: { stars: 189, forks: 43, users: '5K+' },
      year: '2024',
      status: 'Live'
    },
    {
      id: 3,
      title: 'Cross-Platform Fitness App',
      description: 'A comprehensive fitness tracking application with AI workout plans, nutrition tracking, social features, and wearable device integration.',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'Firebase', 'TensorFlow Lite', 'HealthKit', 'Google Fit'],
      category: 'mobile',
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      stats: { stars: 156, forks: 34, users: '15K+' },
      year: '2025',
      status: 'Live'
    },
    {
      id: 4,
      title: 'Blockchain Portfolio Tracker',
      description: 'A sophisticated cryptocurrency portfolio management tool with real-time price tracking, advanced analytics, and DeFi integration.',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Web3.js', 'Solidity', 'Node.js', 'GraphQL', 'PostgreSQL'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      stats: { stars: 298, forks: 89, users: '8K+' },
      year: '2023',
      status: 'Live'
    },
    {
      id: 5,
      title: 'Microservices API Gateway',
      description: 'A high-performance API gateway with advanced routing, authentication, rate limiting, monitoring, and auto-scaling capabilities.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Node.js', 'Express', 'Redis', 'MongoDB', 'Docker', 'Kubernetes'],
      category: 'backend',
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      stats: { stars: 412, forks: 123, users: '3K+' },
      year: '2023',
      status: 'Live'
    },
    {
      id: 6,
      title: 'AR Shopping Experience',
      description: 'An innovative augmented reality shopping app that allows users to visualize products in their space before purchasing.',
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'ARKit', 'ARCore', 'Three.js', 'Firebase', 'Stripe'],
      category: 'mobile',
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      stats: { stars: 187, forks: 45, users: '12K+' },
      year: '2023',
      status: 'Beta'
    },
    {
      id: 7,
      title: 'AI Content Management System',
      description: 'An intelligent CMS with AI-powered content generation, SEO optimization, and automated publishing workflows.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Vercel', 'Tailwind'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      stats: { stars: 334, forks: 78, users: '6K+' },
      year: '2024',
      status: 'Live'
    },
    {
      id: 8,
      title: 'IoT Dashboard Platform',
      description: 'A comprehensive IoT device management platform with real-time monitoring, analytics, and automated control systems.',
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'MQTT', 'InfluxDB', 'Grafana', 'Docker', 'Raspberry Pi'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
      stats: { stars: 267, forks: 56, users: '4K+' },
      year: '2023',
      status: 'Live'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe, count: projects.length },
    { id: 'web', label: 'Web Apps', icon: Globe, count: projects.filter(p => p.category === 'web').length },
    // { id: 'mobile', label: 'Mobile Apps', icon: Smartphone, count: projects.filter(p => p.category === 'mobile').length },
    { id: 'backend', label: 'Backend', icon: Server, count: projects.filter(p => p.category === 'backend').length },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black relative overflow-hidden alltabmt">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      <div className="floating-particles"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-8xl font-extrabold text-white mb-10 text-3d animate-fadeInUp3d">
            <span className="block animate-glitch text-purple-400 text-2xl mb-2 tracking-widest font-mono">Showcase</span>
            My <span className="holographic animate-gradientX bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl shadow-purple-500/50 px-6 py-2 rounded-2xl border-b-8 border-purple-500 inline-block font-extrabold">Projects</span>
            <span className="block mt-6 text-xl md:text-3xl text-pink-400 font-bold animate-slideInUp">Innovation. Impact. Inspiration.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions and creative implementations, My projects are a reflection of innovative thinking and practical problem-solving.and real-world impact.
          </p>
        </div>

        {/* Featured Projects Highlight */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <h3 className="text-3xl font-bold text-white text-center mb-8 holographic">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden glass-dark border border-purple-500/30 hover:border-purple-500/60 transform hover:scale-105 transition-all duration-500 card-3d"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                  {/* Status Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${project.status === 'Live'
                      ? 'bg-green-500/80 text-white'
                      : 'bg-yellow-500/80 text-black'
                    }`}>
                    {project.status}
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Featured</span>
                  </div>

                  {/* Overlay Actions */}
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <div className="flex space-x-4">
                      <a
                        href={project.demoUrl}
                        className="p-3 bg-purple-600/80 backdrop-blur-sm rounded-xl text-white hover:bg-purple-600 transition-colors transform hover:scale-110"
                      >
                        <Eye className="w-5 h-5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl text-white hover:bg-gray-800 transition-colors transform hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div> */}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-400">{project.year}</span>
                  </div>

                  <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Code className="w-3 h-3" />
                      <span>{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{project.stats.users}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-md text-xs font-medium border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-md text-xs font-medium">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 card-3d ${filter === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'glass-dark text-gray-300 hover:text-white border border-purple-500/20'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-5 h-5 group-hover:animate-pulse3d" />
                <span>{category.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${filter === category.id ? 'bg-white/20' : 'bg-purple-500/20'
                  }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* All Projects Grid */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden glass-dark border border-purple-500/20 hover:border-purple-500/40 transform hover:scale-105 transition-all duration-300 card-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${project.status === 'Live'
                      ? 'bg-green-500/80 text-white'
                      : 'bg-yellow-500/80 text-black'
                    }`}>
                    {project.status}
                  </div>

                  {/* Featured Badge */}
                  {/* {project.featured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white">
                      ⭐
                    </div>
                  )} */}

                  {/* Overlay Actions */}
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <div className="flex space-x-3">
                      <a
                        href={project.demoUrl}
                        className="p-2 bg-purple-600/80 backdrop-blur-sm rounded-lg text-white hover:bg-purple-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white hover:bg-gray-800 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div> */}
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-400">{project.year}</span>
                  </div>

                  <p className="text-gray-400 mb-3 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{project.stats.users}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
          <div className="glass-purple rounded-3xl p-12 border-2 border-purple-500/30">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 holographic">
              Want to see more projects?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Check out my GitHub for more open-source projects and contributions to the developer community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/your-repo-link"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 btn-3d"
              >
                <Github className="w-5 h-5" />
                <span>Visit GitHub</span>
              </a>
              <button className="inline-flex items-center space-x-2 px-8 py-4 glass-dark border border-purple-500/30 rounded-xl font-bold text-white hover:bg-purple-600/20 transform hover:scale-105 transition-all duration-300">
                <ExternalLink className="w-5 h-5" />
                <span>View All Projects</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;