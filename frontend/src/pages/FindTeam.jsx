import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

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
  .match-matrix-page { position: relative; min-height: 100vh; color: var(--cream); padding-bottom: 5rem; }

  .bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: var(--ink); }
  .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.18; animation: drift linear infinite; }
  .orb-1 { width:650px;height:650px; background:radial-gradient(circle, var(--teal), transparent 70%); top:-15%;right:-10%; animation-duration:28s; }
  .orb-2 { width:550px;height:550px; background:radial-gradient(circle, var(--violet), transparent 70%); bottom:-12%;left:-5%; animation-duration:22s; }
  @keyframes drift { 0%, 100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,30px) scale(1.08)} }
  .grid-overlay { position:absolute;inset:0; background-image:linear-gradient(rgba(245,240,232,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,0.015) 1px,transparent 1px); background-size:60px 60px; }
  .noise { position:absolute;inset:0;opacity:0.03; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  .main-content { position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; padding: 7rem 2rem 2rem; }

  .page-header { margin-bottom: 2.5rem; text-align: left; border-bottom: 1px solid rgba(245,240,232,0.06); padding-bottom: 1.5rem; }
  .page-header h1 { font-family: var(--font-display); font-size: 2.6rem; font-weight: 700; color: var(--cream); }
  .page-header p { color: rgba(245,240,232,0.4); font-size: 0.95rem; margin-top: 0.3rem; }

  .control-strip { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
  .search-row { display: flex; gap: 1rem; width: 100%; align-items: center; }
  .search-wrapper { position: relative; flex: 1; }
  .search-input { width: 100%; background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.08); border-radius: 100px; padding: 0.9rem 1.5rem 0.9rem 3rem; color: var(--cream); font-family: var(--font-sans); font-size: 0.95rem; transition: 0.3s; }
  .search-input:focus { outline: none; border-color: var(--teal); box-shadow: 0 0 15px rgba(46,196,182,0.1); }
  .search-icon { position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%); color: rgba(245,240,232,0.3); font-size: 1rem; }
  
  .ai-search-container { width: 100%; display: flex; gap: 0.8rem; align-items: center; background: rgba(124, 58, 237, 0.03); border: 1px dashed rgba(124, 58, 237, 0.25); padding: 0.8rem 1.2rem; border-radius: 16px; margin-top: 0.2rem; }
  .ai-search-input { flex: 1; background: transparent; border: none; color: var(--cream); font-family: var(--font-sans); font-size: 0.9rem; }
  .ai-search-input:focus { outline: none; }
  .btn-ai-spark { background: linear-gradient(135deg, var(--violet), var(--teal)); color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 100px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: 0.3s; }
  .btn-ai-spark:hover { opacity: 0.9; box-shadow: 0 0 15px rgba(124, 58, 237, 0.4); }

  .sort-dropdown { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.08); border-radius: 100px; padding: 0.9rem 1.5rem; color: var(--cream); cursor: pointer; font-size: 0.9rem; font-weight: 500; }

  .chips-container { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; align-items: center; text-align: left; }
  .results-counter { font-size: 0.85rem; color: rgba(245,240,232,0.4); font-weight: 500; margin-right: 1rem; }

  .workspace-layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; text-align: left; }

  .filter-sidebar { background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.05); border-radius: 24px; padding: 1.8rem; height: fit-content; }
  .sidebar-section { margin-bottom: 2rem; }
  .section-title { font-family: var(--font-tech-head); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; display: block; }
  
  .filter-group { display: flex; flex-direction: column; gap: 0.7rem; }
  .check-label { display: flex; align-items: center; gap: 0.6rem; font-size: 0.88rem; color: rgba(245,240,232,0.7); cursor: pointer; }
  
  .toggle-container { display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem; color: rgba(245,240,232,0.7); }
  .switch { position: relative; display: inline-block; width: 44px; height: 22px; }
  .switch input { opacity: 0; width: 0; height: 0; }
  .slider { position: absolute; cursor: pointer; inset: 0; background-color: rgba(245,240,232,0.1); transition: .3s; border-radius: 34px; }
  .switch input:checked + .slider { background-color: var(--teal); }
  .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: var(--ink); transition: .3s; border-radius: 50%; }
  .switch input:checked + .slider:before { transform: translateX(20px); }

  .matrix-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; }
  @media (max-width: 1024px) { .workspace-layout { grid-template-columns: 1fr; } .matrix-grid { grid-template-columns: 1fr; } }

  .match-card-wrapper { position: relative; width: 100%; display: flex; }
  .match-node-card { width: 100%; background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.05); border-radius: 24px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between; transition: 0.3s; }
  .match-node-card:hover { border-color: rgba(245,240,232,0.15); background: rgba(245,240,232,0.02); transform: translateY(-2px); }
  
  .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.2rem; }
  .profile-meta { display: flex; gap: 1rem; align-items: center; cursor: pointer; }
  .avatar-node { width: 52px; height: 52px; border-radius: 100px; background: linear-gradient(135deg, rgba(245,240,232,0.05), rgba(245,240,232,0.01)); border: 1px solid rgba(245,240,232,0.1); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 700; color: var(--gold); font-size: 1.2rem; }
  .node-identity h3 { font-family: var(--font-display); font-size: 1.25rem; color: var(--cream); }
  .node-identity p { font-size: 0.8rem; color: rgba(245,240,232,0.4); margin-top: 0.1rem; }
  
  .ring-wrapper { position: relative; width: 54px; height: 54px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .score-text { position: absolute; font-family: var(--font-tech-head); font-size: 0.78rem; font-weight: 700; color: var(--teal); }

  .role-badge { display: inline-block; background: rgba(46,196,182,0.05); border: 1px solid rgba(46,196,182,0.15); color: var(--teal); font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.8rem; border-radius: 100px; margin-bottom: 1rem; width: fit-content; }
  .skills-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
  .skill-node { font-size: 0.75rem; background: rgba(245,240,232,0.03); border: 1px solid rgba(245,240,232,0.06); color: rgba(245,240,232,0.7); padding: 0.3rem 0.8rem; border-radius: 100px; }
  
  .card-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(245,240,232,0.04); padding-top: 1.2rem; margin-top: auto; }
  .interest-node-count { font-size: 0.78rem; color: rgba(245,240,232,0.3); }
  .interest-node-count em { color: var(--gold); font-style: normal; font-weight: 600; }

  .action-group { display: flex; gap: 0.6rem; }
  .btn-outline { background: transparent; color: var(--cream); border: 1px solid rgba(245,240,232,0.1); padding: 0.5rem 1.1rem; border-radius: 100px; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
  .btn-outline:hover { border-color: var(--cream); }
  .btn-solid { background: linear-gradient(135deg, var(--gold), var(--amber)); color: var(--ink); border: none; padding: 0.5rem 1.2rem; border-radius: 100px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
  .btn-solid:hover { box-shadow: 0 4px 15px rgba(212,168,67,0.25); }

  .modal-backdrop { position: fixed; inset: 0; background: rgba(10,10,15,0.75); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
  .modal-window { background: #0f0f17; border: 1px solid rgba(245,240,232,0.08); border-radius: 28px; padding: 2.2rem; max-width: 460px; width: 90%; text-align: left; }
  .modal-window h2 { font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.4rem; color: var(--cream); }

  .toast-layer { position: fixed; bottom: 2rem; right: 2rem; z-index: 9999; background: #0b251c; border: 1px solid #10b981; padding: 12px 24px; border-radius: 16px; color: #10b981; font-size: 14px; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  .loading-state { color: rgba(245,240,232,0.4); text-align: center; font-size: 1.1rem; padding: 3rem 0; width: 100%; }

  /* 📱 MOBILE RESPONSIVE EXTENSIONS ONLY (Triggers under 768px layout) */
  @media (max-width: 768px) {
    .page-header { text-align: center !important; }
    .main-content { padding: 6rem 1rem 2rem !important; }
    .page-header h1 { font-size: 2rem !important; }
    .search-row { flex-direction: column !important; gap: 0.8rem !important; }
    .sort-dropdown { width: 100% !important; padding: 0.8rem 1.2rem !important; }
    .ai-search-container { flex-direction: column !important; align-items: stretch !important; gap: 0.8rem !important; border-radius: 12px !important; }
    .btn-ai-spark { width: 100% !important; justify-content: center !important; }
    .workspace-layout { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
    .filter-sidebar { padding: 1.2rem !important; border-radius: 16px !important; }
    .filter-group { flex-direction: row !important; flex-wrap: wrap !important; gap: 0.8rem !important; }
    .matrix-grid { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
    .match-node-card { padding: 1.2rem !important; border-radius: 16px !important; }
    .node-identity h3 { font-size: 1.1rem !important; max-width: 170px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
    .node-identity p { max-width: 170px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
    .card-footer { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
    .action-group { width: 100% !important; }
    .btn-outline, .btn-solid { flex: 1 !important; text-align: center !important; padding: 0.5rem 0.8rem !important; font-size: 0.75rem !important; }
    .modal-window { padding: 1.5rem !important; border-radius: 20px !important; }
    .toast-layer { left: 1rem !important; right: 1rem !important; bottom: 1rem !important; text-align: center !important; }
  }
`;

export default function FindTeam() {
  const navigate = useNavigate();
  const [hackers, setHackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [isRemote, setIsRemote] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [profileModal, setProfileModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const currentUserId = localStorage.getItem("userId") || "mock-user-123";
  const currentUserName = localStorage.getItem("userName") || "Rishikesh";

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  useEffect(() => {
    const fetchLiveHackers = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/api/profile/suggest-team?currentUserId=${currentUserId}`);
        if (response.status === 200 && response.data.users) {
          const databaseUsers = response.data.users.map((user, idx) => ({
            id: user._id || user.id || `live-${idx}`,
            name: user.name || "Anonymous Developer",
            college: user.college || "Global Cluster Node",
            role: user.role || "Frontend Node",
            skills: user.skills && user.skills.length > 0 ? user.skills : ["React", "Tailwind CSS"],
            matchScore: user.matchScore || Math.floor(Math.random() * (98 - 75 + 1)) + 75,
            interests: user.interests || (user.domains?.length) || Math.floor(Math.random() * 5) + 1,
            level: user.experienceLevel || "Intermediate",
            remote: user.openToRemote ?? true
          }));
          setHackers(databaseUsers);
        }
      } catch (error) {
        console.error("Failed to fetch developers vectors:", error);
        showToast("Error linking database cluster streams.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveHackers();
  }, [currentUserId]);

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    try {
      setLoading(true);
      showToast("AI Matrix processing query strings...");
      const response = await API.post('/api/profile/ai-search', { query: aiQuery });
      if (response.status === 200 && response.data.users) {
        const aiMatchedUsers = response.data.users.map((user, idx) => ({
          id: user._id || `ai-${idx}`,
          name: user.name,
          college: user.college || "AI Scaled Node",
          role: user.role || "Software Layer",
          skills: user.skills && user.skills.length > 0 ? user.skills : ["React"],
          matchScore: user.matchScore || 95, 
          interests: user.domains?.length || 4,
          level: user.experienceLevel || "Expert",
          remote: user.openToRemote ?? true
        }));
        setHackers(aiMatchedUsers);
        showToast("AI Semantic layers optimized!");
      }
    } catch (error) {
      console.error("AI prompt parsing anomaly:", error);
      showToast("AI Engine pipeline failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleConnectNode = async (targetHacker) => {
    try {
      const payload = {
        senderId: currentUserId,
        senderName: currentUserName,
        receiverId: targetHacker.id
      };
      const response = await API.post('/api/profile/connect-node', payload);
      if (response.status === 201) {
        showToast(`Transmission vector locked! Invite sent to ${targetHacker.name} ✦`);
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Connection bridge transmission failed.");
    }
  };

  const filteredHackers = hackers.filter(hacker => {
    const matchesSearch = 
      hacker.name.toLowerCase().includes(search.toLowerCase()) || 
      hacker.college.toLowerCase().includes(search.toLowerCase()) ||
      hacker.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    const normalizedHackerRole = hacker.role.toLowerCase();
    const matchesRole = 
      selectedRole === "All" || 
      normalizedHackerRole.includes(selectedRole.toLowerCase());

    const matchesRemote = !isRemote || hacker.remote === true;

    return matchesSearch && matchesRole && matchesRemote;
  });

  const clearFilters = () => {
    setSearch("");
    setAiQuery("");
    setSelectedRole("All");
    setIsRemote(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* Background Ambience */}
      <div className="bg-canvas">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-overlay" />
        <div className="noise" />
      </div>

      {toastMessage && <div className="toast-layer">{toastMessage}</div>}

      <div className="match-matrix-page">
        <main className="main-content">
          
          <header className="page-header">
            <h1>Find Your Squad</h1>
            <p>Browse decentralized developer nodes matched directly with your tech alignment profile.</p>
          </header>

          <div className="control-strip">
            <div className="search-row">
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search by name, college platform or specific tech keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select className="sort-dropdown">
                <option>Sort by: Match %</option>
                <option>Recently Active</option>
              </select>
            </div>

            {/* 🤖 ADVANCED SEARCH WITH AI INJECTED */}
            <div className="ai-search-container">
              <span style={{ fontSize: '1.1rem' }}>✨</span>
              <input 
                type="text" 
                className="ai-search-input" 
                placeholder="Advance Search with AI: e.g., Need a MERN stack expert fluent in Socket.io who goes to LNCT..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
              />
              <button className="btn-ai-spark" onClick={handleAiSearch}>
                Parse AI Vector
              </button>
            </div>
          </div>

          <div className="chips-container">
            <span className="results-counter">Showing {filteredHackers.length} structural matches</span>
          </div>

          <div className="workspace-layout">
            
            {/* Sidebar Filters */}
            <aside className="filter-sidebar">
              <div className="sidebar-section">
                <span className="section-title">Hacker Role</span>
                <div className="filter-group">
                  {["All", "Frontend", "Backend", "ML Engineer", "UI/UX"].map(role => (
                    <label key={role} className="check-label">
                      <input 
                        type="radio" 
                        name="roleGroup" 
                        checked={
                          selectedRole === role || 
                          (role === "Frontend" && selectedRole === "Frontend Node") ||
                          (role === "Backend" && selectedRole === "Backend Layer") ||
                          (role === "ML Engineer" && selectedRole === "ML/AI Engine") ||
                          (role === "UI/UX" && selectedRole === "UI/UX Visual")
                        }
                        onChange={() => {
                          if (role === "Frontend") setSelectedRole("Frontend Node");
                          else if (role === "Backend") setSelectedRole("Backend Layer");
                          else if (role === "ML Engineer") setSelectedRole("ML/AI Engine");
                          else if (role === "UI/UX") setSelectedRole("UI/UX Visual");
                          else setSelectedRole("All");
                        }}
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <div className="toggle-container">
                  <span>Remote Workspace Only</span>
                  <label className="switch">
                    <input type="checkbox" checked={isRemote} onChange={(e) => setIsRemote(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Output Matrix Grid */}
            <section className="matrix-grid">
              {loading ? (
                <div className="loading-state">Querying decentralized neural paths...</div>
              ) : filteredHackers.length > 0 ? (
                filteredHackers.map(hacker => (
                  <div className="match-card-wrapper" key={hacker.id}>
                    <div className="match-node-card">
                      <div>
                        <div className="card-top">
                          <div className="profile-meta" onClick={() => setProfileModal(hacker)}>
                            <div className="avatar-node">{hacker.name ? hacker.name[0] : "?"}</div>
                            <div className="node-identity">
                              <h3>{hacker.name}</h3>
                              <p>{hacker.college}</p>
                            </div>
                          </div>
                          
                          <div className="ring-wrapper" onClick={() => setActiveModal(hacker)}>
                            <svg width="54" height="54" viewBox="0 0 36 36">
                              <path stroke="rgba(245,240,232,0.03)" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              <path stroke="var(--teal)" strokeWidth="3" strokeDasharray={`${hacker.matchScore}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <span className="score-text">{hacker.matchScore}%</span>
                          </div>
                        </div>

                        <div className="role-badge">{hacker.role}</div>

                        <div className="skills-row">
                          {hacker.skills.map(skill => (
                            <span className="skill-node" key={skill}>{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="card-footer">
                        <span className="interest-node-count">
                          <em>{hacker.interests}</em> Common Flags
                        </span>
                        <div className="action-group">
                          <button className="btn-outline" onClick={() => setProfileModal(hacker)}>View Profile</button>
                          <button className="btn-solid" onClick={() => handleConnectNode(hacker)}>Connect ✦</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state-frame" style={{ textAlign: 'center', gridColumn: '1/-1', padding: '3rem 0' }}>
                  <h3 style={{ marginBottom: '1rem' }}>No Builders Matched</h3>
                  <button className="btn-solid" onClick={clearFilters}>Reset Filters Matrix</button>
                </div>
              )}
            </section>

          </div>
        </main>
      </div>

      {/* Profile Modal */}
      {profileModal && (
        <div className="modal-backdrop" onClick={() => setProfileModal(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="avatar-node" style={{ width: '64px', height: '64px', fontSize: '1.5rem' }}>{profileModal.name[0]}</div>
              <div>
                <h2 style={{ margin: 0 }}>{profileModal.name}</h2>
                <p style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600 }}>{profileModal.role}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'rgba(245,240,232,0.8)', borderTop: '1px solid rgba(245,240,232,0.05)', paddingTop: '1.2rem', marginBottom: '1.5rem' }}>
              <p>📍 <strong>Platform Node:</strong> {profileModal.college}</p>
              <p>⚡ <strong>Experience Matrix:</strong> {profileModal.level}</p>
              <p>🌐 <strong>Operational Model:</strong> {profileModal.remote ? "Open to Remote Workspace" : "On-Site Synchronization Only"}</p>
              
              <div style={{ marginTop: '0.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--cream)' }}>Verified Tech Vectors:</strong>
                <div className="skills-row">
                  {profileModal.skills.map(s => <span className="skill-node" style={{ background: 'rgba(245,240,232,0.05)' }} key={s}>{s}</span>)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-solid" style={{ flex: 1 }} onClick={() => { handleConnectNode(profileModal); setProfileModal(null); }}>Initiate Stream Connection</button>
              <button className="btn-outline" onClick={() => setProfileModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Match Breakdown Modal */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <h2>Match Breakdown</h2>
            <div className="breakdown-list" style={{ margin: '1.5rem 0' }}>
              {[{ label: "Core Technical Alignment", weight: activeModal.matchScore }, { label: "Availability Synchronization", weight: 90 }].map((item, idx) => (
                <div className="breakdown-row" key={idx} style={{ marginBottom: '1rem' }}>
                  <div className="breakdown-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <span>{item.label}</span>
                    <span style={{ color: 'var(--teal)' }}>{item.weight}%</span>
                  </div>
                  <div className="progress-track" style={{ height: '6px', background: 'rgba(245,240,232,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div className="progress-fill" style={{ width: `${item.weight}%`, height: '100%', background: 'var(--teal)' }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-outline" style={{ width: '100%' }} onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}