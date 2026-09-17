/**
 * @startingPoint section="Gazette" subtitle="The Daily Llama nameplate with edition line" viewport="700x300"
 */
export interface MastheadProps { issue?: string; date?: string; price?: string; tagline?: string; /** one-line nameplate for article pages / header */ compact?: boolean; onClick?: () => void; style?: React.CSSProperties; }
export function Masthead(props: MastheadProps): JSX.Element;
