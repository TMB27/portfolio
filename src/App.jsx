
import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact/index";
import Footer from "@/components/Footer";
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export const PersonalInfoContext = React.createContext(null);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [personalInfo, setPersonalInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    document.title = "Tejas Badhe";
    document.querySelector('link[rel="icon"]').href = '/assets/logo.png';

    const checkSupabaseConnectionAndFetchInfo = async () => {
      setLoadingInfo(true);
      setErrorInfo(null);
      try {
        const { data: infoData, error: infoError } = await supabase
          .from('personal_info')
          .select('*')
          .limit(1)
          .single(); 

        if (infoError) {
          console.error("Supabase error fetching personal info:", infoError.message);
          if (infoError.message.includes("requested table not found") || infoError.code === 'PGRST116') {
             setErrorInfo("Personal information not found. Please set it up in Supabase.");
          } else {
            setErrorInfo("Could not load personal information.");
          }
        } else {
          setPersonalInfo(infoData);
        }
        
        const { error: projectsError } = await supabase.from('projects').select('id').limit(1);
        if (projectsError && projectsError.message !== 'relation "public.projects" does not exist' && !projectsError.message.includes("requested table not found")) {
          console.error("Supabase connection error (projects):", projectsError.message);
        } else {
          console.info("Supabase connection to projects table successful or table does not exist yet.");
        }

      } catch (e) {
        console.error("Error fetching data:", e);
        setErrorInfo("A critical error occurred while fetching data.");
      } finally {
        setLoadingInfo(false);
      }
    };
    checkSupabaseConnectionAndFetchInfo();

  }, []);

  if (loadingInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        <p className="mt-4 text-lg text-gray-700">Loading Portfolio Data...</p>
      </div>
    );
  }

  if (errorInfo) {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-8">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Initialization Error</h2>
        <p className="text-red-600 text-center max-w-md">{errorInfo}</p>
        <p className="text-sm text-gray-500 mt-4">Please check your Supabase setup and ensure the 'personal_info' table exists and contains data.</p>
      </div>
    );
  }

  return (
    <PersonalInfoContext.Provider value={personalInfo}>
      <div className="relative">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 gradient-bg z-50 origin-left"
          style={{ scaleX }}
        />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </PersonalInfoContext.Provider>
  );
}

export default App;
