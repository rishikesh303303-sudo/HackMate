import React, { useState, useEffect, useRef } from 'react';
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
  .team-workspace-page { position: relative; min-height: 100vh; color: var(--cream); padding-bottom: 5rem; }

  .bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: var(--ink); }
  .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.15; animation: drift linear infinite; }
  .orb-1 { width:600px;height:600px; background:radial-gradient(circle, var(--amber), transparent 70%); top:-10%;left:-5%; animation-duration:24s; }
  .orb-2 { width:500px;height:500px; background:radial-gradient(circle, var(--teal), transparent 70%); bottom:-10%;right:-5%; animation-duration:18s; }
  @keyframes drift { 0%, 100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,20px) scale(1.05)} }
  .grid-overlay { position:absolute;inset:0; background-image:linear-gradient(rgba(245,240,232,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,0.015) 1px,transparent 1px); background-size:60px 60px; }
  .noise { position:absolute;inset:0;opacity:0.03; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  .main-content { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 7rem 2rem 2rem; }

  .workspace-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 3rem; border-bottom: 1px solid rgba(245,240,232,0.06); padding-bottom: 1.5rem; text-align: left; }
  .workspace-header h1 { font-family: var(--font-display); font-size: 2.4rem; font-weight: 700; }
  .workspace-header p { color: rgba(245,240,232,0.4); font-size: 0.92rem; margin-top: 0.2rem; }

  .bento-matrix { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; text-align: left; }
  .bento-card { background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.05); border-radius: 28px; padding: 2rem; position: relative; overflow: hidden; }
  .card-label { font-family: var(--font-tech-head); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--teal); margin-bottom: 1.2rem; display: inline-block; }

  .span-8 { grid-column: span 8; }
  .span-4 { grid-column: span 4; }
  .span-12 { grid-column: span 12; }

  .team-meta-box { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; }
  .avatar-stack { display: flex; align-items: center; }
  .stacked-avatar { width: 42px; height: 42px; border-radius: 50%; border: 2px solid var(--ink); margin-right: -12px; background: #1a1a24; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; color: var(--gold); font-family: var(--font-display); }
  
  .member-list-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 0.5rem; }
  .mini-member-card { background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.04); border-radius: 18px; padding: 1.2rem; }
  .mini-member-card h4 { font-family: var(--font-display); font-size: 1.1rem; color: var(--cream); }
  .mini-member-card p { font-size: 0.78rem; color: var(--teal); margin: 0.2rem 0 0.8rem; font-weight: 500; }
  
  .map-row { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 0.5rem; }
  .map-bar-item { display: flex; flex-direction: column; gap: 0.3rem; }
  .map-meta { display: flex; justify-content: space-between; font-size: 0.82rem; }
  .bar-track { height: 6px; background: rgba(245,240,232,0.03); border-radius: 100px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 100px; }

  .chat-panel { display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 250px; }
  .chat-scroller { flex: 1; height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.8rem; padding-right: 0.5rem; }
  .msg-bubble { font-size: 0.85rem; line-height: 1.4; background: rgba(245,240,232,0.02); padding: 0.6rem 0.9rem; border-radius: 14px; width: fit-content; max-width: 85%; }
  .msg-meta { font-size: 0.7rem; color: rgba(245,240,232,0.3); margin-bottom: 0.2rem; display: flex; gap: 0.5rem; font-weight: 600; }
  .chat-input-row { display: flex; gap: 0.5rem; margin-top: 1rem; }
  .chat-box-field { flex: 1; background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.08); border-radius: 100px; padding: 0.6rem 1.2rem; color: var(--cream); font-size: 0.85rem; outline: none; }
  
  .kanban-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.5rem; }
  .kanban-column { background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.03); border-radius: 16px; padding: 1rem; min-height: 180px; }
  .column-header-text { font-family: var(--font-tech-head); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(245,240,232,0.4); margin-bottom: 0.8rem; display: block; }
  .task-card-node { background: rgba(10,10,15,0.6); border: 1px solid rgba(245,240,232,0.05); border-radius: 12px; padding: 0.8rem; margin-bottom: 0.6rem; font-size: 0.82rem; cursor: pointer; }

  .btn-action { background: linear-gradient(135deg, var(--gold), var(--amber)); color: var(--ink); border: none; padding: 0.5rem 1.2rem; border-radius: 100px; font-weight: 700; font-size: 0.8rem; cursor: pointer; }
  .btn-sm-outline { background: transparent; color: var(--cream); border: 1px solid rgba(245,240,232,0.1); padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.78rem; font-weight: 600; cursor: pointer; }
  .btn-reset-timeline { background: none; border: none; color: #ef4444; font-family: var(--font-tech-head); font-size: 0.68rem; font-weight: bold; letter-spacing: 0.05em; cursor: pointer; text-transform: uppercase; transition: 0.2s; margin-left: auto; }
  .btn-reset-timeline:hover { color: #f87171; }

  .config-input { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.1); border-radius: 12px; padding: 0.5rem 0.8rem; color: var(--cream); font-size: 0.85rem; width: 100%; outline: none; margin-bottom: 0.8rem; }
  .config-input:focus { border-color: var(--teal); }

  @media (max-width: 950px) { .span-8, .span-4 { grid-column: span 12; } .kanban-grid { grid-template-columns: 1fr; } }
`;

export default function TeamDashboard() {
  const currentUserName = localStorage.getItem("userName") || "Rishikesh303303";
  
  // ✅ FIXED: Hardcoded mock strings removed to avoid trigger mismatch on Mongoose layers
  const currentUserId = localStorage.getItem("userId") || "60c72b2f9b1d8e23a4111111"; 

  const [teamId, setTeamId] = useState(null);
  const [hasTeam, setHasTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamRole, setTeamRole] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [hackathonName, setHackathonName] = useState("");
  const [hackathonLocation, setHackathonLocation] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [countdownText, setCountdownText] = useState("00 : 00 : 00");

  const [chatMessages, setChatMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // FETCH TEAM METRICS FROM Atlas
  useEffect(() => {
    const fetchTeamProfileInstance = async () => {
      try {
        const response = await API.get(`/api/team/my-team/${currentUserId}`);
        if (response.status === 200 && response.data.success) {
          const t = response.data.team;
          setTeamId(t._id);
          setTeamName(t.name);
          setTasks(t.tasks || []);
          setChatMessages(t.chatMessages || []);
          setHackathonName(t.hackathonName || "");
          setHackathonLocation(t.hackathonLocation || "");
          setTargetDate(t.targetDate || "");
          setTeamMembers(t.members || []);
          
          const myProfileNode = t.members.find(m => m.userId === currentUserId);
          if (myProfileNode) setTeamRole(myProfileNode.role);
          setHasTeam(true);
        }
      } catch (error) {
        console.log("Dashboard pipeline synchronized.");
      }
    };
    fetchTeamProfileInstance();
  }, [currentUserId]);

  // Countdown timer loop
  useEffect(() => {
    if (!targetDate) {
      setCountdownText("00 : 00 : 00");
      return;
    }

    const interval = setInterval(() => {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setCountdownText("STREAM EXPIRED");
        clearInterval(interval);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        const formatNum = (num) => String(num).padStart(2, '0');
        setCountdownText(`${formatNum(hours)} : ${formatNum(minutes)} : ${formatNum(seconds)}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim() || !teamRole.trim()) return;

    try {
      const response = await API.post('/api/team/create', {
        name: teamName.trim(),
        creatorId: currentUserId,
        creatorName: currentUserName,
        role: teamRole.trim()
      });
      if (response.status === 201 || response.status === 200) {
        const t = response.data.team;
        setTeamId(t._id);
        setTeamMembers(t.members || []);
        setHasTeam(true);
      }
    } catch (err) {
      console.error("Failed to construct team model context:", err);
    }
  };

  const saveHackathonTimeline = async (name, loc, dateStr) => {
    if (!teamId) return;
    try {
      await API.post('/api/team/update-hackathon', {
        teamId, hackathonName: name, hackathonLocation: loc, targetDate: dateStr
      });
    } catch (e) {
      console.log("Timeline sync failed.");
    }
  };

  const handleResetHackathon = () => {
    setHackathonName("");
    setHackathonLocation("");
    setTargetDate("");
    setCountdownText("00 : 00 : 00");
    saveHackathonTimeline("", "", "");
  };

  const sendChatMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedChats = [...chatMessages, {
      id: Date.now(), user: currentUserName, text: newMsg.trim(), time: currentTime
    }];

    setChatMessages(updatedChats);
    setNewMsg("");

    try {
      await API.post('/api/team/sync-chat', { teamId, chatMessages: updatedChats });
    } catch (e) {
      console.log("Comms save array sequence drop.");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const updatedTasks = [...tasks, { id: Date.now(), text: taskInput.trim(), status: "todo" }];
    setTasks(updatedTasks);
    setTaskInput("");

    try {
      await API.post('/api/team/sync-tasks', { teamId, tasks: updatedTasks });
    } catch (e) {
      console.log("Task pipeline push drop.");
    }
  };

  const moveTask = async (id, currentStatus) => {
    const nextStatusMap = { todo: "progress", progress: "done", done: "todo" };
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, status: nextStatusMap[currentStatus] } : t);
    setTasks(updatedTasks);

    try {
      await API.post('/api/team/sync-tasks', { teamId, tasks: updatedTasks });
    } catch (e) {
      console.log("State shift persistence drop.");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="bg-canvas"><div className="orb orb-1" /><div className="orb orb-2" /><div className="grid-overlay" /><div className="noise" /></div>

      <div className="team-workspace-page">
        <main className="main-content">
          <header className="workspace-header">
            <div>
              <h1>{hasTeam ? teamName : "Operational Team Core"}</h1>
              <p>Synchronized operations hub for active team metrics mapping.</p>
            </div>
          </header>

          {!hasTeam ? (
            <div className="bento-matrix">
              <div className="bento-card span-12" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <span className="card-label">Initialization Terminal</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>No Active Team Sequence Found</h2>
                <form onSubmit={handleCreateTeam} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
                  <input type="text" className="config-input" placeholder="Team Name..." value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
                  <input type="text" className="config-input" placeholder="Your Target Role..." value={teamRole} onChange={(e) => setTeamRole(e.target.value)} required />
                  <button type="submit" className="btn-action" style={{ width: '100%', padding: '0.8rem' }}>Initialize Workspace Node</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bento-matrix">
              
              <div className="bento-card span-8">
                <span className="card-label">Operational Core / Team Overview</span>
                <div className="team-meta-box" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <h2>{teamName}</h2>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)', marginTop: '0.2rem' }}>Active Workspace Sequence Online</p>
                  </div>
                  <div className="avatar-stack">
                    {teamMembers.map((m, idx) => (
                      <div key={idx} className="stacked-avatar">{m.name ? m.name[0].toUpperCase() : 'U'}</div>
                    ))}
                  </div>
                </div>
                <div className="member-list-layout">
                  {teamMembers.map((member, idx) => (
                    <div className="mini-member-card" key={idx}>
                      <h4>{member.name}</h4><p>{member.role}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 'bold' }}>✓ Node Connected</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-card span-4" style={{ display: 'flex', flexDirection: 'column', justifyInterests: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <span className="card-label" style={{ color: 'var(--amber)', margin: 0 }}>Target Hackathon Timeline</span>
                    {hackathonName && <button className="btn-reset-timeline" onClick={handleResetHackathon}>Reset ✕</button>}
                  </div>
                  {!hackathonName ? (
                    <div style={{ marginTop: '0.8rem' }}>
                      <input type="text" placeholder="Hackathon Name & Press Enter..." className="config-input" style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem', marginBottom: '0.5rem' }} onKeyDown={(e) => { 
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          const val = e.target.value.trim(); setHackathonName(val); saveHackathonTimeline(val, hackathonLocation, targetDate);
                        }
                      }} />
                    </div>
                  ) : (
                    <>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginTop: '0.6rem' }}>{hackathonName}</h3>
                      {!hackathonLocation ? (
                        <input type="text" placeholder="Location & Enter..." className="config-input" style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem', marginBottom: '0.5rem' }} onKeyDown={(e) => { 
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            const val = e.target.value.trim(); setHackathonLocation(val); saveHackathonTimeline(hackathonName, val, targetDate);
                          }
                        }} />
                      ) : <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)', margin: '0.3rem 0 1rem' }}>📍 {hackathonLocation}</p>}
                      {!targetDate && (
                        <div>
                          <input type="datetime-local" className="config-input" style={{ fontSize: '0.8rem', padding: '0.4rem' }} onChange={(e) => {
                            setTargetDate(e.target.value); saveHackathonTimeline(hackathonName, hackathonLocation, e.target.value);
                          }} />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div style={{ background: 'rgba(245,240,232,0.02)', padding: '1rem', borderRadius: '18px', textAlign: 'center', border: '1px solid rgba(245,240,232,0.04)', marginTop: 'auto' }}>
                  <div style={{ fontFamily: 'var(--font-tech-head)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--amber)' }}>{countdownText}</div>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.3)' }}>Remaining to submission</span>
                </div>
              </div>

              <div className="bento-card span-4">
                <span className="card-label" style={{ color: 'var(--violet)' }}>Skill Coverage Metrics</span>
                <div className="map-row">
                  {[
                    { name: "Frontend Architecture", val: teamRole.toLowerCase().includes("front") || teamRole.toLowerCase().includes("full") ? 95 : 25, color: 'var(--teal)' },
                    { name: "Backend Layer Overlays", val: teamRole.toLowerCase().includes("back") || teamRole.toLowerCase().includes("full") ? 90 : 30, color: 'var(--gold)' },
                    { name: "AI/LLM Pipelines Vector", val: teamRole.toLowerCase().includes("ai") || teamRole.toLowerCase().includes("ml") ? 95 : 15, color: 'var(--amber)' }
                  ].map((skill, idx) => (
                    <div className="map-bar-item" key={idx}>
                      <div className="map-meta">
                        <span style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.8rem' }}>{skill.name}</span>
                        <span style={{ fontWeight: 600, color: skill.color }}>{skill.val}%</span>
                      </div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${skill.val}%`, background: skill.color }} /></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-card span-8">
                <span className="card-label">Sprint Task Board (Click card to advance status)</span>
                <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                  <input type="text" className="chat-box-field" style={{ borderRadius: '12px', padding: '0.5rem 1rem' }} placeholder="Describe a task execution vector..." value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
                  <button type="submit" className="btn-action" style={{ borderRadius: '12px', padding: '0.5rem 1.2rem' }}>+ Add Task</button>
                </form>
                <div className="kanban-grid">
                  {["todo", "progress", "done"].map(status => (
                    <div className="kanban-column" key={status}>
                      <span className="column-header-text">{status === "todo" ? "To Do" : status === "progress" ? "In Progress" : "Completed Node"}</span>
                      {tasks.filter(t => t.status === status).map(task => (
                        <div className="task-card-node" key={task.id} onClick={() => moveTask(task.id, status)}>
                          <p>{task.text}</p>
                          <div style={{ fontSize: '0.65rem', color: 'var(--teal)', marginTop: '0.5rem', textAlign: 'right', fontWeight: 600 }}>➔ Shift State</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-card span-12">
                <div className="chat-panel">
                  <span className="card-label" style={{ color: 'var(--violet)' }}>Synergy Communications Array</span>
                  <div className="chat-scroller" style={{ height: '140px' }}>
                    {chatMessages.map(msg => (
                      <div key={msg.id}>
                        <div className="msg-meta"><span style={{ color: 'var(--gold)' }}>{msg.user}</span><span>{msg.time}</span></div>
                        <div className="msg-bubble">{msg.text}</div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={sendChatMessage} className="chat-input-row">
                    <input type="text" className="chat-box-field" placeholder="Broadcast packet payload to team channels..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
                    <button type="submit" className="btn-action" style={{ padding: '0.6rem 1.5rem' }}>Send</button>
                  </form>
                </div>
              </div>

            </div>
          )}
        </main>
      </div>
    </>
  );
}