'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    await fetch('https://formspree.io/f/xeozrgga', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    setSubmitted(true);
    form.reset();
  };

  return (
    <section className="min-h-screen px-6 py-20 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 text-purple-400 glow">Contact Me</h2>

        {submitted ? (
          <p className="text-green-400 text-lg">Thanks for your message! I’ll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-300">Name</label>
              <input type="text" id="name" name="name" required
                className="w-full px-4 py-2 bg-gray-900 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-300">Email</label>
              <input type="email" id="email" name="email" required
                className="w-full px-4 py-2 bg-gray-900 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-purple-300">Message</label>
              <textarea id="message" name="message" required rows={5}
                className="w-full px-4 py-2 bg-gray-900 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <button type="submit"
              className="px-6 py-3 bg-purple-700 hover:bg-purple-600 transition rounded-lg font-semibold text-white glow">
              Send Message
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;
