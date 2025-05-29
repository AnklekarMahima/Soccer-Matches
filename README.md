# ⚽ Soccer Match Viewer

A modern fullstack web app to display **upcoming soccer matches** using the Sportradar API. Built with **React.js** for the frontend and **Node.js/Express** for the backend.

> 📅 Shows only upcoming matches from the **current date** to the **end of the month**  
> 🕒 Toggle between **local time** and **GMT/UTC**  
> ✨ Styled with a clean, modern UI

---

## 🔧 Features

- Fetches match schedules from [Sportradar Soccer API](https://developer.sportradar.com/docs/read/Soccer)
- Displays:
  - Home & Away teams
  - Start time (in local or GMT format)
- Filters out already-started or past matches
- Caches API response for faster load (60 seconds)
- Responsive design

---

## 🖥️ Tech Stack

| Frontend              | Backend            | Other         |
|-----------------------|--------------------|---------------|
| React.js              | Node.js + Express  | .env for secrets |
| Modern CSS            | REST API route     | Axios + Fetch |
| useEffect + useState  | CORS-enabled       | Sportradar API |

---

## 🚀 How to Run Locally

### 1. Clone the repo
### 2. Set up the backend:
        cd backend
        npm install
  Create a .env file inside backend/ and add:    SPORTSRADAR_API_KEY=your_api_key_here
### 3.Run the server:
      node index.js
The server runs at: http://localhost:5000
### 4. Set up the frontend
        cd ../frontend
        npm install
        npm start
The React app runs at: http://localhost:3000
