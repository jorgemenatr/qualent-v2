/**
 * @startingPoint section="Components" subtitle="Pickle-green primary, lime secondary, outline, ghost, danger, link" viewport="700x300"
 */
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Square button holding a single icon */
  iconOnly?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
