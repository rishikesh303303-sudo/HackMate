import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=300;400;500;600;700&family=Fraunces:ital,opsz,wght=0,9..144,700;1,9..144,600;1,9..144,700&family=Space+Grotesk:wght=500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0f;
    --cream: #f5f0e8;
    --gold: #d4a843;
    --amber: #e8823a;
    --teal: #2ec4b6;
    --violet: #7c3aed;
    --rose: #e84393;
    
    /* Ultra-Premium Typographic Scale */
    --font-sans: 'Plus Jakarta Sans', sans-serif;
    --font-display: 'Fraunces', serif;
    --font-tech-head: 'Space Grotesk', sans-serif;
  }

  body { background: var(--ink); font-family: var(--font-sans); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  .landing { position: relative; min-height: 100vh; color: var(--cream); }

  /* BG */
  .bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: var(--ink); }
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35; animation: drift linear infinite; }
  .orb-1 { width:600px;height:600px; background:radial-gradient(circle,#7c3aed,transparent 70%); top:-10%;left:-10%; animation-duration:22s; }
  .orb-2 { width:500px;height:500px; background:radial-gradient(circle,#e8823a,transparent 70%); top:30%;right:-8%; animation-duration:18s;animation-delay:-6s; }
  .orb-3 { width:400px;height:400px; background:radial-gradient(circle,#2ec4b6,transparent 70%); bottom:10%;left:20%; animation-duration:26s;animation-delay:-12s; }
  .orb-4 { width:300px;height:300px; background:radial-gradient(circle,#e84393,transparent 70%); top:60%;left:50%; animation-duration:20s;animation-delay:-3s; }
  @keyframes drift { 0%{transform:translate(0,0) scale(1)} 25%{transform:translate(40px,-60px) scale(1.08)} 50%{transform:translate(-30px,40px) scale(0.95)} 75%{transform:translate(60px,20px) scale(1.05)} 100%{transform:translate(0,0) scale(1)} }
  .grid-overlay { position:absolute;inset:0; background-image:linear-gradient(rgba(245,240,232,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,0.03) 1px,transparent 1px); background-size:60px 60px; }
  .noise { position:absolute;inset:0;opacity:0.04; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:200px 200px; }

  /* NAVBAR REDESIGN */
  .navbar { position:fixed;top:0;left:0;right:0;z-index:100; display:flex;align-items:center;justify-content:space-between; padding:1.2rem 4rem; backdrop-filter:blur(24px); border-bottom:1px solid rgba(245,240,232,0.05); background:rgba(10,10,15,0.6); }
  .nav-logo { font-family: var(--font-display); font-weight:700; font-size:1.6rem; letter-spacing:-0.02em; background: linear-gradient(135deg, var(--cream) 30%, var(--gold) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .nav-right { display:flex;align-items:center;gap:1.2rem; }
  .nav-cta { background: transparent; color: var(--cream); border: 1px solid rgba(245,240,232,0.2); cursor:pointer; padding:0.65rem 1.6rem; border-radius:100px; font-family: var(--font-sans); font-size:0.85rem; font-weight:600; letter-spacing:0.02em; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); background-image: linear-gradient(rgba(245,240,232,0.03), rgba(245,240,232,0.01)); }
  .nav-cta:hover { color: var(--ink); background: var(--cream); border-color: var(--cream); box-shadow: 0 4px 24px rgba(245,240,232,0.15); transform: translateY(-1px); }

  /* HAMBURGER */
  .hamburger { width:40px;height:40px;border-radius:50%;border:1px solid rgba(245,240,232,0.1); background:rgba(245,240,232,0.03); backdrop-filter:blur(12px); cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px; transition: all 0.2s; }
  .hamburger:hover { border-color:rgba(245,240,232,0.25); background:rgba(245,240,232,0.08); }
  .hb-line { width:14px;height:1.5px;background:rgba(245,240,232,0.85);border-radius:2px; transition:transform 0.38s cubic-bezier(0.4,0,0.2,1),opacity 0.25s,width 0.3s; transform-origin:center; }
  .hamburger.open .hb-line:nth-child(1) { transform:translateY(5.5px) rotate(45deg); }
  .hamburger.open .hb-line:nth-child(2) { opacity:0;transform:scaleX(0); }
  .hamburger.open .hb-line:nth-child(3) { transform:translateY(-5.5px) rotate(-45deg); }

  /* SLIDE PANEL */
  .panel-overlay { position:fixed;inset:0;z-index:98;background:rgba(0,0,0,0.55);backdrop-filter:blur(6px); opacity:0;pointer-events:none;transition:opacity 0.4s; }
  .panel-overlay.open { opacity:1;pointer-events:all; }
  .menu-panel { position:fixed;top:0;right:0;bottom:0;width:340px;z-index:99; background:rgba(9,9,14,0.98);backdrop-filter:blur(40px); border-left:1px solid rgba(245,240,232,0.07); transform:translateX(100%);transition:transform 0.52s cubic-bezier(0.4,0,0.2,1); display:flex;flex-direction:column;justify-content:center;padding:2.5rem 2rem; }
  .menu-panel.open { transform:translateX(0); }

  .menu-label { font-family: var(--font-sans);font-size:0.65rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.18);margin-bottom:2.5rem;padding-left:0.25rem; }

  .menu-item { display:flex;align-items:center;gap:1.1rem; padding:1.5rem 0;border-bottom:1px solid rgba(245,240,232,0.05); text-decoration:none;cursor:pointer;position:relative;overflow:hidden; transform:translateX(50px);opacity:0;transition:transform 0.5s cubic-bezier(0.4,0,0.2,1),opacity 0.5s; }
  .menu-panel.open .menu-item:nth-child(2) { transform:translateX(0);opacity:1;transition-delay:0.1s; }
  .menu-panel.open .menu-item:nth-child(3) { transform:translateX(0);opacity:1;transition-delay:0.18s; }
  .menu-item:last-child { border-bottom:none; }

  .menu-icon-wrap { width:46px;height:46px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.15rem;flex-shrink:0;border:1px solid rgba(245,240,232,0.07);background:rgba(245,240,232,0.03);transition:border-color 0.2s,background 0.2s; }
  .menu-item:hover .menu-icon-wrap { border-color:rgba(245,240,232,0.14);background:rgba(245,240,232,0.06); }
  .menu-item-body { flex:1;min-width:0; }
  .menu-item-title { font-family: var(--font-display);font-weight:700;font-size:1.1rem;letter-spacing:-0.01em;color:var(--cream);margin-bottom:0.2rem;display:block;transition:background 0.2s; }
  .menu-panel.open .menu-item:hover .menu-item-title { background:linear-gradient(90deg,var(--gold),var(--amber)); -webkit-background-clip:text;-webkit-text-fill-color:transparent; }
  .menu-item-desc { font-family: var(--font-sans);font-size:0.72rem;color:rgba(245,240,232,0.28);font-weight:400;letter-spacing:0.01em; }
  .menu-arrow { color:rgba(245,240,232,0.2);font-size:0.9rem;opacity:0;transform:translateX(-6px);transition:opacity 0.2s,transform 0.2s; }
  .menu-item:hover .menu-arrow { opacity:1;transform:translateX(0); }

  /* HERO & HEADINGS NO-OVERLAP FIX */
  .hero { position:relative;z-index:1;min-height:100vh; display:flex;flex-direction:column;align-items:center;justify-content:center; padding:9rem 2rem 4rem;text-align:center; }
  .badge { display:inline-flex;align-items:center;gap:0.5rem; background:rgba(212,168,67,0.08);border:1px solid rgba(212,168,67,0.2); color:var(--gold);border-radius:100px;padding:0.4rem 1.2rem; font-family: var(--font-sans);font-size:0.72rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase; margin-bottom:2.5rem; animation:fadeUp 0.6s ease both; }
  .badge-dot { width:6px;height:6px;background:var(--gold);border-radius:50%;animation:pulse 2s ease infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }

  .hero-title { font-family: var(--font-display); font-weight:700; font-size:clamp(2.8rem, 6.5vw, 5.2rem); line-height:1.15; letter-spacing:-0.02em; margin-bottom:1.5rem; animation:fadeUp 0.6s 0.1s ease both; }
  .hero-title .line-1 { display:block;color:var(--cream); margin-bottom: 0.2rem; }
  .hero-title .line-2 { display:block; background:linear-gradient(135deg,var(--gold) 0%,var(--amber) 50%,var(--rose) 100%); -webkit-background-clip:text;-webkit-text-fill-color:transparent; padding-bottom: 0.4rem; }
  .hero-title .line-italic { display:block; font-family: var(--font-display); font-style:italic; font-weight:400; font-size:clamp(2.4rem, 5.5vw, 4.5rem); color:var(--teal); letter-spacing:-0.01em; margin-top: 0.4rem; }

  .hero-sub { max-width:540px;color:rgba(245,240,232,0.5);font-size:1.05rem; line-height:1.7;margin-top:1rem;margin-bottom:3rem;font-weight:400;font-family: var(--font-sans); animation:fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display:flex;gap:1rem;flex-wrap:wrap;justify-content:center; animation:fadeUp 0.6s 0.3s ease both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  
  .btn-primary { display:inline-flex;align-items:center;gap:0.5rem; background:linear-gradient(135deg,var(--gold),var(--amber)); color:var(--ink);border:none;cursor:pointer; padding:0.85rem 2rem;border-radius:100px; font-family: var(--font-sans);font-size:0.9rem;font-weight:700;letter-spacing:0.01em; transition:all 0.2s; box-shadow:0 4px 24px rgba(212,168,67,0.2); }
  .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 32px rgba(212,168,67,0.35); }
  .btn-secondary { display:inline-flex;align-items:center;gap:0.5rem; background:transparent;color:var(--cream); border:1px solid rgba(245,240,232,0.15);cursor:pointer; padding:0.85rem 2rem;border-radius:100px; font-family: var(--font-sans);font-size:0.9rem;font-weight:500; transition:border-color 0.2s,background 0.2s; }
  .btn-secondary:hover { border-color:rgba(245,240,232,0.4);background:rgba(245,240,232,0.04); }

  /* MARQUEE */
  .marquee-wrap { position:relative;z-index:1; border-top:1px solid rgba(245,240,232,0.06); border-bottom:1px solid rgba(245,240,232,0.06); overflow:hidden;padding:1.2rem 0; background:rgba(245,240,232,0.01); }
  .marquee-track { display:flex;gap:3rem;animation:marquee 22s linear infinite;width:max-content; }
  .marquee-track:hover { animation-play-state:paused; }
  .marquee-item { display:flex;align-items:center;gap:0.5rem; color:rgba(245,240,232,0.3);font-size:0.85rem; font-family: var(--font-tech-head);font-weight:700;letter-spacing:0.04em;white-space:nowrap; }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* SECTION & HEADING ALIGNMENT FIX */
  .section { position:relative;z-index:1;padding:7rem 2rem;max-width:1100px;margin:0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; }
  .section-label { font-family: var(--font-sans);font-size:0.72rem;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--teal);margin-bottom:1rem; }
  .section-title { font-family: var(--font-display);font-weight:700; font-size:clamp(2.2rem,4.5vw,3.5rem);line-height:1.2; letter-spacing:-0.02em;color:var(--cream);margin-bottom:1rem; text-align: center; width: 100%; }
  .section-title em { font-family: var(--font-display);font-style:italic;font-weight:400;font-size:1.05em; color: var(--gold); display: block; text-align: center; }
  .section-sub { color:rgba(245,240,232,0.4);font-size:0.95rem;line-height:1.65;max-width:500px;font-weight:400; text-align: center; margin: 0 auto; }

  /* STEPS */
  .steps-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5px;margin-top:4rem; border:1.5px solid rgba(245,240,232,0.06);border-radius:24px;overflow:hidden; width: 100%; }
  .step-card { background:rgba(245,240,232,0.02);padding:2.5rem 2rem; border-right:1.5px solid rgba(245,240,232,0.06); transition:background 0.3s;position:relative;overflow:hidden; text-align: left; }
  .step-card:last-child { border-right:none; }
  .step-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px; background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease; }
  .step-card:hover { background:rgba(245,240,232,0.04); }
  .step-card:hover::before { transform:scaleX(1); }
  .step-number { font-family: var(--font-display);font-size:4.5rem;font-weight:400;font-style:italic;line-height:1;opacity:0.07;margin-bottom:1.2rem;color:var(--cream); }
  .step-icon { font-size:1.8rem;margin-bottom:1rem; }
  .step-title { font-family: var(--font-sans);font-weight:700;font-size:1.1rem;color:var(--cream);margin-bottom:0.6rem;letter-spacing:-0.01em; }
  .step-desc { color:rgba(245,240,232,0.4);font-size:0.88rem;line-height:1.7;font-weight:400; }

  /* BENTO GRID SPACE SYNC */
  .bento { display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:180px;gap:16px;margin-top:3rem; width:100%; text-align: left; }
  .bento-card { background:rgba(245,240,232,0.02);border:1px solid rgba(245,240,232,0.06); border-radius:20px;padding:1.8rem;position:relative;overflow:hidden; transition:border-color 0.3s,transform 0.3s;cursor:default; }
  .bento-card:hover { border-color:rgba(245,240,232,0.15);transform:translateY(-2px); }
  .bento-card::after { content:'';position:absolute;inset:0;border-radius:20px; background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.04) 0%,transparent 60%);pointer-events:none; }
  .bc-wide { grid-column:span 7; }
  .bc-narrow { grid-column:span 5; }
  .bc-third { grid-column:span 4; }
  .bento-tag { display:inline-block;font-family: var(--font-tech-head);font-size:0.66rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase; padding:0.25rem 0.6rem;border-radius:6px;margin-bottom:1rem; }
  .bento-title { font-family: var(--font-sans);font-weight:700;font-size:1.2rem;color:var(--cream);letter-spacing:-0.01em;margin-bottom:0.5rem;line-height:1.2; }
  .bento-desc { color:rgba(245,240,232,0.35);font-size:0.85rem;line-height:1.65;font-weight:400; }
  .bento-visual { position:absolute;right:1.5rem;bottom:1.5rem;font-size:3rem;opacity:0.12; }

  /* SKILLS */
  .skills-cloud { display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:2.5rem; justify-content: center; width: 100%; }
  .skill-tag { padding:0.45rem 1.1rem;border-radius:100px;font-family: var(--font-sans);font-size:0.8rem;font-weight:500;letter-spacing:0.01em;border:1px solid;transition:transform 0.2s; }
  .skill-tag:hover { transform:translateY(-2px); }

  /* TESTIMONIALS */
  .testimonials { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:3rem; width: 100%; text-align: left; }
  .tcard { background:rgba(245,240,232,0.02);border:1px solid rgba(245,240,232,0.06);border-radius:20px;padding:1.8rem;transition:border-color 0.3s; }
  .tcard:hover { border-color:rgba(245,240,232,0.14); }
  .tcard-quote { font-family: var(--font-display);font-style:italic;color:rgba(245,240,232,0.75);font-size:1.1rem;line-height:1.65;margin-bottom:1.2rem;font-weight:400; }
  .tcard-author { display:flex;align-items:center;gap:0.8rem; }
  .tcard-avatar { width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:700;font-family: var(--font-sans); }
  .tcard-name { font-family: var(--font-sans);font-weight:700;font-size:0.85rem;color:var(--cream); }
  .tcard-role { font-family: var(--font-sans);color:rgba(245,240,232,0.3);font-size:0.75rem;font-weight:400; }

  /* CTA */
  .cta-section { position:relative;z-index:1;padding:6rem 2rem;text-align:center;overflow:hidden; width: 100%; }
  .cta-inner { max-width:700px;margin:0 auto; background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(232,67,147,0.1),rgba(232,130,58,0.12)); border:1px solid rgba(245,240,232,0.1);border-radius:32px;padding:5rem 3rem;position:relative;overflow:hidden; }
  .cta-inner::before { content:'';position:absolute;inset:-2px;border-radius:33px; background:linear-gradient(135deg,rgba(124,58,237,0.4),rgba(232,67,147,0.3),rgba(212,168,67,0.4)); z-index:-1;opacity:0.5; }
  .cta-title { font-family: var(--font-display);font-weight:700;font-size:clamp(2rem,5vw,3.2rem); line-height:1.15;letter-spacing:-0.01em;margin-bottom:0.8rem; background:linear-gradient(135deg,var(--cream),var(--gold)); -webkit-background-clip:text;-webkit-text-fill-color:transparent; text-align: center; }
  .cta-title em { font-family: var(--font-display);font-style:italic;font-weight:400; }
  .cta-sub { font-family: var(--font-sans);color:rgba(245,240,232,0.45);font-size:0.95rem;margin-bottom:2.5rem;font-weight:400;line-height:1.7; text-align: center; }

  /* FOOTER */
  .footer { position:relative;z-index:1;border-top:1px solid rgba(245,240,232,0.06);padding:2.5rem 4rem; display:flex;align-items:center;justify-content:space-between;color:rgba(245,240,232,0.2);font-size:0.82rem;font-family: var(--font-sans);font-weight:400; width: 100%; text-align: left; }
  .footer a { color:rgba(245,240,232,0.2);text-decoration:none; transition: color 0.2s; }
  .footer a:hover { color: rgba(245,240,232,0.5); }
  .footer-links { display:flex;gap:1.5rem; }
`;

const steps = [
  { n: '01', icon: '🎯', title: 'Build Your Profile', desc: "Showcase your skills, past hackathons, and what you're looking to build next.", accent: '#7c3aed' },
  { n: '02', icon: '🔍', title: 'Discover Builders', desc: 'Filter by skills, timezone, experience level, and the kind of hacker you need.', accent: '#2ec4b6' },
  { n: '03', icon: '⚡', title: 'Match & Connect', desc: 'One tap to request, instant chat to align — form your dream team in minutes.', accent: '#d4a843' },
  { n: '04', icon: '🚀', title: 'Ship Together', desc: 'Coordinate inside HackMate — deadlines, ideas, and momentum in one place.', accent: '#e84393' },
];

const skills = [
  { label: 'React / Next.js', color: '#61dafb', bg: 'rgba(97,218,251,0.08)' },
  { label: 'ML / AI', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  { label: 'Solidity / Web3', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
  { label: 'UI/UX Design', color: '#e84393', bg: 'rgba(232,67,147,0.08)' },
  { label: 'Python', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
  { label: 'Go / Rust', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
  { label: 'DevOps', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)' },
  { label: 'Flutter', color: '#f472b6', bg: 'rgba(244,114,182,0.08)' },
  { label: 'Figma', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
  { label: 'Data Science', color: '#2ec4b6', bg: 'rgba(46,196,182,0.08)' },
  { label: 'Game Dev', color: '#fb923c', bg: 'rgba(251,146,60,0.08)' },
  { label: 'Backend / APIs', color: '#d4a843', bg: 'rgba(212,168,67,0.08)' },
];

const testimonials = [
  { quote: "Found my co-founder through HackMate at ETHIndia. We shipped in 24h and won 2nd place.", name: 'Arjun M.', role: 'Full Stack Dev', color: '#7c3aed', bg: 'rgba(124,58,237,0.2)' },
  { quote: "As a designer, I always struggled to find devs who care about UI. HackMate filtered perfectly.", name: 'Priya S.', role: 'Product Designer', color: '#e84393', bg: 'rgba(232,67,147,0.2)' },
  { quote: "Built a team of 4 across 3 countries in under an hour. The timezone filter alone is worth it.", name: 'Rahul K.', role: 'ML Engineer', color: '#2ec4b6', bg: 'rgba(46,196,182,0.2)' },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cards = document.querySelectorAll('.bento-card');
    const handlers = [];
    cards.forEach(card => {
      const fn = (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
      };
      card.addEventListener('mousemove', fn);
      handlers.push({ card, fn });
    });
    return () => handlers.forEach(({ card, fn }) => card.removeEventListener('mousemove', fn));
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* Background */}
      <div className="bg-canvas">
        <div className="orb orb-1" /><div className="orb orb-2" />
        <div className="orb orb-3" /><div className="orb orb-4" />
        <div className="grid-overlay" /><div className="noise" />
      </div>

      {/* Menu overlay */}
      <div className={`panel-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Slide panel */}
      <div className={`menu-panel${menuOpen ? ' open' : ''}`}>
        <div className="menu-label">Navigation</div>
        
        {/* 1. Hackathons Option */}
        <div className="menu-item" onClick={() => { setMenuOpen(false); navigate('/hackathons'); }}>
          <div className="menu-icon-wrap">🏆</div>
          <div className="menu-item-body">
            <span className="menu-item-title">Hackathons</span>
            <span className="menu-item-desc">Explore active ecosystem timelines</span>
          </div>
          <span className="menu-arrow">→</span>
        </div>

        {/* 2. Get Started Option */}
        <div className="menu-item" onClick={() => { setMenuOpen(false); navigate('/auth'); }}>
          <div className="menu-icon-wrap">⚡</div>
          <div className="menu-item-body">
            <span className="menu-item-title">Get Started</span>
            <span className="menu-item-desc">Join the algorithmic matchmaking cluster node</span>
          </div>
          <span className="menu-arrow">→</span>
        </div>
      </div>

      <div className="landing">
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-logo">HackMate</div>
          <div className="nav-right">
            {/* 🎯 Hackathons, Notifications, and Profile Node elements completely replaced with clean Auth redirect CTA */}
            <button className="nav-cta" onClick={() => navigate('/auth')}>Get Started</button>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
            >
              <span className="hb-line" />
              <span className="hb-line" />
              <span className="hb-line" />
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="badge"><span className="badge-dot" />Open to all hackathon builders</div>

          <h1 className="hero-title">
            <span className="line-1">Find Your</span>
            <span className="line-2">Dream Team</span>
            <span className="line-italic">Ship Faster.</span>
          </h1>

          <p className="hero-sub">
            HackMate connects you with the right builders — designers, devs, and dreamers — before the clock starts ticking.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/auth')}>Build My Profile ✦</button>
            <button className="btn-secondary" onClick={() => navigate('/auth')}>Explore Teams →</button>
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[
              '⚡ ETHIndia', '🏆 Smart India Hackathon', '🚀 Hack The North', '🎯 HackMIT',
              '🌐 MLH Fellowship', '💡 AngelHack', '🔥 Buildspace', '🌟 DoraHacks',
              '⚡ ETHIndia', '🏆 Smart India Hackathon', '🚀 Hack The North', '🎯 HackMIT',
              '🌐 MLH Fellowship', '💡 AngelHack', '🔥 Buildspace', '🌟 DoraHacks'
            ].map((item, i) => (
              <div key={i} className="marquee-item">{item}</div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <section className="section" id="how">
          <div className="section-label">How it works</div>
          <h2 className="section-title">From solo to squad<br /><em>in minutes.</em></h2>
          <p className="section-sub">No awkward Discords. No cold DMs. Just smart matching built for hackers.</p>
          <div className="steps-grid">
            {steps.map(s => (
              <div key={s.n} className="step-card" style={{ '--accent': s.accent }}>
                <div className="step-number">{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bento Features */}
        <section className="section" id="features">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything you need<br /><em>to win.</em></h2>
          <div className="bento">
            <div className="bento-card bc-wide" style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(232,67,147,0.08))' }}>
              <span className="bento-tag" style={{ background: 'rgba(124,58,237,0.2)', color: '#c4b5fd' }}>Match Engine</span>
              <div className="bento-title">AI-powered skill matching</div>
              <div className="bento-desc">We analyze your tech stack, goals, and working style to find the perfect teammates.</div>
              <div className="bento-visual">🤖</div>
            </div>
            <div className="bento-card bc-narrow" style={{ background: 'rgba(46,196,182,0.06)' }}>
              <span className="bento-tag" style={{ background: 'rgba(46,196,182,0.2)', color: '#5eead4' }}>Live</span>
              <div className="bento-title">Real-time availability</div>
              <div className="bento-desc">See who's actively looking right now.</div>
              <div className="bento-visual">🟢</div>
            </div>
            <div className="bento-card bc-third" style={{ background: 'rgba(232,130,58,0.06)' }}>
              <span className="bento-tag" style={{ background: 'rgba(232,130,58,0.2)', color: '#fdba74' }}>Global</span>
              <div className="bento-title">Timezone filter</div>
              <div className="bento-desc">Find collaborators in your hours.</div>
              <div className="bento-visual">🌍</div>
            </div>
            <div className="bento-card bc-third" style={{ background: 'rgba(232,67,147,0.06)' }}>
              <span className="bento-tag" style={{ background: 'rgba(232,67,147,0.2)', color: '#f9a8d4' }}>Fast</span>
              <div className="bento-title">1-tap request</div>
              <div className="bento-desc">Send a team invite in seconds.</div>
              <div className="bento-visual">⚡</div>
            </div>
            <div className="bento-card bc-third" style={{ background: 'rgba(212,168,67,0.06)' }}>
              <span className="bento-tag" style={{ background: 'rgba(212,168,67,0.2)', color: '#fcd34d' }}>Free</span>
              <div className="bento-title">Always free</div>
              <div className="bento-desc">Zero cost for hackers, forever.</div>
              <div className="bento-visual">✨</div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section">
          <div className="section-label">Community</div>
          <h2 className="section-title">Every stack.<br /><em>Every role.</em></h2>
          <p className="section-sub">From solidity to swift — your tribe is here.</p>
          <div className="skills-cloud">
            {skills.map(s => (
              <span key={s.label} className="skill-tag" style={{ color: s.color, background: s.bg, borderColor: s.color + '40' }}>{s.label}</span>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" id="community">
          <div className="section-label">Stories</div>
          <h2 className="section-title">Teams that <em>shipped.</em></h2>
          <div className="testimonials">
            {testimonials.map(t => (
              <div key={t.name} className="tcard">
                <p className="tcard-quote">"{t.quote}"</p>
                <div className="tcard-author">
                  <div className="tcard-avatar" style={{ background: t.bg, color: t.color }}>{t.name[0]}</div>
                  <div>
                    <div className="tcard-name">{t.name}</div>
                    <div className="tcard-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-inner">
            <h2 className="cta-title">Your next win<br />starts with the<br /><em>right team.</em></h2>
            <p className="cta-sub">Join thousands of hackers who found their teammates on HackMate.</p>
            <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem' }} onClick={() => navigate('/auth')}>Create Free Profile ✦</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: '1.4rem', background: 'linear-gradient(135deg,var(--cream) 30%,var(--gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HackMate</div>
          <div>Built for builders. © 2026</div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </footer>
      </div>
    </>
  );
}