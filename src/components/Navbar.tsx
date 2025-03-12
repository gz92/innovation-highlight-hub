
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-lg font-semibold text-foreground">
            Innovation Spotlight
          </Link>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link 
            to="/submit" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/submit" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Submit Innovation
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
