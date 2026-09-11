export interface TableProps { columns: Array<{key: string; header: string; align?: "left" | "right" | "center"; mono?: boolean}>; rows: Array<Record<string, React.ReactNode>>; /** thick top rule like the Automation Facts panel */ facts?: boolean; style?: React.CSSProperties; }
export function Table(props: TableProps): JSX.Element;
