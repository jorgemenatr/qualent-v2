/**
 * @startingPoint section="Gazette" subtitle="Front-page story card: art, kicker, condensed headline, dateline" viewport="700x300"
 */
export interface NewsCardProps { story: { section: string; topic?: string; title: string; place: string; date?: string; dek?: string; art?: string; tone?: "breaking" | "archival" }; size?: "lg" | "md" | "sm"; onClick?: () => void; style?: React.CSSProperties; }
export function NewsCard(props: NewsCardProps): JSX.Element;
