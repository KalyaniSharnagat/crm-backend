import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, Clock, CheckCircle, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'saurabhjagthap@gmail.com',
      href: 'mailto:saurabh.jagthap@devmaster.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8996008800',
      href: 'tel:+91 8767543423',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: ' 10, Saurabh Nagar-2, Nagpur, 440034',
      href: '#',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      label: 'Timezone',
      value: 'AM-PM (IN-8)',
      href: '#',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://www.github.com/', label: 'GitHub', color: 'hover:text-gray-400', bg: 'hover:bg-gray-800' },
    { icon: Linkedin, href: 'https://www.linkedin.com/', label: 'LinkedIn', color: 'hover:text-blue-400', bg: 'hover:bg-blue-900' },
    { icon: Twitter, href: 'https://www.twitter.com/', label: 'Twitter', color: 'hover:text-cyan-400', bg: 'hover:bg-cyan-900' },
    { icon: MessageCircle, href: 'https://www.message.com/', label: 'Discord', color: 'hover:text-indigo-400', bg: 'hover:bg-indigo-900' },
  ];

  const services = [
    { title: 'Web Development', description: 'Full-stack web applications with modern frameworks' },
    // { title: 'Mobile Apps', description: 'Cross-platform mobile applications for iOS and Android' },
    { title: 'API Development', description: 'RESTful and GraphQL APIs with comprehensive documentation' },
    { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and deployment strategies' },
    { title: 'Consulting', description: 'Technical consulting and architecture planning' },
    { title: 'Code Review', description: 'Code audits and performance optimization' },
  ];

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
            <span className="block animate-glitch text-purple-400 text-2xl mb-2 tracking-widest font-mono">Connect With Me</span>
            Get In <span className="holographic animate-gradientX bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl shadow-purple-500/50 px-6 py-2 rounded-2xl border-b-8 border-purple-500 inline-block font-extrabold">Touch</span>
            <span className="block mt-6 text-xl md:text-3xl text-pink-400 font-bold animate-slideInUp">Let's Build Something Great Together!</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's collaborate and bring your vision to life with cutting-edge technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slideIn3d' : 'opacity-0'}`}>
            <div className="glass-dark rounded-3xl p-8 border border-purple-500/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center animate-pulse3d">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white holographic">Send me a message</h3>
                  <p className="text-gray-400">I'll get back to you within 24 hours</p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center space-x-3 animate-fadeInUp3d">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Message sent successfully! I'll be in touch soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Name</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-purple-500/50"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-purple-500/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Subject</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-purple-500/50"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none group-hover:border-purple-500/50"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-3d"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mt-3 mb-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Services */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fadeInUp3d' : 'opacity-0'}`}>
            {/* Contact Details */}
            <div className="glass-dark rounded-3xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 holographic">Let's connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Feel free to reach out through any of these channels. I'm always open to discussing new opportunities and interesting projects.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center space-x-4 p-4 glass-purple border border-purple-500/30 rounded-xl hover:border-purple-500/60 transform hover:scale-105 transition-all duration-300 group card-3d"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center group-hover:animate-pulse3d shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{info.label}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4 holographic">Follow me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 glass-dark border border-purple-500/30 rounded-xl flex items-center justify-center text-white ${social.color} ${social.bg} transform hover:scale-125 hover:rotate-12 transition-all duration-300 card-3d`}
                        title={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Services */}
            {/* <div className="glass-dark rounded-3xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 holographic">Services I Offer</h3>
              <div className="grid gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="p-4 glass-purple border border-purple-500/30 rounded-xl hover:border-purple-500/60 transform hover:scale-105 transition-all duration-300 group"
                  >
                    <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Availability Status */}
            {/* <div className="glass-purple rounded-3xl p-8 border-2 border-green-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-white font-bold text-lg">Available for new projects</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I'm currently accepting new freelance projects and full-time opportunities. 
                Let's discuss how we can work together to create something amazing.
              </p>
              <div className="mt-4 flex items-center space-x-2 text-sm text-green-400">
                <Clock className="w-4 h-4" />
                <span>Response time: Usually within 24 hours</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;