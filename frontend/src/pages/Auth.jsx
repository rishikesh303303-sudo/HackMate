import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import API from '../api/axios'; 

const styles = `
  .auth-page-frame { position: relative; min-height: 100vh; color: #f5f0e8; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; }
  .bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: #0a0a0f; }
  .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.15; }
  .orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #2ec4b6, transparent 70%); top: -10%; left: -10%; }
  .grid-overlay { position: absolute; inset: 0; background-size: 60px 60px; background-image: linear-gradient(rgba(245,240,232,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.015) 1px, transparent 1px); }
  
  .auth-bento-card { position: relative; z-index: 1; background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.05); border-radius: 28px; padding: 3rem 2.5rem; max-width: 420px; width: 100%; text-align: center; backdrop-filter: blur(10px); }
  .auth-bento-card h2 { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
  .auth-bento-card p { font-size: 0.88rem; color: rgba(245,240,232,0.4); margin-bottom: 2rem; }

  .divider-row { display: flex; align-items: center; text-align: center; margin: 1.5rem 0; color: rgba(245,240,232,0.2); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }
  .divider-row::before, .divider-row::after { content: ''; flex: 1; border-bottom: 1px solid rgba(245,240,232,0.06); }
  .divider-row:not(:empty)::before { margin-right: .75em; }
  .divider-row:not(:empty)::after { margin-left: .75em; }

  .input-group { display: flex; flex-direction: column; gap: 0.4rem; text-align: left; margin-bottom: 1.2rem; }
  .input-group label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(245,240,232,0.4); font-weight: 600; }
  .auth-field { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.08); border-radius: 14px; padding: 0.8rem 1.2rem; color: #f5f0e8; font-size: 0.92rem; width: 100%; }
  .auth-field:focus { outline: none; border-color: #2ec4b6; }

  .btn-auth-submit { background: #f5f0e8; color: #0a0a0f; border: none; padding: 0.8rem; border-radius: 100px; font-weight: 700; font-size: 0.9rem; cursor: pointer; width: 100%; transition: 0.2s; margin-top: 0.5rem; }
  .btn-auth-submit:hover { background: #d4a843; }
  
  .toggle-auth-mode { font-size: 0.82rem; color: rgba(245,240,232,0.4); margin-top: 1.5rem; cursor: pointer; }
  .toggle-auth-mode span { color: #d4a843; font-weight: 600; }
  .google-btn-wrapper { display: flex; justify-content: center; margin-bottom: 0.5rem; width: 100%; max-width: 100%; overflow: hidden; }

  /* 📱 MOBILE RESPONSIVE EXTENSIONS ONLY (Laptop styles kept intact) */
  @media (max-width: 768px) {
    .auth-page-frame { padding: 2rem 1rem !important; }
    .auth-bento-card { padding: 2rem 1.5rem !important; border-radius: 20px !important; }
    .auth-bento-card h2 { font-size: 1.6rem !important; }
    .auth-bento-card p { margin-bottom: 1.5rem !important; font-size: 0.82rem !important; }
  }
`;

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      const response = await API.post('/api/auth/google', {
        token: idToken
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("userMeta", JSON.stringify(response.data.user));
        
        alert("Google Login Successful! Payload synchronized in MongoDB Atlas 🎉");
        navigate('/profile');
      }
    } catch (error) {
      console.error("Google Authentication Stream Crashed:", error);
      alert("Verification failed on the node endpoint.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google Authentication Stream Crashed");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const derivedName = email.split('@')[0];
    const firstWord = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    localStorage.setItem("authToken", "manual-session-token");
    localStorage.setItem("userName", firstWord); 
    
    navigate('/dashboard');
  };

  return (
    <>
      <style>{styles}</style>
      
      <div className="bg-canvas">
        <div className="orb orb-1" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-page-frame">
        <div className="auth-bento-card">
          <h2>{isLogin ? "Welcome Back" : "Create Node Account"}</h2>
          <p>{isLogin ? "Initialize secure session tunnel." : "Register your developer credentials vector."}</p>

          <div className="google-btn-wrapper">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_dark"
              shape="pill"
              width="100%"
            />
          </div>

          <div className="divider-row">or pass credentials</div>

          <form onSubmit={handleFormSubmit}>
            <div className="input-group">
              <label>Email Endpoint</label>
              <input type="email" className="auth-field" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@college.edu" />
            </div>
            <div className="input-group" style={{ marginBottom: '1.8rem' }}>
              <label>Security Hash Key (Password)</label>
              <input type="password" className="auth-field" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <button type="submit" className="btn-auth-submit">
              {isLogin ? "Authorize Node ➔" : "Build Node Account ✦"}
            </button>
          </form>

          <div className="toggle-auth-mode" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "New builder to the grid? " : "Already registered on matrix? "}
            <span>{isLogin ? "Create Account" : "Sign In"}</span>
          </div>
        </div>
      </div>
    </>
  );
}