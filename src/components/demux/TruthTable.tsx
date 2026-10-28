import type { DemuxState } from '../../types';
import { calculateOutputs } from '../../constants/demux';

export default function TruthTable({ state }: { state: DemuxState }) {
  const rows = [];
  for (const input of [0,1] as const) for (let address = 0; address < 4; address++) {
    const s1 = (address >> 1) as 0 | 1;
    const s0 = (address & 1) as 0 | 1;
    rows.push({ input, s1, s0, outputs: calculateOutputs(input, s1, s0) });
  }
  return <div className="table-shell"><table><thead><tr>{['I','S1','S0','Y0','Y1','Y2','Y3'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{rows.map((row, index) => {
    const current = row.input === state.input && row.s1 === state.s1 && row.s0 === state.s0;
    return <tr className={current ? 'current' : ''} key={index}>{[row.input,row.s1,row.s0,...row.outputs.map(value => value ? 1 : 0)].map((value,i) => <td className={current && i > 2 && row.outputs[i-3] ? 'active-output' : ''} key={i}>{value}</td>)}</tr>;
  })}</tbody></table></div>;
}
