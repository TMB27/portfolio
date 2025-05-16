
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Code } from "lucide-react";
import { PersonalInfoContext } from "@/App"; // Assuming you have this context

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [darkMode, setDarkMode] = useState(false); // Basic dark mode toggle state

  const personalInfo = useContext(PersonalInfoContext);
  const logoName = personalInfo?.full_name?.split(" ")[0] || "Portfolio";


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Active link highlighting
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      let current = "#home";
      sections.forEach(section => {
        if (section && section.offsetTop <= window.scrollY + 100) {
          current = `#${section.id}`;
        }
      });
      setActiveLink(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    // Dark mode preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
    }),
  };


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || isOpen ? "shadow-lg glassmorphic" : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <motion.a 
          href="#home" 
          className="text-2xl font-bold gradient-text flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Code size={28} className="mr-2 text-primary" /> {logoName}
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link text-lg ${
                activeLink === link.href ? "nav-link-active font-semibold" : ""
              }`}
              onClick={() => setActiveLink(link.href)}
            >
              {link.label}
            </a>
          ))}
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-primary" />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 mr-2 rounded-full hover:bg-foreground/10 transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary" />}
          </motion.button>
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} className="text-primary" /> : <Menu size={28} className="text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-20 left-0 right-0 bg-background/95 dark:bg-background/95 backdrop-blur-md shadow-xl pb-6 border-t border-border/50"
          >
            <ul className="flex flex-col items-center space-y-6 pt-6">
              {navLinks.map((link, index) => (
                <motion.li key={link.label} custom={index} variants={navItemVariants}>
                  <a
                    href={link.href}
                    className={`nav-link text-xl ${
                      activeLink === link.href ? "nav-link-active font-semibold" : ""
                    }`}
                    onClick={() => {
                      toggleMenu();
                      setActiveLink(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
