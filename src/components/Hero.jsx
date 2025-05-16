
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, GitCommit as GitHub, Linkedin, Mail } from 'lucide-react';
import { PersonalInfoContext } from "@/App";
import { Loader2 } from 'lucide-react';

const Hero = () => {
  const personalInfo = useContext(PersonalInfoContext);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!personalInfo) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </section>
    );
  }

  const nameVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const heroImageSrc = personalInfo.hero_image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";


  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0"
    >
      <div className="absolute inset-0 -z-10">
        {/* Enhanced background blobs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-72 h-72 md:w-96 md:h-96 bg-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 1.1, ease: "easeInOut" }}
        />
      </div>

      <div className="container-custom grid md:grid-cols-5 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-3 order-2 md:order-1 text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-primary font-semibold text-lg mb-2"
          >
            {personalInfo.introduction_headline || "Hello, I'm"}
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.05, delayChildren: 0.5 }}
          >
            {(personalInfo.full_name || "Your Name").split("").map((char, index) => (
              <motion.span key={index} variants={nameVariants} custom={index} className="gradient-text">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-2xl md:text-3xl font-medium text-foreground/80 mb-8"
          >
            {personalInfo.job_title || "Your Job Title"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-foreground/70 mb-10 max-w-xl mx-auto md:mx-0 text-lg"
          >
            {personalInfo.introduction_paragraph || "Your introduction goes here."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <Button
              onClick={scrollToContact}
              className="btn-primary px-8 py-3 text-lg"
              size="lg"
            >
              Contact Me
            </Button>
            <Button
              variant="outline"
              onClick={scrollToProjects}
              className="btn-outline px-8 py-3 text-lg"
              size="lg"
            >
              View Projects
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex gap-6 mt-12 justify-center md:justify-start"
          >
            {[
              { href: personalInfo.github_url, icon: <GitHub size={28} />, label: "GitHub" },
              { href: personalInfo.linkedin_url, icon: <Linkedin size={28} />, label: "LinkedIn" },
              { href: personalInfo.email ? `mailto:${personalInfo.email}` : null, icon: <Mail size={28} />, label: "Email" },
            ].filter(item => item.href).map(item => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-foreground/60 hover:text-primary transition-colors duration-300"
                aria-label={item.label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 120 }}
          className="md:col-span-2 order-1 md:order-2 flex justify-center items-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <motion.div 
              className="absolute inset-0 rounded-full gradient-bg opacity-30"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-background/50">
              <img  
                alt={personalInfo.hero_image_alt || "Professional portrait"}
                className="w-full h-full object-cover"
                src={heroImageSrc} 
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="text-primary" size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
