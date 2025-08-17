'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    await fetch('https://formspree.io/f/xeozrgga', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white transition-colors">
      {/* if your navbar is a floating dock, give the page breathing room */}
      <section className="px-6 pt-28 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-purple-500 dark:text-purple-400">
              Contact Me
            </h2>

            {submitted ? (
              <p className="text-green-600 dark:text-green-400 text-lg">
                Thanks for your message! I’ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-zinc-300">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-md px-4 py-2
                               bg-white text-neutral-900
                               dark:bg-zinc-900 dark:text-white
                               border border-neutral-300 dark:border-white/10
                               placeholder-neutral-500 dark:placeholder-zinc-500
                               outline-none ring-0 focus:border-violet-400 focus:ring-2 focus:ring-violet-300/40
                               dark:focus:border-violet-500 dark:focus:ring-violet-500/30"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-zinc-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-md px-4 py-2
                               bg-white text-neutral-900
                               dark:bg-zinc-900 dark:text-white
                               border border-neutral-300 dark:border-white/10
                               placeholder-neutral-500 dark:placeholder-zinc-500
                               outline-none ring-0 focus:border-violet-400 focus:ring-2 focus:ring-violet-300/40
                               dark:focus:border-violet-500 dark:focus:ring-violet-500/30"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-zinc-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-md px-4 py-2
                               bg-white text-neutral-900
                               dark:bg-zinc-900 dark:text-white
                               border border-neutral-300 dark:border-white/10
                               placeholder-neutral-500 dark:placeholder-zinc-500
                               outline-none ring-0 focus:border-violet-400 focus:ring-2 focus:ring-violet-300/40
                               dark:focus:border-violet-500 dark:focus:ring-violet-500/30"
                  />
                </div>

                {/* Use a real submit button (GlowButton as a Link won’t submit forms) */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2
                             font-medium transition
                             bg-violet-600 hover:bg-violet-500 text-white
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Socials Section */}
          <div className="flex flex-col justify-center items-center space-y-4">
            <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-2">
              Connect with me
            </h3>
            <div className="flex space-x-6 text-3xl">
              <a
                href="https://www.linkedin.com/in/liana-perry-b5aa2717b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-purple-500 hover:text-purple-400 dark:text-purple-300 dark:hover:text-purple-200 transition transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/lperry022"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-purple-500 hover:text-purple-400 dark:text-purple-300 dark:hover:text-purple-200 transition transform hover:scale-110"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:lianaperryy@gmail.com"
                aria-label="Email"
                className="text-purple-500 hover:text-purple-400 dark:text-purple-300 dark:hover:text-purple-200 transition transform hover:scale-110"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
