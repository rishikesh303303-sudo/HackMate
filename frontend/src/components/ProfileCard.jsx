import React from 'react';

const styles = `
  .hacker-identity-node {
    background: rgba(245, 240, 232, 0.01); border: 1px solid rgba(245, 240, 232, 0.05);
    border-radius: 24px; padding: 1.8rem; position: relative; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex; flex-direction: column; justify-content: space-between; text-align: left;
  }
  .hacker-identity-node:hover {
    border-color: rgba(46, 196, 182, 0.25);
    background: rgba(46, 196, 182, 0.01);
    box-shadow: 0 12px 40px rgba(46, 196, 182, 0.04);
    transform: translateY(-2px);
  }
  .deck-top-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
  .meta-node-cluster { display: flex; gap: 1rem; align-items: center; }
  .avatar-block {
    width: 48px; height: 48px; border-radius: 100px; background: rgba(245,240,232,0.02);
    border: 1px solid rgba(245,240,232,0.1); display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', serif; font-weight: 700; color: #d4a843; font-size: 1.1rem;
  }
  .info-block h3 { font-family: 'Fraunces', serif; font-size: 1.2rem; color: #f5f0e8; }
  .info-block p { font-size: 0.78rem; color: rgba(245,240,232,0.4); margin-top: 0.1rem; }
  
  .score-radial-wrapper { position: relative; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; }
  .score-val { position: absolute; font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; color: #2ec4b6; }

  .role-tag-badge {
    display: inline-block; background: rgba(46, 196, 182, 0.05); border: 1px solid rgba(46, 196, 182, 0.15);
    color: #2ec4b6; font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.8rem; border-radius: 100px; margin-bottom: 1.2rem; width: fit-content;
  }
  .skills-token-wrapper { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
  .skill-pill-token { font-size: 0.72rem; background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.06); color: rgba(245,240,232,0.7); padding: 0.25rem 0.7rem; border-radius: 100px; }
  .skill-pill-overflow { font-size: 0.72rem; color: #d4a843; font-weight: 600; padding: 0.25rem 0.4rem; }

  .deck-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(245,240,232,0.04); padding-top: 1.1rem; }
  .btn-sm-outline { background: transparent; color: #f5f0e8; border: 1px solid rgba(245,240,232,0.1); padding: 0.5rem 1rem; border-radius: 100px; font-size: 0.78rem; font-weight: 600; cursor: pointer; }
  .btn-sm-outline:hover { border-color: #f5f0e8; }
  .btn-sm-solid { background: linear-gradient(135deg, #d4a843, #e8823a); color: #0a0a0f; border: none; padding: 0.5rem 1.1rem; border-radius: 100px; font-size: 0.78rem; font-weight: 700; cursor: pointer; }
  .btn-sm-solid:hover { box-shadow: 0 4px 15px rgba(212,168,67,0.2); }
`;

export default function ProfileCard({ data, onViewBreakdown }) {
  if (!data) return null;
  const maxVisibleSkills = 4;
  const visibleSkills = data.skills ? data.skills.slice(0, maxVisibleSkills) : [];
  const overflowCount = data.skills ? data.skills.length - maxVisibleSkills : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="hacker-identity-node">
        <div>
          <div className="deck-top-row">
            <div className="meta-node-cluster">
              <div className="avatar-block">{data.name ? data.name[0] : 'H'}</div>
              <div className="info-block">
                <h3>{data.name || "Anonymous Developer"}</h3>
                <p>{data.college || "Global Node Hub"}</p>
              </div>
            </div>
            <div className="score-radial-wrapper" onClick={onViewBreakdown} style={{ cursor: 'pointer' }}>
              <svg width="50" height="50" viewBox="0 0 36 36">
                <path stroke="rgba(245,240,232,0.02)" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#2ec4b6" strokeWidth="3" strokeDasharray={`${data.matchScore || 80}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="score-val">{data.matchScore || 80}%</span>
            </div>
          </div>

          <div className="role-tag-badge">{data.role || "Builder Component"}</div>

          <div className="skills-token-wrapper">
            {visibleSkills.map((skill, index) => (
              <span className="skill-pill-token" key={index}>{skill}</span>
            ))}
            {overflowCount > 0 && (
              <span className="skill-pill-overflow">+{overflowCount} more</span>
            )}
          </div>
        </div>

        <div className="deck-footer">
          <button className="btn-sm-outline" onClick={onViewBreakdown}>View Profile</button>
          <button className="btn-sm-solid">Connect ✦</button>
        </div>
      </div>
    </>
  );
}