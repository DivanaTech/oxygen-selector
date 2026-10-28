export default function Circuit({ outputs }: { outputs: boolean[] }) {
  const labels = ['Y₀', 'Y₁', 'Y₂', 'Y₃'];
  const andCenters = [170, 245, 320, 395];

  return (
    <div className="demux-circuit">
      <div className="circuit-heading">
        <span>Gate-level circuit</span>
        <strong className={outputs.some(Boolean) ? 'active' : ''}>
          {outputs.some(Boolean) ? 'SIGNAL ROUTED' : 'ALL OUTPUTS LOW'}
        </strong>
      </div>
      <svg viewBox="0 0 560 330" role="img" aria-labelledby="circuit-title circuit-desc">
        <title id="circuit-title">Animated 1-to-4 demultiplexer logic circuit</title>
        <desc id="circuit-desc">One data input reaches one of four three-input AND gates according to S1 and S0.</desc>
        <defs>
          <filter id="circuit-glow"><feGaussianBlur stdDeviation="3" /></filter>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10Z" /></marker>
        </defs>

        <g className="circuit-inputs">
          <path d="M28 73H62"/><circle cx="28" cy="73" r="4"/><text x="13" y="77">I</text>
          <path d="M28 113H62"/><circle cx="28" cy="113" r="4"/><text x="7" y="117">S₁</text>
          <path d="M28 153H62"/><circle cx="28" cy="153" r="4"/><text x="7" y="157">S₀</text>
        </g>

        <g className="select-trunks">
          <path d="M62 113H78V113"/><path d="M62 153H78V153"/>
        </g>

        <g className="not-gates">
          <g transform="translate(78 99)"><path d="M0 0H28L42 14 28 28H0Z"/><circle cx="45" cy="14" r="4"/><text x="20" y="18" textAnchor="middle">NOT</text></g>
          <g transform="translate(78 139)"><path d="M0 0H28L42 14 28 28H0Z"/><circle cx="45" cy="14" r="4"/><text x="20" y="18" textAnchor="middle">NOT</text></g>
        </g>

        <g className="gate-buses">
          {andCenters.map((x, i) => <path key={`i-${x}`} d={`M62 73H${x - 32}V221`} className={outputs[i] ? 'active' : ''} />)}
          {andCenters.map((x, i) => {
            const s1Via = i < 2 ? '123' : '113';
            const s1Source = i < 2 ? 123 : 62;
            const s0Via = i % 2 === 0 ? 123 : 62;
            const s1Y = i < 2 ? 113 : 113;
            const s0Y = i % 2 === 0 ? 153 : 153;
            return <g key={`select-${i}`}>
              <path d={`M${s1Source} ${s1Y}H${i < 2 ? x - 32 : x - 32}V235`} className={outputs[i] ? 'active' : ''} />
              <path d={`M${s0Via} ${s0Y}H${x - 32}V249`} className={outputs[i] ? 'active' : ''} />
            </g>;
          })}
        </g>

        <g className="logic-gates">
          {andCenters.map((x, i) => (
            <g key={i} className={outputs[i] ? 'and-gate active' : 'and-gate'}>
              <path d={`M${x - 32} 208H${x + 5}A27 27 0 0 1 ${x + 5} 262H${x - 32}Z`} />
              <text x={x - 12} y="239" textAnchor="middle">AND</text>
              <circle cx={x - 32} cy="221" r="2"/><circle cx={x - 32} cy="235" r="2"/><circle cx={x - 32} cy="249" r="2"/>
              <path className="gate-output" d={`M${x + 32} 235H${x + 62}`} />
              <path className="signal-dash" d={`M${x + 32} 235H${x + 62}`} />
              <text x={x + 14} y="290" textAnchor="middle" className="output-label">{labels[i]}</text>
              <circle cx={x + 62} cy="235" r="5" className="output-node" />
            </g>
          ))}
        </g>

        <g className="active-output-lines">
          {andCenters.map((x, i) => (
            <path key={i} className={outputs[i] ? 'active' : ''} d={`M${x + 62} 235H${i === 0 ? 508 : 508}V${70 + i * 50}H530`} />
          ))}
        </g>

        <g className="output-rooms">
          {outputs.map((active, i) => (
            <g key={i} className={active ? 'room-node active' : 'room-node'} transform={`translate(530 ${50 + i * 50})`}>
              <rect x="0" y="0" width="20" height="20" rx="5" />
              <text x="10" y="14" textAnchor="middle">{i + 1}</text>
            </g>
          ))}
        </g>
      </svg>
      <div className="circuit-legend"><span><i className="legend-line active" /> Active route</span><span><i className="legend-line" /> Inactive</span></div>
    </div>
  );
}
