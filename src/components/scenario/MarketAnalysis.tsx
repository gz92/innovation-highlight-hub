
import { Target } from "lucide-react";
import { InnovationData } from "../../types";
import { CardGroup } from "../ui/card";
import CompetitorCard from "../CompetitorCard";
import EvaluationCard from "../EvaluationCard";

interface MarketAnalysisProps {
  data: InnovationData;
}

export const MarketAnalysis = ({ data }: MarketAnalysisProps) => {
  // Don't render if there's no output data
  if (!data.output) {
    return null;
  }
  
  // Initialize competitors array if it doesn't exist
  const competitors = data.output.competitors || [];
  const evaluationResults = data.output.evaluation_results || [];
  
  // If there are no competitors, show a message rather than hiding the section
  const hasCompetitors = competitors.length > 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Market Analysis</h2>
      </div>

      {!hasCompetitors ? (
        <div className="p-6 bg-secondary/20 rounded-lg text-muted-foreground text-center">
          No competitor data available
        </div>
      ) : (
        <div className="space-y-6">
          {competitors.map((competitor, idx) => (
            <CardGroup key={idx}>
              <CompetitorCard competitor={competitor} index={idx} />
              {evaluationResults[idx] && (
                <EvaluationCard evaluation={evaluationResults[idx]} />
              )}
            </CardGroup>
          ))}
        </div>
      )}
    </div>
  );
};
