
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProjectNotFound = () => {
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
};

export default ProjectNotFound;
