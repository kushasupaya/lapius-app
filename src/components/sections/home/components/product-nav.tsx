"use client";

import * as React from "react";
import { Calculator, Search, Receipt, ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Search for Care",
    description: "Explore pricing data from all Californian hospitals",
    href: "/price-tool",
    icon: Search,
  },
  {
    name: "Estimate your Cost",
    description: "Chat with our AI Assistant to budget your medical services",
    href: "/chat-assistant",
    icon: Calculator,
  },

  {
    name: "Analyze your Medical Bill",
    description: "Upload your medical bills and spot errors.",
    comingsoon: true,
    icon: Receipt,
  },
];

const ProductDropdown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent p-0 text-white  hover:text-white focus:bg-white/10 focus:text-white">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[800px] gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[800px] ">
              {products.map((product) => (
                <ListItem
                  className="hover:bg-gray-200 hover:text-accent-foreground-sub-title-white"
                  key={product.name}
                  title={product.name}
                  href={product.href}
                  comingSoon={product.comingsoon}
                  icon={<product.icon className="h-6 w-6" />}
                >
                  {product.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon: React.ReactNode;
    comingSoon?: boolean;
  }
>(({ className, title, children, icon, comingSoon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
          {comingSoon ? (
            <div className=" max-w-24 text-xs text-primary mt-1 border border-primary rounded-full p-1.5">
              Coming Soon
            </div>
          ) : (
            <div className="flex items-center text-sm font-medium text-primary mt-2">
              See more
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          )}
          <div></div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ProductDropdown;
