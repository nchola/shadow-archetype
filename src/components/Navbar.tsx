import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-shadow-primary/80 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex-1">
          {/* Left side content if needed */}
        </div>
        
        {/* Brand Name - Centered on mobile, right-aligned on desktop */}
        <div className="flex-1 flex justify-end">
          <h2 className="font-orbitron text-lg md:text-xl font-bold transition-all duration-300">
            <span className={cn(
              "bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text",
              isScrolled ? "opacity-100" : "opacity-80 hover:opacity-100"
            )}>
              <a href="#" className="text-shadow-text font-orbitron text-lg md:text-2xl font-bold">
                SHADOW<span className="text-shadow-accent">ARCHETYPE</span>
              </a>
            </span>
          </h2>
        </div>

        <Button
          onClick={toggleMobileMenu}
          variant="ghost"
          className="md:hidden text-shadow-text hover:bg-shadow-secondary ml-4"
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-64 bg-shadow-primary z-50 transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <span className="text-shadow-text font-orbitron text-xl font-bold">MENU</span>
            <Button
              onClick={toggleMobileMenu}
              variant="ghost"
              className="text-shadow-text hover:bg-shadow-secondary"
            >
              ✕
            </Button>
          </div>

          <nav className="flex flex-col space-y-6">
            <a
              href="#hero"
              className="text-shadow-text text-lg hover:text-shadow-accent transition-colors"
              onClick={toggleMobileMenu}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-shadow-text text-lg hover:text-shadow-accent transition-colors"
              onClick={toggleMobileMenu}
            >
              About
            </a>
            <a
              href="#projects"
              className="text-shadow-text text-lg hover:text-shadow-accent transition-colors"
              onClick={toggleMobileMenu}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-shadow-text text-lg hover:text-shadow-accent transition-colors"
              onClick={toggleMobileMenu}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
