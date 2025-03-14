
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2, BarChart, Target, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InnovationData, Competitor, EvaluationResult } from "../types";
import CompanyCard from "../components/CompanyCard";

const CompetitorCard = ({ competitor, index }: { competitor: Competitor; index: number }) => {
  return (
    <div className="bg-card rounded-lg border border-border/40 p-5 subtle-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{competitor.name}</h3>
          <a href={competitor.website} target="_blank" rel="noopener noreferrer" 
            className="text-sm text-primary hover:underline">
            {competitor.website}
          </a>
        </div>
        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
          {competitor.market_positioning.market_share}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{competitor.brief_value_proposition}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Strengths</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {competitor.comparison_vs_our_value_prop.competitor_strengths.map((strength, i) => (
              <li key={i}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Gaps</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {competitor.comparison_vs_our_value_prop.gaps_in_their_offering.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground border-t border-border/40 pt-3 mt-3">
        <p><span className="font-medium">Revenue:</span> {competitor.market_positioning.total_revenue}</p>
        <p><span className="font-medium">Patents:</span> {competitor.market_positioning.patents}</p>
      </div>
    </div>
  );
};

const EvaluationCard = ({ evaluation }: { evaluation: EvaluationResult }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <div className="bg-card rounded-lg border border-border/40 p-5 subtle-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{evaluation.value_proposition}</h3>
        <div className={`text-xl font-bold ${getScoreColor(evaluation.final_score)}`}>
          {evaluation.final_score.toFixed(1)}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex">
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-medium mb-1">Score Interpretation:</p>
                <p className="text-xs mb-1">≥ 8: ✅ Strong value proposition</p>
                <p className="text-xs mb-1">5-7: ⚠️ Needs improvement</p>
                <p className="text-xs">{"< 5"}: ❌ Weak proposition</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <div className="text-sm flex items-center">
          <span className="text-muted-foreground">Uniqueness:</span>
          <span className="ml-1">{evaluation.uniqueness_score}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent>How distinct is our offering from competitors?</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm flex items-center">
          <span className="text-muted-foreground">Pain Point:</span>
          <span className="ml-1">{evaluation.pain_point_effectiveness}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent>Does it strongly address customer challenges?</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm flex items-center">
          <span className="text-muted-foreground">Features:</span>
          <span className="ml-1">{evaluation.feature_superiority}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent>Do we offer better/more valuable features?</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm flex items-center">
          <span className="text-muted-foreground">Market Fit:</span>
          <span className="ml-1">{evaluation.market_fit}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent>Does it align with industry trends and demands?</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm flex items-center">
          <span className="text-muted-foreground">Value:</span>
          <span className="ml-1">{evaluation.perceived_value}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent>Would customers see it as a compelling alternative?</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm flex items-center">
          <span className="text-muted-foreground">Barriers:</span>
          <span className="ml-1">{evaluation.barrier_to_entry}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent>How hard is it for competitors to replicate?</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`px-2 py-1 text-xs rounded-full ${
            evaluation.status.includes('⚠️') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
            evaluation.status.includes('✅') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {evaluation.status}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Formula: Final Score = (Uniqueness + Pain Point Effectiveness + Feature Superiority + Market Fit + Perceived Value + Barrier to Entry) / 6</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
        <ul className="text-sm space-y-1 list-disc list-inside">
          {evaluation.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const [project, setProject] = useState<InnovationData | null>(null);
  const [scenarios, setScenarios] = useState<Array<{id: string, data: InnovationData}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) {
        toast.error("No project specified");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/innovations/${projectId}`);
        
        if (!response.ok) {
          throw new Error("Failed to load project details");
        }
        
        const data = await response.json();
        setProject(data);
        
        const extractedScenarios: Array<{id: string, data: InnovationData}> = [];
        
        const extractScenarios = (data: InnovationData) => {
          if (data.PropID) {
            extractedScenarios.push({
              id: data.PropID.trim(),
              data: data
            });
          } else {
            extractedScenarios.push({
              id: "main",
              data: data
            });
          }
        };
        
        if (Array.isArray(data)) {
          data.forEach(item => extractScenarios(item));
        } else {
          extractScenarios(data);
        }
        
        setScenarios(extractedScenarios);
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

  if (!project && scenarios.length === 0) {
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

  const title = projectId
    ? projectId.replace('.json', '').replace(/-/g, ' ')
    : 'Project Details';

  return (
    <div className="min-h-screen w-full">
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

        <Accordion type="single" collapsible defaultValue="scenario-0" className="space-y-4">
          {scenarios.map((scenario, index) => (
            <AccordionItem 
              key={`scenario-${index}`} 
              value={`scenario-${index}`}
              className="bg-card rounded-xl border border-border/40 subtle-shadow overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-lg font-semibold">
                  {scenario.data.PropID ? `Scenario ${scenario.id}` : 'Main Scenario'}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-0">
                <div className="p-6 pt-2 space-y-10">
                  <div className="bg-card rounded-xl border border-border/40 subtle-shadow p-6">
                    {(scenario.data["Marketing version"] || scenario.data.Marketing_version) && (
                      <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                        <p className="text-lg font-medium text-foreground dark:text-white">
                          {scenario.data["Marketing version"] || scenario.data.Marketing_version}
                        </p>
                      </div>
                    )}
                    
                    <p className="text-lg leading-relaxed text-pretty text-foreground dark:text-white font-medium">
                      {scenario.data.Innovation || 
                       scenario.data["Concise description"] || 
                       scenario.data["Original wording"] || 
                       scenario.data.Original_wording || 
                       "No description available"}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Evaluation Results - Now first */}
                    {scenario.data.output.evaluation_results && scenario.data.output.evaluation_results.length > 0 && (
                      <div className="space-y-6 mt-10">
                        <div className="flex items-center gap-2">
                          <BarChart className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Market Evaluation</h2>
                        </div>

                        <div className="space-y-6">
                          {scenario.data.output.evaluation_results.map((evaluation, index) => (
                            <EvaluationCard key={index} evaluation={evaluation} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Competitor Analysis - Now second */}
                    {scenario.data.output.competitors && scenario.data.output.competitors.length > 0 && (
                      <div className="space-y-6 mt-10">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Competitor Analysis</h2>
                        </div>

                        <div className="space-y-6">
                          {scenario.data.output.competitors.map((competitor, index) => (
                            <CompetitorCard key={index} competitor={competitor} index={index} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Partner Personas - Now third with updated title */}
                    {scenario.data.output.persona_companies && scenario.data.output.persona_companies.length > 0 && (
                      <div className="space-y-6 mt-10">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Potential Industry Partner Personas</h2>
                        </div>

                        <div className="space-y-6">
                          {scenario.data.output.persona_companies.map((company, index) => (
                            <CompanyCard key={index} company={company} index={index} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Index;
