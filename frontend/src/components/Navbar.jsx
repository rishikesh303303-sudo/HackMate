import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarLetter, setAvatarLetter] = useState("U");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("userName");
    
    if (token) {
      setIsLoggedIn(true);
      if (storedName) {
        setAvatarLetter(storedName.trim().charAt(0).toUpperCase());
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.2rem 4rem', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(245,240,232,0.05)', background: 'rgba(10,10,15,0.6)'
    }}>
      {/* Logo Component Linked to Landing */}
      <Link to="/" style={{
        fontFamily: 'var(--font-display, "Fraunces", serif)', fontWeight: 700, fontSize: '1.6rem',
        textDecoration: 'none', background: 'linear-gradient(135deg, #f5f0e8 30%, #d4a843 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }} onClick={() => setDropdownOpen(false)}>
        HackMate
      </Link>
      
      {/* Navigation Links and Action Hub */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', position: 'relative' }}>
        
        {/* Main Navbar Links */}
        <Link to="/hackathons" style={{ color: '#f5f0e8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Hackathons</Link>
        {isLoggedIn && (
          <Link to="/notifications" style={{ color: '#f5f0e8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Notifications</Link>
        )}
        
        {isLoggedIn ? (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Avatar Trigger Badge */}
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(245,240,232,0.03)',
                border: '1px solid rgba(245,240,232,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: '#d4a843', cursor: 'pointer', userSelect: 'none', fontFamily: 'sans-serif'
              }}
            >
              {avatarLetter}
            </div>

            {/* Dropdown Menu Box */}
            {dropdownOpen && (
              <div 
                onMouseLeave={() => setDropdownOpen(false)}
                style={{
                  position: 'absolute', top: '50px', right: 0, width: '180px', background: '#0f0f17',
                  border: '1px solid rgba(245,240,232,0.08)', borderRadius: '16px', padding: '0.6rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '0.2rem', zIndex: 1100
                }}
              >
                <Link to="/profile" style={{ color: 'rgba(245,240,232,0.6)', padding: '0.5rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', textAlign: 'left' }} onClick={() => setDropdownOpen(false)}>My Profile</Link>
                <Link to="/find-team" style={{ color: 'rgba(245,240,232,0.6)', padding: '0.5rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', textAlign: 'left' }} onClick={() => setDropdownOpen(false)}>Find Squad</Link>
                <Link to="/dashboard" style={{ color: 'rgba(245,240,232,0.6)', padding: '0.5rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', textAlign: 'left' }} onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                <Link to="/team-dashboard" style={{ color: 'rgba(245,240,232,0.6)', padding: '0.5rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', textAlign: 'left' }} onClick={() => setDropdownOpen(false)}>Team Workspace</Link>
                <Link to="/chat" style={{ color: 'rgba(245,240,232,0.6)', padding: '0.5rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', textAlign: 'left' }} onClick={() => setDropdownOpen(false)}>Chat</Link>
                <Link to="/settings" style={{ color: 'rgba(245,240,232,0.6)', padding: '0.5rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', textAlign: 'left' }} onClick={() => setDropdownOpen(false)}>Settings</Link>
                
                <div 
                  style={{ color: '#e8823a', padding: '0.5rem 0.8rem', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', borderTop: '1px solid rgba(245,240,232,0.04)', marginTop: '0.4rem', paddingTop: '0.4rem', textAlign: 'left' }} 
                  onClick={handleLogout}
                >
                  Logout Node
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Login/Signup Button fallback if logged out */
          <button 
            onClick={() => navigate('/auth')}
            style={{
              background: '#f5f0e8', color: '#0a0a0f', border: 'none',
              padding: '0.5rem 1.4rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
}