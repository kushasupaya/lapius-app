import Link from "next/link";
import Logo from "./logo";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto p-4 lg:px-0 md:pt-[60px] md:pb-16">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <div className="w-20">
              <Logo variant="default" />
            </div>
            <div className="mt-4.5 max-w-80">
              <p className="text-tertiary-foreground"></p>
            </div>
            {/* <div className="w-[208px] mt-4.5 py-4 px-6 rounded-[48px] border border-[#292E3B] text-[#CBCBCC] text-sm text-center">
              Copyright © {new Date().getFullYear()} Lapius
            </div> */}
            <div className="w-[208px] py-4 px-6 rounded-[48px] border border-[#292E3B] text-[#CBCBCC] text-sm text-center">
              Copyright © {new Date().getFullYear()} Lapius
            </div>
          </div>

          {/* <div className="flex flex-col gap-6 md:flex-row md:gap-20 py-2">
            <div className="flex flex-col gap-6">
              <p className="text-white text-sm font-bold">Company</p>
              <Link href="#" className="text-tertiary-foreground hover:text-primary text-sm">
                Why Lapius
              </Link>
              <Link
                href="#"
                className="text-tertiary-foreground hover:text-primary text-sm"
              >
                Solutions
              </Link>
              <Link
                href="#"
                className="text-tertiary-foreground hover:text-primary text-sm"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-tertiary-foreground hover:text-primary text-sm"
              >
                Resources
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-white text-sm font-bold">Connect</p>
              <Link
                href="#"
                className="text-tertiary-foreground hover:text-primary text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-tertiary-foreground hover:text-primary text-sm"
              >
                Learning Center
              </Link>
              <Link
                href="#"
                className="text-tertiary-foreground hover:text-primary text-sm"
              >
                Become an Affiliate
              </Link>
            </div>
            
          </div> */}
          <div className="flex  gap-6">
            <Link
              href="https://www.facebook.com/profile.php?id=61569863414116"
              className="text-tertiary-foreground hover:text-primary text-sm"
              target="_blank"
            >
              <IconBrandFacebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.instagram.com/lapiusai/"
              className="text-tertiary-foreground hover:text-primary text-sm"
              target="_blank"
            >
              <IconBrandInstagram className="w-6 h-6" />
            </Link>

            <Link
              href="https://x.com/LapiusAI"
              className="text-tertiary-foreground hover:text-primary text-sm"
              target="_blank"
            >
              <IconBrandX className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/lapius-ai"
              className="text-tertiary-foreground hover:text-primary text-sm"
              target="_blank"
            >
              <IconBrandLinkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="bg-[url('/images/footer.png')] bg-no-repeat bg-cover h-[280px] w-full"></div> */}
    </footer>
  );
};

export default Footer;
