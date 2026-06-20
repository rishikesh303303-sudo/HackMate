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
  .profile-edit-page { position: relative; min-height: 100vh; color: var(--cream); padding-bottom: 8rem; }

  /* Background Engine */
  .bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: var(--ink); }
  .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.16; animation: drift linear infinite; }
  .orb-1 { width:600px;height:600px; background:radial-gradient(circle, var(--gold), transparent 70%); top:-10%;left:-5%; animation-duration:22s; }
  .orb-2 { width:500px;height:500px; background:radial-gradient(circle, var(--violet), transparent 70%); bottom:-10%;right:-5%; animation-duration:18s; }
  @keyframes drift { 0%, 100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.06)} }
  .grid-overlay { position:absolute;inset:0; background-image:linear-gradient(rgba(245,240,232,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,0.015) 1px,transparent 1px); background-size:60px 60px; }
  .noise { position:absolute;inset:0;opacity:0.03; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  .main-content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 7rem 2rem 2rem; }

  /* Top Header Profile Panel */
  .profile-top-deck { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem; border-bottom: 1px solid rgba(245,240,232,0.06); padding-bottom: 2rem; margin-bottom: 3rem; text-align: left; }
  .identity-cluster { display: flex; align-items: center; gap: 1.8rem; }
  
  /* Avatar Upload UI */
  .avatar-uploader { width: 90px; height: 90px; border-radius: 24px; background: rgba(245,240,232,0.02); border: 1px dashed rgba(245,240,232,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; position: relative; overflow: hidden; transition: 0.2s; flex-shrink: 0; }
  .avatar-uploader:hover { border-color: var(--gold); background: rgba(245,240,232,0.04); }
  .avatar-uploader img { width: 100%; height: 100%; object-fit: cover; }
  .avatar-uploader span { font-size: 0.65rem; color: rgba(245,240,232,0.4); text-transform: uppercase; font-weight: 600; margin-top: 0.2rem; }

  /* Completion Progress Bar Matrix */
  .completion-metrics { min-width: 260px; text-align: left; }
  .completion-label { font-size: 0.82rem; color: rgba(245,240,232,0.5); font-weight: 500; display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
  .track-bar { height: 6px; background: rgba(245,240,232,0.04); border-radius: 100px; overflow: hidden; }
  .fill-bar { height: 100%; background: linear-gradient(90deg, var(--violet), var(--teal)); border-radius: 100px; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }

  /* Bento Form Sheet Layout */
  .bento-form-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; text-align: left; align-items: stretch; }
  .form-card { background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.05); border-radius: 28px; padding: 2.2rem; position: relative; display: flex; flex-direction: column; }
  .block-label { font-family: var(--font-tech-head); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal); margin-bottom: 1.5rem; display: inline-block; }

  .span-12 { grid-column: span 12; }
  .span-8 { grid-column: span 8; }
  .span-4 { grid-column: span 4; }

  /* Input Fields */
  .input-matrix { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  .field-box { display: flex; flex-direction: column; gap: 0.4rem; }
  .field-box.full-width { grid-column: span 2; }
  .field-box label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(245,240,232,0.4); font-weight: 600; }
  .text-input { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.08); border-radius: 14px; padding: 0.8rem 1.2rem; color: var(--cream); font-family: var(--font-sans); font-size: 0.92rem; transition: 0.2s; width: 100%; }
  .text-input:focus { outline: none; border-color: var(--teal); }

  /* Role Grid Selector */
  .role-selection-matrix { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; }
  .role-toggle-node { background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.04); border-radius: 16px; padding: 1.2rem; text-align: center; cursor: pointer; transition: 0.2s; }
  .role-toggle-node:hover { border-color: rgba(245,240,232,0.12); }
  .role-toggle-node.selected { border-color: var(--gold); background: rgba(212,168,67,0.03); }
  .role-toggle-node h4 { font-family: var(--font-display); font-size: 1.05rem; color: var(--cream); }

  /* Chips Multi-Select Setup */
  .chips-flex-wrapper { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .interactive-chip { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.06); color: rgba(245,240,232,0.6); padding: 0.4rem 1.1rem; border-radius: 100px; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: 0.2s; user-select: none; }
  .interactive-chip:hover { border-color: rgba(245,240,232,0.15); color: var(--cream); }
  .interactive-chip.active { background: rgba(46,196,182,0.06); border-color: var(--teal); color: var(--teal); font-weight: 600; }
  .interactive-chip.domain-active { background: rgba(124,58,237,0.06); border-color: var(--violet); color: var(--violet); font-weight: 600; }

  /* Experience Button Row */
  .exp-tier-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  .btn-tier-node { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.06); color: rgba(245,240,232,0.6); padding: 0.65rem; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: 0.2s; text-align: center; }
  .btn-tier-node:hover { border-color: rgba(245,240,232,0.15); }
  .btn-tier-node.selected { background: var(--cream); color: var(--ink); border-color: var(--cream); }

  /* Toggle Switches Layout */
  .switch-deck { display: flex; flex-direction: column; gap: 1.2rem; }
  .toggle-row-item { display: flex; align-items: center; justify-content: space-between; font-size: 0.9rem; color: rgba(245,240,232,0.8); gap: 1rem; }
  .switch { position: relative; display: inline-block; width: 44px; height: 22px; flex-shrink: 0; }
  .switch input { opacity: 0; width: 0; height: 0; }
  .slider { position: absolute; cursor: pointer; inset: 0; background-color: rgba(245,240,232,0.1); transition: .3s; border-radius: 34px; border: 1px solid rgba(245,240,232,0.05); }
  .switch input:checked + .slider { background-color: var(--teal); }
  .switch input:checked + .slider:before { transform: translateX(20px); }
  .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: var(--ink); transition: .3s; border-radius: 50%; }

  /* Sticky Bottom Save Dashboard Block */
  .sticky-action-dock { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(10,10,15,0.7); backdrop-filter: blur(20px); border-top: 1px solid rgba(245,240,232,0.05); padding: 1.2rem 2rem; z-index: 500; display: flex; justify-content: center; }
  .dock-content { max-width: 1100px; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  
  /* Save Button Custom Styles */
  .btn-save-action { background: linear-gradient(135deg, var(--gold), var(--amber)); color: var(--ink); border: none; padding: 0.7rem 1.8rem; border-radius: 100px; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .btn-save-action:hover:not(:disabled) { box-shadow: 0 4px 20px rgba(212,168,67,0.3); }
  .btn-save-action:disabled { opacity: 0.6; cursor: not-allowed; background: #555; color: #aaa; }
  
  .btn-shortcut-link { background: transparent; color: var(--cream); border: 1px solid rgba(245,240,232,0.15); padding: 0.7rem 1.6rem; border-radius: 100px; font-size: 0.85rem; font-weight: 600; cursor: pointer; text-decoration: none; text-align: center; }
  .btn-shortcut-link:hover { border-color: var(--cream); background: rgba(245,240,232,0.02); }

  /* Hacker Spinner Circle Element */
  .hacker-spinner { width: 14px; height: 14px; border: 2px solid var(--ink); border-top-color: transparent; border-radius: 50%; animation: rotate-spin 0.6s linear infinite; }
  @keyframes rotate-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

  /* 📱 MOBILE RESPONSIVE EXTENSIONS ONLY (Laptop grid configuration untouched) */
  @media (max-width: 768px) {
    .main-content { padding: 6rem 1rem 3rem !important; }
    .profile-top-deck { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 1.5rem !important; }
    .identity-cluster { flex-direction: column !important; gap: 1rem !important; }
    .profile-top-deck h1 { font-size: 1.8rem !important; }
    .completion-metrics { width: 100% !important; min-width: unset !important; }
    
    .bento-form-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
    .span-4, .span-8, .span-12 { grid-column: span 12 !important; }
    .form-card { padding: 1.5rem !important; border-radius: 20px !important; }
    
    .input-matrix { grid-template-columns: 1fr !important; gap: 1rem !important; }
    .field-box.full-width { grid-column: span 1 !important; }
    
    .role-selection-matrix { grid-template-columns: repeat(2, 1fr) !important; gap: 0.6rem !important; }
    .role-toggle-node { padding: 1rem 0.5rem !important; border-radius: 12px !important; }
    .role-toggle-node h4 { font-size: 0.9rem !important; }
    
    .profile-edit-page { padding-bottom: 12rem !important; }
    .sticky-action-dock { padding: 1rem !important; }
    .dock-content { flex-direction: column-reverse !important; gap: 0.8rem !important; width: 100% !important; }
    .btn-save-action, .btn-shortcut-link { width: 100% !important; padding: 0.65rem !important; font-size: 0.82rem !important; }
  }
`;

const PRE_BUILT_SKILLS = [
  "Python", "React", "Figma", "Node.js", "MongoDB", "Express", "TypeScript", 
  "Next.js", "C++", "Java", "FastAPI", "Docker", "AWS", "Git", "Tailwind",
  "PyTorch", "TensorFlow", "Kubernetes", "GraphQL", "PostgreSQL", "Firebase"
];

const DOMAIN_INTERESTS = [
  "Healthcare AI", "FinTech", "EdTech", "SaaS Dev", "Web3/Crypto", 
  "Cybersecurity", "CleanTech", "E-Commerce", "Hardware/IoT", "AgriTech"
];

export default function Profile() {
  const navigate = useNavigate();

  const savedUserJson = localStorage.getItem("userMeta");
  const parsedUser = savedUserJson ? JSON.parse(savedUserJson) : null;

  // Initial States
  const [name, setName] = useState(parsedUser?.name || "");
  const [college, setCollege] = useState(parsedUser?.college || "");
  const [degree, setDegree] = useState(parsedUser?.degree || "");
  const [city, setCity] = useState(parsedUser?.city || "");
  const [bio, setBio] = useState(parsedUser?.bio || "");
  const [githubUrl, setGithubUrl] = useState(parsedUser?.githubUrl || "");
  
  const [avatar, setAvatar] = useState(parsedUser?.avatar || null);
  const [selectedRole, setSelectedRole] = useState(parsedUser?.role || "");
  const [selectedSkills, setSelectedSkills] = useState(parsedUser?.skills || []);
  const [customSkill, setCustomSkill] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(parsedUser?.experienceLevel || "");
  const [selectedDomains, setSelectedDomains] = useState(parsedUser?.domains || []);
  
  const [toggleHackathon, setToggleHackathon] = useState(parsedUser?.availableForHackathons ?? true);
  const [toggleRemote, setToggleRemote] = useState(parsedUser?.openToRemote ?? true);
  const [toggleEmail, setToggleEmail] = useState(parsedUser?.enableEmailTransmissions ?? false);

  const [completionProgress, setCompletionProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let score = 0;
    if (name) score += 15;
    if (college) score += 10;
    if (bio) score += 10;
    if (githubUrl) score += 10;
    if (selectedRole) score += 15;
    if (selectedSkills.length > 0) score += 15;
    if (experienceLevel) score += 10;
    if (selectedDomains.length > 0) score += 15;
    setCompletionProgress(Math.min(score, 100));
  }, [name, college, bio, githubUrl, selectedRole, selectedSkills, experienceLevel, selectedDomains]);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const toggleSkillSelection = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e) => {
    if (e.key === 'Enter' && customSkill.trim()) {
      if (!selectedSkills.includes(customSkill.trim())) {
        setSelectedSkills([...selectedSkills, customSkill.trim()]);
      }
      setCustomSkill("");
    }
  };

  const toggleDomainSelection = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleSaveProfile = async () => {
    if (!name || !college) {
      alert("Please fill baseline metadata fields (Name & College Node)");
      return;
    }

    setIsSaving(true); 

    try {
      const payload = {
        email: parsedUser?.email || "",
        name,
        college,
        degree,
        city,
        githubUrl,
        bio,
        role: selectedRole,
        skills: selectedSkills,
        experienceLevel,
        domains: selectedDomains,
        availableForHackathons: toggleHackathon,
        openToRemote: toggleRemote,
        enableEmailTransmissions: toggleEmail
      };

      const response = await API.post('/api/profile/update', payload);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("userMeta", JSON.stringify(response.data.user));
        localStorage.setItem("userName", name);
        alert("Profile vectors successfully synchronized in MongoDB Atlas! 🚀");
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error("Profile Sync Pipeline Crashed:", error);
      alert(error.response?.data?.message || "Transmission failed on database layers.");
    } finally {
      setIsSaving(false); 
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="bg-canvas">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-overlay" />
        <div className="noise" />
      </div>

      <div className="profile-edit-page">
        <main className="main-content">
          
          <header className="profile-top-deck">
            <div className="identity-cluster">
              <label className="avatar-uploader">
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                {avatar ? <img src={avatar} alt="Profile Avatar" /> : <><span>📸</span><span>Upload</span></>}
              </label>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem' }}>Configure Profile</h1>
                <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.92rem', marginTop: '0.2rem' }}>Align your algorithmic weight vectors for high accuracy matchmaking.</p>
              </div>
            </div>

            <div className="completion-metrics">
              <div className="completion-label">
                <span>Profile Synchronization</span>
                <strong>{completionProgress}%</strong>
              </div>
              <div className="track-bar">
                <div className="fill-bar" style={{ width: `${completionProgress}%` }} />
              </div>
            </div>
          </header>

          <div className="bento-form-grid">
            
            <div className="form-card span-8">
              <span className="block-label">Metadata Baseline / Basic Info</span>
              <div className="input-matrix">
                <div className="field-box">
                  <label>Full Name</label>
                  <input type="text" className="text-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name..." />
                </div>
                <div className="field-box">
                  <label>College Node</label>
                  <input type="text" className="text-input" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="LNCT, Bhopal..." />
                </div>
                <div className="field-box">
                  <label>Degree Scheme & Year</label>
                  <input type="text" className="text-input" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="B.Tech / 3rd Year..." />
                </div>
                <div className="field-box">
                  <label>Location City</label>
                  <input type="text" className="text-input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Bhopal..." />
                </div>
                <div className="field-box full-width">
                  <label>GitHub Profile Repository URL</label>
                  <input type="text" className="text-input" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
                </div>
                <div className="field-box full-width">
                  <label>Bio / Hacker Stance</label>
                  <input type="text" className="text-input" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Building high-valuation SaaS ecosystems..." />
                </div>
              </div>
            </div>

            <div className="form-card span-4">
              <span className="block-label" style={{ color: 'var(--amber)' }}>Telemetry Toggles</span>
              <div className="switch-deck" style={{ marginTop: '0.5rem' }}>
                <div className="toggle-row-item">
                  <span>Available for Active Hackathons</span>
                  <label className="switch">
                    <input type="checkbox" checked={toggleHackathon} onChange={(e) => setToggleHackathon(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-row-item">
                  <span>Open to Remote Operations</span>
                  <label className="switch">
                    <input type="checkbox" checked={toggleRemote} onChange={(e) => setToggleRemote(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-row-item">
                  <span>Enable Email Transmissions</span>
                  <label className="switch">
                    <input type="checkbox" checked={toggleEmail} onChange={(e) => setToggleEmail(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-card span-12">
              <span className="block-label" style={{ color: 'var(--gold)' }}>Target Profile Designation / Role Selector</span>
              <div className="role-selection-matrix">
                {["ML/AI Engine", "Frontend Node", "Backend Layer", "UI/UX Visual", "Mobile Native", "Blockchain Crypt", "DevOps Layer", "Ideation Spec"].map(role => (
                  <div 
                    key={role} 
                    className={`role-toggle-node ${selectedRole === role ? 'selected' : ''}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <h4>{role}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-card span-8">
              <span className="block-label">Core Technical Stack Capabilities</span>
              <div className="chips-flex-wrapper" style={{ marginBottom: '1.5rem' }}>
                {PRE_BUILT_SKILLS.map(skill => (
                  <div 
                    key={skill} 
                    className={`interactive-chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
                    onClick={() => toggleSkillSelection(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <div className="field-box">
                <label>Add Custom Peripheral Skill (Press Enter)</label>
                <input 
                  type="text" 
                  className="text-input" 
                  placeholder="Type skill framework name and hit enter node..." 
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={handleAddCustomSkill}
                />
              </div>
            </div>

            <div className="form-card span-4" style={{ justifyContent: 'space-between' }}>
              <div>
                <span className="block-label" style={{ color: 'var(--violet)' }}>Experience Stack Tier</span>
                <div className="exp-tier-row" style={{ marginTop: '0.2rem' }}>
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map(level => (
                    <button 
                      key={level}
                      type="button"
                      className={`btn-tier-node ${experienceLevel === level ? 'selected' : ''}`}
                      onClick={() => setExperienceLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'rgba(245,240,232,0.3)', lineHeight: '1.4', marginTop: '1.5rem' }}>
                Tier weights modify matching percentage ratios based on peer project criteria matrices.
              </p>
            </div>

            <div className="form-card span-12">
              <span className="block-label">Target Domains & Project Interest Alignment</span>
              <div className="chips-flex-wrapper">
                {DOMAIN_INTERESTS.map(domain => (
                  <div 
                    key={domain} 
                    className={`interactive-chip ${selectedDomains.includes(domain) ? 'domain-active' : ''}`}
                    onClick={() => toggleDomainSelection(domain)}
                  >
                    {domain}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      <footer className="sticky-action-dock">
        <div className="dock-content">
          <button className="btn-shortcut-link" onClick={() => navigate('/find-team')}>➔ Bypass to Find Squad</button>
          
          <button 
            className="btn-save-action" 
            onClick={handleSaveProfile}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="hacker-spinner"></div>
                Saving...
              </>
            ) : (
              "Save Configuration Changes ✦"
            )}
          </button>
        </div>
      </footer>
    </>
  );
}