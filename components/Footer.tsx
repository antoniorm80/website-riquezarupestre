"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "API", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

export default function Footer() {
 const currentYear = new Date().getFullYear();

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission disabled - integrate with your email service when ready
  };

  return (
    <footer className="relative mx-2 mb-4 w-auto overflow-hidden rounded-xl bg-white py-10 sm:mx-4 sm:py-12 dark:bg-black">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-black/2 to-transparent dark:from-white/2" />

      {/* Large "AGENTS" text in background - horizontal at bottom */}
      <div className="-translate-x-1/2 pointer-events-none absolute bottom-0 left-1/2">
        <span className="select-none font-bold text-[8rem] text-black/2 tracking-tighter sm:text-[10rem] md:text-[12rem] lg:text-[14rem] dark:text-white/2">
          AGENTS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs shrink-0">
            <Link
              className="font-bold text-4xl text-black tracking-tighter transition-opacity hover:opacity-90 dark:text-white"
              href="/"
            >
              ✺ Sonae
            </Link>
            <p className="mt-3 text-black/60 text-sm tracking-tighter dark:text-white/60">
              AI agents that work, always.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12 lg:gap-16">
            {footerLinks.map((section) => (
              <div className="space-y-4" key={section.title}>
                <h3 className="font-medium text-black text-sm tracking-tighter dark:text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        className="text-black/60 text-sm tracking-tighter transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-xs shrink-0 space-y-4">
            <h3 className="font-medium text-black text-sm tracking-tighter dark:text-white">
              Get in touch
            </h3>
            <p className="text-black/60 text-sm tracking-tighter dark:text-white/60">
              Join developers building the next generation of AI-powered
              workflows.
            </p>
            <form className="space-y-2" onSubmit={handleEmailSubmit}>
              <div className="flex gap-2">
                <Input
                  autoComplete="off"
                  className="h-10 flex-1 rounded-lg border-black/10 bg-transparent px-4 text-sm tracking-tighter placeholder:text-black/40 focus:border-black focus:ring-1 focus:ring-black dark:border-white/10 dark:focus:border-white dark:focus:ring-white dark:placeholder:text-white/40"
                  name="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
                <Button
                  className="group h-10 w-10 rounded-lg bg-black p-0 text-white transition-all duration-300 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  type="submit"
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <p className="text-black/40 text-xs tracking-tighter dark:text-white/40">
                We'll get back to you within 24 hours.
              </p>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-black/10 border-t pt-6 text-black/50 text-xs tracking-tighter sm:flex-row sm:items-center dark:border-white/10 dark:text-white/50">
          <p>© {currentYear} KOKONUT. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              className="transition-colors hover:text-black dark:hover:text-white"
              href="#"
            >
              Terms
            </Link>
            <Link
              className="transition-colors hover:text-black dark:hover:text-white"
              href="#"
            >
              Privacy
            </Link>
            <Link
              className="transition-colors hover:text-black dark:hover:text-white"
              href="#"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
