import { useEffect, useState } from 'react';

export default function Header() {
  const [dark, setDark] = useState(() => localStorage.getItem('oxygen-theme') === 'dark');
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('oxygen-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return <header className="topbar"><div className="wrap nav"><a className="brand" href="#overview" style={{ textDecoration:'none', color:'inherit' }}><span className="brand-icon">O₂</span><span>Oxygen Selector</span></a><nav className="navlinks" aria-label="Main navigation"><a href="#simulator">Simulator</a><a href="#hardware">Hardware Lab</a><a href="#experiments">Experiments</a><a href="#analyzer">Analyzer</a><a href="#report">Report</a></nav><button className="mode" onClick={() => setDark(value => !value)} aria-label="Toggle dark mode">{dark ? '☀ Light' : '☾ Theme'}</button></div></header>;
}
