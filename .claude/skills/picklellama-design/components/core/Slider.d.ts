export interface SliderProps { min?: number; max?: number; step?: number; value?: number; defaultValue?: number; onChange?: (v: number) => void; format?: (v: number) => string; style?: React.CSSProperties; }
export function Slider(props: SliderProps): JSX.Element;
