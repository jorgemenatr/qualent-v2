import type { MDXComponents } from "mdx/types";
import { MDXContent } from "@/components/mdx";
import { cn } from "@/lib/utils";

/**
 * Filed copy, set the way the paper sets it: Archivo at reading size, two
 * columns once there is room for two, and a drop cap on the opening
 * paragraph. The real column runs single-column and without the cap — it is
 * the one section that is not in character.
 */
const newsComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 last:mb-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="dl-h3 mt-6 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="dl-h3 mt-5 mb-2" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-5 list-disc" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-5 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1.5" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-4 border-l-2 border-news-rule pl-4 italic"
      {...props}
    />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => <em {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold" {...props} />
  ),
} satisfies MDXComponents;

export function StoryBody({
  source,
  column = false,
}: {
  source: string;
  column?: boolean;
}) {
  return (
    <div
      className={cn(
        "dl-body text-[1.0625rem] text-ink",
        column ? "leading-[1.7]" : "dl-columns dl-drop leading-[1.65]"
      )}
    >
      <MDXContent source={source} components={newsComponents} />
    </div>
  );
}
