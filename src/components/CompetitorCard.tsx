
import { Competitor } from "../types";

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
}

const CompetitorCard = ({ competitor, index }: CompetitorCardProps) => {
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
        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
          {competitor.market_positioning.market_share}
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
      
      <div className="text-xs text-muted-foreground border-t border-border/40 pt-3 mt-3">
        <p><span className="font-medium">Revenue:</span> {competitor.market_positioning.total_revenue}</p>
        <p><span className="font-medium">Patents:</span> {competitor.market_positioning.patents}</p>
      </div>
    </div>
  );
};

export default CompetitorCard;
