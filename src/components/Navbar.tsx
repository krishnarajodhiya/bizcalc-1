import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, User, Mail, Calculator } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/bizcalc", label: "BizCalc", icon: Calculator },
    { path: "/about", label: "About", icon: User },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav
      className={`${
        isScrolled ? "glass-navbar" : "bg-transparent"
      } transition-all duration-300 sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white dark:text-gray-100 font-poppins">
                BizCalc
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? "text-white dark:text-gray-100 bg-gradient-to-r from-white/25 to-white/15 dark:from-green-500/20 dark:to-green-400/10 backdrop-blur-sm border border-white/30 dark:border-green-400/30 shadow-lg dark:shadow-green-500/20"
                      : "text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 hover:bg-white/15 dark:hover:bg-green-500/10 hover:border-white/20 dark:hover:border-green-400/20 border border-transparent hover:shadow-lg dark:hover:shadow-green-500/10"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative">
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white dark:bg-green-400 rounded-full animate-pulse"></span>
                    )}
                  </span>
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative inline-flex items-center justify-center p-3 rounded-xl text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 hover:bg-white/15 dark:hover:bg-green-500/10 hover:border-white/20 dark:hover:border-green-400/20 border border-transparent hover:shadow-lg dark:hover:shadow-green-500/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20 dark:focus:ring-green-400/50 transition-all duration-300 transform hover:scale-105"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 glass-card border-t border-white/20 dark:border-green-400/20 backdrop-blur-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? "text-white dark:text-gray-100 bg-gradient-to-r from-white/25 to-white/15 dark:from-green-500/20 dark:to-green-400/10 backdrop-blur-sm border border-white/30 dark:border-green-400/30 shadow-lg dark:shadow-green-500/20"
                        : "text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 hover:bg-white/15 dark:hover:bg-green-500/10 hover:border-white/20 dark:hover:border-green-400/20 border border-transparent hover:shadow-lg dark:hover:shadow-green-500/10"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative">
                      {item.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white dark:bg-green-400 rounded-full animate-pulse"></span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
