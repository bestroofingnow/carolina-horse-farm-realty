"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-cream-50 shadow-lg shadow-forest-900/10"
          : "bg-cream-50/95 backdrop-blur-sm"
      }`}
    >
      {/* Top Bar with Phone */}
      <div className="bg-forest-900 text-cream-50 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          <a
            href="tel:+1-555-123-4567"
            className="flex items-center gap-2 text-sm hover:text-saddle-300 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>(555) 123-4567</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-forest-900 tracking-tight group-hover:text-forest-700 transition-colors">
                Carolina
              </span>
              <span className="text-sm font-medium text-saddle-600 tracking-widest uppercase -mt-1">
                Horse Farm Realty
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-forest-700 font-medium hover:text-saddle-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-saddle-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-forest-700 text-cream-50 px-6 py-2.5 rounded-md font-medium hover:bg-forest-600 transition-colors shadow-md hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-forest-900 hover:text-forest-700 hover:bg-cream-100 rounded-md transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-forest-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-forest-700 font-medium hover:text-saddle-600 hover:bg-cream-100 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-forest-700 text-cream-50 px-6 py-3 rounded-md font-medium hover:bg-forest-600 transition-colors shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
