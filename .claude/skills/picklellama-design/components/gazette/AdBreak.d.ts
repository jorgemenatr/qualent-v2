/**
 * @startingPoint section="Gazette" subtitle="The four house ad-break voices" viewport="700x300"
 */
export interface AdBreakProps { /** pharma = lab-coat Llama, green band; farms = PSA on lime wash; political = black attack ad, red band; lawyer = red-bordered bus-bench */ kind?: "pharma" | "farms" | "political" | "lawyer"; style?: React.CSSProperties; }
export function AdBreak(props: AdBreakProps): JSX.Element;
