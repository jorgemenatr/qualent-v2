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
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  content: string;
  readingTime: string;
}

export type ContentType = "reports" | "case-studies";

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
