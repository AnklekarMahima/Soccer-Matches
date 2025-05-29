const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.SPORTSRADAR_API_KEY;

function getRemainingDatesInMonth() {
  const today = new Date();
  const dates = [];

  const year = today.getUTCFullYear();
  const month = today.getUTCMonth();
  const nowDate = today.getUTCDate();

  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  for (let d = nowDate; d <= lastDay; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    dates.push(dateStr);
  }

  return dates;
}

async function fetchMatches() {
  const allDates = getRemainingDatesInMonth();
  const now = new Date();

  const allMatches = [];

  for (const date of allDates) {
    try {
      const url = `https://api.sportradar.com/soccer-extended/trial/v4/en/schedules/${date}/schedules.json?api_key=${API_KEY}`;
      const response = await axios.get(url);

      const matches = response.data.schedules || [];

      const filtered = matches
        .filter(event => {
          const start = new Date(event.sport_event.start_time);
          return start > now;
        })
        .map(event => {
          const competitors = event.sport_event.competitors || [];
          return {
            homeTeam: competitors.find(c => c.qualifier === "home")?.name || "Home",
            awayTeam: competitors.find(c => c.qualifier === "away")?.name || "Away",
            startTime: event.sport_event.start_time,
          };
        });

      allMatches.push(...filtered);
    } catch (err) {
      console.error(`Failed to fetch for ${date}:`, err.message);
    }
  }

  return allMatches;
}

module.exports = fetchMatches;