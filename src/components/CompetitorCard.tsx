
import { Competitor } from "../types";

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
}

const CompetitorCard = ({ competitor, index }: CompetitorCardProps) => {
  // Add guard clauses to handle potentially missing data
  if (!competitor) {
    return (
      <div className="bg-card rounded-lg border border-border/40 p-5 subtle-shadow">
        <p className="text-sm text-muted-foreground">Competitor data unavailable</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border/40 p-5 subtle-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{competitor.name}</h3>
          {competitor.website && (
            <a href={competitor.website} target="_blank" rel="noopener noreferrer" 
              className="text-sm text-primary hover:underline">
              {competitor.website}
            </a>
          )}
        </div>
        {competitor.market_positioning?.market_share && (
          <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
            {competitor.market_positioning.market_share}
          </div>
        )}
      </div>
      
      {competitor.brief_value_proposition && (
        <p className="text-sm text-muted-foreground mb-4">{competitor.brief_value_proposition}</p>
      )}
      
      {competitor.comparison_vs_our_value_prop && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {competitor.comparison_vs_our_value_prop.competitor_strengths && (
            <div>
              <h4 className="text-sm font-medium mb-2">Strengths</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {competitor.comparison_vs_our_value_prop.competitor_strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
          )}
          
          {competitor.comparison_vs_our_value_prop.gaps_in_their_offering && (
            <div>
              <h4 className="text-sm font-medium mb-2">Gaps</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {competitor.comparison_vs_our_value_prop.gaps_in_their_offering.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {competitor.market_positioning && (
        <div className="text-xs text-muted-foreground border-t border-border/40 pt-3 mt-3">
          {competitor.market_positioning.total_revenue && (
            <p><span className="font-medium">Revenue:</span> {competitor.market_positioning.total_revenue}</p>
          )}
          {competitor.market_positioning.patents !== undefined && (
            <p><span className="font-medium">Patents:</span> {competitor.market_positioning.patents}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompetitorCard;
