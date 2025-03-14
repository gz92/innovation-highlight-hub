
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
  title: string;
  subtitle?: string;
}

const ProjectHeader = ({ title, subtitle }: ProjectHeaderProps) => {
  return (
    <>
      <Button variant="ghost" asChild className="mb-6 -ml-2">
        <Link to="/projects" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
};

export default ProjectHeader;
