
import { Skeleton } from "@/components/ui/skeleton";

const LoadingProject = () => {
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
};

export default LoadingProject;
