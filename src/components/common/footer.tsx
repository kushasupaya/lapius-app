import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-tertiary">
      <div className="container mx-auto p-4 xl:px-0 md:pt-20 md:pb-11">
        <div className="h-8 w-auto mb-6">
          <Image
            alt="logo"
            src="/logo/logo-dark.svg"
            width={100}
            height={100}
            className="h-8"
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <h2 className="text-4xl md:text-6xl text-tertiary-foreground font-medium mb-6 max-w-[580px]">
            Don&apos;t pay your hospital bills
          </h2>
          <div>
            <div className="flex flex-row items-start gap-4 max-w-[250px] mb-6">
              <Image
                alt=""
                src="/icons/location-marker.svg"
                height={24}
                width={24}
                className="mt-0.5"
              />
              <p className="text-base md:text-lg text-tertiary-foreground">
                San Francisco, CA
              </p>
            </div>
            <div className="flex flex-row items-start gap-4 max-w-[250px]">
              <Image
                alt=""
                src="/icons/envelop.svg"
                height={24}
                width={24}
                className="mt-0.5"
              />
              <p className="text-base md:text-lg text-tertiary-foreground">
                support@lapiusai.com
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 py-12 md:pb-0 md:mt-20 border-t border-[#363435] flex flex-col gap-14 md:flex-row justify-between">
          <div className="flex flex-col md:flex-row gap-6 md:gap-14">
            <Link href="#" className="text-tertiary-foreground hover:underline">
              About
            </Link>
            <Link href="#" className="text-tertiary-foreground hover:underline">
              Features
            </Link>
            <Link href="#" className="text-tertiary-foreground hover:underline">
              Works
            </Link>
            <Link href="#" className="text-tertiary-foreground hover:underline">
              Support
            </Link>
          </div>
          <div className="text-tertiary-foreground">
            Copyright © {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
