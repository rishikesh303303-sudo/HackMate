import React from 'react';

const styles = `
  /* Paste Dashboard CSS here */
  .form-group { margin-bottom: 1.5rem; }
  .form-label { display: block; font-size: 0.85rem; color: rgba(245,240,232,0.6); margin-bottom: 0.5rem; font-family: var(--font-tech-head); text-transform: uppercase; letter-spacing: 1px; }
  .form-input { width: 100%; background: rgba(10,10,15,0.6); border: 1px solid rgba(245,240,232,0.1); color: var(--cream); padding: 0.8rem 1.2rem; border-radius: 8px; font-family: var(--font-sans); outline: none; transition: 0.3s; }
  .form-input:focus { border-color: var(--gold); box-shadow: 0 0 10px rgba(212,168,67,0.1); }
  .danger-zone { border-top: 1px solid rgba(245,240,232,0.06); padding-top: 1.5rem; margin-top: 2rem; }
`;

export default function Settings() {
  return (
    <>
      <style>{styles}</style>
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
              <h1>Node Configuration</h1>
              <p>Adjust your system parameters and <em>security protocols.</em></p>
            </div>
          </header>

          <div className="dashboard-bento">
            <div className="dash-card col-8">
              <span className="card-label">Core Parameters</span>
              
              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input type="text" className="form-input" defaultValue="Builder Node" />
              </div>

              <div className="form-group">
                <label className="form-label">Comm-Link (Email)</label>
                <input type="email" className="form-input" defaultValue="node@hackmate.xyz" />
              </div>

              <button className="btn-action">Update Configuration</button>

              <div className="danger-zone">
                <span className="card-label" style={{ color: '#ef4444' }}>Danger Zone</span>
                <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Terminating your node will erase all synergy links and past hackathon data.
                </p>
                <button className="btn-action" style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}>
                  Terminate Node
                </button>
              </div>
            </div>

            <div className="dash-card col-4">
              <span className="card-label" style={{ color: 'var(--amber)' }}>Visibility Protocol</span>
              <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                Control how other nodes perceive your profile in the global matrix.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(245,240,232,0.02)', borderRadius: '8px', border: '1px solid rgba(245,240,232,0.05)' }}>
                <span style={{ fontSize: '0.9rem' }}>Looking for Squad</span>
                {/* Custom Toggle Switch logic can go here */}
                <span style={{ color: 'var(--teal)', fontWeight: 'bold' }}>ACTIVE</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}