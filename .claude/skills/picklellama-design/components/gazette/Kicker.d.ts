export interface KickerProps { section?: string; topic?: string; /** ad = outlined ADVERTISEMENT; breaking = red */ tone?: "ad" | "breaking"; style?: React.CSSProperties; }
export function Kicker(props: KickerProps): JSX.Element;
export interface DatelineProps { place: string; byline?: string; time?: string; style?: React.CSSProperties; }
export function Dateline(props: DatelineProps): JSX.Element;
export interface LlamaQuoteProps { children: React.ReactNode; context?: string; style?: React.CSSProperties; }
export function LlamaQuote(props: LlamaQuoteProps): JSX.Element;
export interface DisclaimerBandProps { left: string; right?: string; tone?: "ink" | "red" | "green" | "paper"; style?: React.CSSProperties; }
export function DisclaimerBand(props: DisclaimerBandProps): JSX.Element;
export interface NewsRuleProps { thick?: boolean; dashed?: boolean; style?: React.CSSProperties; }
export function NewsRule(props: NewsRuleProps): JSX.Element;
