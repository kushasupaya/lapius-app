"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CustomerAuth from "./customer-auth";
import { Calculator, MenuIcon, Receipt, Search, XIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import SignupDialog from "../forms/signup-dialog-form";
import LoginDialog from "../forms/login-dialog-form";

import { ProductDropdown } from "../sections/home/components";

interface Props {
  isBlog?: boolean;
}
const Header = ({ isBlog }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const router = useRouter();
  const products = [
    {
      name: "Estimate your Cost",
      description:
        "Chat with our dedicated AI assistant for a comprehensive treatment cost overview",
      href: "/estimate-cost",
      icon: Calculator,
    },
    {
      name: "Search for Care",
      description:
        "Explore pricing data from all Californian hospitals effortlessly with our free and easy-to-use tool",
      href: "/search-for-care",
      icon: Search,
    },
    {
      name: "Analyze your Medical Bill",
      description:
        "Upload your medical bills or documents to understand them and spot costly billing errors.",
      href: "/analyze-bill",
      icon: Receipt,
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = isBlog
    ? "relative  bg-secondary shadow-sm mx-auto py-4 px-4 md:px-6 w-full "
    : "relative max-w-[calc(100vw-32px)] container bg-secondary shadow-sm mx-auto xl:max-w-[980px] 2xl:max-w-[1020px] py-2 px-2 mt-3 md:mt-7 md:px-0 rounded-full ";
  return (
    <>
      <header className={cn("top-0 fixed z-50 w-full", "bg-transparent")}>
        <div className={headerClass}>
          <div className="flex justify-between items-center">
            <Link className="w-20 md:w-30 ml-4 md:ml-6" href="/">
              <Logo variant="default" size="large" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 lg:ml-12 items-center">
              {/* <Link
                href="/why-lapius"
                className="text-sm text-white font-medium hover:text-primary"
              >
                Why Lapius
              </Link> */}
              <ProductDropdown />
              {/* <Link
                href="/#how-it-works"
                className="text-sm text-white font-medium hover:text-primary-dashboard"
              >
                Product
              </Link> */}
              <Link
                href="/#why-lapius"
                className="text-sm text-white font-medium hover:text-primary-dashboard"
              >
                Why Lapius
              </Link>
              <Link
                href="/blog"
                className="text-sm text-white font-medium hover:text-primary-dashboard"
              >
                Blog
              </Link>
              <Link
                href="/#get-in-touch"
                className="text-sm text-white font-medium hover:text-primary-dashboard"
              >
                Contact Us
              </Link>
              <Link
                href="/#faq"
                className="text-sm text-white font-medium hover:text-primary-dashboard"
              >
                FAQ
              </Link>

              {/* <Link
                href="/#"
                className="text-base text-white font-medium hover:text-primary-dashboard"
              >
                Company
              </Link> */}
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
              */}
            </nav>

            {/* Hamburger Menu Icon */}
            <div className="flex md:hidden items-center mr-4">
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

            {/* Sign In and Get Started Buttons main */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/#get-in-touch">
                <Button
                  variant="link"
                  className="px-5 py-4 bg-white text-black  mr-3.5 rounded-full text-sm hover:outline-primary-dashboard border"
                >
                  Get In Touch
                </Button>
              </Link>
              {/* <SignupDialog
                trigger={
                  <Button
                    variant="link"
                    className="text-sm text-white font-medium hover:text-primary-dashboard cursor-pointer"
                    // onClick={() => setOpenSignup(true)}
                  >
                    Sign Up
                  </Button>
                }
                open={openSignup}
                onSignupChange={setOpenSignup}
                onOpenChange={setLoginDialogOpen}
              />
              <LoginDialog
                trigger={
                  <Button
                    variant="ghost"
                    className="px-5 py-4 bg-white text-black  mr-3.5 rounded-full text-sm hover:outline-primary-dashboard border"
                  >
                    Login
                  </Button>
                }
                onOpenChange={setLoginDialogOpen}
                open={loginDialogOpen}
                onSignUpChange={setOpenSignup}
              /> */}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="absolute top-[72px] left-2 w-[calc(100vw-32px)] rounded-2xl bg-secondary py-6 md:hidden">
            <div className="mx-auto px-8">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#why-lapius"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Why Lapius
                </Link>
                {/* <Link
                  href="/#how-it-works"
                  className="text-sm text-white font-medium hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/blog"
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
                  href="/#how-it-works"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Product
                </Link>
                <Link
                  href="/blog"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/#faq"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="flex flex-col gap-4">
                  <Link href="/#get-in-touch">
                    <Button
                      variant="link"
                      className="px-2 py-5 text-white  mr-3.5 rounded-full text-sm hover:outline-primary-dashboard border"
                    >
                      Get In Touch
                    </Button>
                  </Link>
                  {/* <LoginDialog
                    trigger={
                      <Button
                        variant="link"
                        className="px-2 py-5 text-white  mr-3.5 rounded-full text-sm hover:outline-primary-dashboard border"
                      >
                        Login
                      </Button>
                    }
                    onOpenChange={setLoginDialogOpen}
                    open={loginDialogOpen}
                    onSignUpChange={setOpenSignup}
                  />
                  <SignupDialog
                    trigger={
                      <Button
                        variant="link"
                        className="px-2 py-5 text-white  mr-3.5 rounded-full text-sm hover:outline-primary-dashboard border"
                        // onClick={() => setOpenSignup(true)}
                      >
                        Sign Up
                      </Button>
                    }
                    open={openSignup}
                    onSignupChange={setOpenSignup}
                    onOpenChange={setLoginDialogOpen}
                  /> */}
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

                  <Button
                    className="w-fit"
                    // onClick={() => {
                    //   setOpenSignup(true);
                    //   setMenuOpen(false);
                    // }}
                    onClick={() => router.push("#wait-list-section")}
                  >
                    Get in Touch
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* <CustomerAuth
        initialState="sign-in"
        open={open}
        onOpenChange={() => setOpen((open) => !open)}
      />
      <CustomerAuth
        initialState="sign-up"
        open={openSignup}
        setOpenSignup={setOpenSignup}
        onOpenChange={() => setOpenSignup((open) => !open)}
      /> */}
    </>
  );
};

export default Header;
