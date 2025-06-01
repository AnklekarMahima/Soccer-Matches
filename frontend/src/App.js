import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [timezone, setTimezone] = useState("GMT");

  useEffect(() => {
    fetch("https://soccer-matches-76e2.onrender.com/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error("Error fetching matches:", err));
  }, []);

  const today = new Date();
  const monthYear = today.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const toggleTimezone = () => {
    setTimezone((prev) => (prev === "GMT" ? "Asia/Kolkata" : "GMT"));
  };

  return (
    <div className="App">
      <h1>Upcoming Soccer Matches - {monthYear}</h1>
      <button onClick={toggleTimezone} className="timezone-toggle">
        Switch to {timezone === "GMT" ? "IST" : "GMT"}
      </button>

      {matches.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="match-list">
          {matches.map((match, index) => (
            <div className="match-card" key={index}>
              <h2>{match.homeTeam} vs {match.awayTeam}</h2>
              <p>
                {new Date(match.startTime).toLocaleString("en-US", {
                  timeZone: timezone,
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                {" "}({timezone === "GMT" ? "GMT" : "IST"})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;