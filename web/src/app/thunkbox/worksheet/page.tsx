"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Users,
  Target,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/layout";
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

interface Problem {
  description: string;
  affectedParties: string;
}

interface ProblemCost {
  problemName: string;
  hoursPerWeek: string;
  peopleInvolved: string;
  hourlyCost: string;
  revenueLost: string;
  errorCost: string;
  riskLevel: "low" | "medium" | "high" | "";
}

interface FormData {
  problems: Problem[];
  problemCosts: ProblemCost[];
  previousAttempts: {
    triedHiring: boolean;
    lookedAtSoftware: boolean;
    builtInternally: boolean;
    askedVendor: boolean;
    livedWithIt: boolean;
    other: string;
  };
  successMetrics: {
    timeSaved: string;
    errorsReduced: string;
    capacityFreedFor: string;
    riskEliminated: string;
    other: string;
  };
  anythingElse: string;
}

const initialFormData: FormData = {
  problems: [
    { description: "", affectedParties: "" },
    { description: "", affectedParties: "" },
    { description: "", affectedParties: "" },
    { description: "", affectedParties: "" },
    { description: "", affectedParties: "" },
  ],
  problemCosts: [
    {
      problemName: "",
      hoursPerWeek: "",
      peopleInvolved: "",
      hourlyCost: "",
      revenueLost: "",
      errorCost: "",
      riskLevel: "",
    },
    {
      problemName: "",
      hoursPerWeek: "",
      peopleInvolved: "",
      hourlyCost: "",
      revenueLost: "",
      errorCost: "",
      riskLevel: "",
    },
  ],
  previousAttempts: {
    triedHiring: false,
    lookedAtSoftware: false,
    builtInternally: false,
    askedVendor: false,
    livedWithIt: false,
    other: "",
  },
  successMetrics: {
    timeSaved: "",
    errorsReduced: "",
    capacityFreedFor: "",
    riskEliminated: "",
    other: "",
  },
  anythingElse: "",
};

const promptQuestions = [
  "What do your best people complain about most?",
  "Where do manual errors tend to happen?",
  "What processes require copy/paste between systems?",
  "What work do you wish you could hire for but can't justify?",
  "What would you fix tomorrow if it were free?",
];

export default function WorksheetPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentSection, setCurrentSection] = useState(1);

  const updateProblem = (
    index: number,
    field: keyof Problem,
    value: string
  ) => {
    const newProblems = [...formData.problems];
    newProblems[index] = { ...newProblems[index], [field]: value };
    setFormData({ ...formData, problems: newProblems });
  };

  const updateProblemCost = (
    index: number,
    field: keyof ProblemCost,
    value: string
  ) => {
    const newCosts = [...formData.problemCosts];
    newCosts[index] = { ...newCosts[index], [field]: value };
    setFormData({ ...formData, problemCosts: newCosts });
  };

  const calculateWeeklyCost = (cost: ProblemCost): string => {
    const hours = parseFloat(cost.hoursPerWeek) || 0;
    const people = parseFloat(cost.peopleInvolved) || 0;
    const hourly = parseFloat(cost.hourlyCost) || 0;
    const weekly = hours * people * hourly;
    return weekly > 0 ? `$${weekly.toLocaleString()}` : "—";
  };

  const calculateAnnualCost = (cost: ProblemCost): string => {
    const hours = parseFloat(cost.hoursPerWeek) || 0;
    const people = parseFloat(cost.peopleInvolved) || 0;
    const hourly = parseFloat(cost.hourlyCost) || 0;
    const annual = hours * people * hourly * 52;
    return annual > 0 ? `$${annual.toLocaleString()}` : "—";
  };

  const totalSections = 5;

  const handleCopyToClipboard = () => {
    const text = generatePlainText();
    navigator.clipboard.writeText(text);
    alert("Worksheet copied to clipboard! You can paste this into an email or document.");
  };

  const generatePlainText = (): string => {
    let text = "PRE-MEETING WORKSHEET\n";
    text += "=====================\n\n";

    text += "SECTION 1: YOUR TOP PROBLEMS\n";
    text += "----------------------------\n";
    formData.problems.forEach((p, i) => {
      if (p.description) {
        text += `${i + 1}. ${p.description}\n`;
        text += `   Affects: ${p.affectedParties || "Not specified"}\n`;
      }
    });
    text += "\n";

    text += "SECTION 2: COST ESTIMATES\n";
    text += "-------------------------\n";
    formData.problemCosts.forEach((c, i) => {
      if (c.problemName || c.hoursPerWeek) {
        text += `Problem ${i + 1}: ${c.problemName || "Unnamed"}\n`;
        text += `  Hours/week: ${c.hoursPerWeek || "—"}\n`;
        text += `  People involved: ${c.peopleInvolved || "—"}\n`;
        text += `  Hourly cost: $${c.hourlyCost || "—"}\n`;
        text += `  Weekly cost: ${calculateWeeklyCost(c)}\n`;
        text += `  Annual cost: ${calculateAnnualCost(c)}\n`;
        if (c.revenueLost) text += `  Revenue lost: $${c.revenueLost}\n`;
        if (c.errorCost) text += `  Error/rework cost: $${c.errorCost}\n`;
        if (c.riskLevel) text += `  Risk level: ${c.riskLevel}\n`;
        text += "\n";
      }
    });

    text += "SECTION 3: WHAT YOU'VE TRIED\n";
    text += "----------------------------\n";
    if (formData.previousAttempts.triedHiring) text += "• Tried to hire for it\n";
    if (formData.previousAttempts.lookedAtSoftware) text += "• Looked at software solutions\n";
    if (formData.previousAttempts.builtInternally) text += "• Built something internally\n";
    if (formData.previousAttempts.askedVendor) text += "• Asked a vendor\n";
    if (formData.previousAttempts.livedWithIt) text += "• Just lived with it\n";
    if (formData.previousAttempts.other) text += `• Other: ${formData.previousAttempts.other}\n`;
    text += "\n";

    text += "SECTION 4: SUCCESS METRICS\n";
    text += "--------------------------\n";
    if (formData.successMetrics.timeSaved) text += `Time saved: ${formData.successMetrics.timeSaved} hours/week\n`;
    if (formData.successMetrics.errorsReduced) text += `Errors reduced by: ${formData.successMetrics.errorsReduced}%\n`;
    if (formData.successMetrics.capacityFreedFor) text += `Capacity freed for: ${formData.successMetrics.capacityFreedFor}\n`;
    if (formData.successMetrics.riskEliminated) text += `Risk eliminated: ${formData.successMetrics.riskEliminated}\n`;
    if (formData.successMetrics.other) text += `Other: ${formData.successMetrics.other}\n`;
    text += "\n";

    if (formData.anythingElse) {
      text += "ADDITIONAL NOTES\n";
      text += "----------------\n";
      text += formData.anythingElse + "\n";
    }

    return text;
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/thunkbox"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Thunk Box
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                ~10 minutes to complete
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Pre-Meeting Worksheet
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Complete this before your 17-minute diagnostic. You&apos;ll
              identify your top problems, estimate what they&apos;re costing
              you, and help us ask better questions.
            </p>
          </div>
        </Container>
      </section>

      {/* Progress */}
      <section className="border-b border-border bg-muted/30 py-4">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Section {currentSection} of {totalSections}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalSections }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSection(i + 1)}
                    className={`h-2 w-8 rounded-full transition-colors ${
                      i + 1 === currentSection
                        ? "bg-primary"
                        : i + 1 < currentSection
                        ? "bg-primary/50"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Form Sections */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Section 1: Your Top Problems */}
            {currentSection === 1 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      1
                    </div>
                    <div>
                      <CardTitle>Your Top Problems</CardTitle>
                      <CardDescription>
                        List 3-5 operational problems, bottlenecks, or
                        frustrations you&apos;re currently tolerating.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Prompt Questions */}
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm font-medium mb-2">
                      Need help thinking of problems? Ask yourself:
                    </p>
                    <ul className="space-y-1">
                      {promptQuestions.map((q) => (
                        <li
                          key={q}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Problems Table */}
                  <div className="space-y-4">
                    {formData.problems.map((problem, index) => (
                      <div
                        key={index}
                        className="grid gap-4 p-4 rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                            {index + 1}
                          </span>
                          <Label htmlFor={`problem-${index}`}>
                            Problem/Bottleneck
                          </Label>
                        </div>
                        <Input
                          id={`problem-${index}`}
                          placeholder="e.g., Manual data entry between CRM and billing system"
                          value={problem.description}
                          onChange={(e) =>
                            updateProblem(index, "description", e.target.value)
                          }
                        />
                        <div>
                          <Label htmlFor={`affected-${index}`}>
                            Who does it affect?
                          </Label>
                          <Input
                            id={`affected-${index}`}
                            placeholder="e.g., Sales team, 3 people"
                            value={problem.affectedParties}
                            onChange={(e) =>
                              updateProblem(
                                index,
                                "affectedParties",
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 2: Quantify the Cost */}
            {currentSection === 2 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      2
                    </div>
                    <div>
                      <CardTitle>Quantify the Cost</CardTitle>
                      <CardDescription>
                        For your top 1-2 problems, estimate the cost. Don&apos;t
                        worry about precision—ballpark is fine.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {formData.problemCosts.map((cost, index) => (
                    <div
                      key={index}
                      className="space-y-4 p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <Label className="text-base font-semibold">
                          Problem {index + 1}
                        </Label>
                      </div>

                      <div>
                        <Label htmlFor={`cost-name-${index}`}>
                          Problem Name
                        </Label>
                        <Input
                          id={`cost-name-${index}`}
                          placeholder="Which problem from Section 1?"
                          value={cost.problemName}
                          onChange={(e) =>
                            updateProblemCost(
                              index,
                              "problemName",
                              e.target.value
                            )
                          }
                          className="mt-1"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor={`hours-${index}`}>Hours/week</Label>
                          <Input
                            id={`hours-${index}`}
                            type="number"
                            placeholder="e.g., 10"
                            value={cost.hoursPerWeek}
                            onChange={(e) =>
                              updateProblemCost(
                                index,
                                "hoursPerWeek",
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`people-${index}`}>
                            # of people
                          </Label>
                          <Input
                            id={`people-${index}`}
                            type="number"
                            placeholder="e.g., 2"
                            value={cost.peopleInvolved}
                            onChange={(e) =>
                              updateProblemCost(
                                index,
                                "peopleInvolved",
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`hourly-${index}`}>
                            Hourly cost ($)
                          </Label>
                          <Input
                            id={`hourly-${index}`}
                            type="number"
                            placeholder="e.g., 75"
                            value={cost.hourlyCost}
                            onChange={(e) =>
                              updateProblemCost(
                                index,
                                "hourlyCost",
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {/* Calculated Costs */}
                      <div className="grid gap-4 sm:grid-cols-2 p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Weekly cost estimate
                          </p>
                          <p className="text-xl font-bold text-primary">
                            {calculateWeeklyCost(cost)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Annual cost estimate
                          </p>
                          <p className="text-xl font-bold text-primary">
                            {calculateAnnualCost(cost)}
                          </p>
                        </div>
                      </div>

                      {/* Other Costs */}
                      <div className="space-y-4 pt-4 border-t border-border">
                        <p className="text-sm font-medium">
                          Other costs to consider:
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor={`revenue-${index}`}>
                              Revenue lost due to delays ($)
                            </Label>
                            <Input
                              id={`revenue-${index}`}
                              type="number"
                              placeholder="Optional"
                              value={cost.revenueLost}
                              onChange={(e) =>
                                updateProblemCost(
                                  index,
                                  "revenueLost",
                                  e.target.value
                                )
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`error-${index}`}>
                              Cost of errors/rework ($)
                            </Label>
                            <Input
                              id={`error-${index}`}
                              type="number"
                              placeholder="Optional"
                              value={cost.errorCost}
                              onChange={(e) =>
                                updateProblemCost(
                                  index,
                                  "errorCost",
                                  e.target.value
                                )
                              }
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Risk exposure</Label>
                          <div className="flex gap-4 mt-2">
                            {(["low", "medium", "high"] as const).map(
                              (level) => (
                                <button
                                  key={level}
                                  onClick={() =>
                                    updateProblemCost(index, "riskLevel", level)
                                  }
                                  className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                                    cost.riskLevel === level
                                      ? level === "high"
                                        ? "border-destructive bg-destructive/10 text-destructive"
                                        : level === "medium"
                                        ? "border-yellow-500 bg-yellow-500/10 text-yellow-600"
                                        : "border-primary bg-primary/10 text-primary"
                                      : "border-border hover:bg-muted"
                                  }`}
                                >
                                  {level}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Section 3: What You've Already Tried */}
            {currentSection === 3 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      3
                    </div>
                    <div>
                      <CardTitle>What You&apos;ve Already Tried</CardTitle>
                      <CardDescription>
                        Have you attempted to solve this before? What happened?
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      key: "triedHiring" as const,
                      label: "Tried to hire for it — couldn't justify the cost",
                      icon: Users,
                    },
                    {
                      key: "lookedAtSoftware" as const,
                      label:
                        "Looked at software solutions — too expensive or didn't fit",
                      icon: Target,
                    },
                    {
                      key: "builtInternally" as const,
                      label:
                        "Built something internally — didn't work or couldn't maintain it",
                      icon: AlertCircle,
                    },
                    {
                      key: "askedVendor" as const,
                      label:
                        "Asked a vendor — quoted too high / too long / didn't understand the problem",
                      icon: MessageSquare,
                    },
                    {
                      key: "livedWithIt" as const,
                      label:
                        "Just lived with it — assumed it couldn't be fixed",
                      icon: CheckCircle,
                    },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          previousAttempts: {
                            ...formData.previousAttempts,
                            [item.key]: !formData.previousAttempts[item.key],
                          },
                        })
                      }
                      className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors text-left ${
                        formData.previousAttempts[item.key]
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border ${
                          formData.previousAttempts[item.key]
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {formData.previousAttempts[item.key] && (
                          <CheckCircle className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="flex-1">{item.label}</span>
                    </button>
                  ))}

                  <div className="pt-4">
                    <Label htmlFor="other-attempts">Other</Label>
                    <Textarea
                      id="other-attempts"
                      placeholder="Any other attempts you've made..."
                      value={formData.previousAttempts.other}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousAttempts: {
                            ...formData.previousAttempts,
                            other: e.target.value,
                          },
                        })
                      }
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 4: What Would Success Look Like */}
            {currentSection === 4 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      4
                    </div>
                    <div>
                      <CardTitle>What Would Success Look Like?</CardTitle>
                      <CardDescription>
                        If this problem were solved, what would change?
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="time-saved">Time saved (hours/week)</Label>
                      <Input
                        id="time-saved"
                        type="number"
                        placeholder="e.g., 15"
                        value={formData.successMetrics.timeSaved}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            successMetrics: {
                              ...formData.successMetrics,
                              timeSaved: e.target.value,
                            },
                          })
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="errors-reduced">Errors reduced by (%)</Label>
                      <Input
                        id="errors-reduced"
                        type="number"
                        placeholder="e.g., 80"
                        value={formData.successMetrics.errorsReduced}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            successMetrics: {
                              ...formData.successMetrics,
                              errorsReduced: e.target.value,
                            },
                          })
                        }
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="capacity-freed">Capacity freed up for:</Label>
                    <Input
                      id="capacity-freed"
                      placeholder="e.g., More client-facing work, strategic projects"
                      value={formData.successMetrics.capacityFreedFor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          successMetrics: {
                            ...formData.successMetrics,
                            capacityFreedFor: e.target.value,
                          },
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="risk-eliminated">Risk eliminated:</Label>
                    <Input
                      id="risk-eliminated"
                      placeholder="e.g., Compliance violations, data errors, client churn"
                      value={formData.successMetrics.riskEliminated}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          successMetrics: {
                            ...formData.successMetrics,
                            riskEliminated: e.target.value,
                          },
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="other-success">Other outcomes:</Label>
                    <Textarea
                      id="other-success"
                      placeholder="Any other benefits you'd expect..."
                      value={formData.successMetrics.other}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          successMetrics: {
                            ...formData.successMetrics,
                            other: e.target.value,
                          },
                        })
                      }
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 5: Anything Else */}
            {currentSection === 5 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      5
                    </div>
                    <div>
                      <CardTitle>Anything Else</CardTitle>
                      <CardDescription>
                        Is there anything else we should know before the call?
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Textarea
                    placeholder="Context, constraints, previous experiences, or questions you have for us..."
                    value={formData.anythingElse}
                    onChange={(e) =>
                      setFormData({ ...formData, anythingElse: e.target.value })
                    }
                    rows={6}
                  />

                  {/* What Happens Next */}
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-6 space-y-4">
                    <h3 className="font-semibold">What Happens Next</h3>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary shrink-0">
                          1
                        </span>
                        Copy this worksheet and bring it to your call
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary shrink-0">
                          2
                        </span>
                        We&apos;ll spend 15 minutes listening and asking questions
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary shrink-0">
                          3
                        </span>
                        We&apos;ll spend 2 minutes on next steps
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary shrink-0">
                          4
                        </span>
                        You&apos;ll receive a report on your top problems and whether the math works
                      </li>
                    </ol>
                    <p className="text-sm text-muted-foreground pt-2 border-t border-primary/10">
                      <strong>Remember:</strong> This diagnostic is valuable
                      whether you work with us or not. If the math doesn&apos;t
                      work, we&apos;ll tell you.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
                disabled={currentSection === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentSection < totalSections ? (
                <Button
                  onClick={() =>
                    setCurrentSection(Math.min(totalSections, currentSection + 1))
                  }
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleCopyToClipboard}>
                    Copy to Clipboard
                  </Button>
                  <Button asChild>
                    <Link href="/thunkbox#book-diagnostic">
                      Book Your Diagnostic
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
