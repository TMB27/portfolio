
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Loader2, GitCommit as GitHub, Linkedin, Twitter, Instagram, FileText } from 'lucide-react';
import { PersonalInfoContext } from "@/App";
import { Button } from "@/components/ui/button";

const ContactInfo = () => {
  const personalInfo = useContext(PersonalInfoContext);

  if (!personalInfo) {
    return (
      <div className="bg-card/80 dark:bg-card/90 rounded-xl shadow-xl p-8 border border-border/50 h-full flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  const contactInfoItems = [
    {
      icon: <MapPin className="text-primary" size={22}/>,
      title: "Location",
      details: personalInfo.location || "Not specified",
    },
    {
      icon: <Mail className="text-primary" size={22}/>,
      title: "Email",
      details: personalInfo.email || "Not specified",
      href: personalInfo.email ? `mailto:${personalInfo.email}` : null,
    },
    {
      icon: <Phone className="text-primary" size={22}/>,
      title: "Phone",
      details: personalInfo.phone || "Not specified",
      href: personalInfo.phone ? `tel:${personalInfo.phone}` : null,
    },
  ];

  const socialLinksData = [
    { name: "GitHub", href: personalInfo.github_url, icon: <GitHub size={24}/>, label: "GitHub Profile"},
    { name: "LinkedIn", href: personalInfo.linkedin_url, icon: <Linkedin size={24}/>, label: "LinkedIn Profile" },
    { name: "Twitter", href: personalInfo.twitter_url, icon: <Twitter size={24}/>, label: "Twitter Profile" },
    { name: "Instagram", href: personalInfo.instagram_url, icon: <Instagram size={24}/>, label: "Instagram Profile" },
  ].filter(link => link.href);


  return (
    <motion.div 
      className="bg-card/80 dark:bg-card/90 rounded-xl shadow-xl p-8 md:p-10 border border-border/50 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl font-semibold mb-8 text-center gradient-text">Contact Details</h3>
      <div className="space-y-8">
        {contactInfoItems.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="flex items-center gap-5 p-4 rounded-lg hover:bg-background/50 dark:hover:bg-background/70 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              {info.icon}
            </div>
            <div>
              <h4 className="font-semibold text-lg text-foreground/90">{info.title}</h4>
              {info.href ? (
                <a href={info.href} className="text-foreground/70 hover:text-primary transition-colors text-md">{info.details}</a>
              ) : (
                <p className="text-foreground/70 text-md">{info.details}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {socialLinksData.length > 0 && (
        <div className="mt-10 pt-8 border-t border-border/50">
          <h4 className="font-semibold text-xl mb-6 text-center text-foreground/90">Follow Me Online</h4>
          <div className="flex flex-wrap justify-center gap-5">
            {socialLinksData.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.15, y: -3, color: "hsl(var(--primary))" }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-background/70 dark:bg-background/90 flex items-center justify-center text-foreground/60 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      )}
      
      {personalInfo.cv_url && personalInfo.cv_url !== '#' && (
        <div className="mt-auto pt-10">
          <Button asChild className="btn-primary w-full text-lg py-3.5" size="lg">
            <a href={personalInfo.cv_url} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-5 w-5" /> Download Resume
            </a>
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default ContactInfo;
