import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { components } from "@/lib/item";
import { cn } from "@/lib/utils";
import FramedButton from "../elements/FramedButton";
import NavbarClient from "../elements/NavbarClient";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="z-30 fixed top-0 left-0 w-full flex items-center justify-between backdrop-blur-sm p-4 md:px-5">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/exe logo.png"
            height={300}
            width={400}
            alt="logo"
            className="h-20  w-[7rem]"
          />
        </Link>
      </div>

      {/* Center: Navigation Menu (hidden on small screens) */}
      <div className="hidden md:flex flex-grow justify-center items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6 flex-row bg-[#0A0A0A] rounded-2xl md:p-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-xl text-white hover:bg-gray-800">
                Getting started
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px]  lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full hover:bg-[#262626] w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Image
                          src="/assets/llogo.png"
                          height={100}
                          width={100}
                          alt="logo"
                          className="h-10 w-auto"
                        />
                        <div className=" mt-4 text-white text-lg font-medium">shadcn/ui</div>
                        <p className="text-gray-400 text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/" title="Introduction" className="hover:bg-[#262626]">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/" title="Installation" className="hover:bg-[#262626]">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="/" title="Typography" className="hover:bg-[#262626]">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white text-xl">Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px]  gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem className="hover:bg-[#262626]" key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white text-xl">Paids</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px]  gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem className="hover:bg-[#262626]" key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-xl text-white")}
                >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: Login Button (hidden on small screens) */}
      <Button   variant="secondary"    className="  hover:shadow-none px-12 py-4 border-2 border-black dark:border-white uppercase bg-muted text-white  transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
          > {/* Reduced button width */}
            Welcome
          </Button>

      {/* Mobile Menu (Client-side Logic) */}
      <NavbarClient />
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
          <div className="text-lg font-semibold leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-gray-400 text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;