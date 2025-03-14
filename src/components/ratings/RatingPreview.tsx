
import { getScoreColor, ScoreWithTooltip } from "./ScoreWithTooltip";

interface ScoreData {
  uniqueness: number;
  painPoint: number;
  features: number;
  marketFit: number;
  value: number;
  barriers: number;
  finalScore: number;
}

interface RatingPreviewProps {
  scores: ScoreData | null;
}

export const RatingPreview = ({ scores }: RatingPreviewProps) => {
  if (!scores) return null;
  
  return (
    <div className="mt-3 pt-3 border-t border-border/40">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-muted-foreground">Total Score:</span>
        <ScoreWithTooltip score={scores.finalScore} />
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
