"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "Horse Farms", href: "/horse-farms" },
  { name: "Land & Acreage", href: "/land" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const citiesServed = [
  "Charlotte",
  "Huntersville",
  "Cornelius",
  "Davidson",
  "Mooresville",
  "Waxhaw",
  "Weddington",
  "Matthews",
  "Mint Hill",
  "Indian Trail",
  "Stallings",
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
              Specializing in luxury equestrian properties, horse farms, and
              country estates throughout the Charlotte Metro area. Your trusted
              partner in finding the perfect equestrian lifestyle.
            </p>
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
                  href="tel:+17045551234"
                  className="text-forest-200 hover:text-gold-400 transition-colors text-sm"
                >
                  (704) 555-1234
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
              Charlotte Metro, NC
            </h3>
            <p className="text-forest-300 text-xs mb-3 uppercase tracking-wide">
              Cities We Serve
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {citiesServed.map((city) => (
                <li
                  key={city}
                  className="text-forest-200 text-sm"
                >
                  {city}
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
              &copy; 2025 Carolina Horse Farm Realty. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-forest-300 hover:text-gold-400 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-forest-300 hover:text-gold-400 transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
