/**
 * @startingPoint section="Components" subtitle="Flat cards: white, lime wash, lime loud, charcoal, packaging-label frame" viewport="700x300"
 */
export interface CardProps {
  /** default = white on paper; soft = lime wash; loud = lime-300; inverse = charcoal; label = parody packaging frame (24px radius, strong border) */
  variant?: "default" | "soft" | "loud" | "inverse" | "label";
  padding?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
