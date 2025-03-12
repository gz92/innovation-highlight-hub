
import { useState } from "react";
import { Company } from "../types";
import { useIntersectionObserver } from "../utils/animations";
import { Building, AlertCircle, BarChart, Target, Search, ChevronDown, ChevronUp } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  index: number;
}

const CompanyCard = ({ company, index }: CompanyCardProps) => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      ref={ref}
      className={`rounded-2xl bg-card p-6 md:p-8 subtle-shadow border border-border/40 transition-all duration-700 ease-out transform ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col space-y-4">
        <div 
          className="flex justify-between items-start cursor-pointer group"
          onClick={toggleExpand}
        >
          <div className="space-y-2 text-center w-full">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            
            <div className="flex items-start space-x-3">
              <Building className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-muted-foreground text-pretty">
                {company.characteristics}
              </p>
            </div>
          </div>
          
          <button 
            className="p-2 rounded-full hover:bg-secondary transition-colors ml-2 flex-shrink-0"
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </div>
        
        {isExpanded && (
          <div className="space-y-6 pt-2 animate-accordion-down">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Pain Points</h4>
                  <p className="text-muted-foreground text-pretty">
                    {company.pain_points}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Relevance Indicators</h4>
                  <p className="text-muted-foreground text-pretty">
                    {company.relevance_indicators}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Search className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Research Focus</h4>
                  <p className="text-muted-foreground text-pretty">
                    {company.company_research_focus}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-start space-x-3">
                <BarChart className="w-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Industry Filters</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {company.apollo_filter.split(';').map((filter, i) => (
                      <div 
                        key={i} 
                        className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {filter.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!isExpanded && (
          <div className="pt-2 text-center">
            <button
              onClick={toggleExpand}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Show more details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
