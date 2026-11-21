"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const HeaderBar = () => {
  const [isMobile, setMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MenuItems = [
    {
      label: "Skills",
      href: "#skills",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Contact",
      href: "#contact",
    },
    {
      label: "Projects",
      href: "#project",
    },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : ""
      }`}>
      <div className="container mx-auto  px-4">
        <div className="flex items-center justify-between h-16">
          <Link className="text-xl px-4 font-bold" href={"/"}>
            <h1 className="text-yellow-500">Darshik Bambhroliya</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8 ">
            {MenuItems.map((items, index) => {
              return (
                <a
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  href={items.href}
                  key={index}>
                  {items.label}
                </a>
              );
            })}
            <Button variant={"default"} size={"lg"} className="gap-2 ">
              <Download className="w-4 h-4" />
              Resume
            </Button>
          </nav>
          {/* */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="md:hidden"
            onClick={() => setMobile(!isMobile)}>
            {isMobile ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </Button>
        </div>
      </div>
      {/* Mobile  Menu */}

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 2 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          className="md:hidden border-t bg-background">
          {isMobile && (
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 ">
              {MenuItems.map((items, index) => (
                <a
                  href={items.href}
                  key={index}
                  onClick={() => setMobile(false)}>
                  {items.label}
                </a>
              ))}
              <Button variant={"default"} size={"sm"} className="gap-2 h-9">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </nav>
          )}
        </motion.div>
      </AnimatePresence>
    </header>
  );
};

export default HeaderBar;
