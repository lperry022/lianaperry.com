'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import GlowButton from '@/components/GlowButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    await fetch('https://formspree.io/f/your_form_id', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      <section className="px-6 py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white-400 glow">Contact Me</h2>

            {submitted ? (
              <p className="text-green-400 text-lg">Thanks for your message! I’ll get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-purple-300">Name</label>
                  <input name="name" required
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-white-500 focus:ring-2 focus:ring-purple-500" />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-purple-300">Email</label>
                  <input type="email" name="email" required
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-white-500 focus:ring-2 focus:ring-purple-500" />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-purple-300">Message</label>
                  <textarea name="message" rows={5} required
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-white-500 focus:ring-2 focus:ring-purple-500" />
                </div>

                <GlowButton text="Send Message" href="#" />
              </form>
            )}
          </div>

          {/* Socials Section */}
          <div className="flex flex-col justify-center items-center space-y-4">
            <h3 className="text-2xl font-semibold text-purple-300 mb-2">Connect with me</h3>
            <div className="flex space-x-6 text-purple-400 text-3xl">
              <a href="https://www.linkedin.com/in/liana-perry-b5aa2717b/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-purple-300 hover:scale-110 transition transform duration-300" />
              </a>
              <a href="https://github.com/lperry022" target="_blank" rel="noopener noreferrer">
                <FaGithub className="hover:text-purple-300 hover:scale-110 transition transform duration-300" />
              </a>
              <a
                href="mailto:lianaperryy@gmail.com"
                className="hover:text-purple-200 transition"
                aria-label="Email"
              >
                <FaEnvelope className="hover:text-purple-300 hover:scale-110 transition transform duration-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
      {/* Footer*/}
      <Footer />
    </div>
  );
};

export default Contact;
