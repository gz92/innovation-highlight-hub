
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { InnovationData } from "../types";
import ProjectHeader from "../components/ProjectHeader";
import LoadingProject from "../components/LoadingProject";
import ProjectNotFound from "../components/ProjectNotFound";
import { ScenarioCard, calculateAverageScores } from "../components/ScenarioCard";

const Index = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const [project, setProject] = useState<InnovationData | null>(null);
  const [scenarios, setScenarios] = useState<Array<{id: string, name: string, data: InnovationData}>>([]);
  const [loading, setLoading] = useState(true);
  const [expandedScenarios, setExpandedScenarios] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) {
        toast.error("No project specified");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/innovations/${projectId}`);
        
        if (!response.ok) {
          throw new Error("Failed to load project details");
        }
        
        const data = await response.json();
        setProject(data);
        
        const extractedScenarios: Array<{id: string, name: string, data: InnovationData}> = [];
        
        const extractScenarios = (data: InnovationData) => {
          if (data.PropID) {
            extractedScenarios.push({
              id: data.PropID.trim(),
              name: data["Idea name"] || `Scenario ${data.PropID.trim()}`,
              data: data
            });
          } else {
            extractedScenarios.push({
              id: "main",
              name: "Main Scenario",
              data: data
            });
          }
        };
        
        if (Array.isArray(data)) {
          data.forEach(item => extractScenarios(item));
        } else {
          extractScenarios(data);
        }
        
        setScenarios(extractedScenarios);
        
        const initialExpandState: {[key: string]: boolean} = {};
        extractedScenarios.forEach(scenario => {
          initialExpandState[scenario.id] = false;
        });
        setExpandedScenarios(initialExpandState);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        toast.error("Failed to load project details", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const toggleScenario = (id: string) => {
    setExpandedScenarios(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return <LoadingProject />;
  }

  if (!project && scenarios.length === 0) {
    return <ProjectNotFound />;
  }

  const title = projectId
    ? projectId.replace('.json', '').replace(/-/g, ' ')
    : 'Project Details';

  return (
    <div className="min-h-screen w-full">
      <div className="container max-w-4xl py-12">
        <ProjectHeader title={title} />

        <div className="space-y-6">
          {scenarios.map((scenario, index) => {
            const averageScores = calculateAverageScores(scenario.data.output.evaluation_results);
            const isExpanded = expandedScenarios[scenario.id];
            
            return (
              <ScenarioCard
                key={index}
                scenario={scenario}
                index={index}
                expanded={isExpanded}
                toggleScenario={toggleScenario}
                averageScores={averageScores}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
