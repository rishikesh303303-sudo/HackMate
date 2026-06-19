const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Existing Base Fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },   
  googleId: { type: String },   
  
  // Metadata Baseline Fields
  college: { type: String, default: "" },
  degree: { type: String, default: "" },
  city: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  bio: { type: String, default: "" },
  
  // Target Profile Designation
  role: { type: String, default: "" },
  
  // Core Technical Stack (Arrays)
  skills: { type: [String], default: [] },
  domains: { type: [String], default: [] },
  
  // Experience Stack Tier
  experienceLevel: { type: String, default: "" },
  
  // Telemetry Availability Toggles (Boolean Flags)
  availableForHackathons: { type: Boolean, default: true },
  openToRemote: { type: Boolean, default: true },
  enableEmailTransmissions: { type: Boolean, default: false },

  // 🆕 APPROVED TEAMMATES NETWORK MATRIX (Mongoose References Layer)
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }]

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);