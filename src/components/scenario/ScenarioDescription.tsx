
import { InnovationData } from "../../types";

interface ScenarioDescriptionProps {
  data: InnovationData;
}

export const ScenarioDescription = ({ data }: ScenarioDescriptionProps) => {
  return (
    <div className="bg-card rounded-xl border border-border/40 subtle-shadow p-6">
      {data["Original wording"] && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Original Wording</h3>
          <p className="p-3 bg-secondary/20 rounded-lg text-foreground dark:text-white text-sm">
            {data["Original wording"]}
          </p>
        </div>
      )}
      
      {data["Concise description"] && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Concise Description</h3>
          <p className="p-3 bg-background rounded-lg border border-border/40 text-foreground dark:text-white">
            {data["Concise description"]}
          </p>
        </div>
      )}
      
      {data["Marketing version"] && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Marketing Version</h3>
          <p className="p-4 bg-primary/10 rounded-lg border border-primary/30 text-foreground dark:text-white font-medium">
            {data["Marketing version"]}
          </p>
        </div>
      )}
      
      {data.Innovation && !data["Concise description"] && !data["Original wording"] && (
        <p className="text-lg leading-relaxed text-pretty text-foreground dark:text-white font-medium">
          {data.Innovation}
        </p>
      )}
    </div>
  );
};
