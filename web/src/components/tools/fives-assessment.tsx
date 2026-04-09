"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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

function getScoreColor(score: number): string {
  if (score >= 20) return "text-green-600";
  if (score >= 15) return "text-yellow-600";
  return "text-red-600";
}

export function FivesAssessment() {
  const t = useTranslations("Fives");

  const CRITERIA: Criterion[] = [
    {
      id: "frequency",
      name: t("criterionFrequencyName"),
      fullName: t("criterionFrequencyFullName"),
      description: t("criterionFrequencyDescription"),
      lowLabel: t("criterionFrequencyLow"),
      highLabel: t("criterionFrequencyHigh"),
      examples: [
        t("criterionFrequencyExample1"),
        t("criterionFrequencyExample2"),
        t("criterionFrequencyExample3"),
        t("criterionFrequencyExample4"),
        t("criterionFrequencyExample5"),
      ],
    },
    {
      id: "impact",
      name: t("criterionImpactName"),
      fullName: t("criterionImpactFullName"),
      description: t("criterionImpactDescription"),
      lowLabel: t("criterionImpactLow"),
      highLabel: t("criterionImpactHigh"),
      examples: [
        t("criterionImpactExample1"),
        t("criterionImpactExample2"),
        t("criterionImpactExample3"),
        t("criterionImpactExample4"),
        t("criterionImpactExample5"),
      ],
    },
    {
      id: "variability",
      name: t("criterionVariabilityName"),
      fullName: t("criterionVariabilityFullName"),
      description: t("criterionVariabilityDescription"),
      lowLabel: t("criterionVariabilityLow"),
      highLabel: t("criterionVariabilityHigh"),
      examples: [
        t("criterionVariabilityExample1"),
        t("criterionVariabilityExample2"),
        t("criterionVariabilityExample3"),
        t("criterionVariabilityExample4"),
        t("criterionVariabilityExample5"),
      ],
    },
    {
      id: "existingData",
      name: t("criterionExistingDataName"),
      fullName: t("criterionExistingDataFullName"),
      description: t("criterionExistingDataDescription"),
      lowLabel: t("criterionExistingDataLow"),
      highLabel: t("criterionExistingDataHigh"),
      examples: [
        t("criterionExistingDataExample1"),
        t("criterionExistingDataExample2"),
        t("criterionExistingDataExample3"),
        t("criterionExistingDataExample4"),
        t("criterionExistingDataExample5"),
      ],
    },
    {
      id: "stakeholderReadiness",
      name: t("criterionStakeholderName"),
      fullName: t("criterionStakeholderFullName"),
      description: t("criterionStakeholderDescription"),
      lowLabel: t("criterionStakeholderLow"),
      highLabel: t("criterionStakeholderHigh"),
      examples: [
        t("criterionStakeholderExample1"),
        t("criterionStakeholderExample2"),
        t("criterionStakeholderExample3"),
        t("criterionStakeholderExample4"),
        t("criterionStakeholderExample5"),
      ],
    },
  ];

  function getScoreLabel(score: number): string {
    if (score >= 20) return t("scoreLabelStrong");
    if (score >= 15) return t("scoreLabelWorth");
    return t("scoreLabelLower");
  }
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
      o.name || t("unnamed"),
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
            {t("addOpportunityButton")}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportToCsv}>
            <Download className="mr-2 h-4 w-4" />
            {t("exportCsvButton")}
          </Button>
          {isAuthenticated ? (
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  {loadedSaveId ? t("updateAssessmentTitle") : t("saveAssessmentTitle")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{loadedSaveId ? t("updateAssessmentTitle") : t("saveAssessmentTitle")}</DialogTitle>
                  <DialogDescription>
                    {t("saveDialogDescription")}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="save-name">{t("nameLabel")}</Label>
                  <Input
                    id="save-name"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                    {t("cancelButton")}
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving || !saveName.trim()}>
                    {isSaving ? t("savingButton") : t("saveButton")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button size="sm" variant="outline" onClick={() => router.push("/login")}>
              {t("signInToSaveButton")}
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
                  placeholder={t("opportunityPlaceholder", { index: index + 1 })}
                  className="text-lg font-semibold"
                />
                <Textarea
                  value={opportunity.description}
                  onChange={(e) => updateOpportunity(opportunity.id, "description", e.target.value)}
                  placeholder={t("descriptionPlaceholder")}
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
                        <div className="text-xs font-medium text-muted-foreground mb-2">{t("scoringGuideLabel")}</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {criterion.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Label className="text-xs">{t("notesLabel")}</Label>
                        <Textarea
                          value={opportunity.notes[criterion.id] || ""}
                          onChange={(e) => updateNote(opportunity.id, criterion.id, e.target.value)}
                          placeholder={t("notesPlaceholder")}
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
            <CardTitle>{t("summaryTitle")}</CardTitle>
            <CardDescription>{t("summaryDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">{t("summaryTableOpportunity")}</th>
                    {CRITERIA.map((c) => (
                      <th key={c.id} className="text-center py-2 px-2">{c.name}</th>
                    ))}
                    <th className="text-center py-2 pl-4">{t("summaryTableTotal")}</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities
                    .sort((a, b) => getTotalScore(b) - getTotalScore(a))
                    .map((o) => (
                      <tr key={o.id} className="border-b">
                        <td className="py-2 pr-4">{o.name || t("unnamed")}</td>
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
