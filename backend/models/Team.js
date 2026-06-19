const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    role: String
  }],
  hackathonName: { type: String, default: "" },
  hackathonLocation: { type: String, default: "" },
  targetDate: { type: String, default: "" },
  tasks: [{
    id: { type: Number, required: true },
    text: { type: String, required: true },
    status: { type: String, enum: ['todo', 'progress', 'done'], default: 'todo' }
  }],
  chatMessages: [{
    id: { type: Number, required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);