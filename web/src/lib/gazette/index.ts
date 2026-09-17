import fs from "fs";
import path from "path";
import { getAllContent, getContentBySlug, type ContentItem } from "@/lib/content";

export interface Issue {
  number: number;
  date: string;
  name: string;
}

/** The edition line, in the reader's language: "Tuesday, 15 September 2026". */
export function editionDate(date: string, locale: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    locale === "es" ? "es-MX" : "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );
}

/** The short filing date a headline carries: "15 Sep". */
export function filedDate(date: string, locale: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    locale === "es" ? "es-MX" : "en-US",
    { month: "short", day: "numeric" }
  );
}

/** Routes that sit alongside [slug] and must never be claimed by a story. */
export const RESERVED_SLUGS = ["letters", "archive"];

export function getIssues(): Issue[] {
  const file = path.join(process.cwd(), "content", "gazette", "issues.json");
  if (!fs.existsSync(file)) return [];
  const issues = JSON.parse(fs.readFileSync(file, "utf8")) as Issue[];
  return issues.sort((a, b) => b.number - a.number);
}

export function getCurrentIssue(): Issue | undefined {
  return getIssues()[0];
}

/** Roman numerals for the volume line. One volume so far, but the paper is young. */
export function volumeLine(issue?: Issue) {
  return issue ? `Vol. I, No. ${issue.number}` : "Vol. I";
}

/** Newest issue first, then the editor's placement within it. */
export function getStories(): ContentItem[] {
  return getAllContent("gazette")
    .filter((s) => !RESERVED_SLUGS.includes(s.slug))
    .sort(
      (a, b) =>
        (b.meta.issue ?? 0) - (a.meta.issue ?? 0) ||
        (a.meta.order ?? 99) - (b.meta.order ?? 99)
    );
}

export function getStory(slug: string): ContentItem | null {
  if (RESERVED_SLUGS.includes(slug)) return null;
  return getContentBySlug("gazette", slug);
}

export function getStoriesByIssue(n: number): ContentItem[] {
  return getStories().filter((s) => s.meta.issue === n);
}

/** The lead is the first story filed in the current issue. */
export function getFrontPage() {
  const issue = getCurrentIssue();
  const current = issue ? getStoriesByIssue(issue.number) : [];
  const column = current.find((s) => s.meta.section === "From the desk of");
  const news = current.filter((s) => s !== column);
  const [lead, ...rest] = news;
  const older = getStories()
    .filter((s) => issue && (s.meta.issue ?? 0) < issue.number)
    .filter((s) => s.meta.section !== "From the desk of")
    .slice(0, 4);
  return { issue, lead, rest, older, column };
}

/**
 * Letters run in the paper, not in the database — these are the ones the Llama
 * has already answered. Reader submissions land in GazetteLetter and are
 * promoted here by hand, which is the whole editorial control.
 */
export const LETTERS: { place: string; letter: string; reply: string }[] = [
  {
    place: "Saltillo, Coah.",
    letter:
      "I have 41 tabs and one of them is called \u2018FINAL_v7_USE_THIS\u2019. There is also a \u2018FINAL_v8\u2019. Which one is final?",
    reply: "Neither. Ask Gary.",
  },
  {
    place: "Hamilton, Ont.",
    letter:
      "Our ERP go-live has been \u2018next quarter\u2019 for eleven quarters. Is this normal?",
    reply: "It is common. It is not normal.",
  },
  {
    place: "Red Deer, Alta.",
    letter:
      "My controller is the only person who knows where the file is. She is retiring in March.",
    reply: "Back her up. Then the file.",
  },
  {
    place: "Bakersfield, Calif.",
    letter:
      "The consultant says we need a Phase Two before we can define Phase One. Thoughts?",
    reply: "There is no Phase Two.",
  },
  {
    place: "Thunder Bay, Ont.",
    letter:
      "Every morning the workbook asks whether I want to save changes. I have never made changes.",
    reply: "It knows.",
  },
];

export const CLASSIFIEDS: string[] = [
  "WANTED: anyone who knows the password to the shared drive. Serious inquiries. Ask for Doreen.",
  "FOR SALE: 90-slide transformation deck, lightly used, recommends second deck. OBO.",
  "LOST: Phase One. Last seen 2019. Answers to \u2018Discovery\u2019.",
  "FOUND: macro, 2009, author Gary. Do not touch. Do not ask.",
  "SEEKING: fifth dispatcher to track the fourth. Must love tabs.",
  "NOTICE: steering committee will meet Thursday to steer. Agenda TBD.",
  "FREE: clipboard, 30 yrs service, plaque included. Some wear.",
  "HELP WANTED: someone to open the Access database. Llama unavailable.",
];

/** The recurring cast, for the article rail. Objects and archetypes, never people. */
export const CAST: [string, string][] = [
  ["The Spreadsheet", "Arch-enemy. 41 tabs. One macro."],
  ["The Vendor", "18 months, $600K, six months of discovery."],
  ["The Dispatcher", "Holding it together with a workbook and a group chat."],
];
