"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Edit,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  WorksheetFormData,
  getFilledProblems,
  calculateWeeklyCost,
  calculateAnnualCost,
  generateMarkdown,
} from "@/lib/worksheet-utils";

interface WorksheetViewProps {
  data: WorksheetFormData;
  name: string;
  worksheetId?: string;
  createdAt?: string;
  updatedAt?: string;
  showActions?: boolean;
  showBackLink?: boolean;
  onContinueEditing?: () => void;
}

export function WorksheetView({
  data,
  name,
  worksheetId,
  createdAt,
  updatedAt,
  showActions = true,
  showBackLink = true,
  onContinueEditing,
}: WorksheetViewProps) {
  const filledProblems = getFilledProblems(data.problems);
  const filledCosts = data.problemCosts.filter((c) => c.problemName);

  const handleDownload = () => {
    const markdown = generateMarkdown(data, name);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `worksheet-${name.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
            <AlertTriangle className="h-3 w-3" />
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-600">
            <AlertCircle className="h-3 w-3" />
            Medium
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <CheckCircle className="h-3 w-3" />
            Low
          </span>
        );
      default:
        return <span className="text-muted-foreground">—</span>;
    }
  };

  const previousAttempts: string[] = [];
  if (data.previousAttempts.triedHiring)
    previousAttempts.push("Tried to hire for it");
  if (data.previousAttempts.lookedAtSoftware)
    previousAttempts.push("Looked at software solutions");
  if (data.previousAttempts.builtInternally)
    previousAttempts.push("Built something internally");
  if (data.previousAttempts.askedVendor) previousAttempts.push("Asked a vendor");
  if (data.previousAttempts.livedWithIt)
    previousAttempts.push("Just lived with it");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {showBackLink && (
          <Link
            href="/profile"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {name}
            </h1>
            {(createdAt || updatedAt) && (
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {createdAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Created{" "}
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
                {updatedAt && updatedAt !== createdAt && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Updated{" "}
                    {new Date(updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            )}
          </div>

          {showActions && (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              {onContinueEditing ? (
                <Button size="sm" onClick={onContinueEditing}>
                  <Edit className="mr-2 h-4 w-4" />
                  Continue Editing
                </Button>
              ) : worksheetId ? (
                <Button size="sm" asChild>
                  <Link href={`/thunkbox/worksheet?load=${worksheetId}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Section 1: Problems */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              1
            </div>
            <div>
              <CardTitle>Top Problems</CardTitle>
              <CardDescription>
                {filledProblems.length} problem
                {filledProblems.length !== 1 ? "s" : ""} identified
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filledProblems.length === 0 ? (
            <p className="text-muted-foreground italic">No problems entered</p>
          ) : (
            <div className="space-y-4">
              {filledProblems.map((p, i) => {
                const problem = data.problems[p.index];
                return (
                  <div
                    key={p.index}
                    className="rounded-lg border border-border p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {i + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="font-medium">{problem.description}</p>
                        {problem.affectedParties && (
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Affects:</span>{" "}
                            {problem.affectedParties}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Cost Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              2
            </div>
            <div>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>
                {filledCosts.length} problem
                {filledCosts.length !== 1 ? "s" : ""} costed
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filledCosts.length === 0 ? (
            <p className="text-muted-foreground italic">
              No cost estimates entered
            </p>
          ) : (
            <div className="space-y-6">
              {filledCosts.map((cost, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border overflow-hidden"
                >
                  <div className="bg-muted/30 px-4 py-3 border-b border-border">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{cost.problemName}</p>
                      {getRiskBadge(cost.riskLevel)}
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Time and People */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Hours/Week</p>
                        <p className="font-medium">
                          {cost.hoursPerWeek || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">People</p>
                        <p className="font-medium">
                          {cost.peopleInvolved || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hourly Cost</p>
                        <p className="font-medium">
                          {cost.hourlyCost ? `$${cost.hourlyCost}` : "—"}
                        </p>
                      </div>
                    </div>

                    {/* Calculated Costs */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Weekly Cost
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {calculateWeeklyCost(cost)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Annual Cost
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {calculateAnnualCost(cost)}
                        </p>
                      </div>
                    </div>

                    {/* Additional Costs */}
                    {(cost.revenueLost || cost.errorCost) && (
                      <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-border">
                        {cost.revenueLost && (
                          <div>
                            <p className="text-muted-foreground">
                              Revenue Lost
                            </p>
                            <p className="font-medium">${cost.revenueLost}</p>
                          </div>
                        )}
                        {cost.errorCost && (
                          <div>
                            <p className="text-muted-foreground">
                              Error/Rework Cost
                            </p>
                            <p className="font-medium">${cost.errorCost}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 3: Previous Attempts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              3
            </div>
            <div>
              <CardTitle>Previous Attempts</CardTitle>
              <CardDescription>
                What has been tried before
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {previousAttempts.length === 0 && !data.previousAttempts.other ? (
            <p className="text-muted-foreground italic">
              No previous attempts recorded
            </p>
          ) : (
            <div className="space-y-3">
              {previousAttempts.map((attempt) => (
                <div
                  key={attempt}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-2"
                >
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  <span>{attempt}</span>
                </div>
              ))}
              {data.previousAttempts.other && (
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Other
                  </p>
                  <p>{data.previousAttempts.other}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 4: Success Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              4
            </div>
            <div>
              <CardTitle>Success Metrics</CardTitle>
              <CardDescription>What success would look like</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!data.successMetrics.timeSaved &&
          !data.successMetrics.errorsReduced &&
          !data.successMetrics.capacityFreedFor &&
          !data.successMetrics.riskEliminated &&
          !data.successMetrics.other ? (
            <p className="text-muted-foreground italic">
              No success metrics defined
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.successMetrics.timeSaved && (
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    Time Saved
                  </div>
                  <p className="text-lg font-semibold">
                    {data.successMetrics.timeSaved} hours/week
                  </p>
                </div>
              )}
              {data.successMetrics.errorsReduced && (
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <TrendingUp className="h-4 w-4" />
                    Errors Reduced
                  </div>
                  <p className="text-lg font-semibold">
                    {data.successMetrics.errorsReduced}%
                  </p>
                </div>
              )}
              {data.successMetrics.capacityFreedFor && (
                <div className="rounded-lg border border-border p-4 sm:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Capacity Freed For
                  </p>
                  <p className="font-medium">
                    {data.successMetrics.capacityFreedFor}
                  </p>
                </div>
              )}
              {data.successMetrics.riskEliminated && (
                <div className="rounded-lg border border-border p-4 sm:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Risk Eliminated
                  </p>
                  <p className="font-medium">
                    {data.successMetrics.riskEliminated}
                  </p>
                </div>
              )}
              {data.successMetrics.other && (
                <div className="rounded-lg border border-border p-4 sm:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Other Outcomes
                  </p>
                  <p className="font-medium">{data.successMetrics.other}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 5: Additional Notes */}
      {data.anythingElse && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                5
              </div>
              <div>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>Other context and information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{data.anythingElse}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
