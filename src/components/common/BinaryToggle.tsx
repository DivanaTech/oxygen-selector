import type { BinaryDigit } from '../../types';

export function BinaryToggle({ label, description, value, onChange }: { label: string; description: string; value: BinaryDigit; onChange: (value: BinaryDigit) => void }) {
  return <label className="binary-toggle"><span><b>{label}</b><small>{description}</small></span><input type="checkbox" checked={value === 1} onChange={(event) => onChange(event.target.checked ? 1 : 0)} /><span className="switch" /><output>{value}</output></label>;
}
