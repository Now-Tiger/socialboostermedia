"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import watermelon from "../../../public/watermelon.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-black/30 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-9 bg-slate-200 rounded-lg flex items-center justify-center group-hover:scale-115 transition-transform">
            <Image src={watermelon} alt="icon" width={34} height={34} />
          </div>
          <span className="text-lg font-bold text-gray-800 hover:text-slate-500"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 pl-40">
          <Link
            href="/"
            className="text-gray-800 hover:text-slate-500 transition-colors"
          >
            Product
          </Link>
          <Link
            href="/analytics"
            className="text-gray-800 hover:text-slate-500 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/app"
            className="text-gray-800 hover:text-slate-500 transition-colors"
          >
            App
          </Link>
          <a 
            href={`${process.env.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 hover:underline"
          >
            About
        </a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/#auth">
            <Button
              variant="ghost"
              className="text-gray-800 hover:text-slate-500 hover:bg-white/5"
            >
              Login
            </Button>
          </Link>
          <Link href="/#auth">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg">
              Get started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
}
