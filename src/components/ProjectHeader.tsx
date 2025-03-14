
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
  title: string;
}

const ProjectHeader = ({ title }: ProjectHeaderProps) => {
  return (
    <>
      <Button variant="ghost" asChild className="mb-6 -ml-2">
        <Link to="/projects" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <h1 className="text-3xl font-bold tracking-tight mb-6 capitalize">
        {title}
      </h1>
    </>
  );
};

export default ProjectHeader;
