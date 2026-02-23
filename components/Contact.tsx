import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-arc-dark to-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Start a Project</h3>
            <p className="text-gray-400">Ready to elevate your exhibition experience? Let's talk.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-arc-gray/50 rounded-lg text-arc-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Office</h4>
                  <p className="text-gray-400 text-sm">
                    123 Techno Valley-ro, Gangnam-gu<br />
                    Seoul, South Korea 06000
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-arc-gray/50 rounded-lg text-arc-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">contact@arc-systems.kr</p>
                  <p className="text-gray-400 text-sm">support@arc-systems.kr</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-arc-gray/50 rounded-lg text-arc-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <p className="text-gray-400 text-sm">+82 (02) 1234-5678</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
                />
              </div>
              <input 
                type="text" 
                placeholder="Company" 
                className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
              />
              <textarea 
                rows={4} 
                placeholder="Project Details (Exhibition Name, Date, Requirements)" 
                className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-arc-accent hover:text-white transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;