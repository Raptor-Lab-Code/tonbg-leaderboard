import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CommunityTournament from './pages/CommunityTournament'
import CommunityDetail from './pages/CommunityDetail';
import './App.css'
import SeasonalLeaderboard from "./pages/SeasonalLeaderboard";
import WhaleIOLeaderboard from "./pages/WhaleIO";
import Season2Leaderboard from "./pages/Season2";

function App() {

  return (
    <div className="flex justify-center max-w-[600px] w-screen h-screen p-4">
      <Router>
        <Routes>
        <Route path="/" element={<Season2Leaderboard />} />
        <Route path="/Community" element={<CommunityDetail />} />
        <Route path="/Season1" element={<SeasonalLeaderboard />} />
        <Route path="/Season2" element={<Season2Leaderboard />} />
        <Route path="/WhaleIO" element={<WhaleIOLeaderboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
