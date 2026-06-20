router.post('/add', async (req, res) => {
  try {
    const { title, date, description, category, status, teamSize, prize } = req.body;
    const newHackathon = await Hackathon.create({ 
      title, date, description, category, status, teamSize, prize 
    });
    res.status(201).json({ success: true, hackathon: newHackathon });
  } catch (error) {
    res.status(500).json({ message: "Sync error", error: error.message });
  }
});