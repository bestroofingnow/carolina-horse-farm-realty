"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

// Horse head logo component
function HorseLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
    >
      <circle cx="100" cy="100" r="95" fill="#1B4332" />
      <g
        transform="translate(15,200) scale(0.085,-0.085)"
        fill="#C8A951"
      >
        <path d="M1210 1828 c-19 -16 -56 -49 -81 -73 -42 -40 -51 -44 -110 -50 -160
-14 -349 -65 -349 -93 0 -5 18 -12 41 -15 22 -3 42 -7 44 -9 2 -2 -6 -26 -19
-53 -13 -28 -27 -67 -30 -87 -9 -51 10 -151 41 -215 25 -51 97 -132 109 -121
3 3 -3 23 -14 45 -107 212 7 445 232 478 41 7 52 13 75 46 14 21 29 38 33 39
4 0 7 -18 6 -39 0 -49 5 -58 41 -66 51 -11 143 -99 180 -173 19 -37 53 -92 76
-122 66 -88 63 -90 -19 -10 -42 41 -79 84 -82 95 -16 53 -63 76 -109 54 -15
-7 -11 -8 18 -5 29 4 43 0 58 -15 10 -10 19 -24 19 -30 0 -6 36 -50 81 -97
114 -123 119 -145 8 -35 -52 50 -116 104 -144 120 -27 16 -55 40 -61 52 -7 13
-14 18 -18 13 -8 -14 38 -56 97 -90 29 -16 89 -69 134 -116 74 -78 113 -103
96 -61 -11 29 6 14 36 -33 31 -48 44 -83 17 -47 -16 23 -46 14 -46 -14 0 -30
31 -43 53 -24 16 15 16 14 6 -15 -12 -35 -50 -67 -92 -77 -22 -6 -28 -3 -36
18 -12 32 -44 62 -90 83 -20 9 -46 24 -59 32 -21 13 -21 16 -7 32 21 23 20 44
-2 35 -66 -28 -91 -33 -132 -25 -85 15 -131 73 -141 179 l-6 66 -18 -40 c-15
-31 -17 -55 -13 -110 6 -62 4 -74 -19 -113 -34 -58 -46 -138 -30 -201 7 -26
36 -85 65 -130 29 -45 60 -99 68 -119 19 -45 33 -92 28 -92 -3 0 -11 12 -19
28 -20 36 -89 106 -155 155 -44 33 -59 52 -88 116 -20 42 -67 122 -105 179
-96 141 -112 180 -112 273 -1 69 3 83 36 148 20 39 32 73 27 76 -12 8 -129
-23 -156 -41 -32 -20 -29 -34 7 -34 17 0 30 -2 30 -5 0 -3 -10 -25 -22 -48
-19 -34 -23 -58 -23 -127 1 -96 19 -155 87 -279 l40 -74 -32 23 c-41 29 -108
114 -132 167 -20 46 -25 117 -12 198 6 44 5 48 -8 37 -9 -7 -28 -40 -44 -75
-25 -53 -29 -74 -29 -147 0 -65 5 -95 21 -130 24 -51 103 -135 197 -209 63
-50 65 -53 65 -96 -1 -25 -6 -45 -11 -45 -20 0 -134 70 -180 110 -78 69 -113
142 -126 260 -7 64 -7 65 -20 35 -7 -16 -16 -60 -18 -96 -15 -187 78 -306 342
-444 157 -82 214 -128 252 -205 14 -30 18 -53 22 -135 1 -17 28 19 40 54 6 19
11 50 11 70 0 75 -19 111 -101 195 -77 78 -79 82 -79 129 l0 48 41 -23 c65
-36 147 -121 174 -180 26 -57 32 -119 15 -177 -11 -40 -7 -49 16 -30 46 38 99
225 99 350 0 84 -1 87 -59 205 -49 98 -60 130 -64 182 -6 85 5 97 65 71 25
-10 68 -19 96 -19 68 0 172 -52 204 -101 38 -57 41 -59 102 -59 99 0 165 61
163 150 -1 47 -6 57 -93 173 -51 67 -105 151 -121 187 -48 108 -52 113 -103
152 -28 21 -49 44 -48 51 1 6 7 30 12 52 11 41 4 115 -9 115 -9 0 -45 -41 -71
-80 -16 -24 -16 -22 -12 46 3 39 2 74 -3 77 -5 3 -25 -8 -44 -25z" />
      </g>
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/estimate", label: "Free Estimate" },
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
            href="tel:+17049293289"
            className="flex items-center gap-2 text-sm hover:text-gold-400 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>(704) 929-3289</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Co-Branded Logos: eXp Land & Ranch (leftmost per brand guidelines) | Carolina Horse Farm Realty */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eXp Realty Land & Ranch - must be leftmost per brand guidelines */}
            <Image
              src="/images/exp-land-ranch-logo.png"
              alt="eXp Realty Land & Ranch"
              width={48}
              height={48}
              className="hidden sm:block h-12 w-auto flex-shrink-0"
            />
            <div className="hidden sm:block h-10 w-px bg-forest-300/50 flex-shrink-0" />
            {/* Carolina Horse Farm Realty */}
            <HorseLogo className="w-12 h-12 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-forest-900 tracking-tight group-hover:text-forest-700 transition-colors">
                Carolina
              </span>
              <span className="text-sm font-medium text-gold-600 tracking-widest uppercase -mt-1">
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
                className="text-forest-700 font-medium hover:text-gold-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-600 after:transition-all hover:after:w-full"
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
                className="block px-4 py-3 text-forest-700 font-medium hover:text-gold-600 hover:bg-cream-100 rounded-md transition-colors"
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
