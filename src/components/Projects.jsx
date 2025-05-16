
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, AlertTriangle, Loader2, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const projectCategories = ["All", "Web", "Mobile", "Design", "AI/ML"];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjectsData(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error Loading Projects",
          description: err.message || "Could not fetch projects from the database.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [toast]);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      },
    }),
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const getProjectImageSrc = (project) => {
    if (project.image_url) {
      return project.image_url;
    }
    if (project.image_search_query) {
      return `https://source.unsplash.com/featured/?${encodeURIComponent(project.image_search_query)}&sig=${project.id}`;
    }
    return "https://images.unsplash.com/photo-1663000800357-ac5c6eb5ea4a"; // Default fallback
  };

  return (
    <section id="projects" className="section-padding bg-background/30 dark:bg-background/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Creations</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            A showcase of my passion for building and designing. Explore projects that reflect my skills and creativity.
          </p>
          <div className="w-24 h-1.5 gradient-bg mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <TabsList className="bg-background/70 dark:bg-background/90 p-2 rounded-xl shadow-md">
              {projectCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-5 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <TabsContent value={activeCategory} className="mt-0 min-h-[400px]">
              {loading && (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center py-12"
                >
                  <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                  <p className="text-lg text-foreground/70">Loading projects...</p>
                </motion.div>
              )}
              {error && !loading && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-destructive bg-destructive/10 p-8 rounded-lg"
                >
                  <AlertTriangle className="h-12 w-12 mb-4" />
                  <p className="text-xl font-semibold">{error}</p>
                </motion.div>
              )}
              {!loading && !error && filteredProjects.length === 0 && (
                   <motion.div 
                    key="no-projects"
                    initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }} exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                      <Search className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                      <p className="text-xl text-foreground/50">No projects found for "{activeCategory}".</p>
                  </motion.div>
              )}
              {!loading && !error && filteredProjects.length > 0 && (
                <motion.div 
                  key={activeCategory} 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      custom={index}
                      variants={cardVariants}
                      layout 
                    >
                      <Card className="overflow-hidden card-hover h-full flex flex-col bg-card/80 dark:bg-card/90 border-border/50 shadow-lg hover:shadow-primary/20">
                        <div className="h-56 overflow-hidden relative group">
                          <img  
                            alt={project.image_alt_text || project.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                            src={getProjectImageSrc(project)} 
                          />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <CardContent className="pt-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <CardTitle className="text-xl font-bold gradient-text">{project.title}</CardTitle>
                            {project.category && <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">{project.category}</Badge>}
                          </div>
                          <CardDescription className="text-foreground/60 mb-5 text-sm flex-grow">{project.description}</CardDescription>
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto mb-2">
                              {project.technologies.slice(0, 4).map((tech) => ( 
                                <Badge key={tech} variant="outline" className="border-primary/30 text-primary/80 bg-primary/5 text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="border-t border-border/50 pt-5">
                          <div className="flex gap-3 w-full">
                            {project.github_link && (
                              <Button
                                asChild
                                variant="outline"
                                className="btn-outline flex-1 gap-2 text-sm py-2.5"
                              >
                                <a
                                  href={project.github_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github size={16} />
                                  Code
                                </a>
                              </Button>
                            )}
                            {project.demo_link && (
                              <Button asChild className="btn-primary flex-1 gap-2 text-sm py-2.5">
                                <a
                                  href={project.demo_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink size={16} />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
