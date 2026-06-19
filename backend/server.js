require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profile'); 
const teamRoutes = require('./routes/team'); 

const app = express();

// Global Middlewares 
app.use(cors());
app.use(express.json());

// 🔌 Router Gateway connections
app.use('/api/auth', authRoutes);     
app.use('/api/profile', profileRoutes); 
app.use('/api/team', teamRoutes);       

// MongoDB baseline connection vector
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Base Telemetry Connected for Google Auth! 🚀"))
  .catch((err) => console.error("Database initialization error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing successfully on port ${PORT}`);
});