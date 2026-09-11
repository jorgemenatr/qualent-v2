export interface SelectProps { options: Array<string | {value: string; label: string}>; placeholder?: string; invalid?: boolean; disabled?: boolean; value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; style?: React.CSSProperties; }
export function Select(props: SelectProps): JSX.Element;
