import React from 'react';

const styles = `
  .matched-cluster-node {
    background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.04);
    border-radius: 26px; padding: 2rem; text-align: left; transition: 0.3s;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .matched-cluster-node:hover { border-color: rgba(245,240,232,0.12); background: rgba(245,240,232,0.015); }
  
  .teammate-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  .teammate-identity { display: flex; align-items: center; gap: 1rem; }
  .teammate-avatar {
    width: 44px; height: 44px; border-radius: 50%; background: #1a1a24;
    border: 1px solid rgba(245,240,232,0.1); display: flex; align-items: center; justify-content: center;
    font-family: 'Fraunces', serif; font-weight: 700; color: #d4a843;
  }
  .teammate-meta-text h4 { font-family: 'Fraunces', serif; font-size: 1.15rem; color: #f5f0e8; }
  .teammate-meta-text p { font-size: 0.78rem; color: #2ec4b6; font-weight: 500; }

  .diagnostic-breakdown-box { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 1.5rem; background: rgba(245,240,232,0.01); padding: 1rem; border-radius: 16px; border: 1px solid rgba(245,240,232,0.02); }
  .diagnostic-bar-row { display: flex; flex-direction: column; gap: 0.25rem; }
  .diagnostic-label-metrics { display: flex; justify-content: space-between; font-size: 0.78rem; color: rgba(245,240,232,0.4); }
  .diagnostic-label-metrics em { font-style: normal; color: #2ec4b6; font-weight: 600; }
  .diagnostic-track { height: 4px; background: rgba(245,240,232,0.03); border-radius: 100px; overflow: hidden; }
  .diagnostic-fill { height: 100%; background: #2ec4b6; border-radius: 100px; }

  .shared-skills-deck { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.8rem; }
  .shared-skill-chip { font-size: 0.72rem; background: rgba(46,196,182,0.04); border: 1px solid rgba(46,196,182,0.15); color: #2ec4b6; padding: 0.25rem 0.7rem; border-radius: 100px; font-weight: 500; }

  .card-action-strip { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(245,240,232,0.04); padding-top: 1.2rem; }
  .btn-remove-node { background: transparent; border: none; color: rgba(232,130,58,0.5); font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .btn-remove-node:hover { color: #e8823a; }
  .btn-chat-solid { background: rgba(245,240,232,0.03); color: #f5f0e8; border: 1px solid rgba(245,240,232,0.08); padding: 0.45rem 1.1rem; border-radius: 100px; font-size: 0.78rem; font-weight: 600; cursor: pointer; }
  .btn-chat-solid:hover { background: #f5f0e8; color: #0a0a0f; border-color: #f5f0e8; }
`;

export default function MatchCard({ member, onRemove }) {
  if (!member) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="matched-cluster-node">
        <div>
          <div className="teammate-header">
            <div className="teammate-identity">
              <div className="teammate-avatar">{member.name ? member.name[0] : 'S'}</div>
              <div className="teammate-meta-text">
                <h4>{member.name || "Squad Member"}</h4>
                <p>{member.role || "Engineering Node"}</p>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'Space Grotesk', fontWeight: 700, color: '#d4a843', background: 'rgba(212,168,67,0.05)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
              Vector: {member.matchScore || 85}%
            </span>
          </div>

          {/* Diagnostic Match Metrics breakdown */}
          <div className="diagnostic-breakdown-box">
            <div className="diagnostic-bar-row">
              <div className="diagnostic-label-metrics">
                <span>Vector Code Alignment</span>
                <em>{member.matchScore ? member.matchScore : 85}%</em>
              </div>
              <div className="diagnostic-track">
                <div className="diagnostic-fill" style={{ width: `${member.matchScore || 85}%` }} />
              </div>
            </div>
            <div className="diagnostic-bar-row">
              <div className="diagnostic-label-metrics">
                <span>Domain Synchronicity</span>
                <em>90%</em>
              </div>
              <div className="diagnostic-track">
                <div className="diagnostic-fill" style={{ width: '90%', background: '#7c3aed' }} />
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,240,232,0.3)', marginBottom: '0.5rem', fontWeight: 700 }}>Intersecting Core Capabilities</div>
          <div className="shared-skills-deck">
            {member.skills && member.skills.map((skill, index) => (
              <span className="shared-skill-chip" key={index}>⚡ {skill}</span>
            ))}
          </div>
        </div>

        <div className="card-action-strip">
          <button className="btn-remove-node" onClick={() => onRemove(member.id)}>De-auth Node</button>
          <button className="btn-chat-solid">Open Comms</button>
        </div>
      </div>
    </>
  );
}