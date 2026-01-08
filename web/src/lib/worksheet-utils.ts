// Shared types and utilities for worksheets

export interface Problem {
  description: string;
  affectedParties: string;
}

export interface ProblemCost {
  problemName: string;
  hoursPerWeek: string;
  peopleInvolved: string;
  hourlyCost: string;
  revenueLost: string;
  errorCost: string;
  riskLevel: "low" | "medium" | "high" | "";
}

export interface WorksheetFormData {
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

export function getFilledProblems(
  problems: Problem[]
): { index: number; description: string }[] {
  return problems
    .map((p, i) => ({ index: i, description: p.description }))
    .filter((p) => p.description.trim() !== "");
}

export function calculateWeeklyCost(cost: ProblemCost): string {
  const hours = parseFloat(cost.hoursPerWeek) || 0;
  const people = parseFloat(cost.peopleInvolved) || 0;
  const hourly = parseFloat(cost.hourlyCost) || 0;
  const weekly = hours * people * hourly;
  return weekly > 0 ? `$${weekly.toLocaleString()}` : "—";
}

export function calculateAnnualCost(cost: ProblemCost): string {
  const hours = parseFloat(cost.hoursPerWeek) || 0;
  const people = parseFloat(cost.peopleInvolved) || 0;
  const hourly = parseFloat(cost.hourlyCost) || 0;
  const annual = hours * people * hourly * 52;
  return annual > 0 ? `$${annual.toLocaleString()}` : "—";
}

export function generateMarkdown(
  data: WorksheetFormData,
  name: string
): string {
  let md = `# Pre-Meeting Worksheet: ${name}\n\n`;
  md += `Generated: ${new Date().toLocaleDateString()}\n\n`;
  md += `---\n\n`;

  // Section 1: Problems
  md += `## 1. Top Problems\n\n`;
  const filledProblems = getFilledProblems(data.problems);
  if (filledProblems.length === 0) {
    md += `*No problems entered*\n\n`;
  } else {
    filledProblems.forEach((p, i) => {
      const problem = data.problems[p.index];
      md += `### Problem ${i + 1}: ${problem.description}\n`;
      md += `**Affects:** ${problem.affectedParties || "Not specified"}\n\n`;
    });
  }

  // Section 2: Cost Analysis
  md += `## 2. Cost Analysis\n\n`;
  const filledCosts = data.problemCosts.filter((c) => c.problemName);
  if (filledCosts.length === 0) {
    md += `*No cost estimates entered*\n\n`;
  } else {
    md += `| Problem | Hours/Week | People | Weekly Cost | Annual Cost | Risk |\n`;
    md += `|---------|------------|--------|-------------|-------------|------|\n`;
    filledCosts.forEach((cost) => {
      const weekly = calculateWeeklyCost(cost);
      const annual = calculateAnnualCost(cost);
      const risk = cost.riskLevel
        ? cost.riskLevel.charAt(0).toUpperCase() + cost.riskLevel.slice(1)
        : "—";
      const problemName =
        cost.problemName.length > 30
          ? cost.problemName.slice(0, 30) + "..."
          : cost.problemName;
      md += `| ${problemName} | ${cost.hoursPerWeek || "—"} | ${cost.peopleInvolved || "—"} | ${weekly} | ${annual} | ${risk} |\n`;
    });
    md += `\n`;

    // Additional cost details
    filledCosts.forEach((cost) => {
      if (cost.revenueLost || cost.errorCost) {
        md += `**${cost.problemName}** - Additional Costs:\n`;
        if (cost.revenueLost) md += `- Revenue lost: $${cost.revenueLost}\n`;
        if (cost.errorCost) md += `- Error/rework cost: $${cost.errorCost}\n`;
        md += `\n`;
      }
    });
  }

  // Section 3: Previous Attempts
  md += `## 3. Previous Attempts\n\n`;
  const attempts: string[] = [];
  if (data.previousAttempts.triedHiring)
    attempts.push("Tried to hire for it");
  if (data.previousAttempts.lookedAtSoftware)
    attempts.push("Looked at software solutions");
  if (data.previousAttempts.builtInternally)
    attempts.push("Built something internally");
  if (data.previousAttempts.askedVendor) attempts.push("Asked a vendor");
  if (data.previousAttempts.livedWithIt) attempts.push("Just lived with it");

  if (attempts.length === 0 && !data.previousAttempts.other) {
    md += `*No previous attempts recorded*\n\n`;
  } else {
    attempts.forEach((a) => {
      md += `- [x] ${a}\n`;
    });
    if (data.previousAttempts.other) {
      md += `- Other: ${data.previousAttempts.other}\n`;
    }
    md += `\n`;
  }

  // Section 4: Success Metrics
  md += `## 4. Success Metrics\n\n`;
  const metrics: string[] = [];
  if (data.successMetrics.timeSaved)
    metrics.push(`**Time Saved:** ${data.successMetrics.timeSaved} hours/week`);
  if (data.successMetrics.errorsReduced)
    metrics.push(`**Errors Reduced:** ${data.successMetrics.errorsReduced}%`);
  if (data.successMetrics.capacityFreedFor)
    metrics.push(
      `**Capacity Freed For:** ${data.successMetrics.capacityFreedFor}`
    );
  if (data.successMetrics.riskEliminated)
    metrics.push(
      `**Risk Eliminated:** ${data.successMetrics.riskEliminated}`
    );
  if (data.successMetrics.other)
    metrics.push(`**Other:** ${data.successMetrics.other}`);

  if (metrics.length === 0) {
    md += `*No success metrics defined*\n\n`;
  } else {
    metrics.forEach((m) => {
      md += `- ${m}\n`;
    });
    md += `\n`;
  }

  // Section 5: Additional Notes
  if (data.anythingElse) {
    md += `## 5. Additional Notes\n\n`;
    md += `${data.anythingElse}\n`;
  }

  return md;
}
