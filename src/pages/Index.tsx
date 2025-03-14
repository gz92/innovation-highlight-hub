
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2, BarChart, Target, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { InnovationData, Competitor, EvaluationResult } from "../types";
import CompanyCard from "../components/CompanyCard";

interface MergedCompetitorCardProps {
  competitor: Competitor;
  relatedEvaluation?: EvaluationResult;
  index: number;
}

const MergedCompetitorCard = ({ competitor, relatedEvaluation, index }: MergedCompetitorCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-amber-500";
    return "text-red-500";
  };

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
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
            {competitor.market_positioning.market_share}
          </div>
          {relatedEvaluation && (
            <div className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(relatedEvaluation.final_score)}`}>
              Score: {relatedEvaluation.final_score.toFixed(1)}
            </div>
          )}
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
      
      {relatedEvaluation && (
        <div className="mt-4 pt-4 border-t border-border/40">
          <h4 className="text-sm font-medium mb-2">Evaluation Insights</h4>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-xs">
              <span className="text-muted-foreground">Uniqueness: </span>
              <span className="font-medium">{relatedEvaluation.uniqueness_score}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Pain Point: </span>
              <span className="font-medium">{relatedEvaluation.pain_point_effectiveness}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Features: </span>
              <span className="font-medium">{relatedEvaluation.feature_superiority}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Market Fit: </span>
              <span className="font-medium">{relatedEvaluation.market_fit}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Value: </span>
              <span className="font-medium">{relatedEvaluation.perceived_value}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Barriers: </span>
              <span className="font-medium">{relatedEvaluation.barrier_to_entry}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`px-2 py-1 text-xs rounded-full ${
              relatedEvaluation.status.includes('⚠️') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
              relatedEvaluation.status.includes('✅') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {relatedEvaluation.status}
            </div>
          </div>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground border-t border-border/40 pt-3 mt-3">
        <p><span className="font-medium">Revenue:</span> {competitor.market_positioning.total_revenue}</p>
        <p><span className="font-medium">Patents:</span> {competitor.market_positioning.patents}</p>
      </div>
    </div>
  );
};

// Helper function to calculate average scores from evaluation results
const calculateAverageScores = (evaluationResults: EvaluationResult[] | undefined) => {
  if (!evaluationResults || evaluationResults.length === 0) {
    return null;
  }
  
  const totals = {
    uniqueness: 0,
    painPoint: 0,
    features: 0,
    marketFit: 0,
    value: 0,
    barriers: 0,
    finalScore: 0
  };
  
  evaluationResults.forEach(evaluation => {
    totals.uniqueness += evaluation.uniqueness_score;
    totals.painPoint += evaluation.pain_point_effectiveness;
    totals.features += evaluation.feature_superiority;
    totals.marketFit += evaluation.market_fit;
    totals.value += evaluation.perceived_value;
    totals.barriers += evaluation.barrier_to_entry;
    totals.finalScore += evaluation.final_score;
  });
  
  const count = evaluationResults.length;
  
  return {
    uniqueness: +(totals.uniqueness / count).toFixed(1),
    painPoint: +(totals.painPoint / count).toFixed(1),
    features: +(totals.features / count).toFixed(1),
    marketFit: +(totals.marketFit / count).toFixed(1),
    value: +(totals.value / count).toFixed(1),
    barriers: +(totals.barriers / count).toFixed(1),
    finalScore: +(totals.finalScore / count).toFixed(1)
  };
};

// Component to display ratings in the preview card
const RatingPreview = ({ scores }: { scores: ReturnType<typeof calculateAverageScores> }) => {
  if (!scores) return null;
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <div className="mt-3 pt-3 border-t border-border/40">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-muted-foreground">Total Score:</span>
        <span className={`text-xs font-bold ${getScoreColor(scores.finalScore)}`}>
          {scores.finalScore}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 inline-flex items-center">
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="space-y-1 text-xs">
                  <p>Uniqueness: {scores.uniqueness}</p>
                  <p>Pain Point: {scores.painPoint}</p>
                  <p>Features: {scores.features}</p>
                  <p>Market Fit: {scores.marketFit}</p>
                  <p>Value: {scores.value}</p>
                  <p>Barriers: {scores.barriers}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
      <div className="w-full bg-secondary/30 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${getScoreColor(scores.finalScore)}`} 
          style={{ width: `${(scores.finalScore/10) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const [project, setProject] = useState<InnovationData | null>(null);
  const [scenarios, setScenarios] = useState<Array<{id: string, name: string, data: InnovationData, score: number}>>([]); 
  const [loading, setLoading] = useState(true);
  const [expandedScenarios, setExpandedScenarios] = useState<{[key: string]: boolean}>({});

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
        
        const extractedScenarios: Array<{id: string, name: string, data: InnovationData, score: number}> = [];
        
        const extractScenarios = (data: InnovationData) => {
          const averageScores = calculateAverageScores(data.output.evaluation_results);
          const score = averageScores ? averageScores.finalScore : 0;
          
          if (data.PropID) {
            extractedScenarios.push({
              id: data.PropID.trim(),
              name: data["Idea name"] || `Scenario ${data.PropID.trim()}`,
              data: data,
              score: score
            });
          } else {
            extractedScenarios.push({
              id: "main",
              name: "Main Scenario",
              data: data,
              score: score
            });
          }
        };
        
        if (Array.isArray(data)) {
          data.forEach(item => extractScenarios(item));
        } else {
          extractScenarios(data);
        }
        
        // Sort scenarios by score (highest first)
        extractedScenarios.sort((a, b) => b.score - a.score);
        
        setScenarios(extractedScenarios);
        
        // Initialize all scenarios as collapsed
        const initialExpandState: {[key: string]: boolean} = {};
        extractedScenarios.forEach(scenario => {
          initialExpandState[scenario.id] = false;
        });
        setExpandedScenarios(initialExpandState);
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

  const toggleScenario = (id: string) => {
    setExpandedScenarios(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  // Define card colors for differentiation
  const cardBgColors = [
    "bg-blue-50 dark:bg-blue-950/30", 
    "bg-purple-50 dark:bg-purple-950/30", 
    "bg-amber-50 dark:bg-amber-950/30", 
    "bg-green-50 dark:bg-green-950/30", 
    "bg-pink-50 dark:bg-pink-950/30",
    "bg-cyan-50 dark:bg-cyan-950/30",
    "bg-lime-50 dark:bg-lime-950/30",
    "bg-rose-50 dark:bg-rose-950/30",
    "bg-indigo-50 dark:bg-indigo-950/30",
    "bg-emerald-50 dark:bg-emerald-950/30"
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="container max-w-4xl py-12">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link to="/projects" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tight mb-6 capitalize">
          {title}
        </h1>

        <div className="space-y-6">
          {scenarios.map((scenario, index) => {
            const averageScores = calculateAverageScores(scenario.data.output.evaluation_results);
            const isExpanded = expandedScenarios[scenario.id];
            const cardColor = cardBgColors[index % cardBgColors.length];
            
            return (
              <Card 
                key={`idea-card-${index}`} 
                className={`overflow-hidden hover:shadow-md transition-shadow border-2 ${isExpanded ? 'border-primary/20' : 'border-border/40'}`}
              >
                <CardHeader 
                  className={`${cardColor} cursor-pointer group`}
                  onClick={() => toggleScenario(scenario.id)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {scenario.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {averageScores && (
                        <span className={`text-sm font-medium ${
                          averageScores.finalScore >= 8 ? 'text-green-600 dark:text-green-400' :
                          averageScores.finalScore >= 6 ? 'text-amber-600 dark:text-amber-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          Score: {averageScores.finalScore}
                        </span>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    {scenario.data["Concise description"] || scenario.data.Innovation || scenario.data["Original wording"] || "No description available"}
                  </CardDescription>
                  
                  {averageScores && (
                    <div className="mt-3 pt-2 border-t border-border/20">
                      <div className="grid grid-cols-6 gap-2 text-xs">
                        <div>
                          <div className="text-muted-foreground">Uniqueness</div>
                          <div className="font-medium">{averageScores.uniqueness}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Pain Point</div>
                          <div className="font-medium">{averageScores.painPoint}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Features</div>
                          <div className="font-medium">{averageScores.features}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Market Fit</div>
                          <div className="font-medium">{averageScores.marketFit}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Value</div>
                          <div className="font-medium">{averageScores.value}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Barriers</div>
                          <div className="font-medium">{averageScores.barriers}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="p-6 space-y-10 animate-accordion-down">
                    <div className="bg-card rounded-xl border border-border/40 subtle-shadow p-6">
                      {scenario.data["Original wording"] && (
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Original Wording</h3>
                          <p className="p-3 bg-secondary/20 rounded-lg text-foreground dark:text-white text-sm">
                            {scenario.data["Original wording"]}
                          </p>
                        </div>
                      )}
                      
                      {scenario.data["Marketing version"] && (
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Marketing Version</h3>
                          <p className="p-4 bg-primary/10 rounded-lg border border-primary/30 text-foreground dark:text-white font-medium">
                            {scenario.data["Marketing version"]}
                          </p>
                        </div>
                      )}
                      
                      {scenario.data["Concise description"] && (
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Concise Description</h3>
                          <p className="p-3 bg-background rounded-lg border border-border/40 text-foreground dark:text-white">
                            {scenario.data["Concise description"]}
                          </p>
                        </div>
                      )}
                      
                      {scenario.data.Innovation && !scenario.data["Concise description"] && !scenario.data["Original wording"] && (
                        <p className="text-lg leading-relaxed text-pretty text-foreground dark:text-white font-medium">
                          {scenario.data.Innovation}
                        </p>
                      )}
                    </div>

                    <div className="space-y-8">
                      {/* Combined Competitor Analysis & Market Evaluation Section */}
                      {(scenario.data.output.competitors && scenario.data.output.competitors.length > 0) || 
                       (scenario.data.output.evaluation_results && scenario.data.output.evaluation_results.length > 0) ? (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">Market & Competition Analysis</h2>
                          </div>

                          <div className="space-y-6">
                            {/* Merge competitor info with evaluations if available */}
                            {scenario.data.output.competitors && scenario.data.output.competitors.map((competitor, idx) => {
                              // Find a matching evaluation if any
                              const matchingEvaluation = scenario.data.output.evaluation_results?.find(
                                evaluation => evaluation.value_proposition.toLowerCase().includes(competitor.name.toLowerCase())
                              );
                              
                              return (
                                <MergedCompetitorCard 
                                  key={idx} 
                                  competitor={competitor} 
                                  relatedEvaluation={matchingEvaluation}
                                  index={idx} 
                                />
                              );
                            })}
                            
                            {/* Show any remaining evaluations that weren't matched with competitors */}
                            {scenario.data.output.evaluation_results && 
                             scenario.data.output.evaluation_results
                              .filter(evaluation => 
                                !scenario.data.output.competitors?.some(comp => 
                                  evaluation.value_proposition.toLowerCase().includes(comp.name.toLowerCase())
                                )
                              )
                              .map((evaluation, idx) => (
                                <div key={idx} className="bg-card rounded-lg border border-border/40 p-5 subtle-shadow">
                                  <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-semibold">{evaluation.value_proposition}</h3>
                                    <div className={`text-xl font-bold ${
                                      evaluation.final_score >= 8 ? "text-green-500" :
                                      evaluation.final_score >= 6 ? "text-amber-500" :
                                      "text-red-500"
                                    }`}>
                                      {evaluation.final_score.toFixed(1)}
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-2 mb-4 mt-4">
                                    <div className="text-sm">
                                      <span className="text-muted-foreground">Uniqueness: </span>
                                      <span className="font-medium">{evaluation.uniqueness_score}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-muted-foreground">Pain Point: </span>
                                      <span className="font-medium">{evaluation.pain_point_effectiveness}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-muted-foreground">Features: </span>
                                      <span className="font-medium">{evaluation.feature_superiority}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-muted-foreground">Market Fit: </span>
                                      <span className="font-medium">{evaluation.market_fit}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-muted-foreground">Value: </span>
                                      <span className="font-medium">{evaluation.perceived_value}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-muted-foreground">Barriers: </span>
                                      <span className="font-medium">{evaluation.barrier_to_entry}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`px-2 py-1 text-xs rounded-full ${
                                      evaluation.status.includes('⚠️') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                                      evaluation.status.includes('✅') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                      {evaluation.status}
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                                    <ul className="text-sm space-y-1 list-disc list-inside">
                                      {evaluation.recommendations.map((rec, i) => (
                                        <li key={i}>{rec}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      ) : null}
                      
                      {scenario.data.output.persona_companies && scenario.data.output.persona_companies.length > 0 && (
                        <div className="space-y-6">
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
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
