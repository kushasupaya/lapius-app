"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CustomerAuth from "./customer-auth";
import {
  ArrowUpRight,
  Calculator,
  MenuIcon,
  Receipt,
  Search,
  XIcon,
} from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import SignupDialog from "../forms/signup-dialog-form";
import LoginDialog from "../forms/login-dialog-form";

import { ProductDropdown } from "../sections/home/components";
import Image from "next/image";
import FullscreenVideoDialog from "./full-screen-video-dialog";

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
    ? "relative bg-secondary shadow-sm mx-auto py-4 px-4 md:px-6 w-full "
    : "relative container py-6 px-4 mx-auto xl:px-0";
  return (
    <>
      <header
        className={cn(
          "top-0 fixed z-50 w-full",
          isScrolled ? "bg-white border-b" : "bg-transparent"
        )}
      >
        <div className={headerClass}>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <Link className="h-6 md:h-8 md:ml-0" href="/">
                <Logo variant="default" size="large" />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex gap-10 items-center lg:ml-6">
                {/* <Link
                  href="/why-lapius"
                  className="text-sm text-white font-medium hover:text-primary"
                >
                  Why Lapius
                </Link> */}
                {/* <ProductDropdown /> */}
                {/* <Link
                  href="/#how-it-works"
                  className="text-sm text-white font-medium hover:text-primary-dashboard"
                >
                  Product
                </Link> */}
                <Link
                  href="/medical-assistant"
                  className="text-foreground font-medium hover:text-primary"
                >
                  AI Medbill Assistant
                </Link>
                {/* <Link
                  href="/#"
                  className="text-foreground font-medium hover:text-primary"
                >
                  Features
                </Link>
                <Link
                  href="/#"
                  className="text-foreground font-medium hover:text-primary"
                >
                  Resource
                </Link> */}
                {/* <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd-OLTQ07hoTw9GLCrSidrDjfTyfNhXXp-l-psge6Jq9YNhaA/viewform?usp=dialog"
                  target="_blank"
                  className="text-foreground font-medium hover:text-primary relative group"
                >
                  <span className="inline-flex items-center gap-1">
                    Request Early Access
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link> */}
                <Link
                  href="/contact"
                  className="text-foreground font-medium hover:text-primary"
                >
                  Get in touch
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
            </div>

            {/* Hamburger Menu Icon */}
            <div className="flex lg:hidden items-center mr-4">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="text-tertiary focus:outline-none"
              >
                {menuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Sign In and Get Started Buttons main */}
            <div className="hidden lg:flex items-center gap-2">
              <FullscreenVideoDialog
                title="Lapius Platform Demo"
                triggerComponent={
                  <Button
                    variant="outline"
                    className="p-2.5 bg-white text-foreground w-full md:w-max font-medium text-base border-[1.5px] border-foreground hover:border-primary hover:bg-primary rounded-lg h-12"
                  >
                    View Demo
                    <ArrowUpRight size={28} className="h-7 w-7 ml-4" />
                  </Button>
                }
              />
              <Button
                variant="default"
                className="p-2.5 text-white w-full md:w-max font-medium text-base bg-secondary hover:bg-secondary/70 rounded-lg h-12"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSd-OLTQ07hoTw9GLCrSidrDjfTyfNhXXp-l-psge6Jq9YNhaA/viewform?usp=dialog",
                    "_blank"
                  )
                }
              >
                Request Early Access
                <ArrowUpRight size={28} className="h-7 w-7 ml-4" />
              </Button>
              {/* <Link href="/medical-assistant">
                <Button
                  variant="default"
                  className="p-3 text-white w-full md:w-max font-medium text-base bg-secondary hover:bg-secondary/70 rounded-lg h-12"
                >
                  Try it now
                  <ArrowUpRight size={28} className="h-7 w-7 ml-4" />
                </Button>
              </Link> */}
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
          <div className="absolute top-[72px] left-2 w-[calc(100vw-32px)] rounded-2xl bg-gray-200 py-6 lg:hidden">
            <div className="mx-auto px-8">
              <nav className="flex flex-col gap-4">
                {/* <Link
                  href="#why-lapius"
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
                {/* <Link
                  href="#"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="text-base text-white font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Resource
                </Link> */}

                <Link
                  href="/medical-assistant"
                  className="text-base text-foreground font-medium hover:text-primary-dashboard"
                >
                  AI Medbill Assistant
                </Link>
                <Link
                  href="/contact"
                  className="text-base text-foreground font-medium hover:text-primary-dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Get in touch
                </Link>
                <div className="flex flex-col gap-4">
                  {/* <Link href="/#get-in-touch">
                    <Button
                      variant="link"
                      className="px-2 py-5 text-white  mr-3.5 rounded-full text-sm hover:outline-primary-dashboard border"
                    >
                      Get In Touch
                    </Button>
                  </Link> */}
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
                  <FullscreenVideoDialog
                    title="Lapius Platform Demo"
                    triggerComponent={
                      <Button
                        variant="outline"
                        className="p-2.5 w-full md:w-max bg-white text-foreground font-medium text-base border-[1.5px] border-foreground hover:border-primary hover:bg-primary rounded-lg h-12"
                      >
                        View Demo
                        <ArrowUpRight size={28} className="h-7 w-7 ml-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="default"
                    className="p-2.5 text-white w-full md:w-max font-medium text-base bg-secondary hover:bg-secondary/70 rounded-lg h-12"
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLSd-OLTQ07hoTw9GLCrSidrDjfTyfNhXXp-l-psge6Jq9YNhaA/viewform?usp=dialog",
                        "_blank"
                      )
                    }
                  >
                    Request Early Access
                    <ArrowUpRight size={28} className="h-7 w-7 ml-4" />
                  </Button>
                  {/* <Link href="/medical-assistant">
                    <Button
                      variant="default"
                      className="p-3 text-white font-medium w-full md:w-max text-base bg-primary hover:bg-primary rounded-lg h-12"
                    >
                      Try it now
                      <ArrowUpRight size={28} className="h-7 w-7 ml-4" />
                    </Button>
                  </Link> */}
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
