import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentMeta {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  image?: string;
  published?: boolean;
  // Case study specific fields
  client?: string;
  result?: string;
  industry?: string;
  // Portfolio card fields
  metrics?: { value: string; label: string }[];
  tags_highlight?: string[];
  card_size?: "featured" | "side" | "mid" | "wide";
  preview_url?: string;
  band_color?: "green" | "acid" | "warm" | "dark" | "stripe";
  live_url?: string;
  unlisted?: boolean;
  // The Daily Llama
  section?: string;          // News, Investigation, Sighting, Archive, From the desk of
  topic?: string;            // the green half of the kicker: Logistics, ERP, Consulting
  place?: string;            // dateline: "Hamilton, Ont."
  byline?: string;           // defaults to "By Gazette staff"
  filed_at?: string;         // "Tuesday, 6:12 a.m."
  issue?: number;
  order?: number;          // placement within the issue; 1 is the lead
  art?: string;              // mascot pose filename
  caption?: string;
  tone?: "breaking" | "archival";
  quote?: string;            // the Llama, seven words or fewer
  quote_context?: string;
  sponsored?: string;        // the fine print under the story
  filed_under?: string;
  ad?: "pharma" | "farms" | "political" | "lawyer";
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  content: string;
  readingTime: string;
}

export type ContentType = "reports" | "case-studies" | "gazette";

export function getContentBySlug(
  type: ContentType,
  slug: string
): ContentItem | null {
  const fullPath = path.join(contentDirectory, type, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    meta: data as ContentMeta,
    content,
    readingTime: stats.text,
  };
}

export function getAllContent(type: ContentType): ContentItem[] {
  const typeDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  const slugs = fs
    .readdirSync(typeDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  const content = slugs
    .map((slug) => getContentBySlug(type, slug))
    .filter((item): item is ContentItem => item !== null)
    .filter((item) => item.meta.published !== false)
    .filter((item) => item.meta.unlisted !== true)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );

  return content;
}

export function getAllSlugs(type: ContentType): string[] {
  const typeDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  return fs
    .readdirSync(typeDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
