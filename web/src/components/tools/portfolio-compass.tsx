"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Download,
  Printer,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "compass:state:v1";

const SECTIONS = [
  { id: 0, num: "00", title: "Begin" },
  { id: 1, num: "01", title: "Objectives" },
  { id: 2, num: "02", title: "Problems" },
  { id: 3, num: "03", title: "Projects" },
  { id: 4, num: "04", title: "Map" },
  { id: 5, num: "05", title: "Synthesis" },
];

const FREQ_PER_YEAR: Record<string, number> = {
  rare: 4,
  occasional: 12,
  regular: 52,
  constant: 250,
};
const FREQ_LABEL: Record<string, string> = {
  rare: "Rare (~4/yr)",
  occasional: "Monthly",
  regular: "Weekly",
  constant: "Daily",
};

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "in_design", label: "In design" },
  { value: "active_pilot", label: "Active pilot" },
  { value: "piloting_at_scale", label: "Piloting at scale" },
  { value: "in_production", label: "In production" },
  { value: "paused", label: "Paused" },
  { value: "killed", label: "Killed" },
];

type Volume = { amount?: string; unit?: string; period?: string };
type Failure = { description?: string; frequency?: string };
type CostPerFailure = { amount?: string };

interface COI {
  volume?: Volume;
  fteEstimate?: string;
  fteLoadedCost?: string;
  failure?: Failure;
  costPerFailure?: CostPerFailure;
  opportunityCost?: string;
  manualOverride?: string;
  confidence?: string;
}

interface Objective {
  id: string;
  text: string;
  category: "business" | "capability";
  timeHorizon: string;
}

interface Sponsor {
  nameRole?: string;
  commitment?: string;
}

interface Problem {
  id: string;
  statement: string;
  blocksObjectives: string[];
  bootsOnGround?: string;
  sponsor?: Sponsor;
  coi?: COI;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  status?: string;
  addressesProblems: string[];
  owner?: string;
  vendorTool?: string;
  graduationCriteria?: string;
  annualCost?: number;
}

interface CompassState {
  metadata: { version: string; lastModified?: string };
  currentSection: number;
  defaultFteLoadedCost: number;
  organizationName: string;
  objectives: Objective[];
  problems: Problem[];
  projects: Project[];
}

const newId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

const fmt = (n: number): string => {
  if (!n && n !== 0) return "$0";
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

const fmtFull = (n: number | string | undefined): string =>
  `$${Math.round(Number(n) || 0).toLocaleString()}`;

const calcCOI = (coi: COI | undefined, defaultFte: number): number => {
  if (!coi) return 0;
  if (coi.manualOverride && parseFloat(coi.manualOverride) > 0) {
    return parseFloat(coi.manualOverride);
  }
  const loaded = parseFloat(coi.fteLoadedCost || "") || defaultFte || 150000;
  const fteCost = (parseFloat(coi.fteEstimate || "") || 0) * loaded;
  const freq = FREQ_PER_YEAR[coi.failure?.frequency || ""] || 0;
  const failCost = freq * (parseFloat(coi.costPerFailure?.amount || "") || 0);
  return fteCost + failCost;
};

const initialState: CompassState = {
  metadata: { version: "1.0" },
  currentSection: 0,
  defaultFteLoadedCost: 150000,
  organizationName: "",
  objectives: [],
  problems: [],
  projects: [],
};

function HintLabel({
  children,
  hint,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <div className="mb-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {children}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {hint && (
        <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

function MultiSelectPills({
  options,
  selected,
  onChange,
  emptyLabel,
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
  emptyLabel?: string;
}) {
  if (!options || options.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground">
        {emptyLabel || "No options yet."}
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() =>
              on
                ? onChange(selected.filter((id) => id !== opt.id))
                : onChange([...selected, opt.id])
            }
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              on
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-muted-foreground">{num}</span>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      </div>
      <div className="ml-12 mt-3 h-px w-12 bg-primary" />
    </div>
  );
}

function NavFooter({
  goto,
  current,
  canForward,
  forwardLabel,
}: {
  goto: (n: number) => void;
  current: number;
  canForward: boolean;
  forwardLabel?: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-border pt-6 no-print">
      {current > 0 ? (
        <Button variant="ghost" onClick={() => goto(current - 1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <div />
      )}
      {current < 5 && (
        <Button
          variant={canForward ? "default" : "outline"}
          onClick={() => goto(current + 1)}
        >
          {forwardLabel || "Continue"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function FrameSection({
  state,
  setState,
  goto,
}: {
  state: CompassState;
  setState: (s: CompassState) => void;
  goto: (n: number) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        For leaders running AI
      </p>
      <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
        Where are your AI pilots <em className="italic font-serif">actually</em> going?
      </h1>
      <div className="mb-6 mt-4 h-px w-12 bg-primary" />
      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        A worksheet to map your AI activity against your actual business objectives.
        About an hour. Your data stays in your browser.
      </p>

      <ul className="mb-8 space-y-2 text-base text-muted-foreground">
        <li>① Name what you&apos;re trying to accomplish.</li>
        <li>② Quantify what&apos;s standing in the way.</li>
        <li>③ List what you&apos;re doing about it — and see the gaps.</li>
      </ul>

      <Card className="mb-6 bg-muted/30">
        <CardContent className="pt-6">
          <HintLabel
            htmlFor="org-name"
            hint="Optional. Appears on your exported document."
          >
            Organization name
          </HintLabel>
          <Input
            id="org-name"
            placeholder="Acme Industries"
            value={state.organizationName}
            onChange={(e) =>
              setState({ ...state, organizationName: e.target.value })
            }
          />
        </CardContent>
      </Card>

      <Button onClick={() => goto(1)} size="lg">
        Begin <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function ObjectivesSection({
  state,
  setState,
  goto,
}: {
  state: CompassState;
  setState: (s: CompassState) => void;
  goto: (n: number) => void;
}) {
  const business = state.objectives.filter((o) => o.category === "business");
  const capability = state.objectives.filter(
    (o) => o.category === "capability"
  );

  const addObjective = (category: "business" | "capability") => {
    if (category === "business" && business.length >= 3) return;
    if (category === "capability" && capability.length >= 2) return;
    setState({
      ...state,
      objectives: [
        ...state.objectives,
        {
          id: newId("obj"),
          text: "",
          category,
          timeHorizon: "12mo",
        },
      ],
    });
  };
  const update = (id: string, patch: Partial<Objective>) =>
    setState({
      ...state,
      objectives: state.objectives.map((o) =>
        o.id === id ? { ...o, ...patch } : o
      ),
    });
  const remove = (id: string) =>
    setState({
      ...state,
      objectives: state.objectives.filter((o) => o.id !== id),
      problems: state.problems.map((p) => ({
        ...p,
        blocksObjectives: (p.blocksObjectives || []).filter(
          (oid) => oid !== id
        ),
      })),
    });

  const renderObj = (obj: Objective) => (
    <Card key={obj.id}>
      <CardContent className="pt-4">
        <div className="flex gap-2">
          <Textarea
            rows={2}
            placeholder={
              obj.category === "business"
                ? "e.g., Reduce order-to-cash cycle by 30% by Q4"
                : "e.g., Underwrite small loans without senior credit review"
            }
            value={obj.text}
            onChange={(e) => update(obj.id, { text: e.target.value })}
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => remove(obj.id)}
            aria-label="Remove objective"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Horizon
          </span>
          <Select
            value={obj.timeHorizon}
            onValueChange={(v) => update(obj.id, { timeHorizon: v })}
          >
            <SelectTrigger className="w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6mo">6 months</SelectItem>
              <SelectItem value="12mo">12 months</SelectItem>
              <SelectItem value="24mo">24 months</SelectItem>
              <SelectItem value="longer">Longer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeader num="01" title="Objectives" />
      <p className="mb-8 text-base text-muted-foreground">
        Specific and measurable, not vision statements.
      </p>

      <section className="mb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-xl font-semibold">Business</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {business.length} / 3
          </span>
        </div>
        <div className="flex flex-col gap-2">{business.map(renderObj)}</div>
        {business.length < 3 && (
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => addObjective("business")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        )}
      </section>

      <section className="mb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-xl font-semibold">Capability</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {capability.length} / 2
          </span>
        </div>
        <p className="mb-2 text-sm text-muted-foreground">
          What you want to be able to do that you currently can&apos;t.
        </p>
        <div className="flex flex-col gap-2">{capability.map(renderObj)}</div>
        {capability.length < 2 && (
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => addObjective("capability")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        )}
      </section>

      <NavFooter
        goto={goto}
        current={1}
        canForward={state.objectives.some((o) => o.text.trim())}
      />
    </div>
  );
}

function CostOfInactionForm({
  coi,
  onChange,
  defaultFte,
}: {
  coi: COI;
  onChange: (next: COI) => void;
  defaultFte: number;
}) {
  const update = (patch: Partial<COI>) => onChange({ ...coi, ...patch });
  const updateVolume = (patch: Partial<Volume>) =>
    onChange({ ...coi, volume: { ...(coi.volume || {}), ...patch } });
  const updateFailure = (patch: Partial<Failure>) =>
    onChange({ ...coi, failure: { ...(coi.failure || {}), ...patch } });
  const updateCostPerFailure = (patch: Partial<CostPerFailure>) =>
    onChange({
      ...coi,
      costPerFailure: { ...(coi.costPerFailure || {}), ...patch },
    });
  const total = calcCOI(coi, defaultFte);

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-baseline justify-between">
          <CardTitle className="text-base">Cost of inaction</CardTitle>
          <span className="font-mono text-xs text-muted-foreground">
            Required
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <HintLabel>Process volume</HintLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Input
              type="number"
              placeholder="Amount"
              value={coi?.volume?.amount || ""}
              onChange={(e) =>
                updateVolume({ amount: e.target.value })
              }
            />
            <Input
              placeholder="Unit (orders, etc.)"
              value={coi?.volume?.unit || ""}
              onChange={(e) => updateVolume({ unit: e.target.value })}
            />
            <Select
              value={coi?.volume?.period || "month"}
              onValueChange={(v) => updateVolume({ period: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">per day</SelectItem>
                <SelectItem value="week">per week</SelectItem>
                <SelectItem value="month">per month</SelectItem>
                <SelectItem value="year">per year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <HintLabel hint="0.5 = half-time">FTE involved</HintLabel>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g., 1.5"
              value={coi?.fteEstimate || ""}
              onChange={(e) => update({ fteEstimate: e.target.value })}
            />
          </div>
          <div>
            <HintLabel hint="Salary + benefits + overhead">
              FTE loaded cost
            </HintLabel>
            <Input
              type="number"
              placeholder={String(defaultFte || 150000)}
              value={coi?.fteLoadedCost || ""}
              onChange={(e) => update({ fteLoadedCost: e.target.value })}
            />
          </div>
        </div>

        <div>
          <HintLabel>Failure mode</HintLabel>
          <Textarea
            rows={2}
            placeholder="What goes wrong when this process breaks?"
            value={coi?.failure?.description || ""}
            onChange={(e) =>
              updateFailure({ description: e.target.value })
            }
          />
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Select
              value={coi?.failure?.frequency || ""}
              onValueChange={(v) => updateFailure({ frequency: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Frequency…" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FREQ_LABEL).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Cost per failure ($)"
              value={coi?.costPerFailure?.amount || ""}
              onChange={(e) =>
                updateCostPerFailure({ amount: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <HintLabel hint="Optional. What can't you do because this exists?">
            Opportunity cost
          </HintLabel>
          <Input
            placeholder="e.g., Can't expand to new market"
            value={coi?.opportunityCost || ""}
            onChange={(e) => update({ opportunityCost: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <HintLabel hint="Use if your estimate differs from the math">
              Manual override
            </HintLabel>
            <Input
              type="number"
              placeholder="Optional"
              value={coi?.manualOverride || ""}
              onChange={(e) => update({ manualOverride: e.target.value })}
            />
          </div>
          <div>
            <HintLabel>Confidence</HintLabel>
            <Select
              value={coi?.confidence || ""}
              onValueChange={(v) => update({ confidence: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High — measured</SelectItem>
                <SelectItem value="medium">Medium — estimate</SelectItem>
                <SelectItem value="low">Low — guess</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Calculation
          </div>
          <div className="font-mono text-xs leading-relaxed text-muted-foreground">
            FTE: {coi?.fteEstimate || 0} ×{" "}
            {fmtFull(coi?.fteLoadedCost || defaultFte)} ={" "}
            {fmtFull(
              (parseFloat(coi?.fteEstimate || "") || 0) *
                (parseFloat(coi?.fteLoadedCost || "") || defaultFte)
            )}
            <br />
            Failure: {FREQ_PER_YEAR[coi?.failure?.frequency || ""] || 0}/yr ×{" "}
            {fmtFull(coi?.costPerFailure?.amount)} ={" "}
            {fmtFull(
              (FREQ_PER_YEAR[coi?.failure?.frequency || ""] || 0) *
                (parseFloat(coi?.costPerFailure?.amount || "") || 0)
            )}
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Annual cost
            </div>
            <div className="text-2xl font-bold text-primary">
              {fmtFull(total)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProblemCard({
  problem,
  state,
  setState,
  idx,
}: {
  problem: Problem;
  state: CompassState;
  setState: (s: CompassState) => void;
  idx: number;
}) {
  const [open, setOpen] = useState(!problem.statement?.trim());
  const update = (patch: Partial<Problem>) =>
    setState({
      ...state,
      problems: state.problems.map((p) =>
        p.id === problem.id ? { ...p, ...patch } : p
      ),
    });
  const remove = () =>
    setState({
      ...state,
      problems: state.problems.filter((p) => p.id !== problem.id),
      projects: state.projects.map((proj) => ({
        ...proj,
        addressesProblems: (proj.addressesProblems || []).filter(
          (pid) => pid !== problem.id
        ),
      })),
    });
  const objOptions = state.objectives
    .filter((o) => o.text.trim())
    .map((o) => ({
      id: o.id,
      label: o.text.slice(0, 60) + (o.text.length > 60 ? "…" : ""),
    }));
  const annualCost = calcCOI(problem.coi, state.defaultFteLoadedCost);
  const summary = problem.statement?.trim() || "Untitled problem";
  const noSponsor = !problem.sponsor?.nameRole?.trim();

  return (
    <Card>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            P{String(idx + 1).padStart(2, "0")}
          </span>
          <span className="truncate text-base font-medium">{summary}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {annualCost > 0 && (
            <span className="font-mono text-sm text-primary">
              {fmt(annualCost)}/yr
            </span>
          )}
          {noSponsor && problem.statement?.trim() && (
            <span title="No sponsor" className="text-destructive">
              <AlertTriangle className="h-4 w-4" />
            </span>
          )}
        </div>
      </button>

      {open && (
        <CardContent className="space-y-4 border-t border-border pt-4">
          <div>
            <HintLabel required>Problem statement</HintLabel>
            <Textarea
              rows={2}
              placeholder="What is the problem, in 1-2 sentences?"
              value={problem.statement || ""}
              onChange={(e) => update({ statement: e.target.value })}
            />
          </div>

          <div>
            <HintLabel required>Blocks which objectives?</HintLabel>
            <MultiSelectPills
              options={objOptions}
              selected={problem.blocksObjectives || []}
              onChange={(arr) => update({ blocksObjectives: arr })}
              emptyLabel="No objectives yet. Go to section 01."
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <HintLabel hint="Name + role">Boots on the ground</HintLabel>
              <Input
                placeholder="e.g., Jane Lee, Operations Manager"
                value={problem.bootsOnGround || ""}
                onChange={(e) => update({ bootsOnGround: e.target.value })}
              />
            </div>
            <div>
              <HintLabel hint="Name + role">Executive sponsor</HintLabel>
              <Input
                className={
                  problem.statement?.trim() && noSponsor
                    ? "border-destructive bg-destructive/5"
                    : ""
                }
                placeholder="e.g., John Smith, COO"
                value={problem.sponsor?.nameRole || ""}
                onChange={(e) =>
                  update({
                    sponsor: {
                      ...(problem.sponsor || {}),
                      nameRole: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div>
            <HintLabel hint="If 'supportive' is your answer, sponsorship is weaker than you think">
              What has the sponsor committed to?
            </HintLabel>
            <Textarea
              rows={2}
              placeholder="e.g., Budget approved, named decision authority"
              value={problem.sponsor?.commitment || ""}
              onChange={(e) =>
                update({
                  sponsor: {
                    ...(problem.sponsor || {}),
                    commitment: e.target.value,
                  },
                })
              }
            />
          </div>

          <CostOfInactionForm
            coi={problem.coi || {}}
            onChange={(coi) => update({ coi })}
            defaultFte={state.defaultFteLoadedCost}
          />

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={remove}>
              Remove problem
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function ProblemsSection({
  state,
  setState,
  goto,
}: {
  state: CompassState;
  setState: (s: CompassState) => void;
  goto: (n: number) => void;
}) {
  const add = () => {
    if (state.problems.length >= 8) return;
    setState({
      ...state,
      problems: [
        ...state.problems,
        {
          id: newId("prob"),
          statement: "",
          blocksObjectives: [],
          bootsOnGround: "",
          sponsor: { nameRole: "", commitment: "" },
          coi: {},
        },
      ],
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeader num="02" title="Problems" />
      <p className="mb-8 text-base text-muted-foreground">
        What stands in the way of your objectives.{" "}
        <span className="opacity-70">Up to 8.</span>
      </p>

      {state.objectives.filter((o) => o.text.trim()).length === 0 && (
        <div className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
          No objectives entered.{" "}
          <button
            className="text-destructive underline"
            onClick={() => goto(1)}
          >
            Go to section 01
          </button>{" "}
          first.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {state.problems.map((p, i) => (
          <ProblemCard
            key={p.id}
            problem={p}
            state={state}
            setState={setState}
            idx={i}
          />
        ))}
      </div>

      {state.problems.length < 8 && (
        <Button variant="outline" className="mt-3" onClick={add}>
          <Plus className="mr-2 h-4 w-4" /> Add problem
        </Button>
      )}

      <NavFooter
        goto={goto}
        current={2}
        canForward={state.problems.some((p) => p.statement?.trim())}
      />
    </div>
  );
}

function ProjectCard({
  project,
  state,
  setState,
  idx,
}: {
  project: Project;
  state: CompassState;
  setState: (s: CompassState) => void;
  idx: number;
}) {
  const [open, setOpen] = useState(!project.name?.trim());
  const update = (patch: Partial<Project>) =>
    setState({
      ...state,
      projects: state.projects.map((p) =>
        p.id === project.id ? { ...p, ...patch } : p
      ),
    });
  const remove = () =>
    setState({
      ...state,
      projects: state.projects.filter((p) => p.id !== project.id),
    });
  const problemOptions = state.problems
    .filter((p) => p.statement?.trim())
    .map((p) => ({
      id: p.id,
      label:
        p.statement.slice(0, 60) + (p.statement.length > 60 ? "…" : ""),
    }));
  const orphaned =
    !!project.name?.trim() &&
    (!project.addressesProblems || project.addressesProblems.length === 0);

  return (
    <Card>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            PR{String(idx + 1).padStart(2, "0")}
          </span>
          <span className="truncate text-base font-medium">
            {project.name?.trim() || "Untitled project"}
          </span>
          {project.status && (
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {
                STATUS_OPTIONS.find((s) => s.value === project.status)
                  ?.label
              }
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {(project.annualCost || 0) > 0 && (
            <span className="font-mono text-sm text-muted-foreground">
              {fmt(project.annualCost || 0)}/yr
            </span>
          )}
          {orphaned && (
            <span title="No stated problem addressed" className="text-destructive">
              <AlertTriangle className="h-4 w-4" />
            </span>
          )}
        </div>
      </button>

      {open && (
        <CardContent className="space-y-4 border-t border-border pt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <HintLabel required>Project name</HintLabel>
              <Input
                placeholder="e.g., Customer support copilot"
                value={project.name || ""}
                onChange={(e) => update({ name: e.target.value })}
              />
            </div>
            <div>
              <HintLabel>Status</HintLabel>
              <Select
                value={project.status || ""}
                onValueChange={(v) => update({ status: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select…" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <HintLabel>One-sentence description</HintLabel>
            <Input
              placeholder="What does this project do?"
              value={project.description || ""}
              onChange={(e) => update({ description: e.target.value })}
            />
          </div>

          <div>
            <HintLabel hint="From section 02. If none, leave empty — that's the diagnostic.">
              Addresses which problems?
            </HintLabel>
            <MultiSelectPills
              options={problemOptions}
              selected={project.addressesProblems || []}
              onChange={(arr) => update({ addressesProblems: arr })}
              emptyLabel="No problems entered yet."
            />
            {orphaned && (
              <div className="mt-2 flex items-center gap-1 text-xs text-destructive">
                <AlertTriangle className="h-3 w-3" /> Not addressing any stated
                problem
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <HintLabel>Internal owner</HintLabel>
              <Input
                placeholder="Name, role"
                value={project.owner || ""}
                onChange={(e) => update({ owner: e.target.value })}
              />
            </div>
            <div>
              <HintLabel>Vendor / tool / approach</HintLabel>
              <Input
                placeholder="e.g., Custom on OpenAI API"
                value={project.vendorTool || ""}
                onChange={(e) => update({ vendorTool: e.target.value })}
              />
            </div>
          </div>

          <div>
            <HintLabel hint="The implicit success criteria — name it">
              Graduates to production when…
            </HintLabel>
            <Textarea
              rows={2}
              placeholder="e.g., 95% accuracy, security review passed, team trained"
              value={project.graduationCriteria || ""}
              onChange={(e) =>
                update({ graduationCriteria: e.target.value })
              }
            />
          </div>

          <div>
            <HintLabel hint="Vendor + internal time, fully loaded">
              Annual cost
            </HintLabel>
            <Input
              type="number"
              placeholder="$"
              value={project.annualCost || ""}
              onChange={(e) =>
                update({ annualCost: parseFloat(e.target.value) || 0 })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={remove}>
              Remove project
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function ProjectsSection({
  state,
  setState,
  goto,
}: {
  state: CompassState;
  setState: (s: CompassState) => void;
  goto: (n: number) => void;
}) {
  const add = () =>
    setState({
      ...state,
      projects: [
        ...state.projects,
        {
          id: newId("proj"),
          name: "",
          description: "",
          status: "",
          addressesProblems: [],
          owner: "",
          vendorTool: "",
          graduationCriteria: "",
          annualCost: 0,
        },
      ],
    });

  const addressed = new Set(
    state.projects.flatMap((p) => p.addressesProblems || [])
  );
  const problemsAddressed = state.problems.filter(
    (p) => p.statement?.trim() && addressed.has(p.id)
  ).length;
  const totalProblems = state.problems.filter((p) =>
    p.statement?.trim()
  ).length;
  const orphaned = state.projects.filter(
    (p) =>
      p.name?.trim() &&
      (!p.addressesProblems || p.addressesProblems.length === 0)
  ).length;

  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeader num="03" title="Projects" />
      <p className="mb-8 text-base text-muted-foreground">
        Your current AI initiatives.{" "}
        <span className="opacity-70">Abandoned pilots count.</span>
      </p>

      {state.projects.length > 0 && (
        <div className="mb-5 rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <strong>
            {state.projects.filter((p) => p.name?.trim()).length}
          </strong>{" "}
          project{state.projects.length !== 1 ? "s" : ""}, addressing{" "}
          <strong>{problemsAddressed}</strong> of{" "}
          <strong>{totalProblems}</strong> stated problems.
          {orphaned > 0 && (
            <span className="text-destructive">
              {" "}
              <strong>{orphaned}</strong> orphaned.
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {state.projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            state={state}
            setState={setState}
            idx={i}
          />
        ))}
      </div>

      <Button variant="outline" className="mt-3" onClick={add}>
        <Plus className="mr-2 h-4 w-4" /> Add project
      </Button>

      <NavFooter goto={goto} current={3} canForward={true} />
    </div>
  );
}

function MapColumn({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: {
    id: string;
    primary: string;
    secondary: string;
    orphan: boolean;
    orphanText: string;
  }[];
}) {
  return (
    <div>
      <div className="mb-3 border-b border-border pb-2">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="font-mono text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-2">
        {items.length === 0 && (
          <p className="text-sm italic text-muted-foreground">None yet</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-md border p-3 text-sm",
              item.orphan
                ? "border-destructive/30 bg-destructive/5"
                : "border-border bg-card"
            )}
          >
            <div className="leading-snug">{item.primary || "(unnamed)"}</div>
            <div
              className={cn(
                "mt-1 font-mono text-xs",
                item.orphan ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {item.orphan ? `⚠ ${item.orphanText}` : item.secondary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MappingSection({
  state,
  goto,
}: {
  state: CompassState;
  setState: (s: CompassState) => void;
  goto: (n: number) => void;
}) {
  const objectives = state.objectives.filter((o) => o.text.trim());
  const problems = state.problems.filter((p) => p.statement?.trim());
  const projects = state.projects.filter((p) => p.name?.trim());

  const totalCOI = problems.reduce(
    (s, p) => s + calcCOI(p.coi, state.defaultFteLoadedCost),
    0
  );
  const totalProjectCost = projects.reduce(
    (s, p) => s + (Number(p.annualCost) || 0),
    0
  );
  const orphanProjects = projects.filter(
    (p) => !p.addressesProblems || p.addressesProblems.length === 0
  );
  const orphanProblems = problems.filter(
    (prob) =>
      !projects.some((proj) =>
        (proj.addressesProblems || []).includes(prob.id)
      )
  );
  const orphanObjectives = objectives.filter(
    (obj) =>
      !problems.some((p) => (p.blocksObjectives || []).includes(obj.id))
  );
  const orphanProjectCost = orphanProjects.reduce(
    (s, p) => s + (Number(p.annualCost) || 0),
    0
  );

  return (
    <div className="mx-auto max-w-5xl">
      <SectionHeader num="04" title="The Map" />

      <div className="mb-8 rounded-lg bg-primary p-6 text-primary-foreground">
        <div className="text-2xl font-semibold leading-snug md:text-3xl">
          You&apos;re spending <span className="font-mono">{fmt(totalCOI)}</span>
          /yr on the problems you&apos;ve listed.
        </div>
        {totalProjectCost > 0 && (
          <div className="mt-3 text-lg font-medium leading-snug text-primary-foreground/85">
            <span className="font-mono">{fmt(totalProjectCost)}</span>/yr
            committed to AI activity.
            {orphanProjectCost > 0 && (
              <>
                {" "}
                Of that,{" "}
                <span className="font-mono text-primary-foreground">
                  {fmt(orphanProjectCost)}
                </span>{" "}
                aimed at problems you haven&apos;t listed.
              </>
            )}
          </div>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <MapColumn
          title="Objectives"
          subtitle="Where we're going"
          items={objectives.map((o) => ({
            id: o.id,
            primary: o.text,
            secondary: o.timeHorizon,
            orphan: orphanObjectives.includes(o),
            orphanText: "No problem blocks this",
          }))}
        />
        <MapColumn
          title="Problems"
          subtitle="$/yr cost"
          items={problems.map((p) => ({
            id: p.id,
            primary: p.statement,
            secondary: `${fmt(
              calcCOI(p.coi, state.defaultFteLoadedCost)
            )}/yr · ${(p.blocksObjectives || []).length} obj`,
            orphan: orphanProblems.includes(p),
            orphanText: "No project addresses this",
          }))}
        />
        <MapColumn
          title="Projects"
          subtitle={`${fmt(totalProjectCost)}/yr total`}
          items={projects.map((p) => ({
            id: p.id,
            primary: p.name,
            secondary: `${fmt(p.annualCost || 0)}/yr · ${
              STATUS_OPTIONS.find((s) => s.value === p.status)?.label || "—"
            }`,
            orphan: orphanProjects.includes(p),
            orphanText: "No stated problem",
          }))}
        />
      </div>

      {(orphanObjectives.length > 0 ||
        orphanProblems.length > 0 ||
        orphanProjects.length > 0) && (
        <div className="mb-8 rounded-lg border border-destructive/30 bg-destructive/5 p-5">
          <h4 className="mb-2 text-base font-semibold text-destructive">
            Gaps
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {orphanObjectives.length > 0 && (
              <li>
                <strong>{orphanObjectives.length}</strong> objective
                {orphanObjectives.length === 1 ? "" : "s"} with no path through
                a problem.
              </li>
            )}
            {orphanProblems.length > 0 && (
              <li>
                <strong>{orphanProblems.length}</strong> problem
                {orphanProblems.length === 1 ? "" : "s"} (
                {fmt(
                  orphanProblems.reduce(
                    (s, p) => s + calcCOI(p.coi, state.defaultFteLoadedCost),
                    0
                  )
                )}
                /yr) with no project.
              </li>
            )}
            {orphanProjects.length > 0 && (
              <li>
                <strong>{orphanProjects.length}</strong> project
                {orphanProjects.length === 1 ? "" : "s"} (
                {fmt(orphanProjectCost)}/yr) not addressing any stated problem.
              </li>
            )}
          </ul>
        </div>
      )}

      <NavFooter
        goto={goto}
        current={4}
        canForward={true}
        forwardLabel="See synthesis"
      />
    </div>
  );
}

function DocSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 border-b border-border pb-1 text-lg font-semibold">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function SynthesisSection({
  state,
  goto,
}: {
  state: CompassState;
  setState: (s: CompassState) => void;
  goto: (n: number) => void;
}) {
  const objectives = state.objectives.filter((o) => o.text.trim());
  const problems = state.problems.filter((p) => p.statement?.trim());
  const projects = state.projects.filter((p) => p.name?.trim());
  const totalCOI = problems.reduce(
    (s, p) => s + calcCOI(p.coi, state.defaultFteLoadedCost),
    0
  );
  const totalProjectCost = projects.reduce(
    (s, p) => s + (Number(p.annualCost) || 0),
    0
  );
  const orphanProjects = projects.filter(
    (p) => !p.addressesProblems || p.addressesProblems.length === 0
  );
  const orphanProblems = problems.filter(
    (prob) =>
      !projects.some((proj) =>
        (proj.addressesProblems || []).includes(prob.id)
      )
  );
  const weakSponsors = problems.filter((p) => !p.sponsor?.nameRole?.trim());

  const genMd = () => {
    const lines: string[] = [];
    const orgName = state.organizationName?.trim() || "Your organization";
    lines.push(`# AI Portfolio Compass — ${orgName}`);
    lines.push(
      `\n*${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}*\n\n---\n`
    );
    lines.push(
      `## Headline\n\n**${fmtFull(totalCOI)}/yr** on the problems you've listed.\n`
    );
    if (totalProjectCost > 0) {
      lines.push(
        `**${fmtFull(totalProjectCost)}/yr** committed to AI. Of that, **${fmtFull(
          orphanProjects.reduce(
            (s, p) => s + (Number(p.annualCost) || 0),
            0
          )
        )}** aimed at problems you haven't listed.\n`
      );
    }
    lines.push(`## 1. Strategic intent\n`);
    objectives.forEach((o, i) =>
      lines.push(
        `${i + 1}. **${o.text}** _(${o.timeHorizon}, ${o.category})_`
      )
    );
    lines.push(`\n## 2. Cost of inaction — ${fmtFull(totalCOI)}/yr\n`);
    problems.forEach((p, i) => {
      const cost = calcCOI(p.coi, state.defaultFteLoadedCost);
      lines.push(
        `**Problem ${i + 1}: ${p.statement}** — ${fmtFull(cost)}/yr (${
          p.coi?.confidence || "?"
        })`
      );
      if (p.bootsOnGround) lines.push(`- Boots: ${p.bootsOnGround}`);
      if (p.sponsor?.nameRole)
        lines.push(
          `- Sponsor: ${p.sponsor.nameRole}${
            p.sponsor.commitment ? ` — ${p.sponsor.commitment}` : ""
          }`
        );
      else lines.push(`- ⚠ No sponsor`);
      if (p.coi?.opportunityCost)
        lines.push(`- Opp cost: ${p.coi.opportunityCost}`);
      lines.push("");
    });
    lines.push(`## 3. Projects\n`);
    if (!projects.length) lines.push(`*None.*\n`);
    else
      projects.forEach((p, i) => {
        const addressed = (p.addressesProblems || [])
          .map(
            (pid) => problems.find((pr) => pr.id === pid)?.statement
          )
          .filter(Boolean);
        lines.push(
          `**${i + 1}. ${p.name}** — ${fmtFull(p.annualCost)}/yr (${
            STATUS_OPTIONS.find((s) => s.value === p.status)?.label || "—"
          })`
        );
        if (p.description) lines.push(`- ${p.description}`);
        if (p.owner) lines.push(`- Owner: ${p.owner}`);
        if (p.vendorTool) lines.push(`- Approach: ${p.vendorTool}`);
        if (addressed.length)
          lines.push(`- Addresses: ${addressed.join("; ")}`);
        else lines.push(`- ⚠ Orphaned`);
        if (p.graduationCriteria)
          lines.push(`- Graduates when: ${p.graduationCriteria}`);
        lines.push("");
      });
    if (orphanProblems.length || orphanProjects.length) {
      lines.push(`## 4. Gaps\n`);
      if (orphanProblems.length) {
        lines.push(`**Problems with no project:**`);
        orphanProblems.forEach((p) =>
          lines.push(
            `- ${p.statement} — ${fmtFull(
              calcCOI(p.coi, state.defaultFteLoadedCost)
            )}/yr`
          )
        );
        lines.push("");
      }
      if (orphanProjects.length) {
        lines.push(`**Projects with no stated problem:**`);
        orphanProjects.forEach((p) =>
          lines.push(`- ${p.name} — ${fmtFull(p.annualCost)}/yr`)
        );
        lines.push("");
      }
    }
    if (weakSponsors.length) {
      lines.push(`## 5. Unsponsored problems\n`);
      weakSponsors.forEach((p) =>
        lines.push(
          `- ${p.statement} (${fmtFull(
            calcCOI(p.coi, state.defaultFteLoadedCost)
          )}/yr)`
        )
      );
      lines.push("");
    }
    lines.push(`## 6. Next conversations\n`);
    if (weakSponsors.length)
      lines.push(
        `- Recruit sponsors for ${weakSponsors.length} unsponsored problem${
          weakSponsors.length === 1 ? "" : "s"
        }.`
      );
    if (orphanProblems.length)
      lines.push(
        `- Start projects or accept the ${fmtFull(
          orphanProblems.reduce(
            (s, p) => s + calcCOI(p.coi, state.defaultFteLoadedCost),
            0
          )
        )}/yr cost of ${orphanProblems.length} unaddressed problem${
          orphanProblems.length === 1 ? "" : "s"
        }.`
      );
    if (orphanProjects.length)
      lines.push(
        `- Name the problem or kill the ${orphanProjects.length} orphaned project${
          orphanProjects.length === 1 ? "" : "s"
        }.`
      );
    lines.push(
      `\n---\n*PickleLlama AI Portfolio Compass. Data stays in your browser.*\n`
    );
    return lines.join("\n");
  };

  const downloadMd = () => {
    const blob = new Blob([genMd()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (state.organizationName?.trim() || "compass")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase();
    a.download = `${safeName}-portfolio-audit.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeader num="05" title="Synthesis" />

      <div className="mb-6 flex flex-wrap gap-2 no-print">
        <Button onClick={downloadMd}>
          <Download className="mr-2 h-4 w-4" /> Download markdown
        </Button>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print / PDF
        </Button>
      </div>

      <Card className="md:p-6">
        <CardContent className="pt-6">
          <div className="mb-5 border-b border-border pb-4">
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              AI Portfolio Compass
            </div>
            <h1 className="mb-1 text-2xl font-bold">
              {state.organizationName?.trim() || "Your organization"}
            </h1>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-muted/40 p-5">
            <div className="mb-2 text-xl font-semibold">Headline</div>
            <p className="text-sm leading-relaxed">
              <strong className="font-mono text-primary">
                {fmtFull(totalCOI)}/yr
              </strong>{" "}
              on the problems you&apos;ve listed.
              {totalProjectCost > 0 && (
                <>
                  {" "}
                  <strong className="font-mono">
                    {fmtFull(totalProjectCost)}/yr
                  </strong>{" "}
                  committed to AI activity.
                  {orphanProjects.length > 0 && (
                    <>
                      {" "}
                      Of that,{" "}
                      <strong className="font-mono text-destructive">
                        {fmtFull(
                          orphanProjects.reduce(
                            (s, p) => s + (Number(p.annualCost) || 0),
                            0
                          )
                        )}
                      </strong>{" "}
                      aimed at problems you haven&apos;t listed.
                    </>
                  )}
                </>
              )}
            </p>
          </div>

          <DocSection title="1. Strategic intent">
            {objectives.length === 0 ? (
              <p className="text-sm italic text-muted-foreground">None.</p>
            ) : (
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                {objectives.map((o) => (
                  <li key={o.id}>
                    <strong>{o.text}</strong>{" "}
                    <span className="text-xs text-muted-foreground">
                      ({o.timeHorizon}, {o.category})
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </DocSection>

          <DocSection title={`2. Cost of inaction — ${fmtFull(totalCOI)}/yr`}>
            {problems.length === 0 ? (
              <p className="text-sm italic text-muted-foreground">
                No problems entered.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {problems.map((p, i) => {
                  const cost = calcCOI(p.coi, state.defaultFteLoadedCost);
                  return (
                    <div
                      key={p.id}
                      className={cn(
                        "pb-3",
                        i < problems.length - 1 && "border-b border-border"
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="text-sm font-medium">
                          P{i + 1}: {p.statement}
                        </div>
                        <div className="shrink-0 font-mono text-sm">
                          {fmtFull(cost)}/yr
                        </div>
                      </div>
                      <div className="mt-1 space-y-0.5 text-xs leading-relaxed text-muted-foreground">
                        {p.bootsOnGround && (
                          <div>Boots: {p.bootsOnGround}</div>
                        )}
                        {p.sponsor?.nameRole ? (
                          <div>
                            Sponsor: {p.sponsor.nameRole}
                            {p.sponsor.commitment &&
                              ` — ${p.sponsor.commitment}`}
                          </div>
                        ) : (
                          <div className="text-destructive">
                            ⚠ No sponsor
                          </div>
                        )}
                        {p.coi?.opportunityCost && (
                          <div>Opportunity cost: {p.coi.opportunityCost}</div>
                        )}
                        <div>Confidence: {p.coi?.confidence || "?"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </DocSection>

          <DocSection title="3. Projects">
            {projects.length === 0 ? (
              <p className="text-sm italic text-muted-foreground">None.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {projects.map((p, i) => {
                  const addressed = (p.addressesProblems || [])
                    .map(
                      (pid) =>
                        problems.find((pr) => pr.id === pid)?.statement
                    )
                    .filter(Boolean);
                  return (
                    <div
                      key={p.id}
                      className={cn(
                        "pb-3",
                        i < projects.length - 1 && "border-b border-border"
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="text-sm font-medium">
                          {i + 1}. {p.name}
                        </div>
                        <div className="shrink-0 font-mono text-sm">
                          {fmtFull(p.annualCost)}/yr
                        </div>
                      </div>
                      <div className="mt-1 space-y-0.5 text-xs leading-relaxed text-muted-foreground">
                        {p.description && <div>{p.description}</div>}
                        <div>
                          Status:{" "}
                          {STATUS_OPTIONS.find((s) => s.value === p.status)
                            ?.label || "—"}
                        </div>
                        {p.owner && <div>Owner: {p.owner}</div>}
                        {p.vendorTool && <div>Approach: {p.vendorTool}</div>}
                        {addressed.length > 0 ? (
                          <div>Addresses: {addressed.join("; ")}</div>
                        ) : (
                          <div className="text-destructive">⚠ Orphaned</div>
                        )}
                        {p.graduationCriteria && (
                          <div>Graduates when: {p.graduationCriteria}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </DocSection>

          {(orphanProblems.length > 0 || orphanProjects.length > 0) && (
            <DocSection title="4. Gaps">
              {orphanProblems.length > 0 && (
                <div className="mb-2">
                  <div className="mb-1 text-sm font-medium">
                    Problems with no project:
                  </div>
                  <ul className="list-disc space-y-0.5 pl-5 text-xs">
                    {orphanProblems.map((p) => (
                      <li key={p.id}>
                        {p.statement} —{" "}
                        <span className="font-mono">
                          {fmtFull(calcCOI(p.coi, state.defaultFteLoadedCost))}
                        </span>
                        /yr
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {orphanProjects.length > 0 && (
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Projects with no stated problem:
                  </div>
                  <ul className="list-disc space-y-0.5 pl-5 text-xs">
                    {orphanProjects.map((p) => (
                      <li key={p.id}>
                        {p.name} —{" "}
                        <span className="font-mono">
                          {fmtFull(p.annualCost)}
                        </span>
                        /yr
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </DocSection>
          )}

          {weakSponsors.length > 0 && (
            <DocSection title="5. Unsponsored problems">
              <p className="mb-2 text-xs text-muted-foreground">
                Without named authority, these don&apos;t get solved.
              </p>
              <ul className="list-disc space-y-0.5 pl-5 text-xs">
                {weakSponsors.map((p) => (
                  <li key={p.id}>
                    {p.statement} (
                    {fmtFull(calcCOI(p.coi, state.defaultFteLoadedCost))}/yr)
                  </li>
                ))}
              </ul>
            </DocSection>
          )}

          <DocSection title="6. Next conversations">
            <ul className="list-disc space-y-0.5 pl-5 text-sm">
              {weakSponsors.length > 0 && (
                <li>
                  Recruit sponsors for the {weakSponsors.length} unsponsored
                  problem{weakSponsors.length === 1 ? "" : "s"}.
                </li>
              )}
              {orphanProblems.length > 0 && (
                <li>
                  Start projects or accept the{" "}
                  {fmtFull(
                    orphanProblems.reduce(
                      (s, p) => s + calcCOI(p.coi, state.defaultFteLoadedCost),
                      0
                    )
                  )}
                  /yr cost of unaddressed problems.
                </li>
              )}
              {orphanProjects.length > 0 && (
                <li>
                  Name the problem or end the {orphanProjects.length} orphaned
                  project{orphanProjects.length === 1 ? "" : "s"}.
                </li>
              )}
              {weakSponsors.length === 0 &&
                orphanProblems.length === 0 &&
                orphanProjects.length === 0 && (
                  <li>Structure is clean. Shift focus to execution.</li>
                )}
            </ul>
          </DocSection>

          <div className="mt-7 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            PickleLlama AI Portfolio Compass. Your data stays in your browser.
          </div>
        </CardContent>
      </Card>

      <div className="mt-7 no-print">
        <Button variant="outline" onClick={() => goto(4)}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to map
        </Button>
      </div>
    </div>
  );
}

export function PortfolioCompass() {
  const [state, setStateRaw] = useState<CompassState>(initialState);
  const [loading, setLoading] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setState = useCallback((next: CompassState) => {
    next.metadata = {
      ...(next.metadata || { version: "1.0" }),
      lastModified: new Date().toISOString(),
    };
    setStateRaw(next);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStateRaw({ ...initialState, ...JSON.parse(saved) });
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }, 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state, loading]);

  const goto = (n: number) =>
    setState({ ...state, currentSection: Math.max(0, Math.min(5, n)) });

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setStateRaw(initialState);
    setShowReset(false);
  };

  const totalCOI = state.problems.reduce(
    (s, p) =>
      p.statement?.trim()
        ? s + calcCOI(p.coi, state.defaultFteLoadedCost)
        : s,
    0
  );

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Compass header — title + stages + reset, all in one bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur no-print">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand block */}
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground">
              P
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">PickleLlama</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                AI Portfolio Compass
              </div>
            </div>
          </div>

          {/* Stages */}
          <nav className="hidden flex-1 items-center justify-end gap-5 md:flex">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={cn(
                  "border-b-2 pb-1 text-sm transition-colors",
                  state.currentSection === s.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                onClick={() => goto(s.id)}
              >
                <span className="mr-1.5 font-mono text-xs text-muted-foreground">
                  {s.num}
                </span>
                {s.title}
              </button>
            ))}
          </nav>

          {/* Mobile current-section indicator */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {SECTIONS[state.currentSection]?.num}
            </span>
            <span className="text-sm font-medium">
              {SECTIONS[state.currentSection]?.title}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowReset(true)}
            title="Reset"
            className="ml-2 shrink-0"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6 lg:px-8">
        {state.currentSection === 0 && (
          <FrameSection state={state} setState={setState} goto={goto} />
        )}
        {state.currentSection === 1 && (
          <ObjectivesSection state={state} setState={setState} goto={goto} />
        )}
        {state.currentSection === 2 && (
          <ProblemsSection state={state} setState={setState} goto={goto} />
        )}
        {state.currentSection === 3 && (
          <ProjectsSection state={state} setState={setState} goto={goto} />
        )}
        {state.currentSection === 4 && (
          <MappingSection state={state} setState={setState} goto={goto} />
        )}
        {state.currentSection === 5 && (
          <SynthesisSection state={state} setState={setState} goto={goto} />
        )}
      </main>

      {/* Running cost bar */}
      {state.currentSection >= 2 &&
        state.currentSection < 5 &&
        totalCOI > 0 && (
          <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/95 backdrop-blur no-print">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Annual cost of inaction
              </div>
              <div className="text-xl font-bold text-primary">
                <span className="font-mono">{fmtFull(totalCOI)}</span>
                <span className="ml-1 font-mono text-sm text-muted-foreground">
                  /yr
                </span>
              </div>
            </div>
          </div>
        )}

      {/* Reset confirmation */}
      <Dialog open={showReset} onOpenChange={setShowReset}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset everything?</DialogTitle>
            <DialogDescription>
              Deletes all data from your browser. Cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReset(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={reset}>
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
