
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Send, Loader2, User, Mail, MessageSquare, Type } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you as soon as possible.",
        duration: 5000,
        className: "bg-green-500 text-white border-green-600"
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      toast({
        variant: "destructive",
        title: "Oops! Message Failed",
        description: err.message || "There was a problem sending your message. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFieldVariants = {
    focus: {
      borderColor: "hsl(var(--primary))",
      boxShadow: "0 0 0 2px hsl(var(--primary) / 0.2)",
      transition: { duration: 0.2 }
    },
    blur: {
      borderColor: "hsl(var(--border))",
      boxShadow: "0 0 0 0px hsl(var(--primary) / 0)",
      transition: { duration: 0.2 }
    }
  };

  const InputField = ({ icon, id, name, type = "text", placeholder, value, onChange, required = false, rows }) => (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
        {icon}
      </span>
      <motion.input
        as={type === "textarea" ? "textarea" : "input"}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`w-full pl-12 pr-4 py-3 border rounded-lg bg-background/70 focus:outline-none text-foreground placeholder:text-foreground/50 ${type === "textarea" ? "resize-none" : ""}`}
        variants={inputFieldVariants}
        whileFocus="focus"
        initial="blur"
        animate="blur"
      />
    </div>
  );


  return (
    <motion.div 
      className="bg-card/80 dark:bg-card/90 rounded-xl shadow-xl p-8 md:p-10 border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl font-semibold mb-8 text-center gradient-text">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <InputField icon={<User size={18} />} id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <InputField icon={<Mail size={18} />} id="email" name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        </div>
        
        <InputField icon={<Type size={18} />} id="subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
        
        <InputField icon={<MessageSquare size={18} />} id="message" name="message" type="textarea" placeholder="Your Message..." value={formData.message} onChange={handleChange} required rows="5" />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full text-lg py-3.5"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
