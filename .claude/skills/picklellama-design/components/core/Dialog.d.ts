export interface DialogProps { open: boolean; onClose?: () => void; title: string; description?: string; children?: React.ReactNode; actions?: React.ReactNode; /** render the panel in-flow (for specimens) instead of a fixed overlay */ inline?: boolean; }
export function Dialog(props: DialogProps): JSX.Element;
