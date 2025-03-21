
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { InnovationData } from "../types";
import ProjectHeader from "../components/ProjectHeader";
import LoadingProject from "../components/LoadingProject";
import ProjectNotFound from "../components/ProjectNotFound";
import { ScenarioCard } from "../components/ScenarioCard";
import { calculateAverageScores } from "../utils/scoreCalculations";

const Index = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const [project, setProject] = useState<InnovationData | null>(null);
  const [scenarios, setScenarios] = useState<Array<{id: string, name: string, data: InnovationData}>>([]);
  const [loading, setLoading] = useState(true);
  const [expandedScenarios, setExpandedScenarios] = useState<{[key: string]: boolean}>({});
  const [mainInnovationText, setMainInnovationText] = useState<string | null>(null);

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
        console.log("Fetched raw data:", data);
        setProject(data);
        
        const extractedScenarios: Array<{id: string, name: string, data: InnovationData}> = [];
        
        const extractScenarios = (data: InnovationData) => {
          // Store the main innovation text if available
          if (data.Innovation) {
            setMainInnovationText(data.Innovation);
          }
          
          // Only add scenarios with proper PropID and valid data
          if (data.PropID && data.output) {
            // Deep clone the data to avoid reference issues
            const scenarioData = JSON.parse(JSON.stringify(data));
            
            extractedScenarios.push({
              id: data.PropID.trim(),
              name: data["Idea name"] || `Scenario ${data.PropID.trim()}`,
              data: scenarioData
            });
          }
        };
        
        if (Array.isArray(data)) {
          // Get the main innovation text from the first item if it's an array
          if (data[0] && data[0].Innovation) {
            setMainInnovationText(data[0].Innovation);
          }
          
          data.forEach(item => extractScenarios(item));
        } else {
          extractScenarios(data);
        }
        
        // Debug logging
        console.log("Extracted scenarios:", extractedScenarios);
        extractedScenarios.forEach((scenario, index) => {
          console.log(`Scenario ${index} (${scenario.id}):`, scenario.data);
          console.log(`Scenario ${index} has competitors:`, 
            scenario.data?.output?.competitors ? 
            `Yes (${scenario.data.output.competitors.length})` : 
            "No");
        });
        
        setScenarios(extractedScenarios);
        
        // Initialize all scenarios as collapsed by default
        const initialExpandState: {[key: string]: boolean} = {};
        extractedScenarios.forEach(scenario => {
          initialExpandState[scenario.id] = false; // Set all to collapsed initially
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

  // Sort scenarios by their final score in descending order
  const sortedScenarios = [...scenarios].sort((a, b) => {
    const scoreA = calculateAverageScores(a.data.output?.evaluation_results)?.finalScore || 0;
    const scoreB = calculateAverageScores(b.data.output?.evaluation_results)?.finalScore || 0;
    return scoreB - scoreA; // Ensures highest scores come first
  });

  console.log("Sorted scenarios:", sortedScenarios.map(s => ({
    name: s.name,
    score: calculateAverageScores(s.data.output?.evaluation_results)?.finalScore || 0,
    hasCompetitors: s.data.output?.competitors?.length > 0,
    competitorsCount: s.data.output?.competitors?.length || 0
  })));

  return (
    <div className="min-h-screen w-full">
      <div className="container max-w-4xl py-12">
        <ProjectHeader title={title} subtitle={mainInnovationText || ""} />

        <div className="space-y-6">
          {sortedScenarios.map((scenario, index) => {
            const averageScores = calculateAverageScores(scenario.data.output?.evaluation_results);
            const isExpanded = expandedScenarios[scenario.id];
            
            return (
              <ScenarioCard
                key={scenario.id}
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
