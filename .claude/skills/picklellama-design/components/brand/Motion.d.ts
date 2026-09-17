export interface RevealProps { children: React.ReactNode; delay?: number; anim?: "pl-rise" | "pl-fade" | "pl-stamp"; threshold?: number; as?: string; style?: React.CSSProperties; }
export function Reveal(props: RevealProps): JSX.Element;
export interface TwoToneProps { lines: React.ReactNode[]; size?: string; colors?: string[]; style?: React.CSSProperties; }
export function TwoTone(props: TwoToneProps): JSX.Element;
export function useCountUp(value: number, ms?: number): number;
export interface TypedProps { text: string; delay?: number; speed?: number; style?: React.CSSProperties; }
export function Typed(props: TypedProps): JSX.Element;
