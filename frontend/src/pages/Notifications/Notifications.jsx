import React, { useState, useEffect } from 'react';

export default function App() {
  // State for interactivity
  const [activeFilter, setActiveFilter] = useState('All');
  const [readNotifications, setReadNotifications] = useState({
    1: false, 
    2: false, 
    3: false, 
    4: false  
  });
  const [inviteStatus, setInviteStatus] = useState(null); 
  const [toasts, setToasts] = useState([]);

  // Toast helper for responsive micro-interactions
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const handleMarkAllRead = () => {
    setReadNotifications({ 1: true, 2: true, 3: true, 4: true });
    triggerToast('All notifications marked as read', 'gold');
  };

  const handleAcceptInvite = () => {
    setInviteStatus('accepted');
    setReadNotifications(prev => ({ ...prev, 1: true }));
    triggerToast('Successfully joined team "CodeCrafters"', 'emerald');
  };

  const handleDeclineInvite = () => {
    setInviteStatus('declined');
    setReadNotifications(prev => ({ ...prev, 1: true }));
    triggerToast('Declined team invite from Rahul Sharma', 'rose');
  };

  const toggleSingleRead = (id) => {
    setReadNotifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock notifications structure matching screenshot
  const notifications = [
    {
      id: 1,
      type: 'Invites',
      time: '2m ago',
      color: '#A855F7', 
      bgClass: 'from-[#A855F7]/10 to-transparent',
      avatarBg: 'bg-[#21163b]',
      avatarBorder: 'border-[#A855F7]/20',
      textColor: 'text-[#A855F7]',
      renderContent: () => (
        <div className="flex-1">
          <div className="text-sm md:text-base font-medium text-[#F1F5F9] leading-relaxed">
            <span className="text-[#B069FF] font-semibold hover:underline cursor-pointer">Rahul Sharma</span>{' '}
            invited you to join{' '}
            <span className="text-[#10B981] font-semibold hover:underline cursor-pointer">“CodeCrafters”</span>
          </div>
          <p className="text-xs md:text-sm text-[#94A3B8] mt-1">
            Join this team and build something amazing together!
          </p>
          {inviteStatus === null ? (
            <div className="flex items-center space-x-3 mt-4">
              <button
                onClick={handleAcceptInvite}
                className="px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#FF6B35] text-white hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
              >
                Accept
              </button>
              <button
                onClick={handleDeclineInvite}
                className="px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-[#1D2136] text-[#94A3B8] border border-[#2A2F4E] hover:bg-[#2A2E4B] hover:text-[#E2E8F0] active:scale-95 transition-all"
              >
                Decline
              </button>
            </div>
          ) : (
            <div className="mt-3 flex items-center space-x-2">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                inviteStatus === 'accepted' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
              }`}>
                {inviteStatus === 'accepted' ? '✓ Accepted' : '✕ Declined'}
              </span>
            </div>
          )}
        </div>
      )
    },
    {
      id: 2,
      type: 'Invites',
      time: '15m ago',
      color: '#FF7A45', 
      bgClass: 'from-[#FF7A45]/10 to-transparent',
      avatarBg: 'bg-[#2d1a15]',
      avatarBorder: 'border-[#FF7A45]/20',
      textColor: 'text-[#FF7A45]',
      renderContent: () => (
        <div className="flex-1">
          <div className="text-sm md:text-base font-medium text-[#F1F5F9] leading-relaxed">
            You sent a team invite to{' '}
            <span className="text-[#FF7A45] font-semibold hover:underline cursor-pointer">Priya Patel</span>
          </div>
          <p className="text-xs md:text-sm text-[#94A3B8] mt-1">
            Waiting for their response.
          </p>
        </div>
      )
    },
    {
      id: 3,
      type: 'Team Updates',
      time: '1h ago',
      color: '#10B981', 
      bgClass: 'from-[#10B981]/10 to-transparent',
      avatarBg: 'bg-[#0f2421]',
      avatarBorder: 'border-[#10B981]/20',
      textColor: 'text-[#10B981]',
      renderContent: () => (
        <div className="flex-1">
          <div className="text-sm md:text-base font-medium text-[#F1F5F9] leading-relaxed">
            <span className="text-[#10B981] font-semibold hover:underline cursor-pointer">Amit Verma</span>{' '}
            joined your team{' '}
            <span className="text-[#10B981] font-semibold hover:underline cursor-pointer">“CodeCrafters”</span>
          </div>
          <p className="text-xs md:text-sm text-[#94A3B8] mt-1">
            Your team is getting stronger!
          </p>
        </div>
      )
    },
    {
      id: 4,
      type: 'System',
      time: '3h ago',
      color: '#FF5E97', 
      bgClass: 'from-[#FF5E97]/10 to-transparent',
      avatarBg: 'bg-[#2b141e]',
      avatarBorder: 'border-[#FF5E97]/20',
      textColor: 'text-[#FF5E97]',
      renderContent: () => (
        <div className="flex-1">
          <div className="text-sm md:text-base font-medium text-[#F1F5F9] leading-relaxed">
            New hackathon{' '}
            <span className="text-[#FF5E97] font-semibold hover:underline cursor-pointer">“Build for Future”</span>{' '}
            is live!
          </div>
          <p className="text-xs md:text-sm text-[#94A3B8] mt-1">
            Register now and showcase your skills.
          </p>
        </div>
      )
    }
  ];

  // Filtering notifications logic
  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'All') return true;
    return notif.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-[#ECEFF4] font-sans relative overflow-hidden flex flex-col selection:bg-[#FF7A45]/30 selection:text-[#F1F5F9]">
      
      {/* Dynamic Fonts Injection & Grid Overlay Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        
        .font-serif-premium {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-sans-premium {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        
        /* Subtle Luxurious Grid Texture */
        .bg-grid-pattern {
          background-size: 55px 55px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
        }

        /* Fluid Gradient Glow Blurs */
        .glow-purple-left {
          filter: blur(140px);
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%);
        }
        
        .glow-orange-right {
          filter: blur(140px);
          background: radial-gradient(circle, rgba(251, 122, 69, 0.12) 0%, rgba(251, 122, 69, 0) 70%);
        }

        .glow-cyan-center {
          filter: blur(160px);
          background: radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, rgba(244, 63, 94, 0.05) 50%, rgba(0,0,0,0) 100%);
        }
      `}</style>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-80" />

      {/* Cinematic Ambient Glow Elements */}
      <div className="absolute top-[10%] left-[-15%] w-[60vw] h-[60vw] rounded-full glow-purple-left pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-15%] w-[60vw] h-[60vw] rounded-full glow-orange-right pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[20%] w-[55vw] h-[55vw] rounded-full glow-cyan-center pointer-events-none z-0" />
      
      {/* Dark Vignette Overlay for Premium Luxury Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-transparent to-[#050816]/70 pointer-events-none z-0" />

      {/* Glassmorphism Navbar */}
      <nav className="sticky top-0 w-full bg-[#070B17]/40 backdrop-blur-xl border-b border-[#1F233B]/30 px-6 md:px-12 py-4 flex items-center justify-between z-50">
        <div className="flex items-center space-x-2">
          <span className="font-serif-premium italic text-2xl font-black text-[#FDF6E2] tracking-wide cursor-pointer hover:opacity-90 transition-opacity">
            HackMate
          </span>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <span className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">Hackathons</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A45] to-[#FF5E97] font-semibold cursor-pointer relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-[#FF7A45]">
              Notifications
            </span>
          </div>

          {/* Golden Badge Counter for unread notifications */}
          {Object.values(readNotifications).filter(v => !v).length > 0 && (
            <div className="bg-[#CCA43B]/20 text-[#E5A93C] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#CCA43B]/30 animate-pulse">
              {Object.values(readNotifications).filter(v => !v).length} New
            </div>
          )}

          
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#D946EF] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer hover:scale-105 active:scale-95 transition-all">
            R
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 md:py-16 relative z-10 font-sans-premium">
        
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold font-serif-premium tracking-tight bg-gradient-to-r from-[#FF7A45] via-[#FF5E97] to-[#EC4899] bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-[#94A3B8] text-sm md:text-base mt-2 font-medium tracking-wide">
            Stay updated with your HackMate activity.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Left: Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {['All', 'Invites', 'Team Updates', 'System'].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'border-[#E5A93C] text-[#E5A93C] bg-[#E5A93C]/5 shadow-[0_0_15px_rgba(229,169,60,0.15)] border'
                      : 'bg-[#151a30]/40 text-[#94A3B8] border border-[#1F233B]/40 hover:text-[#ECEFF4] hover:bg-[#1E2548]/50'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Right: Mark All As Read */}
          <button
            onClick={handleMarkAllRead}
            disabled={Object.values(readNotifications).every(v => v)}
            className={`flex items-center space-x-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold border transition-all duration-300 ${
              Object.values(readNotifications).every(v => v)
                ? 'opacity-45 cursor-not-allowed border-slate-800 text-slate-500 bg-transparent'
                : 'border-[#E5A93C]/50 text-[#E5A93C] bg-[#E5A93C]/5 hover:bg-[#E5A93C]/10 active:scale-95 shadow-[0_0_12px_rgba(229,169,60,0.1)]'
            }`}
          >
            {/* Double Check Icon */}
            <svg
              className="w-4 h-4 text-[#E5A93C]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <span>Mark all as read</span>
          </button>
        </div>

        {/* Notifications Stack Container */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const isRead = readNotifications[notif.id];
              return (
                <div
                  key={notif.id}
                  onClick={() => toggleSingleRead(notif.id)}
                  className={`group relative overflow-hidden backdrop-blur-md rounded-2xl p-5 md:p-6 border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.01)] ${
                    isRead 
                      ? 'bg-[#101426]/20 border-[#1F233B]/20 opacity-70' 
                      : 'bg-gradient-to-br from-[#11142A]/60 to-[#070914]/80 border-[#1F233B]/50'
                  }`}
                >
                  {/* Faint hover glowing backdrop for exquisite premium touch */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${notif.bgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Left Half: Icon + Custom Layout */}
                  <div className="flex items-start flex-1 min-w-0">
                    
                    {/* Circle Icon Badge */}
                    <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center border ${notif.avatarBg} ${notif.avatarBorder} group-hover:scale-105 transition-transform duration-300 relative`}>
                      {notif.id === 1 && (
                        /* User Add Invite Icon */
                        <svg className={`w-5 h-5 ${notif.textColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6 6 0 0110.95-3.582M4 19.235A10.18 10.18 0 0010.125 21a10.178 10.178 0 006.125-1.765" />
                        </svg>
                      )}
                      {notif.id === 2 && (
                        /* Sent Invite / Arrow User Icon */
                        <svg className={`w-5 h-5 ${notif.textColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6 6 0 0110.95-3.582M4 19.235A10.18 10.18 0 0010.125 21a10.178 10.178 0 006.125-1.765" />
                        </svg>
                      )}
                      {notif.id === 3 && (
                        /* Group/Users Icon */
                        <svg className={`w-5 h-5 ${notif.textColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                      )}
                      {notif.id === 4 && (
                        /* Bell Icon */
                        <svg className={`w-5 h-5 ${notif.textColor}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                        </svg>
                      )}
                    </div>

                    {/* Notification Body Content */}
                    <div className="ml-4 flex-1">
                      {notif.renderContent()}
                    </div>
                  </div>

                  {/* Right Half: Timestamp + Glowing indicator status dot */}
                  <div className="flex items-center space-x-4 self-end md:self-center shrink-0">
                    <span className="text-xs md:text-sm text-[#64748B] font-medium tracking-wide">
                      {notif.time}
                    </span>
                    
                    {/* Status Glowing Dot */}
                    <div className="relative flex items-center justify-center w-3 h-3">
                      {!isRead && (
                        <div
                          className="absolute w-2 h-2 rounded-full animate-ping"
                          style={{ backgroundColor: notif.color, opacity: 0.75 }}
                        />
                      )}
                      <div
                        onClick={(e) => {
                          e.stopPropagation(); 
                          toggleSingleRead(notif.id);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 relative z-10 ${
                          isRead ? 'bg-slate-800 scale-75 opacity-40' : ''
                        }`}
                        style={{
                          backgroundColor: isRead ? undefined : notif.color,
                          boxShadow: isRead ? 'none' : `0 0 10px ${notif.color}`
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* Elegant empty state glass card if no notifications match filter */
            <div className="bg-[#101426]/30 backdrop-blur-md rounded-2xl p-12 border border-[#1F233B]/40 text-center">
              <svg className="w-12 h-12 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.961 8.961 0 01-2.3-6.022c0-3.47 2.006-6.471 5.112-7.927M12 3.125c1.217 0 2.407.222 3.52.651M12 3.125a12.06 12.06 0 01-6.112 1.765m12.224 0A12.042 12.042 0 0118 9.75v.7V9a6 6 0 00-6-6z" />
              </svg>
              <h3 className="text-[#ECEFF4] font-semibold text-lg">No Notifications</h3>
              <p className="text-[#64748B] text-sm mt-1">There are no {activeFilter} alerts found.</p>
              {activeFilter !== 'All' && (
                <button
                  onClick={() => setActiveFilter('All')}
                  className="mt-4 px-4 py-1.5 bg-[#1C2035] text-slate-300 hover:text-white rounded-full text-xs font-semibold border border-slate-800 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer info/controls for immersive sandboxed environment testing */}
        <footer className="mt-16 text-center border-t border-[#1F233B]/20 pt-8">
          <p className="text-xs text-slate-500 tracking-wider uppercase">
            Designed for HackMate • Pixel Perfect Recreation
          </p>
          {(Object.values(readNotifications).some(v => v) || inviteStatus !== null) && (
            <button
              onClick={() => {
                setReadNotifications({ 1: false, 2: false, 3: false, 4: false });
                setInviteStatus(null);
                triggerToast('Dashboard reset to default', 'indigo');
              }}
              className="mt-4 text-xs font-semibold text-[#FF7A45] hover:underline"
            >
              Reset view to default mock state
            </button>
          )}
        </footer>
      </main>

      {/* Elegant Real-Time Toasts Wrapper */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-md pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between space-x-4 px-5 py-4.5 rounded-2xl shadow-2xl backdrop-blur-md border animate-bounce ${
              toast.type === 'emerald'
                ? 'bg-[#0B251C]/90 border-[#10B981]/40 text-[#10B981]'
                : toast.type === 'rose'
                ? 'bg-[#2B101C]/90 border-[#EF4444]/40 text-[#EF4444]'
                : toast.type === 'gold'
                ? 'bg-[#281E0C]/90 border-[#CCA43B]/40 text-[#E5A93C]'
                : 'bg-[#101426]/90 border-[#6366F1]/40 text-[#818CF8]'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="hover:opacity-75"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}