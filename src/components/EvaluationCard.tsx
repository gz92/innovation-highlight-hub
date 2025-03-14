
import { Info } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { EvaluationResult } from "../types";

interface EvaluationCardProps {
  evaluation: EvaluationResult;
}

const EvaluationCard = ({ evaluation }: EvaluationCardProps) => {
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

export default EvaluationCard;
