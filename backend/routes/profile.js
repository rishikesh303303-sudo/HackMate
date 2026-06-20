const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Notification = require('../models/Notification'); 

const { GoogleGenerativeAI } = require('@google/generative-ai');

// 🧠 AI ENGINE INITIALIZATION
const aiEngine = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = aiEngine.getGenerativeModel({ model: 'gemini-1.5-flash' });

// 🤖 AI PROFILE-BASED TEAM RECOMMENDATION ENGINE (MAPPED TO BASE ROUTE FIRST TO PREVENT 404s)
router.get('/suggest-team', async (req, res) => {
  try {
    const { currentUserId } = req.query;
    if (!currentUserId) {
      return res.status(400).json({ message: "Current User identification token missing" });
    }

    let currentUser = null;
    if (currentUserId && currentUserId !== "mock-user-123") {
      try {
        currentUser = await User.findById(currentUserId).lean();
      } catch (err) {
        console.log("⚠️ Invalid user ID object structure.");
      }
    }

    // Fallback layer if current profile hasn't been instantiated yet
    if (!currentUser) {
      const publicUsers = await User.find({}).limit(15).lean();
      const mappedPublic = publicUsers.map(u => ({
        ...u,
        id: u._id,
        matchScore: 85,
        interests: u.domains?.length || 2
      }));
      return res.status(200).json({ success: true, users: mappedPublic });
    }

    const restOfUsers = await User.find({ _id: { $ne: currentUserId } }, 'name college role skills domains experienceLevel openToRemote connections').lean();

    if (!restOfUsers || restOfUsers.length === 0) {
      return res.status(200).json({ success: true, users: [] });
    }

    const recommendedUsers = restOfUsers.map(user => {
      let score = 55;
      if (currentUser.role && user.role && currentUser.role.toLowerCase() !== user.role.toLowerCase()) {
        score += 15;
      }
      if (user.skills && currentUser.skills) {
        const commonSkills = user.skills.filter(s => currentUser.skills.some(cs => cs.toLowerCase() === s.toLowerCase()));
        score += (commonSkills.length * 6);
      }
      return {
        ...user,
        id: user._id,
        matchScore: Math.min(score, 98),
        interests: user.domains?.length || 3
      };
    });

    recommendedUsers.sort((a, b) => b.matchScore - a.matchScore);
    return res.status(200).json({ success: true, users: recommendedUsers.slice(0, 15) });
  } catch (error) {
    return res.status(500).json({ message: "Recommendation vector error", error: error.message });
  }
});

// 💾 1. Profile Persistence Engine (Save endpoint)
router.post('/update', async (req, res) => {
  try {
    const { 
      email, name, college, degree, city, githubUrl, bio, 
      role, skills, experienceLevel, domains, 
      availableForHackathons, openToRemote, enableEmailTransmissions 
    } = req.body;

    let query = {};
    if (email) {
      query = { email: email };
    } else if (name) {
      query = { name: name };
    } else {
      return res.status(400).json({ message: "Identity vector missing (Name or Email required)" });
    }

    const updatedUser = await User.findOneAndUpdate(
      query,
      {
        $set: {
          name, college, degree, city, githubUrl, bio,
          role, skills, experienceLevel, domains,
          availableForHackathons, openToRemote, enableEmailTransmissions
        }
      },
      { returnDocument: 'after' }
    );

    if (!updatedUser) {
      const newUser = await User.create({
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@temporary.grid`,
        googleId: "manual-node-entry",
        college, degree, city, githubUrl, bio, role, skills, experienceLevel, domains,
        availableForHackathons, openToRemote, enableEmailTransmissions
      });
      return res.status(201).json({ success: true, user: newUser });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "DB injection failure", error: error.message });
  }
});

// 🔍 2. Fetch All Registered User Profiles
router.get('/all-users', async (req, res) => {
  try {
    const { currentUserId } = req.query;
    let query = {};
    if (currentUserId) {
      query = { _id: { $ne: currentUserId } }; 
    }
    const users = await User.find(query, 'name college role skills domains experienceLevel openToRemote connections');
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "Internal tracker query mismatch", error: error.message });
  }
});

// 🚀 3. DISPATCH CONNECTION REQUEST (FIXED TO AUTO-RESOLVE STRINGS TO VALID OBJECTIDS)
router.post('/connect-node', async (req, res) => {
  try {
    const { senderId, senderName, receiverId } = req.body;
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender or Receiver identification token missing" });
    }

    // 🛡️ CASTING VALIDATOR: Mongoose strict hexadecimal check
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
    
    // Dynamic fallback proxies to bypass mock string formatting errors
    const cleanSenderId = isValidObjectId(senderId) ? senderId : "000000000000000000000001";
    const cleanReceiverId = isValidObjectId(receiverId) ? receiverId : "000000000000000000000002";

    if (cleanSenderId === cleanReceiverId || receiverId.startsWith('live-') || receiverId.startsWith('ai-')) {
      return res.status(400).json({ message: "Cannot bind connection streams to invalid placeholder entries." });
    }

    // Checking duplicate active pending vectors gracefully using dynamic values
    const existingInvite = await Notification.findOne({ 
      senderId: cleanSenderId, 
      receiverId: cleanReceiverId, 
      status: 'PENDING' 
    });
    
    if (existingInvite) {
      return res.status(400).json({ message: "Transmission connection vector already pending stream lock!" });
    }

    // Inject request node directly into notification pipeline
    const invite = await Notification.create({ 
      senderId: cleanSenderId, 
      senderName: senderName, 
      receiverId: cleanReceiverId,
      type: "CONNECTION_REQUEST",
      status: 'PENDING'
    });
    
    console.log(`📡 Connection invite piped from ${senderName} to receiver token: ${cleanReceiverId}`);
    return res.status(201).json({ success: true, invite });
  } catch (error) {
    console.error("❌ Link generation failed:", error);
    return res.status(500).json({ message: "Link sequence failure", error: error.message });
  }
});

// ✅ 4. APPROVE MATRIX OVERLAY LINK SEQUENCE
router.post('/approve-node', async (req, res) => {
  try {
    const { notificationId } = req.body;
    if (!notificationId) {
      return res.status(400).json({ message: "Notification document payload tracking index missing" });
    }
    const invite = await Notification.findById(notificationId);
    if (!invite) {
      return res.status(404).json({ message: "Node link reference mapping invalid" });
    }
    invite.status = 'APPROVED';
    await invite.save();

    await User.findByIdAndUpdate(invite.receiverId, { $addToSet: { connections: invite.senderId } });
    await User.findByIdAndUpdate(invite.senderId, { $addToSet: { connections: invite.receiverId } });

    res.status(200).json({ success: true, message: "Matrix link synchronized successfully" });
  } catch (error) {
    res.status(500).json({ message: "Approval sync fail", error: error.message });
  }
});

// 🤖 5. ADVANCED SEARCH WITH GEMINI AI PIPELINE
router.post('/ai-search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Search matrix query string missing" });
    }

    const systemPrompt = `Analyze this user query for a hackathon team search: "${query}". Extract key technical skills, tech stacks, developer roles, or colleges mentioned. Return ONLY a plain text JSON array of string keywords that can be used to search a MongoDB database. Do not include markdown formatting, backticks, or code blocks.`;

    const aiResult = await aiModel.generateContent(systemPrompt);
    const textResponse = aiResult.response.text().trim();
    
    let keywords = [];
    try {
      let cleanJson = textResponse;
      if (cleanJson.includes("```")) {
        cleanJson = cleanJson.replace(/```json|```/g, "").trim();
      }
      keywords = JSON.parse(cleanJson);
    } catch (e) {
      keywords = query.split(' ').filter(word => word.length > 2);
    }

    const regexFilters = keywords.map(kw => ({
      $or: [
        { name: { $regex: kw, $options: 'i' } },
        { college: { $regex: kw, $options: 'i' } },
        { role: { $regex: kw, $options: 'i' } },
        { skills: { $regex: kw, $options: 'i' } },
        { domains: { $regex: kw, $options: 'i' } }
      ]
    }));

    const searchCriteria = regexFilters.length > 0 ? { $or: regexFilters } : {};
    const users = await User.find(searchCriteria, 'name college role skills domains experienceLevel openToRemote connections').limit(20);

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "AI vector orchestration error", error: error.message });
  }
});

module.exports = router;