import React, { useContext } from "react";
import { motion } from "framer-motion";
import { UserCheck, Zap, Target, MapPin, Loader2 } from 'lucide-react';
import { PersonalInfoContext } from "@/App";

const About = () => {
  const personalInfo = useContext(PersonalInfoContext);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }
    }
  };

  if (!personalInfo) {
    return (
      <section id="about" className="section-padding bg-background/50 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </section>
    );
  }

  const aboutDetails = [
    { icon: <UserCheck size={24} className="text-primary" />, title: "Experience", detail: personalInfo.experience_years || "N/A" },
    { icon: <Zap size={24} className="text-primary" />, title: "Projects", detail: personalInfo.projects_completed || "N/A" },
    { icon: <Target size={24} className="text-primary" />, title: "Education", detail: personalInfo.education || "N/A" },
    { icon: <MapPin size={24} className="text-primary" />, title: "Location", detail: personalInfo.location || "N/A" },
  ];

  // Ensure aboutImageSrc correctly uses the URL from personalInfo or a fallback
  const aboutImageSrc = personalInfo.about_image_url || null; // No default fallback if URL is missing

  return (
    <section id="about" className="section-padding bg-background/30 dark:bg-background/50 overflow-hidden">
      <div className="container-custom">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1.5 gradient-bg mx-auto rounded-full mt-3"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={imageVariants}
            className="relative group"
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl aspect-square md:aspect-[4/3]">
              {/* Check if personalInfo.about_image_url is truthy before rendering img */}
              {personalInfo.about_image_url ? (
                <img  
                  alt={personalInfo.about_image_alt || "About me image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={aboutImageSrc} // Use the determined aboutImageSrc
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">About image URL not provided in database.</p>
                </div>
              )}
            </div>
            <motion.div 
              className="absolute -bottom-5 -right-5 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full -z-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -top-5 -left-5 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tl from-blue-500 to-teal-500 rounded-full -z-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              animate={{ scale: [1, 0.9, 1], rotate: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-3xl font-semibold mb-6 text-foreground/90"
            >
              {personalInfo.about_headline || "A brief introduction"}
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-foreground/70 mb-6 text-lg leading-relaxed"
            >
              {personalInfo.about_paragraph1 || "Details about your experience and passion."}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-foreground/70 mb-10 text-lg leading-relaxed"
            >
             {personalInfo.about_paragraph2 || "More about your goals and learning."}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {aboutDetails.map((item, index) => (
                 <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 bg-background/50 dark:bg-background/70 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-2 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground/90 text-lg">{item.title}</h4>
                    <p className="text-foreground/60 text-md">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
