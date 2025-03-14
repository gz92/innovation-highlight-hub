
import { useState } from "react";
import { ChevronDown, ChevronUp, Target, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InnovationData, EvaluationResult } from "../types";
import CompanyCard from "./CompanyCard";
import CompetitorCard from "./CompetitorCard";
import EvaluationCard from "./EvaluationCard";
import { CardGroup } from "./ui/card";

interface RatingPreviewProps {
  scores: {
    uniqueness: number;
    painPoint: number;
    features: number;
    marketFit: number;
    value: number;
    barriers: number;
    finalScore: number;
  } | null;
}

const RatingPreview = ({ scores }: RatingPreviewProps) => {
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

interface ScenarioCardProps {
  scenario: {
    id: string;
    name: string;
    data: InnovationData;
  };
  index: number;
  expanded: boolean;
  toggleScenario: (id: string) => void;
  averageScores: ReturnType<typeof calculateAverageScores>;
}

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

const ScenarioCard = ({ scenario, index, expanded, toggleScenario, averageScores }: ScenarioCardProps) => {
  const cardBgColors = [
    "bg-blue-50 dark:bg-blue-950/30", 
    "bg-purple-50 dark:bg-purple-950/30", 
    "bg-amber-50 dark:bg-amber-950/30", 
    "bg-green-50 dark:bg-green-950/30", 
    "bg-pink-50 dark:bg-pink-950/30"
  ];
  const cardColor = cardBgColors[index % cardBgColors.length];
  
  return (
    <Card 
      key={`idea-card-${index}`} 
      className={`overflow-hidden hover:shadow-md transition-shadow border-2 ${expanded ? 'border-primary/20' : 'border-border/40'}`}
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
              {expanded ? (
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
      
      {expanded && (
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
            {scenario.data.output.competitors && 
             scenario.data.output.competitors.length > 0 && 
             scenario.data.output.evaluation_results && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Market Analysis</h2>
                </div>

                <div className="space-y-6">
                  {scenario.data.output.competitors.map((competitor, idx) => (
                    <CardGroup key={idx}>
                      <CompetitorCard competitor={competitor} index={idx} />
                      {scenario.data.output.evaluation_results[idx] && (
                        <EvaluationCard evaluation={scenario.data.output.evaluation_results[idx]} />
                      )}
                    </CardGroup>
                  ))}
                </div>
              </div>
            )}
            
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
};

export { calculateAverageScores, ScenarioCard };
