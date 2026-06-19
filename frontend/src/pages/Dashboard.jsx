import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchCard from '../components/MatchCard';
import ProfileCard from '../components/ProfileCard';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,600;1,9..144,700&family=Space+Grotesk:wght@500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0f;
    --cream: #f5f0e8;
    --gold: #d4a843;
    --amber: #e8823a;
    --teal: #2ec4b6;
    --violet: #7c3aed;
    --font-sans: 'Plus Jakarta Sans', sans-serif;
    --font-display: 'Fraunces', serif;
    --font-tech-head: 'Space Grotesk', sans-serif;
  }

  body { background: var(--ink); font-family: var(--font-sans); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  .dashboard-page { position: relative; min-height: 100vh; color: var(--cream); padding-bottom: 5rem; }

  /* Premium Background - Consistent with Profile */
  .bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: var(--ink); }
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.22; animation: drift linear infinite; }
  .orb-1 { width:600px;height:600px; background:radial-gradient(circle,#7c3aed,transparent 70%); top:-10%;left:-5%; animation-duration:25s; }
  .orb-2 { width:500px;height:500px; background:radial-gradient(circle,#2ec4b6,transparent 70%); bottom:-10%;right:-5%; animation-duration:20s; }
  @keyframes drift { 0%, 100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,20px) scale(1.1)} }
  .grid-overlay { position:absolute;inset:0; background-image:linear-gradient(rgba(245,240,232,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,0.02) 1px,transparent 1px); background-size:60px 60px; }
  .noise { position:absolute;inset:0;opacity:0.04; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size:200px 200px; }

  /* Dashboard Layout Containers */
  .main-content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 8rem 2rem 2rem; }
  
  .dashboard-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3.5rem; border-bottom: 1px solid rgba(245,240,232,0.06); padding-bottom: 2rem; }
  .header-text h1 { font-family: var(--font-display); font-size: 2.8rem; font-weight: 700; color: var(--cream); letter-spacing: -0.02em; }
  .header-text p { color: rgba(245,240,232,0.4); font-size: 1rem; margin-top: 0.3rem; }
  .header-text p em { font-family: var(--font-display); font-style: italic; color: var(--gold); }

  /* Bento Grid - Parity with Profile.jsx */
  .dashboard-bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; width: 100%; text-align: left; }
  .dash-card { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.06); border-radius: 28px; padding: 2.2rem; position: relative; overflow: hidden; transition: all 0.3s ease; }
  .dash-card:hover { border-color: rgba(245,240,232,0.15); background: rgba(245,240,232,0.03); transform: translateY(-2px); }
  
  .card-label { font-family: var(--font-tech-head); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--teal); margin-bottom: 1.5rem; display: inline-block; }

  /* Grid Columns */
  .col-8 { grid-column: span 8; }
  .col-4 { grid-column: span 4; }
  .col-12 { grid-column: span 12; }

  /* Custom Stats Content */
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem; }
  .stat-item { display: flex; flex-direction: column; }
  .stat-value { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; color: var(--gold); }
  .stat-name { font-size: 0.75rem; color: rgba(245,240,232,0.3); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }

  /* Active Project Visual */
  .active-project { display: flex; align-items: center; gap: 1.5rem; margin-top: 0.5rem; }
  .project-icon { width: 56px; height: 56px; border-radius: 16px; background: rgba(212,168,67,0.1); border: 1px solid rgba(212,168,67,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
  .project-info h3 { font-family: var(--font-display); font-size: 1.3rem; color: var(--cream); }
  .project-info p { color: rgba(245,240,232,0.4); font-size: 0.88rem; margin-top: 0.2rem; }

  .btn-action { background: linear-gradient(135deg, var(--gold), var(--amber)); color: var(--ink); border: none; padding: 0.6rem 1.4rem; border-radius: 100px; font-weight: 700; font-size: 0.82rem; cursor: pointer; margin-top: 1.5rem; transition: 0.2s; }
  .btn-action:hover { box-shadow: 0 4px 20px rgba(212,168,67,0.3); transform: scale(1.02); }

  @media (max-width: 850px) {
    .col-8, .col-4 { grid-column: span 12; }
    .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
  }
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState("Builder");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setActiveUser(storedName);
    }
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* Global Visual Canvas */}
      <div className="bg-canvas">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-overlay" />
        <div className="noise" />
      </div>

      <div className="dashboard-page">
        <main className="main-content">
          <header className="dashboard-header">
            <div className="header-text">
              <h1>Console Center</h1>
              <p>Welcome back, <em>{activeUser}.</em> Structural nodes are stable.</p>
            </div>
            <button className="btn-action" onClick={() => navigate('/find-team')} style={{ marginTop: 0 }}>Find New Squad ✦</button>
          </header>

          <div className="dashboard-bento">
            
            {/* Main Active Project Block */}
            <div className="dash-card col-8">
              <span className="card-label">Active Synchronization</span>
              <div className="active-project">
                <div className="project-icon">🚀</div>
                <div className="project-info">
                  <h3>Neural Network Visualizer</h3>
                  <p>Hackathon: ETHIndia 2026 • 48h remaining</p>
                </div>
              </div>
              <p style={{ marginTop: '1.5rem', color: 'rgba(245,240,232,0.6)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Currently building a decentralized GPU sharing layer for local LLMs. Team is in full momentum.
              </p>
              <button className="btn-action">Open Project Workspace</button>
            </div>

            {/* User Stats Block */}
            <div className="dash-card col-4">
              <span className="card-label" style={{ color: 'var(--gold)' }}>Performance Index</span>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">12</span>
                  <span className="stat-name">Teams Formed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">04</span>
                  <span className="stat-name">Hack Wins</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">850</span>
                  <span className="stat-name">Rep Score</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">08</span>
                  <span className="stat-name">Top Stacks</span>
                </div>
              </div>
            </div>

            {/* Alignment Proposal / Incoming Synergy Inbox */}
            <div className="dash-card col-12">
              <span className="card-label" style={{ color: 'var(--violet)' }}>Synergy Inbox</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '0.5rem' }}>
                <MatchCard teamName="Varanasi Tech Labs" status="Invited You" />
                <MatchCard teamName="AgriTech GPU Cloud" status="Proposal Sent" />
                <MatchCard teamName="CyberSec Node X" status="Match Ready" />
              </div>
            </div>

            {/* Recommended Connections Matrix */}
            <div className="dash-card col-12">
              <span className="card-label">Recommended Nodes</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                <ProfileCard 
                  name="Siddharth" 
                  role="UI/UX Visual Architect" 
                  skills={['Figma', 'Tailwind', 'Motion Design']} 
                />
                <ProfileCard 
                  name="Aman" 
                  role="AI & Prompt Engineer" 
                  skills={['Python', 'FastAPI', 'Vapi AI']} 
                />
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}