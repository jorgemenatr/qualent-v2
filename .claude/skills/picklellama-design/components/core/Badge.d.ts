export interface BadgeProps { tone?: "brand" | "neutral" | "danger" | "info" | "lime"; /** soft pill, solid pill, or rotated condensed "stamp" like TREATABLE */ variant?: "soft" | "solid" | "stamp"; children: React.ReactNode; style?: React.CSSProperties; }
export function Badge(props: BadgeProps): JSX.Element;
