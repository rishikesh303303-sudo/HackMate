import React, { useState, useEffect } from 'react';

// Custom icons as React components to avoid external resource issues
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TrophyIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UsersIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

export default function App() {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  
  // Interactive Modal State
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredTeams, setRegisteredTeams] = useState({}); // { hackathonId: teamName }
  const [teamNameInput, setTeamNameInput] = useState('');
  const [toasts, setToasts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newH, setNewH] = useState({ title: '', location: '', teamSize: '', prize: '', description: '' });

  // Toast triggers
  const triggerToast = (message, type = 'success') => {

    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const handleRegister = (hackathonId, title) => {
  
    if (!teamNameInput.trim()) {
      triggerToast('Please enter a team name', 'error');
      return;
    }
    setRegisteredTeams(prev => ({ ...prev, [hackathonId]: teamNameInput }));
    setTeamNameInput('');
    setIsRegistering(false);
    triggerToast(`Successfully registered for ${title}!`, 'success');
  };
   

  const handleUnregister = (hackathonId, title) => {
    setRegisteredTeams(prev => {
      const copy = { ...prev };
      delete copy[hackathonId];
      return copy;
    });
    triggerToast(`Cancelled registration for ${title}.`, 'info');
  };
  const handleAddNewHackathon = () => {
  if(!newH.title || !newH.description) return triggerToast('Title & Description required', 'error');
  const hackathonsDataCopy = [...hackathonsData, { ...newH, id: Date.now(), date: 'TBD', category: 'General', status: 'Online', gradient: 'from-[#7C3AED] via-[#EC4899] to-[#FF6B35]', badgeColor: 'bg-[#7C3AED]/10 text-[#C084FC] border-[#7C3AED]/20', iconColor: 'text-[#7C3AED]' }];
  setIsAddModalOpen(false);
  triggerToast('Hackathon Added to Matrix!');
};

  // Static Hackathons Data
  const hackathonsData = [
    {
      id: 1,
      title: 'Build for Future',
      date: '30 May – 1 Jun 2026',
      description: 'Build innovative solutions for a better tomorrow. Open to all builders, dreamers, and doers.',
      category: 'Web Development',
      status: 'Online',
      featured: true,
      teamSize: 'Teams of 2 – 4',
      prize: '₹1,00,000 Prize Pool',
      color: '#A855F7', // Purple
      gradient: 'from-[#7C3AED] via-[#EC4899] to-[#FF6B35]',
      badgeColor: 'bg-[#A855F7]/10 text-[#C084FC] border-[#A855F7]/20',
      tagColor: 'bg-[#A855F7]/20 text-white',
      cardBorder: 'border-[#A855F7]/30 hover:border-[#A855F7]/70',
      iconColor: 'text-[#A855F7]',
      // Custom inline premium SVG graphic to match screenshot
      svgGraphic: (
        <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g transform="translate(100, 20)">
            {/* Grid structure */}
            <path d="M 0,80 L 100,30 L 200,80 L 100,130 Z" fill="none" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.2" />
            <path d="M 20,70 L 100,40 L 180,70 L 100,100 Z" fill="none" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.3" />
            {/* 3D Isometric Buildings */}
            <polygon points="50,65 50,110 75,120 75,75" fill="url(#purpleGlow)" stroke="#C084FC" strokeWidth="1" />
            <polygon points="75,75 75,120 100,110 100,65" fill="#7C3AED" fillOpacity="0.4" stroke="#C084FC" strokeWidth="1" />
            <polygon points="50,65 75,75 100,65 75,55" fill="#C084FC" fillOpacity="0.6" stroke="#C084FC" strokeWidth="1" />

            <polygon points="110,65 110,120 135,130 135,75" fill="url(#purpleGlow)" stroke="#C084FC" strokeWidth="1" />
            <polygon points="135,75 135,130 160,120 160,65" fill="#7C3AED" fillOpacity="0.4" stroke="#C084FC" strokeWidth="1" />
            <polygon points="110,65 135,75 160,65 135,55" fill="#C084FC" fillOpacity="0.6" stroke="#C084FC" strokeWidth="1" />

            <polygon points="80,45 80,90 105,100 105,55" fill="url(#purpleGlow)" stroke="#C084FC" strokeWidth="1.2" />
            <polygon points="105,55 105,100 130,90 130,45" fill="#7C3AED" fillOpacity="0.5" stroke="#C084FC" strokeWidth="1.2" />
            <polygon points="80,45 105,55 130,45 105,35" fill="#C084FC" fillOpacity="0.8" stroke="#C084FC" strokeWidth="1.2" />
            {/* Light beams */}
            <line x1="105" y1="35" x2="105" y2="0" stroke="#FF6B35" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="105" cy="0" r="3" fill="#FF5E97" className="animate-ping" />
          </g>
        </svg>
      )
    },
    {
      id: 2,
      title: 'AI Nexus Hack',
      date: '6 Jun – 8 Jun 2026',
      description: 'Explore the power of AI and build intelligent solutions that can change the world.',
      category: 'AI/ML',
      status: 'Online',
      featured: false,
      teamSize: 'Teams of 1 – 4',
      prize: '₹75,000 Prize Pool',
      color: '#14B8A6', // Cyan/Green
      gradient: 'from-[#0D9488] via-[#14B8A6] to-[#F59E0B]',
      badgeColor: 'bg-[#14B8A6]/10 text-[#2DD4BF] border-[#14B8A6]/20',
      tagColor: 'bg-[#14B8A6]/20 text-white',
      cardBorder: 'border-[#14B8A6]/30 hover:border-[#14B8A6]/70',
      iconColor: 'text-[#14B8A6]',
      // Brain Illustration
      svgGraphic: (
        <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
          <defs>
            <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#050816" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="200" fill="url(#cyanGlow)" opacity="0.4" />
          <g transform="translate(140, 40)" stroke="#2DD4BF" strokeWidth="1.5" fill="none">
            {/* Left Brain Hemisphere structure */}
            <path d="M60,20 C30,20 20,40 20,60 C20,85 35,90 40,110 C45,120 55,130 60,130" strokeOpacity="0.8" />
            <path d="M60,40 C40,40 35,60 35,75 C35,90 45,95 50,110" strokeOpacity="0.6" />
            {/* Right Brain Hemisphere structure */}
            <path d="M60,20 C90,20 100,40 100,60 C100,85 85,90 80,110 C75,120 65,130 60,130" strokeOpacity="0.8" />
            <path d="M60,40 C80,40 85,60 85,75 C85,90 75,95 70,110" strokeOpacity="0.6" />
            {/* Neural Connections & Points */}
            <g fill="#2DD4BF">
              <circle cx="60" cy="20" r="3.5" className="animate-pulse" />
              <circle cx="20" cy="60" r="3" />
              <circle cx="100" cy="60" r="3" />
              <circle cx="40" cy="110" r="3" />
              <circle cx="80" cy="110" r="3" />
              <circle cx="60" cy="130" r="3.5" />
              <circle cx="60" cy="70" r="4" fill="#F59E0B" />
              {/* Inner Synapse paths */}
              <line x1="60" y1="20" x2="60" y2="70" strokeOpacity="0.4" />
              <line x1="20" y1="60" x2="60" y2="70" strokeOpacity="0.4" />
              <line x1="100" y1="60" x2="60" y2="70" strokeOpacity="0.4" />
              <line x1="40" y1="110" x2="60" y2="70" strokeOpacity="0.4" />
              <line x1="80" y1="110" x2="60" y2="70" strokeOpacity="0.4" />
            </g>
          </g>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Web3 Warriors',
      date: '13 Jun – 15 Jun 2026',
      description: 'Build decentralized apps and explore the future of the internet.',
      category: 'Web3',
      status: 'Online',
      featured: false,
      teamSize: 'Teams of 2 – 5',
      prize: '₹80,000 Prize Pool',
      color: '#EA580C', // Orange
      gradient: 'from-[#C2410C] via-[#EA580C] to-[#F97316]',
      badgeColor: 'bg-[#EA580C]/10 text-[#FB923C] border-[#EA580C]/20',
      tagColor: 'bg-[#EA580C]/20 text-white',
      cardBorder: 'border-[#EA580C]/30 hover:border-[#EA580C]/70',
      iconColor: 'text-[#EA580C]',
      // Cubes Illustration
      svgGraphic: (
        <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="orangeCube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g transform="translate(130, 30)">
            {/* Primary isometric grid cube wireframes */}
            <g stroke="#FB923C" strokeWidth="1.5" fill="none">
              {/* Cube 1 (Back left) */}
              <polygon points="40,55 70,40 100,55 70,70" fill="url(#orangeCube)" fillOpacity="0.3" />
              <polygon points="40,55 70,70 70,105 40,90" />
              <polygon points="100,55 70,70 70,105 100,90" />

              {/* Cube 2 (Back Right) */}
              <polygon points="90,75 120,60 150,75 120,90" fill="url(#orangeCube)" fillOpacity="0.3" />
              <polygon points="90,75 120,90 120,125 90,110" />
              <polygon points="150,75 120,90 120,125 150,110" />

              {/* Cube 3 (Front Center - Floating) */}
              <polygon points="65,95 95,80 125,95 95,110" fill="#FB923C" fillOpacity="0.4" />
              <polygon points="65,95 95,110 95,145 65,130" />
              <polygon points="125,95 95,110 95,145 125,130" />
            </g>
            {/* Glowing dots */}
            <circle cx="95" cy="80" r="3" fill="#FB923C" />
            <circle cx="70" cy="40" r="3" fill="#FF7A45" />
            <circle cx="120" cy="60" r="3" fill="#FF7A45" />
          </g>
        </svg>
      )
    },
    {
      id: 4,
      title: 'CodeCraft 2026',
      date: '20 Jun – 22 Jun 2026',
      description: 'An open innovation challenge for developers to showcase their skills.',
      category: 'Open Innovation',
      status: 'Online',
      featured: false,
      teamSize: 'Teams of 1 – 4',
      prize: '₹50,000 Prize Pool',
      color: '#EC4899', // Pink
      gradient: 'from-[#DB2777] via-[#EC4899] to-[#F43F5E]',
      badgeColor: 'bg-[#EC4899]/10 text-[#F472B6] border-[#EC4899]/20',
      tagColor: 'bg-[#EC4899]/20 text-white',
      cardBorder: 'border-[#EC4899]/30 hover:border-[#EC4899]/70',
      iconColor: 'text-[#EC4899]',
      // Code graphics illustration
      svgGraphic: (
        <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="pinkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#50072B" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <g transform="translate(100, 30)">
            <rect width="200" height="130" rx="10" fill="url(#pinkGlow)" stroke="#F472B6" strokeWidth="1" strokeOpacity="0.3" />
            {/* Glowing brackets */}
            <text x="50" y="85" fill="#F472B6" fontSize="55" fontFamily="monospace" fontWeight="bold" opacity="0.9">
              &lt;/&gt;
            </text>
            {/* Circuit traces */}
            <path d="M20,65 L45,65 M155,65 L180,65" stroke="#EC4899" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="45" cy="65" r="3" fill="#EC4899" />
            <circle cx="155" cy="65" r="3" fill="#EC4899" />
            
            {/* Binary particles */}
            <text x="35" y="35" fill="#F472B6" fontSize="12" opacity="0.4" fontFamily="monospace">01</text>
            <text x="145" y="35" fill="#F472B6" fontSize="12" opacity="0.4" fontFamily="monospace">10</text>
            <text x="35" y="115" fill="#F472B6" fontSize="12" opacity="0.4" fontFamily="monospace">11</text>
            <text x="145" y="115" fill="#F472B6" fontSize="12" opacity="0.4" fontFamily="monospace">00</text>
          </g>
        </svg>
      )
    }
  ];

  // List of dropdown options
  const categoryOptions = ['All Categories', 'Web Development', 'AI/ML', 'Web3', 'Open Innovation'];
  const locationOptions = ['All Locations', 'Online'];

  // Handle filtering
  const filteredHackathons = hackathonsData.filter(h => {
    const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          h.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || h.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || h.status === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-[#ECEFF4] font-sans relative overflow-hidden flex flex-col selection:bg-[#FF7A45]/30 selection:text-[#F1F5F9]">
      
      {/* Premium Fonts & Interactive Utilities */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        
        .font-serif-premium {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-sans-premium {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        
        /* Subtle Grid Structure matching original screenshot */
        .bg-grid-pattern {
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
        }

        /* Ambient glows precisely specified on directions */
        .glow-purple-left {
          filter: blur(150px);
          background: radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, rgba(124, 58, 237, 0) 70%);
        }
        
        .glow-orange-right {
          filter: blur(150px);
          background: radial-gradient(circle, rgba(251, 122, 69, 0.12) 0%, rgba(251, 122, 69, 0) 70%);
        }

        .glow-center-ambient {
          filter: blur(180px);
          background: radial-gradient(circle, rgba(20, 184, 166, 0.04) 0%, rgba(236, 72, 153, 0.04) 50%, rgba(0,0,0,0) 100%);
        }
      `}</style>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-80" />

      {/* Glowing Ambient Drops */}
      <div className="absolute top-[12%] left-[-15%] w-[65vw] h-[65vw] rounded-full glow-purple-left pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-15%] w-[65vw] h-[65vw] rounded-full glow-orange-right pointer-events-none z-0" />
      <div className="absolute top-[22%] left-[25%] w-[60vw] h-[60vw] rounded-full glow-center-ambient pointer-events-none z-0" />

      {/* Cinematic Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/95 via-transparent to-[#050816]/85 pointer-events-none z-0" />

      {/* Glassmorphism Navbar */}
      <nav className="sticky top-0 w-full bg-[#070B17]/40 backdrop-blur-xl border-b border-[#1F233B]/30 px-6 md:px-12 py-4 flex items-center justify-between z-40">
        <div className="flex items-center space-x-2">
          <span className="font-serif-premium italic text-2xl font-black text-[#FDF6E2] tracking-wide cursor-pointer hover:opacity-90 transition-opacity">
            HackMate
          </span>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A45] to-[#FF5E97] font-semibold cursor-pointer relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-[#FF7A45]">
              Hackathons
            </span>
            <span className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">Notifications</span>
          </div>

      
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#D946EF] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer hover:scale-105 active:scale-95 transition-all">
            R
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 sm:px-12 py-12 md:py-20 relative z-10 font-sans-premium">
        
        {/* Title Block */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold font-serif-premium tracking-tight bg-gradient-to-r from-[#FF7A45] via-[#FF5E97] to-[#EC4899] bg-clip-text text-transparent">
            Upcoming Hackathons
          </h1>
          <p className="text-[#94A3B8] text-sm md:text-base mt-3 font-medium tracking-wide">
            Discover and join exciting hackathons around the world.
          </p>
          {/* Header ke andar yahan button daal do */}
          <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-[#d4a843] to-[#e8823a] text-black px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-all"
          >
        
         + Add Hackathon
          </button>
        </header>

        {/* Filter and Control Row */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-10">
          
          {/* Left search + Dropdowns column */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-1 max-w-4xl">
            
            {/* Search Input Container */}
            <div className="relative flex-1 min-w-[240px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#0B0F23]/80 hover:bg-[#111736]/70 focus:bg-[#111736]/90 border border-[#1F233B]/50 focus:border-[#FF7A45]/50 text-slate-100 rounded-xl text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#FF7A45]/30 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown: All Categories */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsLocationOpen(false);
                }}
                className="w-full sm:w-48 px-4 py-3 bg-[#0B0F23]/80 hover:bg-[#111736]/70 border border-[#1F233B]/50 text-slate-300 hover:text-slate-100 rounded-xl text-sm font-medium flex items-center justify-between transition-all"
              >
                <span className="truncate">{selectedCategory}</span>
                <svg className={`w-4 h-4 ml-2 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-[#090D22] border border-[#1F233B] rounded-xl shadow-2xl overflow-hidden z-30 animate-fadeIn">
                  {categoryOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedCategory(opt);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs md:text-sm font-medium transition-colors hover:bg-[#151C3F] ${selectedCategory === opt ? 'text-[#FF7A45] bg-[#151C3F]/40' : 'text-slate-400'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown: All Locations */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLocationOpen(!isLocationOpen);
                  setIsCategoryOpen(false);
                }}
                className="w-full sm:w-44 px-4 py-3 bg-[#0B0F23]/80 hover:bg-[#111736]/70 border border-[#1F233B]/50 text-slate-300 hover:text-slate-100 rounded-xl text-sm font-medium flex items-center justify-between transition-all"
              >
                <span className="truncate">{selectedLocation}</span>
                <svg className={`w-4 h-4 ml-2 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLocationOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-[#090D22] border border-[#1F233B] rounded-xl shadow-2xl overflow-hidden z-30 animate-fadeIn">
                  {locationOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedLocation(opt);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs md:text-sm font-medium transition-colors hover:bg-[#151C3F] ${selectedLocation === opt ? 'text-[#FF7A45] bg-[#151C3F]/40' : 'text-slate-400'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right toggle: Grid vs List */}
          <div className="flex items-center self-end lg:self-center">
            <div className="bg-[#090C1B]/80 p-1 rounded-xl border border-[#1F233B]/40 flex items-center space-x-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'border-[#CCA43B] text-[#E5A93C] bg-[#CCA43B]/10 shadow-[0_0_12px_rgba(204,164,59,0.2)] border'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Grid</span>
              </button>
              
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'border-[#CCA43B] text-[#E5A93C] bg-[#CCA43B]/10 shadow-[0_0_12px_rgba(204,164,59,0.2)] border'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Layout Stack */}
        {viewMode === 'grid' ? (
          /* Grid View - Exactly matches side by side cards layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHackathons.map((hackathon) => {
              const hasReg = !!registeredTeams[hackathon.id];
              return (
                <div
                  key={hackathon.id}
                  className={`relative group bg-[#090D22]/60 hover:bg-[#0B102C]/85 backdrop-blur-md rounded-2xl border ${hackathon.cardBorder} transition-all duration-300 overflow-hidden flex flex-col justify-between`}
                >
                  {/* Decorative glowing gradient overlay on hover */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${hackathon.gradient} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Card Header & Artwork */}
                  <div>
                    <div className="relative h-44 bg-[#050816] overflow-hidden border-b border-[#1F233B]/40">
                      {hackathon.svgGraphic}
                      
                      {/* Top tags over graphics */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        {hackathon.featured ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#7C3AED]/20 text-[#D8B4FE] border border-[#7C3AED]/40 backdrop-blur-md uppercase flex items-center space-x-1">
                            <span>★</span> <span>Featured</span>
                          </span>
                        ) : (
                          <div />
                        )}
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#1E293B]/60 text-[#E2E8F0] border border-[#334155]/40 backdrop-blur-md uppercase">
                          {hackathon.status}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      {/* Date */}
                      <div className="flex items-center space-x-2 text-xs font-semibold tracking-wide text-[#64748B] mb-2">
                        <CalendarIcon className={`w-4 h-4 ${hackathon.iconColor}`} />
                        <span>{hackathon.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-serif-premium text-[#F8FAFC] group-hover:text-white transition-colors">
                        {hackathon.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">
                        {hackathon.description}
                      </p>

                      {/* Category Badge */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${hackathon.badgeColor}`}>
                          {hackathon.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Panel */}
                  <div className="p-5 pt-0 mt-auto">
                    {/* Event Stats */}
                    <div className="border-t border-[#1F233B]/40 pt-4 space-y-2 mb-5">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <UsersIcon className="w-3.5 h-3.5 text-slate-500" />
                          <span>{hackathon.teamSize}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <TrophyIcon className="w-3.5 h-3.5 text-amber-500" />
                          <span>{hackathon.prize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Register status / Action button */}
                    <button
                      onClick={() => setSelectedHackathon(hackathon)}
                      className={`w-full py-2.5 rounded-xl font-semibold text-xs md:text-sm tracking-wide text-white transition-all shadow-lg flex items-center justify-center space-x-2 ${
                        hasReg 
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500 shadow-emerald-900/10 hover:opacity-95' 
                          : `bg-gradient-to-r ${hackathon.gradient} hover:opacity-95 shadow-[0_0_12px_rgba(251,122,69,0.08)]`
                      }`}
                    >
                      <span>{hasReg ? '✓ Registered (View)' : 'View Details'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View - Responsive details horizontal flow list */
          <div className="space-y-4">
            {filteredHackathons.map((hackathon) => {
              const hasReg = !!registeredTeams[hackathon.id];
              return (
                <div
                  key={hackathon.id}
                  className={`relative group bg-[#090D22]/50 hover:bg-[#0B102C]/75 backdrop-blur-md rounded-2xl border ${hackathon.cardBorder} transition-all duration-300 overflow-hidden p-5 flex flex-col md:flex-row items-center justify-between gap-6`}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-5 flex-1 min-w-0">
                    {/* Small thumbnail icon */}
                    <div className="w-24 h-20 rounded-xl bg-[#050816] overflow-hidden shrink-0 border border-[#1F233B]/50">
                      {hackathon.svgGraphic}
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start space-x-2.5 mb-1.5 flex-wrap gap-2">
                        <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                          <CalendarIcon className={`w-3.5 h-3.5 ${hackathon.iconColor}`} />
                          <span>{hackathon.date}</span>
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${hackathon.badgeColor}`}>
                          {hackathon.category}
                        </span>
                        {hackathon.featured && (
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold tracking-wider bg-[#7C3AED]/20 text-[#D8B4FE] border border-[#7C3AED]/30 uppercase">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold font-serif-premium text-[#F8FAFC]">
                        {hackathon.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] line-clamp-1 mt-1 leading-relaxed">
                        {hackathon.description}
                      </p>
                    </div>
                  </div>

                  {/* Right side alignment */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 shrink-0 w-full md:w-auto">
                    <div className="flex items-center space-x-6 text-xs font-semibold text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <UsersIcon className="w-4 h-4 text-slate-500" />
                        <span>{hackathon.teamSize}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <TrophyIcon className="w-4 h-4 text-amber-500" />
                        <span>{hackathon.prize}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedHackathon(hackathon)}
                      className={`w-full sm:w-40 py-2.5 rounded-xl font-semibold text-xs tracking-wide text-white transition-all ${
                        hasReg 
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500' 
                          : `bg-gradient-to-r ${hackathon.gradient} hover:opacity-95`
                      }`}
                    >
                      {hasReg ? '✓ Registered' : 'View Details'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredHackathons.length === 0 && (
          <div className="bg-[#101426]/30 backdrop-blur-md rounded-2xl p-16 border border-[#1F233B]/40 text-center">
            <svg className="w-16 h-16 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-[#ECEFF4] font-semibold text-xl">No hackathons found</h3>
            <p className="text-[#64748B] text-sm mt-1">Try modifying your category, location, or search query parameters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedLocation('All Locations');
              }}
              className="mt-6 px-5 py-2 bg-[#1C2035] text-slate-300 hover:text-white rounded-full text-xs font-semibold border border-slate-800 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Centered past button matching bottom of screen */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => triggerToast('No older events found. Showing up-to-date schedule.', 'info')}
            className="flex items-center space-x-2.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold border border-[#E5A93C]/40 text-[#E5A93C] bg-[#E5A93C]/5 hover:bg-[#E5A93C]/10 active:scale-95 shadow-[0_0_15px_rgba(229,169,60,0.1)] transition-all duration-300"
          >
            {/* History icon */}
            <svg className="w-4 h-4 text-[#E5A93C]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Explore Past Hackathons</span>
          </button>
        </div>

        {/* Premium footer */}
        <footer className="mt-24 text-center border-t border-[#1F233B]/20 pt-10 pb-4">
          <p className="text-xs text-slate-500 tracking-wider uppercase">
            Designed for HackMate • Pixel Perfect 1:1 Upcoming Hackathons Dashboard
          </p>
        </footer>
      </main>

      {/* Detail Overlay Drawer Modal */}
      {selectedHackathon && (
        <div className="fixed inset-0 bg-[#02040B]/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div
            className="bg-[#090D22] border border-[#1F233B] w-full max-w-2xl rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Art banner */}
            <div className="relative h-48 bg-[#050816] border-b border-[#1F233B]/40">
              {selectedHackathon.svgGraphic}
              
              <button
                onClick={() => {
                  setSelectedHackathon(null);
                  setIsRegistering(false);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 text-slate-400 hover:text-white flex items-center justify-center backdrop-blur-md border border-[#1F233B]/40 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Inner Content details */}
            <div className="p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-2 flex-wrap gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${selectedHackathon.badgeColor}`}>
                  {selectedHackathon.category}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                  <CalendarIcon className={`w-3.5 h-3.5 ${selectedHackathon.iconColor}`} />
                  <span>{selectedHackathon.date}</span>
                </span>
              </div>

              <h2 className="text-3xl font-bold font-serif-premium text-white">
                {selectedHackathon.title}
              </h2>

              <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">
                {selectedHackathon.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 my-6 bg-[#0B0F23] p-4 rounded-xl border border-[#1F233B]/50">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">Eligible Group Size</span>
                  <span className="text-sm text-slate-200 font-medium flex items-center mt-1">
                    <UsersIcon className="w-4 h-4 mr-1.5 text-slate-400" />
                    {selectedHackathon.teamSize}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">Grand Prizes</span>
                  <span className="text-sm text-slate-200 font-medium flex items-center mt-1">
                    <TrophyIcon className="w-4 h-4 mr-1.5 text-amber-500" />
                    {selectedHackathon.prize}
                  </span>
                </div>
              </div>

              {/* Custom dynamic interactivity: Registration workflow */}
              {registeredTeams[selectedHackathon.id] ? (
                <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold uppercase tracking-wider">Your Registered Team</span>
                    <span className="text-base text-[#10B981] font-bold">
                      {registeredTeams[selectedHackathon.id]}
                    </span>
                  </div>
                  <button
                    onClick={() => handleUnregister(selectedHackathon.id, selectedHackathon.title)}
                    className="text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/50 bg-red-950/20 hover:bg-red-950/40 px-4 py-2 rounded-xl transition-colors"
                  >
                    Cancel Registration
                  </button>
                </div>
              ) : isRegistering ? (
                <div className="space-y-3">
                  <label className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                    Enter your Team Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Byte Busters"
                      value={teamNameInput}
                      onChange={(e) => setTeamNameInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-[#0B0F23] border border-[#1F233B] text-slate-100 rounded-xl text-sm focus:outline-none focus:border-[#FF7A45]/50 focus:ring-1 focus:ring-[#FF7A45]/30"
                    />
                    <button
                      onClick={() => handleRegister(selectedHackathon.id, selectedHackathon.title)}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm text-white bg-gradient-to-r ${selectedHackathon.gradient}`}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setIsRegistering(false)}
                      className="px-4 py-2.5 bg-[#1F233B] hover:bg-[#2A2E4B] text-slate-300 rounded-xl text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsRegistering(true)}
                  className={`w-full py-3 rounded-xl font-semibold text-xs md:text-sm tracking-wide text-white transition-all shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r ${selectedHackathon.gradient}`}
                >
                  <span>Apply Now (Register Team)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {isAddModalOpen && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
    <div className="bg-[#090D22] border border-[#333] p-8 rounded-2xl w-full max-w-md shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-white">Add New Hackathon</h2>
      <input className="w-full bg-[#0B0F23] p-3 mb-3 rounded-xl border border-[#1F233B] text-sm text-white" placeholder="Title" onChange={(e) => setNewH({...newH, title: e.target.value})} />
      <input className="w-full bg-[#0B0F23] p-3 mb-3 rounded-xl border border-[#1F233B] text-sm text-white" placeholder="Location" onChange={(e) => setNewH({...newH, location: e.target.value})} />
      <textarea className="w-full bg-[#0B0F23] p-3 mb-6 rounded-xl border border-[#1F233B] text-sm text-white" placeholder="Description" onChange={(e) => setNewH({...newH, description: e.target.value})} />
      <div className="flex gap-3">
        <button className="flex-1 bg-[#d4a843] text-black py-3 rounded-xl font-bold text-sm" onClick={() => {
           // Yahan tumhara API call wala logic aayega
           setIsAddModalOpen(false);
           triggerToast('Hackathon Added!');
        }}>Save to Matrix</button>
        <button className="flex-1 bg-[#1F233B] text-white py-3 rounded-xl font-bold text-sm" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
      {/* Dynamic alerts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-md pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between space-x-4 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md border ${
              toast.type === 'success'
                ? 'bg-[#0B251C]/90 border-[#10B981]/40 text-[#10B981]'
                : toast.type === 'error'
                ? 'bg-[#2B101C]/90 border-[#EF4444]/40 text-[#EF4444]'
                : toast.type === 'gold'
                ? 'bg-[#281E0C]/90 border-[#CCA43B]/40 text-[#E5A93C]'
                : 'bg-[#101426]/90 border-[#6366F1]/40 text-[#818CF8]'
            }`}
          >
            <span className="text-xs md:text-sm font-semibold tracking-wide">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="hover:opacity-75"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}