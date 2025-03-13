import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  variant?: "default" | "compact";
  size?: "base" | "large";
}

const Logo = ({ variant = "default", size = "base" }: Props) => {
  return (
    <Image
      alt="logo"
      // TODO: replace image and styles for compact
      src={variant === "default" ? "/logo/logo-full.svg" : "/logo/logo-purple.svg"}
      width={100}
      height={100}
      className={cn("w-full", size === "large" ? "h-8" : "h-6")}
    />
  );
};

export default Logo;
