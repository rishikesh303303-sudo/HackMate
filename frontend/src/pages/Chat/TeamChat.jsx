import React, { useState, useEffect, useRef } from 'react';
import API from '../../api/axios';

const SendIcon = () => (
  <svg style={{ width: '20px', height: '24px', color: '#0a0a0f' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export default function TeamChat() {
  const [messages, setMessages] = useState([
    { _id: 'mock-1', senderName: 'Anubhav', text: 'Hey Rishikesh! Dashboard layout set ho gaya kya?', time: '07:15 PM' },
    { _id: 'mock-2', senderName: 'You', text: 'Haan bhai, custom layout matrix lock kar rha hu abhi.', time: '07:18 PM' }
  ]);
  const [activeUsers, setActiveUsers] = useState([
    { name: 'Anubhav', role: 'Co-Founder' },
    { name: 'Rahul Sharma', role: 'Backend Developer' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const currentUserName = localStorage.getItem("userName") || "Rishikesh303303";
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await API.get('/api/chat/messages');
      if (response.status === 200 && response.data.messages && response.data.messages.length > 0) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.log("Database logging stream offline, serving local deck.");
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await API.get('/api/profile/all-users');
      if (response.status === 200 && response.data.users && response.data.users.length > 0) {
        setActiveUsers(response.data.users);
      }
    } catch (error) {
      console.log("User vectors offline.");
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchTeamMembers();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const textToSubmit = inputValue.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const localMsg = {
      _id: `local-${Date.now()}`,
      senderName: currentUserName,
      text: textToSubmit,
      time: currentTime
    };

    setMessages((prev) => [...prev, localMsg]);
    setInputValue('');

    try {
      await API.post('/api/chat/send', { senderName: currentUserName, text: textToSubmit });
      fetchMessages();
    } catch (error) {
      console.log("Database payload deferred.");
    }
  };

  return (
    // ✅ FIXED: Rigid top offset bypasses your fixed global navbar perfectly
    <div 
      style={{ 
        position: 'fixed', 
        top: '64px', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: 'calc(100vh - 64px)', 
        width: '100vw', 
        backgroundColor: '#050816', 
        color: '#f5f0e8', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box', 
        overflow: 'hidden',
        zIndex: 999
      }}
    >
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Fraunces:wght@700&family=Space+Grotesk:wght@500;700&display=swap');
        
        .premium-grid-bg { position: absolute; inset: 0; background-size: 60px 60px; background-image: linear-gradient(rgba(245,240,232,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,232,0.012) 1px,transparent 1px); pointer-events: none; z-index: 0; }
        .workspace-deck { display: flex; gap: 24px; max-width: 1340px; width: 100%; margin: 0 auto; padding: 20px; height: 100%; box-sizing: border-box; position: relative; z-index: 10; overflow: hidden; text-align: left; }
        
        .squad-sidebar { width: 300px; background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.05); border-radius: 24px; display: flex; flex-direction: column; height: 100%; overflow: hidden; box-sizing: border-box; flex-shrink: 0; backdrop-filter: blur(20px); }
        .chat-console { flex: 1; background: rgba(245,240,232,0.01); border: 1px solid rgba(245,240,232,0.05); border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; height: 100%; box-sizing: border-box; justify-content: space-between; backdrop-filter: blur(20px); }
        
        /* Local scroll container explicitly bypasses App.css hidden states */
        .stream-scroller { flex: 1; overflow-y: auto !important; padding: 24px; display: flex; flex-direction: column; gap: 16px; min-height: 0; box-sizing: border-box; }
        .message-bubble { max-width: 70%; padding: 12px 18px; border-radius: 18px; font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1.4; word-break: break-word; }
        .bubble-own { background: linear-gradient(135deg, #d4a843, #e8823a); color: #0a0a0f; align-self: flex-end; border-top-right-radius: 0; font-weight: 600; }
        .bubble-mate { background: rgba(245,240,232,0.02); border: 1px solid rgba(245,240,232,0.06); color: #f5f0e8; align-self: flex-start; border-top-left-radius: 0; }
        
        .input-bar-form-wrapper { padding: 18px 24px; background: rgba(5,8,22,0.95); border-top: 1px solid rgba(245,240,232,0.05); display: flex; align-items: center; gap: 16px; box-sizing: border-box; height: 80px; flex-shrink: 0; width: 100%; margin-top: auto; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(245,240,232,0.08); border-radius: 10px; }
      `}</style>

      <div className="premium-grid-bg" />

      <main className="workspace-deck">
        {/* Left Sidebar Frame */}
        <aside className="squad-sidebar">
          <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(245,240,232,0.05)' }}>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.12em', color: '#d4a843', textTransform: 'uppercase' }}>Messages</span>
          </div>

          <div style={{ padding: '16px 20px', background: 'rgba(212,168,67,0.02)', borderBottom: '1px solid rgba(245,240,232,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg, #d4a843, #e8823a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0a0a0f', fontSize: '13px', fontFamily: 'Fraunces', textAlign: 'center', lineHeight: '36px' }}>
              {currentUserName[0].toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#f5f0e8', margin: 0 }}>{currentUserName}</h5>
              <span style={{ fontSize: '10px', color: '#e8823a', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Node (You)</span>
            </div>
          </div>

          <div style={{ padding: '12px 20px 6px' }}>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.08em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase' }}>Active Channels</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
            {activeUsers.map((user, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '16px', background: 'rgba(245,240,232,0.01)', border: '1px solid rgba(245,240,232,0.03)', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: 'rgba(245,240,232,0.03)', border: '1px solid rgba(245,240,232,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#2ec4b6', fontFamily: 'Fraunces' }}>
                  {user.name ? user.name[0].toUpperCase() : 'H'}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#f5f0e8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
                  <span style={{ fontSize: '10px', color: 'rgba(245,240,232,0.4)', fontWeight: '500' }}>{user.role}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Chat Panel */}
        <section className="chat-console">
          <div style={{ padding: '18px 24px', background: 'rgba(245,240,232,0.01)', borderBottom: '1px solid rgba(245,240,232,0.05)', height: '58px', boxSizing: 'border-box', flexShrink: 0 }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontFamily: 'Fraunces', color: '#f5f0e8', fontWeight: 'bold', letterSpacing: '0.02em' }}>Console Center / Message Stream</h3>
          </div>

          <div className="stream-scroller">
            {messages.map((msg, index) => {
              const isOwn = msg.senderName === currentUserName;
              return (
                <div key={msg._id || index} className={isOwn ? 'message-bubble bubble-own' : 'message-bubble bubble-mate'}>
                  {!isOwn && <span style={{ fontSize: '10px', color: '#2ec4b6', fontWeight: 'bold', display: 'block', marginBottom: '4px', fontFamily: 'Space Grotesk' }}>{msg.senderName}</span>}
                  <p style={{ margin: 0 }}>{msg.text}</p>
                  <span style={{ fontSize: '9px', color: isOwn ? 'rgba(10,10,15,0.5)' : 'rgba(245,240,232,0.3)', marginTop: '6px', textAlign: 'right', display: 'block', fontWeight: '500' }}>{msg.time}</span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="input-bar-form-wrapper">
            <input 
              type="text" 
              placeholder="Type transmission code vector..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ flex: 1, backgroundColor: 'rgba(245,240,232,0.03)', border: '1px solid rgba(245,240,232,0.08)', color: '#f5f0e8', padding: '14px 20px', borderRadius: '14px', fontSize: '13px', outline: 'none', fontFamily: 'Plus Jakarta Sans' }} 
            />
            <button type="submit" disabled={!inputValue.trim()} style={{ padding: '12px 18px', border: 'none', borderRadius: '100px', background: inputValue.trim() ? 'linear-gradient(135deg, #d4a843, #e8823a)' : 'rgba(245,240,232,0.04)', cursor: inputValue.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', transition: '0.2s' }}>
              <SendIcon />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}