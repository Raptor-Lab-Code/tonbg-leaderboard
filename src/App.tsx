import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CommunityDetail from './pages/CommunityDetail';
import './App.css'
import SeasonalLeaderboard from "./pages/SeasonalLeaderboard";
import WhaleIOLeaderboard from "./pages/WhaleIO";
import Season2Leaderboard from "./pages/Season2";
import CommunityTournament from "./pages/CommunityTournament";
import PrivateGame from "./pages/PrivateGame";
import TONNationP1 from "./pages/TONNationP1";

function App() {

  return (
    <div className="flex justify-center max-w-[600px] w-screen h-screen p-4">
      <Router>
        <Routes>
          <Route path="/" element={<Season2Leaderboard />} />
          <Route path="/TONNation/Pool1" element={<TONNationP1 />} />
          <Route path="/Community" element={<CommunityTournament />} />
          <Route path="/CommunityDetails" element={<CommunityDetail />} />
          <Route path="/Season1" element={<SeasonalLeaderboard />} />
          <Route path="/Season2" element={<Season2Leaderboard />} />
          <Route path="/WhaleIO" element={<WhaleIOLeaderboard />} />
          <Route path="/PrivateGame" element={<PrivateGame />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
