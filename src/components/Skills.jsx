
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertTriangle, Tag, Brain, Settings, Wrench as Tool, Star } from 'lucide-react';

const categoryIcons = {
  'Frontend': <Brain className="mr-2 h-6 w-6 text-primary" />,
  'Backend': <Settings className="mr-2 h-6 w-6 text-primary" />,
  'Tools & Others': <Tool className="mr-2 h-6 w-6 text-primary" />,
  'Additional Expertise': <Star className="mr-2 h-6 w-6 text-primary" />,
  'Default': <Tag className="mr-2 h-6 w-6 text-primary" />
};

const Skills = () => {
  const [skillCategoriesData, setSkillCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("skill_categories")
          .select("*, skills (id, name)")
          .order("sort_order", { ascending: true });

        if (categoriesError) throw categoriesError;
        setSkillCategoriesData(categoriesData || []);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error Loading Skills",
          description: err.message || "Could not fetch skills from the database.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [toast]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, type: "spring", stiffness: 150, damping: 10 }
    }),
    hover: { scale: 1.1, rotate: [0, 5, -5, 0], transition: { duration: 0.3 } }
  };

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            A glimpse into the technologies and tools I wield to craft digital experiences.
          </p>
          <div className="w-24 h-1.5 gradient-bg mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {loading && (
          <div className="flex flex-col justify-center items-center py-12">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
            <p className="text-lg text-foreground/70">Loading skills...</p>
          </div>
        )}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-destructive bg-destructive/10 p-8 rounded-lg">
            <AlertTriangle className="h-12 w-12 mb-4" />
            <p className="text-xl font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && skillCategoriesData.length > 0 && (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {skillCategoriesData.filter(cat => cat.name !== 'Additional Expertise' && cat.skills.length > 0).map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
              >
                <Card className="h-full card-hover bg-card/80 dark:bg-card/90 border-border/50 shadow-lg hover:shadow-primary/20">
                  <CardContent className="pt-8 pb-8">
                    <CardTitle className="text-2xl font-semibold mb-8 flex items-center text-foreground/90">
                      {categoryIcons[category.name] || categoryIcons['Default']}
                      {category.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.id}
                          custom={skillIndex}
                          variants={badgeVariants}
                          whileHover="hover"
                        >
                          <Badge variant="secondary" className="text-md px-4 py-2 bg-primary/10 text-primary border border-primary/20 shadow-sm hover:bg-primary/20 cursor-default">
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {!loading && !error && skillCategoriesData.find(cat => cat.name === 'Additional Expertise' && cat.skills.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 bg-card/80 dark:bg-card/90 rounded-xl shadow-xl p-8 md:p-12 border border-border/50"
          >
            <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center text-foreground/90">
              {categoryIcons['Additional Expertise']}
              Additional Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skillCategoriesData.find(cat => cat.name === 'Additional Expertise')?.skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  custom={index}
                  variants={badgeVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                   <Badge variant="outline" className="text-lg px-5 py-2.5 bg-background/70 border-primary/40 text-primary/90 shadow-sm hover:bg-primary/10 cursor-default">
                      {skill.name}
                    </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
