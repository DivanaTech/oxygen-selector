import { useState } from 'react';

const questions = [
 { text:'How many data input lines does a 1-to-4 demultiplexer have?', options:['One','Two','Four','Eight'], answer:0 },
 { text:'How many selection lines are needed to choose four outputs?', options:['1','2','3','4'], answer:1 },
 { text:'If I = 1, S1 = 1, and S0 = 0, which output becomes HIGH?', options:['Y₀','Y₁','Y₂','Y₃'], answer:2 },
 { text:'Which expression describes Y₃?', options:['I·S̅₁·S̅₀','I·S̅₁·S₀','I·S₁·S̅₀','I·S₁·S₀'], answer:3 },
 { text:'What happens to all outputs when I = 0?', options:['All become HIGH','Only Y₃ becomes HIGH','All become LOW','The address is ignored'], answer:2 }
];

export default function Quiz() {
 const [index,setIndex]=useState(0), [selected,setSelected]=useState<number|null>(null), [submitted,setSubmitted]=useState(false), [score,setScore]=useState(0);
 const question=questions[index];
 function submit(){ if(selected===null)return; setSubmitted(true); if(selected===question.answer)setScore(v=>v+1); }
 function next(){ setIndex(index+1); setSelected(null); setSubmitted(false); }
 function restart(){ setIndex(0); setSelected(null); setSubmitted(false); setScore(0); }
 if(index>=questions.length) return <section className="section knowledge" id="knowledge"><div className="knowledge-layout"><div className="knowledge-heading"><p className="eyebrow">Knowledge Check</p><h2>Test the Logic</h2></div><div className="quiz result"><strong>{score}/5</strong><h3>{score===5?'Perfect result':score>=3?'Good understanding':'Review the circuit'}</h3><p>You answered {score} of 5 questions correctly.</p><button className="button primary" onClick={restart}>Restart Quiz</button></div></div></section>;
 return <section className="section knowledge" id="knowledge"><div className="knowledge-layout"><div className="knowledge-heading"><p className="eyebrow">Knowledge Check</p><h2>Test the Logic</h2><p>Five questions about demultiplexers and binary routing.</p></div><div className="quiz"><div className="quiz-progress"><span>Question {index+1} of 5</span><div><i style={{width:`${((index+1)/5)*100}%`}} /></div></div><h3>{question.text}</h3><div className="answer-options">{question.options.map((option,i)=><button disabled={submitted} className={`answer-option ${selected===i?'selected':''} ${submitted&&i===question.answer?'correct':''} ${submitted&&selected===i&&i!==question.answer?'incorrect':''}`} onClick={()=>setSelected(i)} key={option}>{option}</button>)}</div>{submitted&&<p className={selected===question.answer?'quiz-feedback correct':'quiz-feedback incorrect'}>{selected===question.answer?'Correct.':`Not quite. The correct answer is ${question.options[question.answer]}.`}</p>}<div className="quiz-buttons"><button className="button primary" disabled={selected===null||submitted} onClick={submit}>Submit Answer</button><button className="button text-button" disabled={!submitted} onClick={next}>Next Question →</button></div></div></div></section>;
}
