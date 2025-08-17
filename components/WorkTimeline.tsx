'use client';

import { Briefcase, GraduationCap } from 'lucide-react';

type Item = {
  role: string;
  company: string;
  type?: string;       // Part-time / Full-time / Research
  start: string;       // "Aug 2022"
  end: string;         // "Present" or "Jul 2022"
  location?: string;
  bullets?: string[];
  icon?: 'work' | 'edu';
};

const items: Item[] = [
  {
    role: 'Case Manager (Identity & Cybersecurity)',
    company: 'IDCARE',
    type: 'Part-time',
    start: 'Aug 2022',
    end: 'Present',
    location: 'Sunshine Coast, QLD, Australia',
    bullets: [
      'Support victims of scams, identity theft, and data breaches with tailored action plans.',
      'Perform case triage and guide individuals through recovery — resetting accounts, hardening devices, and restoring access securely.',
      'Apply psychology + cybersecurity to reduce risk, spot social engineering, and strengthen digital resilience.',
      'Educate clients about preventative measures, including password hygiene, MFA, and safe browsing habits.',
      'Document incidents and contribute to intelligence reports that track emerging scam and threat patterns.',
      'Deliver prevention education by simplifying complex technical issues into clear, actionable advice.',
    ],
    icon: 'work',
  },
  {
    role: 'Retail Assistant',
    company: 'JPL Group – Angus & Coote',
    type: 'Part-time',
    start: 'Sep 2021',
    end: 'Jul 2022',
    location: 'Sunshine Coast, QLD, Australia',
    bullets: ['Customer service, sales, merchandising.'],
    icon: 'work',
  },
  {
    role: 'Crew Member',
    company: "McDonald’s",
    type: 'Part-time',
    start: 'Dec 2020',
    end: 'Sep 2021',
    location: 'Sunshine Coast, QLD, Australia',
    bullets: ['Teamwork, time management, communication.'],
    icon: 'work',
  },
  {
    role: 'Retail Assistant',
    company: 'Amcal Pharmacy',
    type: 'Part-time',
    start: 'Sep 2019',
    end: 'Mar 2020',
    location: 'Beerwah, QLD, Australia',
    bullets: ['Retail operations and sales assistance.'],
    icon: 'work',
  },
  {
    role: 'Mentoree of Dr Krisztina Morris',
    company: 'University of the Sunshine Coast',
    type: 'Research Mentorship',
    start: 'Apr 2018',
    end: 'Nov 2018',
    location: 'Queensland, Australia',
    bullets: [
      'Co-authored a thesis on Corporate Social Responsibility (Shell case study).',
      'Developed qualitative & quantitative research methodologies.',
    ],
    icon: 'edu',
  },
];

export default function WorkTimeline() {
  return (
    <section aria-labelledby="experience-title" className="mt-8">
      <h2 id="experience-title" className="sr-only">Work Experience</h2>

      <ol className="relative border-s border-neutral-200 dark:border-white/10">
        {items.map((item, i) => {
          const Icon = item.icon === 'edu' ? GraduationCap : Briefcase;
          const isCurrent = item.end?.toLowerCase() === 'present';

          return (
            <li key={i} className="ms-6 pb-6 last:pb-0">
              {/* timeline node */}
              <span
                className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full border
                           border-neutral-200 bg-white text-neutral-600 shadow-sm
                           dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                aria-hidden="true"
              >
                <Icon size={14} />
              </span>

              {/* card wrapper — highlighted if current */}
              <div
                className={
                  isCurrent
                    ? 'relative rounded-lg border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-600 dark:bg-emerald-900/20'
                    : ''
                }
              >
                {/* header */}
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.role}
                    {isCurrent && (
                      <span className="ml-2 inline-block rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white align-middle">
                        Current
                      </span>
                    )}
                  </h3>
                  <span className="text-sm text-neutral-500 dark:text-zinc-400">•</span>
                  <p className="text-sm text-neutral-700 dark:text-zinc-300">
                    {item.company}
                    {item.type ? ` · ${item.type}` : ''}
                  </p>
                </div>

                {/* meta */}
                <p className="mt-1 text-sm text-neutral-600 dark:text-zinc-400">
                  {item.start} – {item.end}
                  {item.location ? ` · ${item.location}` : ''}
                </p>

                {/* bullets */}
                {item.bullets?.length ? (
                  <ul className="mt-3 list-disc space-y-1 ps-5 text-sm text-neutral-700 dark:text-zinc-300">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
