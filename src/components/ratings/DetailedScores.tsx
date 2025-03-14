
export interface ScoreData {
  uniqueness: number;
  painPoint: number;
  features: number;
  marketFit: number;
  value: number;
  barriers: number;
  finalScore: number;
}

interface DetailedScoresProps {
  scores: ScoreData | null;
}

export const DetailedScores = ({ scores }: DetailedScoresProps) => {
  if (!scores) return null;
  
  return (
    <div className="mt-3 pt-2 border-t border-border/20">
      <div className="grid grid-cols-6 gap-2 text-xs">
        <div>
          <div className="text-muted-foreground">Uniqueness</div>
          <div className="font-medium">{scores.uniqueness}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Pain Point</div>
          <div className="font-medium">{scores.painPoint}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Features</div>
          <div className="font-medium">{scores.features}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Market Fit</div>
          <div className="font-medium">{scores.marketFit}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Value</div>
          <div className="font-medium">{scores.value}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Barriers</div>
          <div className="font-medium">{scores.barriers}</div>
        </div>
      </div>
    </div>
  );
};
