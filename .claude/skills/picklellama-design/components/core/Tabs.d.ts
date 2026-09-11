export interface TabsProps { items: Array<{label: string; content?: React.ReactNode}>; defaultIndex?: number; onChange?: (index: number) => void; style?: React.CSSProperties; }
export function Tabs(props: TabsProps): JSX.Element;
