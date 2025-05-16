
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Heart, GitCommit as GitHub, Linkedin, Twitter } from "lucide-react";
import { PersonalInfoContext } from "@/App";

const Footer = () => {
  const personalInfo = useContext(PersonalInfoContext);
  const currentYear = new Date().getFullYear();
  const name = personalInfo?.full_name || "Your Name";

  const socialLinks = [
    { href: personalInfo?.github_url, icon: <GitHub size={22} />, label: "GitHub" },
    { href: personalInfo?.linkedin_url, icon: <Linkedin size={22} />, label: "LinkedIn" },
    { href: personalInfo?.twitter_url, icon: <Twitter size={22} />, label: "Twitter" },
  ].filter(link => link.href);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="bg-card/50 dark:bg-card/70 text-foreground/70 py-10 border-t border-border/50"
    >
      <div className="container-custom text-center">
        {socialLinks.length > 0 && (
          <motion.div 
            className="flex justify-center gap-6 mb-6"
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center justify-center text-sm"
        >
          Crafted with <Heart className="text-red-500 mx-1.5" size={16} /> by{" "}
          <span className="font-semibold ml-1 gradient-text">{name}</span>
        </motion.p>
        
        <motion.p
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-xs mt-2 text-foreground/50"
        >
          &copy; {currentYear} {name}. All Rights Reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
