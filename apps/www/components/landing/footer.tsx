"use client";
import Link from "next/link";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

const BRAND = "RoamAI";

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "How it works", href: "/pageone" },
      { label: "Pricing", href: "#pricing" },
      { label: "Coming Soon", href: "#comingsoon" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Documentation", href: "/docs" },
      { label: "Community", href: "/community" },
      { label: "Status", href: "/status" },
    ],
  },
];

const SOCIALS: FooterLink[] = [
  { label: "X", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

const linkClass =
  "text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 dark:focus-visible:text-zinc-50";

export function Footer() {
  return (
    <footer className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto mt-10 max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {BRAND}
            </Link>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Plan, book, and manage every trip from one place.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-zinc-200 pt-8 text-sm md:flex-row md:items-center md:justify-between dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
            <span
              className="hidden h-4 w-px bg-zinc-200 md:block dark:bg-zinc-800"
              aria-hidden="true"
            />
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto flex h-full w-full items-center justify-center">
          <div className="font-gp text-[200px] font-extrabold tracking-normal text-white">
            RoamAI
          </div>
        </div>
      </div>
    </footer>
  );
}
