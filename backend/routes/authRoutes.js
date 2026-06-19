const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

router.post('/google', async (req, res) => {
  const { token } = req.body;

  console.log("➡️ Google Auth Route Hit! Token received from frontend.");

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });

    const { name, email, picture, sub } = ticket.getPayload();
    
    console.log(`✅ Google Token Verified for Email: ${email}`);

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name,
        email: email,
        avatar: picture,
        googleId: sub
      });
      console.log("💾 New User Payload Created in MongoDB Atlas!");
    } else {
      console.log("🚀 Existing user recognized and synchronized!");
    }

    const sessionToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "hackmate_telemetry_secret_key",
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Sync Complete",
      token: sessionToken,
      user: user 
    });

  } catch (error) {
    console.error("\n❌❌🔥🔥 BACKEND CRASH DETECTED 🔥 fires 🔥❌❌");
    console.error("ERROR MESSAGE:", error.message);
    console.error("FULL STACK TRACE:\n", error);
    console.error("❌❌--------------------------------------------❌❌\n");

    res.status(500).json({ message: "Verification failed node layer", error: error.message });
  }
});

module.exports = router;