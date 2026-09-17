export interface LettersProps { items?: Array<[place: string, question: string, reply: string]>; columns?: number; style?: React.CSSProperties; }
export function Letters(props: LettersProps): JSX.Element;
export interface ClassifiedsProps { items?: string[]; columns?: number; style?: React.CSSProperties; }
export function Classifieds(props: ClassifiedsProps): JSX.Element;
