"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CustomerAuth from "./customer-auth";
import { MenuIcon, XIcon } from "lucide-react";

interface Props {
  isBlog?: boolean;
}
const Header = ({ isBlog }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const router = useRouter();

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
    <>
      <header
        className={cn(
          "top-0 fixed z-50 w-full",
          "bg-transparent"
        )}
      >
        <div className="relative container bg-secondary shadow-sm mx-auto py-2 px-2 mt-7 md:px-0 rounded-full">
          <div className="flex justify-between items-center">
            <Link className="w-28 ml-5" href="/">
              <Logo variant="default" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 lg:ml-12">
              {/* <Link
                href="/why-lapius"
                className="text-sm text-white font-medium hover:text-primary"
              >
                Why Lapius
              </Link> */}
              <Link
                href="/#"
                className="text-base text-white font-medium hover:text-primary-dashboard"
              >
                Product
              </Link>
              <Link
                href="/#"
                className="text-base text-white font-medium hover:text-primary-dashboard"
              >
                Resources
              </Link>
              <Link
                href="/#"
                className="text-base text-white font-medium hover:text-primary-dashboard"
              >
                Company
              </Link>
              {/* <Link
                href="/#how-it-works"
                className="text-sm text-white font-medium hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="/blogs"
                className="text-sm text-white font-medium hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/#about"
                className="text-sm text-white font-medium hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/#faq"
                className="text-sm text-white font-medium hover:text-primary"
              >
                FAQ
              </Link> */}
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
                className="text-base text-white font-medium hover:text-primary-dashboard cursor-pointer"
                // onClick={() => setOpenSignup(true)}
              >
                Sign Up
              </p>
              <Button
                variant="ghost"
                className="px-3.5 py-5 bg-white text-black font-semibold mr-2 rounded-full"
                // onClick={() => setOpen(true)}
              >
                Login
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="absolute top-[68px] left-0 w-full bg-secondary py-6 md:hidden">
            <div className="container mx-auto px-4">
              <nav className="flex flex-col gap-4">
                {/* <Link
                  href="/why-lapius"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Why Lapius
                </Link> */}
                {/* <Link
                  href="/#how-it-works"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/blogs"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/#about"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/#faq"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </Link> */}
                <Link
                  href="/#"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Product
                </Link>
                <Link
                  href="/#"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href="/#"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Company
                </Link>
                <div className="flex flex-col gap-4">
                  <p
                    className="text-base text-white font-medium hover:text-primary-dashboard cursor-pointer"
                    // onClick={() => setOpenSignup(true)}
                  >
                    Login
                  </p>
                  <p
                    className="text-base text-white font-medium hover:text-primary-dashboard cursor-pointer"
                    // onClick={() => setOpenSignup(true)}
                  >
                    Sign Up
                  </p>
                  {/* <p
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
                  </Button> */}

                  {/* <Button
                    className="w-fit bg-primary-dashboard"
                    variant={"default"}
                    onClick={() => {
                      setOpenSignup(true);
                      setMenuOpen(false);
                    }}
                  >
                    Get in Touch
                  </Button> */}
                  {/* <Button
                    variant="primary"
                    size="primary"
                    className="w-fit"
                    // onClick={() => {
                    //   setOpenSignup(true);
                    //   setMenuOpen(false);
                    // }}
                    onClick={() => router.push("#wait-list-section")}
                  >
                    Get in Touch
                  </Button> */}
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
        setOpenSignup={setOpenSignup}
        onOpenChange={() => setOpenSignup((open) => !open)}
      />
    </>
  );
};

export default Header;
