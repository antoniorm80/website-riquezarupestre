"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/lib/theme-toogle";

const NAVIGATION_ITEMS = [
  { name: "About", href: "/#features" },
  { name: "FAQ", href: "/#faq" },
  { name: "Precios", href: "/#pricing" },
  { name: "Contacto", href: "/blog" },
  { name: "Panel", href: "/dashboard/home" },
  { name: "Tienda", href: "/store" },
];

const SCROLL_DELAY_MS = 100;
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash scrolling when pathname changes
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    // Small delay to ensure the page has rendered
    const timeoutId = setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, SCROLL_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Check if it's a hash link to the home page
    if (href.startsWith("/#")) {
      const hash = href.substring(1); // Remove the leading '/'

      // If we're already on the home page, handle smooth scrolling
      if (pathname === "/") {
        e.preventDefault();
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", hash);
        }
      }
      // If we're on a different page, let Next.js navigate normally
      // The useEffect will handle the scrolling after navigation
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50">
      <header
        className={`w-full tracking-tighter transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-sm dark:bg-black"
            : "bg-white shadow-sm dark:bg-black"
        }`}
      >
        <div className="px-6">
          <div className="flex h-14 items-center justify-between">
            {/* Left section: Logo */}
            <div className="flex items-center gap-6">
              <Link
                aria-label="Luma AI"
                className="font-bold text-black text-xl tracking-tighter transition-colors dark:text-white"
                href="/"
              >
                ✺ Sonae
              </Link>
            </div>

            {/* Center section: Desktop Navigation */}
            <nav className="-translate-x-1/2 absolute left-1/2 hidden transform items-center gap-2 md:flex">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  aria-label={item.name}
                  className="rounded-lg px-3 py-1 text-black text-md tracking-tighter transition-colors hover:bg-black/15 dark:text-white dark:hover:bg-white/15"
                  href={item.href}
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right section: Theme Toggle and Auth Buttons */}
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <span className="text-black/50 dark:text-white/50">|</span>
              <Button
                className="h-8 rounded-lg px-3 py-1 text-black tracking-tighter transition-colors hover:bg-black/15 sm:h-8 dark:text-white dark:hover:bg-white/15"
                onClick={() => router.push("/login")}
                size="lg"
                variant="ghost"
              >
                Login
              </Button>
              <Button
                className="group h-7 rounded-lg bg-black px-3 py-1 text-white tracking-tighter transition-all duration-300 sm:h-8 dark:bg-white/95 dark:text-black dark:hover:bg-white dark:hover:text-black"
                onClick={() => router.push("/register")}
                size="lg"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
                className="rounded-md p-2 text-black transition-colors hover:bg-gray-800 dark:text-white dark:hover:bg-gray-100"
                onClick={handleToggleMenu}
                type="button"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="border-black/5 border-t py-4 md:hidden dark:border-white/5">
              <nav className="flex flex-col gap-3">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    aria-label={item.name}
                    className="rounded-md px-2 py-1.5 font-medium text-black text-sm transition-colors hover:bg-black/15 dark:text-white dark:hover:bg-white/15"
                    href={item.href}
                    key={item.name}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-2 flex gap-2 px-2">
                  <Button
                    className="flex-1 px-3 py-1 text-black tracking-tighter transition-colors hover:text-orange-400 dark:text-white dark:hover:text-orange-600"
                    size="sm"
                    variant="ghost"
                  >
                    Login
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 px-3 py-1 text-white tracking-tighter hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    size="sm"
                  >
                    Start Free
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
