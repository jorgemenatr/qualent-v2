export interface InputProps {
  type?: string; placeholder?: string; value?: string; defaultValue?: string;
  invalid?: boolean; disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
