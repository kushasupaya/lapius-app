"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn("top-0 fixed z-50 w-full", isScrolled ? "bg-secondary shadow-sm" : "bg-transparent")}>
      <div className="w-full h-8 bg-[#000909] text-center py-2.5 px-4">
        <p className="text-white text-[10px] font-medium uppercase">
          Introducing Lapius - Sign up for early access
        </p>
      </div>
      <div className="container mx-auto py-4 px-4 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="w-20">
            <Logo variant="default" />
          </div>
          <nav className="flex gap-8 md:ml-28">
            <Link href="/why-lapius" className="text-sm text-white font-medium hover:text-primary">Why Lapius</Link>
            <Link href="/how-it-works" className="text-sm text-white font-medium hover:text-primary">How It Works</Link>
            <Link href="/Blog" className="text-sm text-white font-medium hover:text-primary">Blog</Link>
            <Link href="/about" className="text-sm text-white font-medium hover:text-primary">About</Link>
            <Link href="/faq" className="text-sm text-white font-medium hover:text-primary">FAQ</Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link href="/sign-in" className="text-sm text-white font-medium hover:text-primary">Sign In</Link>
            <Button variant="primary" size="primary">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;