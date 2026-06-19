const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Notification = require('../models/Notification'); 

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

    console.log("🔍 Attempting database update using query identifier:", query);

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
      console.log("⚠️ User profile not found, executing automated backup registration...");
      const newUser = await User.create({
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@temporary.grid`,
        googleId: "manual-node-entry",
        college, degree, city, githubUrl, bio, role, skills, experienceLevel, domains,
        availableForHackathons, openToRemote, enableEmailTransmissions
      });
      return res.status(201).json({ success: true, user: newUser });
    }

    console.log(`💾 Profile updated successfully for identifier: ${email || name}`);
    res.status(200).json({ success: true, user: updatedUser });

  } catch (error) {
    console.error("❌ Profile Update Route Error:", error);
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
    
    console.log(`🚀 Successfully fetched ${users.length} live nodes from Atlas DB`);
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("❌ Failed to fetch database profiles list:", error);
    res.status(500).json({ message: "Internal tracker query mismatch", error: error.message });
  }
});

// 🚀 3. DISPATCH CONNECTION REQUEST (Connect Button Click)
router.post('/connect-node', async (req, res) => {
  try {
    const { senderId, senderName, receiverId } = req.body;
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender or Receiver identification token missing" });
    }

    // Checking duplicate active pending vectors
    const existingInvite = await Notification.findOne({ senderId, receiverId, status: 'PENDING' });
    if (existingInvite) {
      return res.status(400).json({ message: "Transmission connection vector already pending stream lock!" });
    }

    // Inject request node directly into notification schema pipeline
    const invite = await Notification.create({ senderId, senderName, receiverId });
    
    console.log(`📡 Connection invite piped from ${senderName} to receiver token: ${receiverId}`);
    res.status(201).json({ success: true, invite });
  } catch (error) {
    console.error("❌ Link generation failed:", error);
    res.status(500).json({ message: "Link sequence failure", error: error.message });
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

    console.log(`🛡️ Core link synchronized successfully for node link token: ${notificationId}`);
    res.status(200).json({ success: true, message: "Matrix link synchronized successfully" });
  } catch (error) {
    console.error("❌ Approval flow crashed:", error);
    res.status(500).json({ message: "Approval sync fail", error: error.message });
  }
});

module.exports = router;