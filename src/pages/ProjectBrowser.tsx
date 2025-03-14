
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Search, Grid, Layout, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InnovationData } from "../types";
import { useIntersectionObserver } from "../utils/animations";

// Project Card Component
const ProjectCard = ({ project, index, filename }: { project: InnovationData; index: number; filename: string }) => {
  const { ref, isIntersecting } = useIntersectionObserver();
  
  // Extract description from either format
  const getDescription = (project: InnovationData) => {
    return project.Innovation || 
           project["Concise description"] || 
           project["Original wording"] || 
           "No description available";
  };
  
  // Extract title from filename
  const title = filename.replace('.json', '').replace(/-/g, ' ');
  
  // Get description for display
  const description = getDescription(project);
  
  // Get industry tags if available
  const getTags = (project: InnovationData) => {
    // Check if project.output and project.output.persona_companies exist
    if (project.output && project.output.persona_companies && project.output.persona_companies.length > 0) {
      const filterText = project.output.persona_companies[0].apollo_filter;
      if (filterText) {
        const industrySection = filterText.split(';')[0];
        if (industrySection) {
          const industries = industrySection.split(':')[1];
          if (industries) {
            return industries.split(',').slice(0, 2).map(tag => tag.replace(/['"]/g, '').trim());
          }
        }
      }
    }
    return [];
  };
  
  const tags = getTags(project);
  
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
          {title.substring(0, 1).toUpperCase()}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold line-clamp-2 mb-2 capitalize">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
        
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to={`/project-details?id=${filename}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

interface ProjectInfo {
  data: InnovationData;
  filename: string;
}

const ProjectBrowser = () => {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/innovations/index.json")
          .catch(() => {
            console.log("No index file found, attempting to load individual files");
            return { ok: false };
          });
        
        let filenames: string[] = [];
        
        if (response.ok) {
          // Use type assertion to tell TypeScript this is a Response with a json method
          const indexData = await (response as Response).json();
          filenames = indexData.files || [];
        } else {
          filenames = [
            "bio-3d-models.json",
            "biosensors.json",
            "quantum-pharma.json",
            "sustainable-bioplastics.json"
          ];
        }
        
        const projectPromises = filenames.map(async (filename) => {
          try {
            const fileResponse = await fetch(`/innovations/${filename}`);
            if (!fileResponse.ok) {
              throw new Error(`Failed to load ${filename}`);
            }
            const data = await fileResponse.json();
            return { data, filename };
          } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            toast.error(`Failed to load ${filename}`);
            return null;
          }
        });
        
        const projectResults = await Promise.all(projectPromises);
        const validProjects = projectResults.filter(project => project !== null) as ProjectInfo[];
        
        setProjects(validProjects);
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

  // Fix the filter function to handle potential undefined Innovation properties
  const filteredProjects = projects.filter(project => {
    const innovation = project.data.Innovation || 
                      project.data["Concise description"] || 
                      project.data["Original wording"] || 
                      "";
    const filenameMatch = project.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const innovationMatch = innovation.toLowerCase().includes(searchTerm.toLowerCase());
    
    return filenameMatch || innovationMatch;
  });

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
        
        {filteredProjects.length > 0 ? (
          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
          } transition-all duration-500 ease-out`}>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.filename} 
                project={project.data} 
                index={index} 
                filename={project.filename}
              />
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
