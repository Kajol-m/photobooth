"use client";

import Link from "next/link";
import { Github, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F5F5DA] text-[#C9212D] mt-auto pt-[50px] md:pt-[50px] lg:pt-[100px] pb-4">
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-row justify-between items-center">
        
        {/* LEFT: Navigation Links */}
        <div className="flex gap-3 md:gap-4 text-[10px] md:text-sm font-bold tracking-[0.15em]">
          <Link href="/" className="hover:underline underline-offset-4">
            HOME
          </Link>
          <Link href="/privacy-policy" className="hover:underline underline-offset-4">
            PRIVACY
          </Link>
        </div>

        {/* CENTER: Brand & Copyright */}
        <div className="text-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <p className="text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap">
            PHOTOBOOTH © {new Date().getFullYear()}
          </p>
        </div>

        {/* RIGHT: Social Icons */}
        <div className="flex gap-3 md:gap-4 items-center">
          <a
            href="https://instagram.com/jimmie_codes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="Instagram"
          >
            <Instagram size={20} strokeWidth={2.5} />
          </a>
          <a
            href="https://github.com/kajol-m"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="GitHub"
          >
            <Github size={20} strokeWidth={2.5} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;