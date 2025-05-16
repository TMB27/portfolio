
import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
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

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Have a project, an idea, or just want to say hi? I'd love to hear from you.
          </p>
          <div className="w-24 h-1.5 gradient-bg mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-5 gap-12 items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <ContactInfo />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
