import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CommunityTournament from './pages/CommunityTournament'
import CommunityDetail from './pages/CommunityDetail';
import './App.css'
import SeasonalLeaderboard from "./pages/SeasonalLeaderboard";

function App() {

  return (
    <div className="flex justify-center max-w-[600px] w-screen h-screen p-4">
      <Router>
        <Routes>
        <Route path="/" element={<CommunityTournament />} />
        <Route path="/Community" element={<CommunityDetail />} />
        <Route path="/Season1" element={<SeasonalLeaderboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
