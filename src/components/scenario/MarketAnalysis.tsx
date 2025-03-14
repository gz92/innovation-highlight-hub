
import { Target } from "lucide-react";
import { InnovationData } from "../../types";
import { CardGroup } from "../ui/card";
import CompetitorCard from "../CompetitorCard";
import EvaluationCard from "../EvaluationCard";

interface MarketAnalysisProps {
  data: InnovationData;
}

export const MarketAnalysis = ({ data }: MarketAnalysisProps) => {
  // Debug logging
  console.log("MarketAnalysis - received data:", data);
  console.log("MarketAnalysis - competitors:", data?.output?.competitors);
  
  // Don't render if there's no output data
  if (!data || !data.output) {
    console.log("MarketAnalysis - no output data available");
    return null;
  }
  
  // Initialize competitors array if it doesn't exist
  const competitors = data.output.competitors || [];
  const evaluationResults = data.output.evaluation_results || [];
  
  console.log("MarketAnalysis - competitors length:", competitors.length);
  
  // If there are no competitors, don't render the component
  if (competitors.length === 0) {
    console.log("MarketAnalysis - no competitors available");
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Market Analysis</h2>
      </div>

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
    </div>
  );
};
