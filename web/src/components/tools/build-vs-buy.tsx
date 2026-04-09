"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Save, Download, Plus, Trash2, Building2, ShoppingCart, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";

interface Factor {
  id: string;
  name: string;
  description: string;
  options: { value: string; label: string; buildScore: number; buyScore: number }[];
}

interface Capability {
  id: string;
  name: string;
  description: string;
  answers: Record<string, string>;
  notes: string;
}

interface BuildVsBuyData {
  capabilities: Capability[];
  lastUpdated: string;
}

type Recommendation = "build" | "buy" | "hybrid" | "evaluate";

function getRecommendation(buildScore: number, buyScore: number): Recommendation {
  const diff = buildScore - buyScore;
  if (diff >= 4) return "build";
  if (diff <= -4) return "buy";
  if (Math.abs(diff) <= 2) return "hybrid";
  return "evaluate";
}

export function BuildVsBuyAssessment() {
  const t = useTranslations("BuildVsBuy");

  const FACTORS: Factor[] = [
    {
      id: "strategic",
      name: t("factorStrategicName"),
      description: t("factorStrategicDescription"),
      options: [
        { value: "core", label: t("factorStrategicCore"), buildScore: 3, buyScore: 0 },
        { value: "important", label: t("factorStrategicImportant"), buildScore: 1, buyScore: 2 },
        { value: "necessary", label: t("factorStrategicNecessary"), buildScore: 0, buyScore: 3 },
        { value: "nice", label: t("factorStrategicNice"), buildScore: 0, buyScore: 2 },
      ],
    },
    {
      id: "market",
      name: t("factorMarketName"),
      description: t("factorMarketDescription"),
      options: [
        { value: "mature", label: t("factorMarketMature"), buildScore: 0, buyScore: 3 },
        { value: "emerging", label: t("factorMarketEmerging"), buildScore: 1, buyScore: 1 },
        { value: "limited", label: t("factorMarketLimited"), buildScore: 2, buyScore: 0 },
        { value: "none", label: t("factorMarketNone"), buildScore: 3, buyScore: 0 },
      ],
    },
    {
      id: "velocity",
      name: t("factorVelocityName"),
      description: t("factorVelocityDescription"),
      options: [
        { value: "stable", label: t("factorVelocityStable"), buildScore: 0, buyScore: 3 },
        { value: "occasional", label: t("factorVelocityOccasional"), buildScore: 1, buyScore: 2 },
        { value: "frequent", label: t("factorVelocityFrequent"), buildScore: 2, buyScore: 1 },
        { value: "rapid", label: t("factorVelocityRapid"), buildScore: 3, buyScore: 0 },
      ],
    },
    {
      id: "integration",
      name: t("factorIntegrationName"),
      description: t("factorIntegrationDescription"),
      options: [
        { value: "standalone", label: t("factorIntegrationStandalone"), buildScore: 0, buyScore: 3 },
        { value: "standard", label: t("factorIntegrationStandard"), buildScore: 1, buyScore: 2 },
        { value: "custom", label: t("factorIntegrationCustom"), buildScore: 2, buyScore: 1 },
        { value: "deep", label: t("factorIntegrationDeep"), buildScore: 3, buyScore: 0 },
      ],
    },
    {
      id: "capacity",
      name: t("factorCapacityName"),
      description: t("factorCapacityDescription"),
      options: [
        { value: "strong", label: t("factorCapacityStrong"), buildScore: 3, buyScore: 1 },
        { value: "moderate", label: t("factorCapacityModerate"), buildScore: 2, buyScore: 2 },
        { value: "limited", label: t("factorCapacityLimited"), buildScore: 1, buyScore: 3 },
        { value: "none", label: t("factorCapacityNone"), buildScore: 0, buyScore: 3 },
      ],
    },
  ];

  function getRecommendationDetails(rec: Recommendation): { label: string; color: string; icon: typeof Building2; description: string } {
    switch (rec) {
      case "build":
        return {
          label: t("recBuildCustomLabel"),
          color: "text-blue-600 bg-blue-50 border-blue-200",
          icon: Building2,
          description: t("recBuildCustomDescription"),
        };
      case "buy":
        return {
          label: t("recBuySaasLabel"),
          color: "text-green-600 bg-green-50 border-green-200",
          icon: ShoppingCart,
          description: t("recBuySaasDescription"),
        };
      case "hybrid":
        return {
          label: t("recHybridLabel"),
          color: "text-purple-600 bg-purple-50 border-purple-200",
          icon: Layers,
          description: t("recHybridDescription"),
        };
      default:
        return {
          label: t("recNeedsEvalLabel"),
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
          icon: Layers,
          description: t("recNeedsEvalDescription"),
        };
    }
  }
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, cognitoId } = useAuth();

  const [capabilities, setCapabilities] = useState<Capability[]>([
    {
      id: "1",
      name: "",
      description: "",
      answers: {},
      notes: "",
    },
  ]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedSaveId, setLoadedSaveId] = useState<string | null>(null);

  const loadSavedAssessment = useCallback(async (saveId: string) => {
    if (!cognitoId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/tools/${saveId}`, {
        headers: { "x-cognito-id": cognitoId },
      });
      const data = await response.json();

      if (data.success && data.save.data) {
        const savedData = data.save.data as BuildVsBuyData;
        setCapabilities(savedData.capabilities);
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

  const addCapability = () => {
    setCapabilities((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        answers: {},
        notes: "",
      },
    ]);
  };

  const removeCapability = (id: string) => {
    if (capabilities.length <= 1) return;
    setCapabilities((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCapability = (id: string, field: string, value: string) => {
    setCapabilities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const updateAnswer = (capabilityId: string, factorId: string, value: string) => {
    setCapabilities((prev) =>
      prev.map((c) =>
        c.id === capabilityId
          ? { ...c, answers: { ...c.answers, [factorId]: value } }
          : c
      )
    );
  };

  const getScores = (capability: Capability): { build: number; buy: number } => {
    let build = 0;
    let buy = 0;

    for (const factor of FACTORS) {
      const answer = capability.answers[factor.id];
      if (answer) {
        const option = factor.options.find((o) => o.value === answer);
        if (option) {
          build += option.buildScore;
          buy += option.buyScore;
        }
      }
    }

    return { build, buy };
  };

  const handleSave = async () => {
    if (!cognitoId || !saveName.trim()) return;

    setIsSaving(true);
    try {
      const saveData: BuildVsBuyData = {
        capabilities,
        lastUpdated: new Date().toISOString(),
      };

      const url = loadedSaveId ? `/api/tools/${loadedSaveId}` : "/api/tools";
      const method = loadedSaveId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cognitoId,
          toolType: "build_vs_buy",
          name: saveName,
          data: saveData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setLoadedSaveId(data.save.id);
        setSaveDialogOpen(false);
        router.replace(`/learn/tools/build-vs-buy?load=${data.save.id}`, { scroll: false });
      }
    } catch (err) {
      console.error("Failed to save assessment:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const exportToCsv = () => {
    const headers = ["Capability", "Description", ...FACTORS.map((f) => f.name), "Build Score", "Buy Score", "Recommendation"];
    const rows = capabilities.map((c) => {
      const scores = getScores(c);
      const rec = getRecommendation(scores.build, scores.buy);
      return [
        c.name || t("unnamed"),
        c.description,
        ...FACTORS.map((f) => {
          const answer = c.answers[f.id];
          const option = f.options.find((o) => o.value === answer);
          return option?.label || t("notAnswered");
        }),
        scores.build.toString(),
        scores.buy.toString(),
        getRecommendationDetails(rec).label,
      ];
    });

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `build-vs-buy-${new Date().toISOString().split("T")[0]}.csv`;
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
        <Button variant="outline" size="sm" onClick={addCapability}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addCapabilityButton")}
        </Button>
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

      {/* Capabilities */}
      {capabilities.map((capability, index) => {
        const scores = getScores(capability);
        const answeredCount = Object.keys(capability.answers).length;
        const rec = answeredCount === FACTORS.length ? getRecommendation(scores.build, scores.buy) : null;
        const recDetails = rec ? getRecommendationDetails(rec) : null;

        return (
          <Card key={capability.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Input
                    value={capability.name}
                    onChange={(e) => updateCapability(capability.id, "name", e.target.value)}
                    placeholder={t("capabilityPlaceholder", { index: index + 1 })}
                    className="text-lg font-semibold"
                  />
                  <Textarea
                    value={capability.description}
                    onChange={(e) => updateCapability(capability.id, "description", e.target.value)}
                    placeholder={t("descriptionPlaceholder")}
                    rows={2}
                  />
                </div>
                {capabilities.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCapability(capability.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {FACTORS.map((factor) => (
                <div key={factor.id} className="space-y-2">
                  <Label>{factor.name}</Label>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                  <Select
                    value={capability.answers[factor.id] || ""}
                    onValueChange={(value) => updateAnswer(capability.id, factor.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectOptionPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {factor.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <div>
                <Label>{t("notesLabel")}</Label>
                <Textarea
                  value={capability.notes}
                  onChange={(e) => updateCapability(capability.id, "notes", e.target.value)}
                  placeholder={t("notesPlaceholder")}
                  rows={3}
                  className="mt-1"
                />
              </div>

              {/* Recommendation */}
              {answeredCount > 0 && (
                <div className={`rounded-lg border p-4 ${recDetails?.color || "bg-muted"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {recDetails && <recDetails.icon className="h-6 w-6" />}
                      <div>
                        <div className="font-semibold">
                          {recDetails?.label || t("answeredCount", { count: answeredCount, total: FACTORS.length })}
                        </div>
                        {recDetails && (
                          <div className="text-sm opacity-80">{recDetails.description}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        {t("buildLabel")}: <span className="font-bold">{scores.build}</span>
                      </div>
                      <div className="text-sm">
                        {t("buyLabel")}: <span className="font-bold">{scores.buy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Summary */}
      {capabilities.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("summaryTitle")}</CardTitle>
            <CardDescription>{t("summaryDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {capabilities.map((c) => {
                const scores = getScores(c);
                const answeredCount = Object.keys(c.answers).length;
                const rec = answeredCount === FACTORS.length ? getRecommendation(scores.build, scores.buy) : null;
                const recDetails = rec ? getRecommendationDetails(rec) : null;

                return (
                  <div
                    key={c.id}
                    className={`flex items-center justify-between rounded-lg border p-3 ${recDetails?.color || ""}`}
                  >
                    <div>
                      <div className="font-medium">{c.name || t("unnamed")}</div>
                      <div className="text-sm text-muted-foreground">
                        {t("buildLabel")}: {scores.build} | {t("buyLabel")}: {scores.buy}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{recDetails?.label || t("incomplete")}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
