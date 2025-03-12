
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CompanyCard from "../components/CompanyCard";
import { InnovationData } from "../types";
import { useAnimateIn } from "../utils/animations";

const Index = () => {
  const [data, setData] = useState<InnovationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const animate = useAnimateIn();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
          throw new Error("Invalid data format");
        }
        
        setData(jsonData[0]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        toast.error("Failed to load innovation data", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading innovation data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Unable to Load Data</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't load the innovation data. Please check that the data file is properly formatted and try again.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
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
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full">
              Innovation Spotlight
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Discover Innovation
          </h1>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed text-pretty">
            {data.Innovation}
          </p>
        </div>
        
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 ease-out ${
          animate ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          {data.output.persona_companies.map((company, index) => (
            <div className="hover-scale" key={company.name}>
              <CompanyCard 
                company={company} 
                index={index} 
              />
            </div>
          ))}
        </div>
      </main>
      
      <footer className="w-full py-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Innovation Spotlight © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
