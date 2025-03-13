
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { InnovationData } from "../types";
import CompanyCard from "../components/CompanyCard";

const Index = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const [project, setProject] = useState<InnovationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) {
        toast.error("No project specified");
        setLoading(false);
        return;
      }

      try {
        // Load the project data from the innovations folder
        const response = await fetch(`/innovations/${projectId}`);
        
        if (!response.ok) {
          throw new Error("Failed to load project details");
        }
        
        const data = await response.json();
        setProject(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        toast.error("Failed to load project details", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="space-y-8">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <div className="space-y-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container max-w-4xl py-12 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">
            The project you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button asChild>
            <Link to="/projects">Browse All Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Format title from filename
  const title = projectId
    ? projectId.replace('.json', '').replace(/-/g, ' ')
    : 'Project Details';

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
      
      <div className="container max-w-4xl py-12">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link to="/projects" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tight mb-4 capitalize">
          {title}
        </h1>

        <div className="bg-card rounded-xl p-6 border border-border/40 mb-10 subtle-shadow">
          <p className="text-lg leading-relaxed text-pretty">
            {project.Innovation}
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Potential Industry Partners</h2>
          </div>

          <div className="space-y-6">
            {project.output.persona_companies.map((company, index) => (
              <CompanyCard key={index} company={company} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
