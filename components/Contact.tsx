import React, { useRef, useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // NOTE: In a real production environment, you should replace these IDs with
    // your own EmailJS service ID, template ID, and Public Key obtained from https://emailjs.com/
    // For this demonstration, we are using a free tier configuration.
    emailjs
      .sendForm(
        'service_baob942', // Replace with your EmailJS service ID
        'template_baob942', // Replace with your EmailJS template ID
        form.current,
        'A6N6zC7EuI-UZPrEI' // Replace with your EmailJS public key
      )
      .then(
        () => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          if (form.current) form.current.reset();

          // Reset success message after 5 seconds
          setTimeout(() => setSubmitStatus('idle'), 5000);
        },
        (error) => {
          console.error('FAILED...', error);
          if (error.status === 412) console.error("Template requires variables that aren't provided by the form names.");
          setIsSubmitting(false);
          setSubmitStatus('error');
        }
      );
  };

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
                  <p className="text-gray-400 text-sm">illi@outlook.kr</p>
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
            <form ref={form} className="space-y-4" onSubmit={sendEmail}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Name"
                  className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
                />
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Email"
                  className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
                />
              </div>
              <input
                type="text"
                name="user_company"
                placeholder="Company"
                className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Project Details (Exhibition Name, Date, Requirements)"
                className="w-full bg-arc-gray/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-arc-accent transition-colors"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${submitStatus === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-black hover:bg-arc-accent hover:text-white disabled:opacity-50'
                  }`}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : submitStatus === 'success' ? (
                  <><CheckCircle2 size={20} /> Message Sent!</>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2">
                  Failed to send message. EmailJS configuration required.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;