const express = require("express");
const cors = require("cors");
const fetchMatches = require("./fetchMatches");

const app = express();
const PORT = 5000;

app.use(cors());

let cache = { matches: null, timestamp: 0 };

app.get("/matches", async (req, res) => {
  const now = Date.now();
  const CACHE_DURATION = 60 * 1000;

  if (cache.matches && (now - cache.timestamp) < CACHE_DURATION) {
    return res.json(cache.matches);
  }

  try {
    const matches = await fetchMatches();
    cache = { matches, timestamp: now };
    res.json(matches);
  } catch (err) {
    console.error("Error fetching matches:", err.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});