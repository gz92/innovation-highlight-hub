
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Search, Grid, Layout, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InnovationData } from "../types";
import { useAnimateIn } from "../utils/animations";

// Project Card Component
const ProjectCard = ({ project, index }: { project: InnovationData; index: number }) => {
  const { ref, isIntersecting } = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`rounded-xl bg-card border border-border/40 overflow-hidden transition-all duration-500 ease-out transform ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } hover-scale`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="h-40 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
        <div className="text-4xl font-bold text-primary/40">
          {project.Innovation.substring(0, 1)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold line-clamp-2 mb-2">
          {project.Innovation.split(".")[0]}.
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {project.Innovation}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.output.persona_companies[0].apollo_filter.split(';')[0].split(':')[1].split(',').slice(0, 2).map((tag, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              {tag.replace(/['"]/g, '').trim()}
            </span>
          ))}
        </div>
        
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to="/">View Details</Link>
        </Button>
      </div>
    </div>
  );
};

// Helper Hook for Intersection Observer
const useIntersectionObserver = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);

  return { ref: setRef, isIntersecting };
};

const ProjectBrowser = () => {
  const [projects, setProjects] = useState<InnovationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const animate = useAnimateIn();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data.json");
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
          throw new Error("Invalid data format");
        }
        
        // For demo purposes, let's duplicate the project to have more items
        const duplicatedProjects = [
          ...jsonData,
          ...jsonData.map(project => ({
            ...project,
            Innovation: "Advanced biosensors for continuous health monitoring with AI-powered analytics for early disease detection. This approach enables preventive healthcare through non-invasive wearable technology.",
          })),
          ...jsonData.map(project => ({
            ...project,
            Innovation: "Quantum computing algorithms optimized for pharmaceutical molecule discovery. This technology accelerates drug development by enabling rapid simulation of molecular interactions.",
          })),
          ...jsonData.map(project => ({
            ...project,
            Innovation: "Sustainable bioplastics derived from agricultural waste. This innovation addresses plastic pollution while creating value from previously unused biomaterials.",
          }))
        ];
        
        setProjects(duplicatedProjects);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        toast.error("Failed to load projects", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => 
    project.Innovation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl opacity-50"
        />
      </div>
      
      <main className="w-full max-w-7xl mx-auto px-6 py-16 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Innovation Projects
          </h1>
          
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Browse our collection of cutting-edge research and innovation projects seeking industry partners and investors.
          </p>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-9 w-9"
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-9 w-9"
            >
              <Layout className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
          } transition-all duration-500 ease-out ${
            animate ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your search criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </Button>
          </div>
        )}
      </main>
      
      <footer className="w-full py-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>HUN-REN Innovation Hub © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectBrowser;
