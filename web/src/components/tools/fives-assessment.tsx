"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Download, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";

interface Criterion {
  id: string;
  name: string;
  fullName: string;
  description: string;
  lowLabel: string;
  highLabel: string;
  examples: string[];
}

interface Opportunity {
  id: string;
  name: string;
  description: string;
  scores: Record<string, number>;
  notes: Record<string, string>;
}

interface FivesData {
  opportunities: Opportunity[];
  lastUpdated: string;
}

const CRITERIA: Criterion[] = [
  {
    id: "frequency",
    name: "F",
    fullName: "Frequency",
    description: "How often does this problem occur?",
    lowLabel: "Monthly or less",
    highLabel: "Hourly/Daily",
    examples: [
      "1: Happens once a month or less",
      "2: Weekly occurrence",
      "3: Several times per week",
      "4: Daily occurrence",
      "5: Multiple times per day or continuous",
    ],
  },
  {
    id: "impact",
    name: "I",
    fullName: "Impact",
    description: "What's the business impact of solving this problem?",
    lowLabel: "Minor improvement",
    highLabel: "Critical business value",
    examples: [
      "1: Nice to have, minor efficiency gain",
      "2: Noticeable improvement to team",
      "3: Measurable cost or time savings",
      "4: Significant revenue/cost impact",
      "5: Critical to business success",
    ],
  },
  {
    id: "variability",
    name: "V",
    fullName: "Variability",
    description: "How consistent is the problem and its solution?",
    lowLabel: "Highly variable",
    highLabel: "Very consistent",
    examples: [
      "1: Every case is unique, requires judgment",
      "2: Many exceptions, some patterns",
      "3: Moderate consistency, clear exceptions",
      "4: Mostly predictable with few exceptions",
      "5: Highly standardized, clear rules",
    ],
  },
  {
    id: "existingData",
    name: "E",
    fullName: "Existing Data",
    description: "What data already exists to support automation?",
    lowLabel: "No digital data",
    highLabel: "Rich, accessible data",
    examples: [
      "1: Paper-based, no digital records",
      "2: Some digital data, poor quality",
      "3: Data exists but needs cleanup",
      "4: Good data, minor integration needed",
      "5: Clean, accessible, well-structured data",
    ],
  },
  {
    id: "stakeholderReadiness",
    name: "S",
    fullName: "Stakeholder Readiness",
    description: "Are the people involved ready for change?",
    lowLabel: "Resistant to change",
    highLabel: "Champions for change",
    examples: [
      "1: Active resistance, no leadership support",
      "2: Skeptical, needs convincing",
      "3: Open to change, some concerns",
      "4: Supportive, engaged stakeholders",
      "5: Champions pushing for this change",
    ],
  },
];

function getScoreColor(score: number): string {
  if (score >= 20) return "text-green-600";
  if (score >= 15) return "text-yellow-600";
  return "text-red-600";
}

function getScoreLabel(score: number): string {
  if (score >= 20) return "Strong Candidate";
  if (score >= 15) return "Worth Evaluating";
  return "Lower Priority";
}

export function FivesAssessment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, cognitoId } = useAuth();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "1",
      name: "",
      description: "",
      scores: {
        frequency: 3,
        impact: 3,
        variability: 3,
        existingData: 3,
        stakeholderReadiness: 3,
      },
      notes: {},
    },
  ]);
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedSaveId, setLoadedSaveId] = useState<string | null>(null);

  // Load saved assessment if ID in URL
  const loadSavedAssessment = useCallback(async (saveId: string) => {
    if (!cognitoId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/tools/${saveId}`, {
        headers: { "x-cognito-id": cognitoId },
      });
      const data = await response.json();

      if (data.success && data.save.data) {
        const savedData = data.save.data as FivesData;
        setOpportunities(savedData.opportunities);
        setSaveName(data.save.name);
        setLoadedSaveId(saveId);
      }
    } catch (err) {
      console.error("Failed to load saved assessment:", err);
    } finally {
      setIsLoading(false);
    }
  }, [cognitoId]);

  useEffect(() => {
    const loadId = searchParams.get("load");
    if (loadId && isAuthenticated && cognitoId) {
      loadSavedAssessment(loadId);
    }
  }, [searchParams, isAuthenticated, cognitoId, loadSavedAssessment]);

  const addOpportunity = () => {
    setOpportunities((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        scores: {
          frequency: 3,
          impact: 3,
          variability: 3,
          existingData: 3,
          stakeholderReadiness: 3,
        },
        notes: {},
      },
    ]);
  };

  const removeOpportunity = (id: string) => {
    if (opportunities.length <= 1) return;
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  };

  const updateOpportunity = (id: string, field: string, value: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: value } : o))
    );
  };

  const updateScore = (opportunityId: string, criterionId: string, value: number) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? { ...o, scores: { ...o.scores, [criterionId]: value } }
          : o
      )
    );
  };

  const updateNote = (opportunityId: string, criterionId: string, value: string) => {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? { ...o, notes: { ...o.notes, [criterionId]: value } }
          : o
      )
    );
  };

  const toggleCriteria = (criterionId: string) => {
    setExpandedCriteria((prev) => ({
      ...prev,
      [criterionId]: !prev[criterionId],
    }));
  };

  const getTotalScore = (opportunity: Opportunity): number => {
    return Object.values(opportunity.scores).reduce((sum, score) => sum + score, 0);
  };

  const handleSave = async () => {
    if (!cognitoId || !saveName.trim()) return;

    setIsSaving(true);
    try {
      const saveData: FivesData = {
        opportunities,
        lastUpdated: new Date().toISOString(),
      };

      const url = loadedSaveId ? `/api/tools/${loadedSaveId}` : "/api/tools";
      const method = loadedSaveId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cognitoId,
          toolType: "fives",
          name: saveName,
          data: saveData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setLoadedSaveId(data.save.id);
        setSaveDialogOpen(false);
        // Update URL without navigation
        router.replace(`/learn/tools/fives?load=${data.save.id}`, { scroll: false });
      }
    } catch (err) {
      console.error("Failed to save assessment:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const exportToCsv = () => {
    const headers = ["Opportunity", "Description", ...CRITERIA.map((c) => c.fullName), "Total Score", "Recommendation"];
    const rows = opportunities.map((o) => [
      o.name || "Unnamed",
      o.description,
      ...CRITERIA.map((c) => o.scores[c.id].toString()),
      getTotalScore(o).toString(),
      getScoreLabel(getTotalScore(o)),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fives-assessment-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={addOpportunity}>
            <Plus className="mr-2 h-4 w-4" />
            Add Opportunity
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportToCsv}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          {isAuthenticated ? (
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  {loadedSaveId ? "Update" : "Save"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{loadedSaveId ? "Update Assessment" : "Save Assessment"}</DialogTitle>
                  <DialogDescription>
                    Give your assessment a name to find it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="save-name">Name</Label>
                  <Input
                    id="save-name"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="e.g., Q1 2024 Automation Candidates"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving || !saveName.trim()}>
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button size="sm" variant="outline" onClick={() => router.push("/login")}>
              Sign in to Save
            </Button>
          )}
        </div>
      </div>

      {/* Opportunities */}
      {opportunities.map((opportunity, index) => (
        <Card key={opportunity.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Input
                  value={opportunity.name}
                  onChange={(e) => updateOpportunity(opportunity.id, "name", e.target.value)}
                  placeholder={`Opportunity ${index + 1}`}
                  className="text-lg font-semibold"
                />
                <Textarea
                  value={opportunity.description}
                  onChange={(e) => updateOpportunity(opportunity.id, "description", e.target.value)}
                  placeholder="Brief description of the problem or opportunity..."
                  rows={2}
                />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`text-3xl font-bold ${getScoreColor(getTotalScore(opportunity))}`}>
                  {getTotalScore(opportunity)}/25
                </div>
                <div className={`text-sm ${getScoreColor(getTotalScore(opportunity))}`}>
                  {getScoreLabel(getTotalScore(opportunity))}
                </div>
                {opportunities.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOpportunity(opportunity.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {CRITERIA.map((criterion) => (
              <div key={criterion.id} className="space-y-3">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleCriteria(`${opportunity.id}-${criterion.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {criterion.name}
                    </div>
                    <div>
                      <div className="font-medium">{criterion.fullName}</div>
                      <div className="text-sm text-muted-foreground">{criterion.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary">
                      {opportunity.scores[criterion.id]}
                    </div>
                    {expandedCriteria[`${opportunity.id}-${criterion.id}`] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="pl-11">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground w-24">{criterion.lowLabel}</span>
                    <Slider
                      value={[opportunity.scores[criterion.id]]}
                      onValueChange={(value) => updateScore(opportunity.id, criterion.id, value[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-24 text-right">{criterion.highLabel}</span>
                  </div>

                  {expandedCriteria[`${opportunity.id}-${criterion.id}`] && (
                    <div className="mt-4 space-y-3">
                      <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs font-medium text-muted-foreground mb-2">Scoring Guide:</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {criterion.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Label className="text-xs">Notes</Label>
                        <Textarea
                          value={opportunity.notes[criterion.id] || ""}
                          onChange={(e) => updateNote(opportunity.id, criterion.id, e.target.value)}
                          placeholder="Add notes about your scoring rationale..."
                          rows={2}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Summary */}
      {opportunities.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Compare your opportunities side by side</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Opportunity</th>
                    {CRITERIA.map((c) => (
                      <th key={c.id} className="text-center py-2 px-2">{c.name}</th>
                    ))}
                    <th className="text-center py-2 pl-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities
                    .sort((a, b) => getTotalScore(b) - getTotalScore(a))
                    .map((o) => (
                      <tr key={o.id} className="border-b">
                        <td className="py-2 pr-4">{o.name || "Unnamed"}</td>
                        {CRITERIA.map((c) => (
                          <td key={c.id} className="text-center py-2 px-2">{o.scores[c.id]}</td>
                        ))}
                        <td className={`text-center py-2 pl-4 font-bold ${getScoreColor(getTotalScore(o))}`}>
                          {getTotalScore(o)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
