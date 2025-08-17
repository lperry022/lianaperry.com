'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
  }

  return (
    // No bg/text here—inherit from <body> (which toggles via next-themes)
    <div className="min-h-screen">
      {/* top padding so your floating navbar/dock doesn't overlap */}
      <section className="px-6 pt-28 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl grid grid-cols-1 gap-12 md:grid-cols-2"
        >
          {/* Contact form */}
          <div>
            <h2 className="mb-6 text-4xl font-bold text-purple-700 dark:text-purple-400">
              Contact Me
            </h2>

            {submitted ? (
              <p className="text-lg text-emerald-700 dark:text-emerald-400">
                Thanks for your message! I’ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Field label="Name">
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    className="w-full rounded-md px-4 py-2
                               bg-white text-neutral-900
                               border border-neutral-300
                               placeholder-neutral-500
                               outline-none ring-0
                               focus:border-violet-400 focus:ring-2 focus:ring-violet-300/40
                               dark:bg-zinc-900 dark:text-white
                               dark:border-white/10 dark:placeholder-zinc-500
                               dark:focus:border-violet-500 dark:focus:ring-violet-500/30"
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-md px-4 py-2
                               bg-white text-neutral-900
                               border border-neutral-300
                               placeholder-neutral-500
                               outline-none ring-0
                               focus:border-violet-400 focus:ring-2 focus:ring-violet-300/40
                               dark:bg-zinc-900 dark:text-white
                               dark:border-white/10 dark:placeholder-zinc-500
                               dark:focus:border-violet-500 dark:focus:ring-violet-500/30"
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-md px-4 py-2
                               bg-white text-neutral-900
                               border border-neutral-300
                               placeholder-neutral-500
                               outline-none ring-0
                               focus:border-violet-400 focus:ring-2 focus:ring-violet-300/40
                               dark:bg-zinc-900 dark:text-white
                               dark:border-white/10 dark:placeholder-zinc-500
                               dark:focus:border-violet-500 dark:focus:ring-violet-500/30"
                  />
                </Field>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2
                             font-medium text-white transition
                             bg-violet-600 hover:bg-violet-500
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="mb-2 text-2xl font-semibold text-purple-700 dark:text-purple-300">
              Connect with me
            </h3>
            <div className="flex space-x-6 text-3xl">
              <Social href="https://www.linkedin.com/in/liana-perry-b5aa2717b/" label="LinkedIn">
                <FaLinkedin />
              </Social>
              <Social href="https://github.com/lperry022" label="GitHub">
                <FaGithub />
              </Social>
              <Social href="mailto:lianaperryy@gmail.com" label="Email">
                <FaEnvelope />
              </Social>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* — small helpers to keep classes tidy — */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-800 dark:text-zinc-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="text-purple-700 hover:text-purple-600 transition
                 dark:text-purple-300 dark:hover:text-purple-200
                 transform hover:scale-110"
    >
      {children}
    </a>
  );
}
