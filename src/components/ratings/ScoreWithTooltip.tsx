
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const getScoreColor = (score: number) => {
  if (score >= 8) return "text-green-500";
  if (score >= 6) return "text-amber-500";
  return "text-red-500";
};

export const getScoreBackgroundColor = (score: number) => {
  if (score >= 8) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (score >= 6) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
};

export const getCardBackgroundColor = (score: number) => {
  if (score >= 8) return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30";
  if (score >= 6) return "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/30";
  return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/30";
};

interface ScoreWithTooltipProps {
  score: number;
  label?: string;
}

export const ScoreWithTooltip = ({ score, label }: ScoreWithTooltipProps) => {
  const tooltipLabel = label || getScoreTooltipText(score);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`font-medium ${getScoreColor(score)}`}>
            {score}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function getScoreTooltipText(score: number): string {
  if (score >= 8) return "Excellent - High potential for success";
  if (score >= 6) return "Good - Shows promise";
  return "Needs improvement - Consider revising";
}
