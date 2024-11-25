"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CustomerAuth from "./customer-auth";
import { MenuIcon, XIcon } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

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
    <div>
      <header
        className={cn(
          "top-0 fixed z-40 w-full",
          isScrolled ? "bg-secondary shadow-sm" : "bg-transparent"
        )}
      >
        <div className="w-full h-8 bg-[#000909] text-center py-2.5 px-4">
          <p className="text-white text-[10px] font-medium uppercase">
            Introducing Lapius - Sign up for early access
          </p>
        </div>
        <div className="relative container mx-auto py-4 px-4 lg:px-0">
          <div className="flex justify-between items-center">
            <div className="w-20">
              <Logo variant="default" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 lg:ml-28">
              <Link
                href="/why-lapius"
                className="text-sm text-white font-medium hover:text-primary"
              >
                Why Lapius
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-white font-medium hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="/Blog"
                className="text-sm text-white font-medium hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm text-white font-medium hover:text-primary"
              >
                About
              </Link>
              <Link
                href="#faq"
                className="text-sm text-white font-medium hover:text-primary"
              >
                FAQ
              </Link>
            </nav>

            {/* Hamburger Menu Icon */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="text-white focus:outline-none"
              >
                {menuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Sign In and Get Started Buttons */}
            <div className="hidden md:flex items-center gap-6">
              <p
                className="text-sm text-white font-medium hover:text-primary cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Sign In
              </p>
              <Button
                variant="primary"
                size="primary"
                onClick={() => setOpenSignup(true)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="absolute top-[88px] left-0 w-full bg-secondary pb-6 md:hidden">
            <div className="container mx-auto px-4">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/why-lapius"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Why Lapius
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/Blog"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#faq"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="flex flex-col gap-4">
                  <p
                    className="text-sm text-white font-medium hover:text-primary cursor-pointer"
                    onClick={() => {
                      setOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    Sign In
                  </p>
                  <Button
                    variant="primary"
                    size="primary"
                    className="w-fit"
                    onClick={() => {
                      setOpenSignup(true);
                      setMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <CustomerAuth
        initialState="sign-in"
        open={open}
        onOpenChange={() => setOpen((open) => !open)}
      />
      <CustomerAuth
        initialState="sign-up"
        open={openSignup}
        onOpenChange={() => setOpenSignup((open) => !open)}
      />
    </div>
  );
};

export default Header;
