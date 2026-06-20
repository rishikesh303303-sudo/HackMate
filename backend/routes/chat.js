const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// 🚀 1. SEND MESSAGE ENDPOINT
router.post('/send', async (req, res) => {
  try {
    const { senderName, text } = req.body;
    if (!senderName || !text) {
      return res.status(400).json({ message: "Payload elements missing" });
    }

    const newMessage = await Message.create({ senderName, text });
    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("❌ Chat write collapse:", error);
    return res.status(500).json({ message: "DB write failure", error: error.message });
  }
});

// 🔍 2. GET MESSAGES ENDPOINT (CRASH IMMUNE WITH LEAN)
router.get('/messages', async (req, res) => {
  try {
    // .lean() lagane se raw objects milte hain jisse memory overhead aur crashes khatam ho jaate hain
    const messages = await Message.find().sort({ createdAt: 1 }).lean();
    
    // Fallback if collections tracker is totally empty
    if (!messages) {
      return res.status(200).json({ success: true, messages: [] });
    }

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("❌ Chat fetch collapse:", error);
    return res.status(500).json({ message: "DB fetch failure", error: error.message });
  }
});

module.exports = router;