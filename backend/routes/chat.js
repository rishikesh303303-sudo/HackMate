const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
router.post('/send', async (req, res) => {
  try {
    const { senderName, text } = req.body;
    if (!senderName || !text) {
      return res.status(400).json({ message: "Payload elements missing" });
    }

    const newMessage = await Message.create({ senderName, text });
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ message: "DB write failure", error: error.message });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: "DB fetch failure", error: error.message });
  }
});

module.exports = router;