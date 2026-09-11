export interface TextareaProps { rows?: number; placeholder?: string; value?: string; invalid?: boolean; disabled?: boolean; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; style?: React.CSSProperties; }
export function Textarea(props: TextareaProps): JSX.Element;
