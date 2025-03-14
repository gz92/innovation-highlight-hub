
import { Target } from "lucide-react";
import { InnovationData } from "../../types";
import { CardGroup } from "../ui/card";
import CompetitorCard from "../CompetitorCard";
import EvaluationCard from "../EvaluationCard";

interface MarketAnalysisProps {
  data: InnovationData;
}

export const MarketAnalysis = ({ data }: MarketAnalysisProps) => {
  if (!data.output.competitors || 
      data.output.competitors.length === 0 || 
      !data.output.evaluation_results) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Market Analysis</h2>
      </div>

      <div className="space-y-6">
        {data.output.competitors.map((competitor, idx) => (
          <CardGroup key={idx}>
            <CompetitorCard competitor={competitor} index={idx} />
            {data.output.evaluation_results[idx] && (
              <EvaluationCard evaluation={data.output.evaluation_results[idx]} />
            )}
          </CardGroup>
        ))}
      </div>
    </div>
  );
};
