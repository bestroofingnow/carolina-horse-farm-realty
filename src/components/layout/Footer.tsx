"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "Free Estimate", href: "/estimate" },
  { name: "Service Areas", href: "/areas" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const citiesServed = [
  { name: "Charlotte", slug: "charlotte" },
  { name: "Columbus", slug: "columbus" },
  { name: "Forest City", slug: "forest-city" },
  { name: "Matthews", slug: "matthews" },
  { name: "Mill Spring", slug: "mill-spring" },
  { name: "Mooresville", slug: "mooresville" },
  { name: "Mint Hill", slug: "mint-hill" },
  { name: "Rutherfordton", slug: "rutherfordton" },
  { name: "Tryon", slug: "tryon" },
  { name: "Waxhaw", slug: "waxhaw" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cream-100">
              Carolina Horse Farm Realty
            </h3>
            <p className="text-forest-200 text-sm leading-relaxed">
              Specializing in horse farms, luxury equestrian properties, and
              country estates throughout North &amp; South Carolina. Your trusted
              partner in finding the perfect equestrian lifestyle.
            </p>
            <div className="pt-2">
              <Image
                src="/images/exp-land-ranch-logo-light.svg"
                alt="eXp Realty Land & Ranch"
                width={160}
                height={45}
                className="h-10 w-auto opacity-80"
              />
            </div>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center hover:bg-forest-700 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-cream-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-cream-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-forest-200 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-cream-100 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-forest-200 text-sm">
                  123 Equestrian Way<br />
                  Charlotte, NC 28277
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a
                  href="tel:+17049293289"
                  className="text-forest-200 hover:text-gold-400 transition-colors text-sm"
                >
                  (704) 929-3289
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:info@carolinahorsefarm.com"
                  className="text-forest-200 hover:text-gold-400 transition-colors text-sm"
                >
                  info@carolinahorsefarm.com
                </a>
              </li>
            </ul>
          </div>

          {/* Cities Served */}
          <div>
            <h3 className="text-lg font-semibold text-cream-100 mb-4">
              North &amp; South Carolina
            </h3>
            <p className="text-forest-300 text-xs mb-3 uppercase tracking-wide">
              Areas We Serve
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {citiesServed.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/areas/${city.slug}`}
                    className="text-forest-200 hover:text-gold-400 transition-colors text-sm"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-forest-300 text-sm">
              &copy; {new Date().getFullYear()} Carolina Horse Farm Realty. Brokered by eXp Realty. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
