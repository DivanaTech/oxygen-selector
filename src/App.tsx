import { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DemuxCircuit from './components/demux/Circuit';
import AdvancedLabs, { type ExperimentResult, type SignalSnapshot } from './components/advanced/AdvancedLabs';
import Presentation from './components/advanced/Presentation';
import { calculateOutputs, EQUATIONS, ROOMS } from './constants/demux';
import type { BinaryDigit } from './types';

const ROOM_NAMES = ['Room 1 — ICU', 'Room 2 — Emergency', 'Room 3 — General Ward', 'Room 4 — Recovery'];
const WORKING_STEPS = [
  ['01', 'Input', 'D represents the one digital data input. D = 1 enables routing.'],
  ['02', 'Selection', 'S₁ and S₀ choose one of the four binary addresses.'],
  ['03', 'Routing', 'The DEMUX connects D to only the matching minterm.'],
  ['04', 'Output', 'Y₀–Y₃ correspond to Room 1–Room 4 in this model.'],
  ['05', 'Result', 'D = 1 gives exactly one active output; D = 0 gives none.']
];

export default function App() {
  const [input, setInput] = useState<BinaryDigit>(1);
  const [s1, setS1] = useState<BinaryDigit>(0);
  const [s0, setS0] = useState<BinaryDigit>(0);
  const [history, setHistory] = useState<SignalSnapshot[]>([]);
  const [recording, setRecording] = useState(true);
  const [experiments, setExperiments] = useState<ExperimentResult[]>([]);
  const selectedRoom = s1 * 2 + s0;
  const outputs = calculateOutputs(input, s1, s0);
  const activeOutput = outputs.indexOf(true);
  const inactiveOutputs = outputs.map((active, index) => active ? '' : `Y${index}`).filter(Boolean);
  useEffect(() => {
    if (!recording) return;
    const snapshot = { input, s1, s0, outputs: outputs.map(value => value ? 1 : 0) };
    setHistory(old => [...old.slice(-49), snapshot]);
  }, [input, s1, s0, recording]);
  const s1Calculation = selectedRoom < 2 ? (s1 === 0 ? 1 : 0) : s1;
  const s0Calculation = selectedRoom % 2 === 0 ? (s0 === 0 ? 1 : 0) : s0;

  const selectRoom = (room: number) => {
    setS1(room >= 2 ? 1 : 0);
    setS0(room % 2 as BinaryDigit);
  };

  const reset = () => { setInput(1); setS1(0); setS0(0); };
  const toggleInput = () => setInput(value => value === 1 ? 0 : 1);
  const toggleS1 = () => setS1(value => value === 1 ? 0 : 1);
  const toggleS0 = () => setS0(value => value === 1 ? 0 : 1);

  return <>
    <Header />
    <main>
      <section className="hero" id="overview">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">BIOMEDICAL SYSTEM PROJECT | DIGITAL LOGIC</span>
            <h1>O₂ Oxygen Selector</h1>
            <h2>One Oxygen Tank Supplies Four Rooms Using a 1-to-4 Demultiplexer</h2>
            <p>Explore how a digital demultiplexer selects one of four outputs using two binary selection lines.</p>
            <div className="actions"><a className="btn btn-primary" href="#simulator">Launch Simulator</a><a className="btn btn-secondary" href="#concept">Learn the Concept</a></div>
          </div>
          <div className="hero-art" aria-label="Conceptual oxygen tank and four-room diagram"><div className="tank">O₂</div><div className="hero-demux">1-to-4<br/><b>DEMUX</b></div><div className="hero-rooms"><span>R1</span><span>R2</span><span>R3</span><span>R4</span></div><div className="art-label">CONCEPTUAL SIGNAL-FLOW NETWORK</div></div>
        </div>
      </section>

      <section className="section" id="simulator">
        <div className="wrap">
          <div className="section-head"><div className="kicker">01 · Interactive lab</div><h2>Oxygen routing simulator</h2><p>Room buttons and binary switches share one synchronized DEMUX state.</p></div>
          <div className="simulator">
            <div className="sim-top"><h3>1-to-4 DEMUX control panel</h3><span className="live"><i /> SIMULATION LIVE</span></div>
            <div className="sim-layout">
              <div className="controls">
                <h4>Choose destination room</h4>
                <div className="selector-buttons">
                  {ROOMS.map(room => <button key={room.id} className={`room-select ${selectedRoom === room.id ? 'active' : ''}`} onClick={() => selectRoom(room.id)} aria-pressed={selectedRoom === room.id}><b>Room {room.id + 1}</b><small>{ROOM_NAMES[room.id].split('— ')[1]} · {room.address}</small></button>)}
                </div>

                <div className="switch-bank">
                  <button className="signal-switch" onClick={toggleInput} aria-pressed={input === 1}><span><b>D</b><small>Data input</small></span><i className={input ? 'on' : ''}><em>{input}</em></i></button>
                  <button className="signal-switch" onClick={toggleS1} aria-pressed={s1 === 1}><span><b>S₁</b><small>Select high</small></span><i className={s1 ? 'on' : ''}><em>{s1}</em></i></button>
                  <button className="signal-switch" onClick={toggleS0} aria-pressed={s0 === 1}><span><b>S₀</b><small>Select low</small></span><i className={s0 ? 'on' : ''}><em>{s0}</em></i></button>
                </div>
                <p className="notice">The selected address is {ROOM_NAMES[selectedRoom]}.</p>
              </div>

              <div className="output-area">
                <h4>Gate-level DEMUX</h4>
                <DemuxCircuit outputs={outputs} />
                <div className="network">
                  <div className={`source ${input ? 'enabled' : ''}`}><div className="mini-tank">D<br/><b>{input}</b></div><span>DATA INPUT</span></div>
                  <div className="outputs">
                    {ROOMS.map(room => <div key={room.id} className={`room ${outputs[room.id] ? 'active' : ''} ${selectedRoom === room.id ? 'selected' : ''}`}><span><b>{room.output}</b> · {room.name}</span><span className="status">{outputs[room.id] ? 'ACTIVE' : 'INACTIVE'}</span><i className="flow-dot" /></div>)}
                  </div>
                </div>
                <div className="result"><strong>{activeOutput >= 0 ? `Y${activeOutput} is electrically active → ${ROOM_NAMES[selectedRoom]}` : 'No output is active — D = 0'}</strong><span>S₁S₀ = {s1}{s0}</span></div>
              </div>
            </div>

            <div className="status-grid">
              <section className="status-panel"><h4>SYSTEM STATUS — EDUCATIONAL SIMULATION</h4><dl><div><dt>Input D</dt><dd>{input}</dd></div><div><dt>Select S₁</dt><dd>{s1}</dd></div><div><dt>Select S₀</dt><dd>{s0}</dd></div><div><dt>Selected room</dt><dd>{ROOM_NAMES[selectedRoom]}</dd></div><div><dt>Active output</dt><dd>{activeOutput >= 0 ? `Y${activeOutput}` : 'None'}</dd></div><div><dt>Inactive outputs</dt><dd>{inactiveOutputs.join(', ')}</dd></div><div><dt>Simulation mode</dt><dd>DEMUX Demonstration</dd></div></dl></section>
              <section className="animation-note"><span>CONCEPTUAL DIGITAL SIGNAL FLOW</span><p>This animation represents Boolean signal routing only. It does not model oxygen pressure, concentration, or medical flow rates.</p></section>
            </div>
          </div>
          <p className="small-note">Educational model only: this simulation demonstrates digital logic and is not a medical oxygen-control device.</p>
        </div>
      </section>

      <section className="section" id="concept">
        <div className="wrap">
          <div className="section-head"><div className="kicker">02 · Understand the logic</div><h2>What is a demultiplexer?</h2><p>A demultiplexer takes one data input and directs it to one of several outputs based on select lines.</p></div>
          <div className="cards"><article className="info-card"><div className="info-icon">D</div><h3>One input</h3><p>D is the single data signal entering the 1-to-4 DEMUX.</p></article><article className="info-card"><div className="info-icon">10</div><h3>Two select lines</h3><p>S₁ and S₀ form four addresses: 00, 01, 10 and 11.</p></article><article className="info-card"><div className="info-icon">Y</div><h3>Four outputs</h3><p>Only the address matching Y₀–Y₃ can become active when D = 1.</p></article></div>
        </div>
      </section>

      <section className="section" id="truth-table">
        <div className="wrap">
          <div className="section-head"><div className="kicker">03 · Logic reference</div><h2>Interactive truth table</h2><p>The highlighted row follows the current D, S₁ and S₀ values.</p></div>
          <div className="truth-wrap"><table><thead><tr><th>D</th><th>S₁</th><th>S₀</th><th>Y₀</th><th>Y₁</th><th>Y₂</th><th>Y₃</th><th>Active channel</th></tr></thead><tbody>{[0,1].flatMap(digit => [0,1,2,3].map(index => { const rowS1 = binary(index >= 2); const rowS0 = binary(index % 2); const row=calculateOutputs(binary(digit),rowS1,rowS0); const active=row.indexOf(true); const current=digit===input&&rowS1===s1&&rowS0===s0; return <tr className={current?'current':''} key={`${digit}-${index}`}>{[digit,rowS1,rowS0].map((value,i)=><td key={i}>{value}</td>)}{row.map((on,i)=><td key={i} className={on?'active-output':''}>{on?1:0}</td>)}<td>{active>=0?`Y${active}`:'None'}</td></tr>; }))}</tbody></table></div>
          <p className="callout"><b>Why one output?</b> Each address selects a unique Boolean minterm. When D = 1, exactly one AND gate is true; when D = 0, all gates receive a LOW input and every output is inactive.</p>
        </div>
      </section>

      <section className="section" id="logic">
        <div className="wrap">
          <div className="section-head"><div className="kicker">04 · Boolean algebra</div><h2>DEMUX Boolean Logic</h2><p>Read S₁′ and S₀′ as NOT, and · as AND.</p></div>
          <div className="logic-layout">
            <div className="equations">{EQUATIONS.map((equation,index) => <button key={equation} className={selectedRoom===index?'equation active':'equation'} onClick={() => selectRoom(index)}><span>Y{subscript(index)}</span><code>{equation.replace(/^Y₀ = |^Y₁ = |^Y₂ = |^Y₃ = /,'')}</code><b>{outputs[index]? '1':'0'}</b></button>)}</div>
            <aside className="calculation"><h3>Live calculation</h3><p>Current values: D = {input}, S₁ = {s1}, S₀ = {s0}</p><strong>Y{subscript(selectedRoom)} = {EQUATIONS[selectedRoom].split(' = ')[1]}</strong><div>{input} · {s1Calculation} · {s0Calculation} = {outputs[selectedRoom] ? 1 : 0}</div><p>{outputs[selectedRoom] ? `Output Y${selectedRoom} is active. The other outputs are inactive.` : 'The selected channel is not active because D = 0.'}</p></aside>
          </div>
          <div className="notation"><span><b>D</b> Data input</span><span><b>S₁/S₀</b> Select inputs</span><span><b>′</b> NOT operation</span><span><b>·</b> AND operation</span><span><b>Y₀–Y₃</b> Outputs</span></div>
        </div>
      </section>

      <section className="section working" id="working">
        <div className="wrap"><div className="section-head"><div className="kicker">05 · Working principle</div><h2>How the system works</h2></div><div className="steps">{WORKING_STEPS.map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>
      <AdvancedLabs input={input} s1={s1} s0={s0} outputs={outputs} selectRoom={selectRoom} setInput={setInput} setS1={setS1} setS0={setS0} reset={reset} history={history} clearHistory={() => setHistory([])} recording={recording} setRecording={setRecording} experiments={experiments} setExperiments={setExperiments} />
      <Presentation input={input} s1={s1} s0={s0} outputs={outputs} selectedRoom={selectedRoom} selectRoom={selectRoom} setInput={setInput} reset={reset} />
    </main>
    <Footer />
  </>;
}

function binary(value: boolean | number): BinaryDigit {
  return value === true || value === 1 ? 1 : 0;
}

function subscript(index: number) {
  return ['₀','₁','₂','₃'][index];
}
