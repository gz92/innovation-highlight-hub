
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InnovationData } from "../types";
import { DetailedScores } from "./ratings/DetailedScores";
import { RatingPreview } from "./ratings/RatingPreview"; 
import { ScenarioDescription } from "./scenario/ScenarioDescription";
import { MarketAnalysis } from "./scenario/MarketAnalysis";
import { IndustryPartners } from "./scenario/IndustryPartners";
import { calculateAverageScores } from "../utils/scoreCalculations";
import { ScoreWithTooltip, getCardBackgroundColor } from "./ratings/ScoreWithTooltip";

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

const ScenarioCard = ({ scenario, index, expanded, toggleScenario, averageScores }: ScenarioCardProps) => {
  // Use score-based background color instead of index-based colors
  const cardColor = averageScores ? getCardBackgroundColor(averageScores.finalScore) : "";
  
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
              <ScoreWithTooltip 
                score={averageScores.finalScore}
                label={`Overall score: ${averageScores.finalScore}/10`}
              />
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
        
        {averageScores && <DetailedScores scores={averageScores} />}
      </CardHeader>
      
      {expanded && (
        <CardContent className="p-6 space-y-10 animate-accordion-down">
          <ScenarioDescription data={scenario.data} />

          <div className="space-y-8">
            <MarketAnalysis data={scenario.data} />
            <IndustryPartners data={scenario.data} />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export { calculateAverageScores, ScenarioCard };
