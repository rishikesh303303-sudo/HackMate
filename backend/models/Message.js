const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);