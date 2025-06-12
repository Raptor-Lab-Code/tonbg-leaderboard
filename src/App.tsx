import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CommunityDetail from './pages/CommunityDetail';
import './App.css'
import SeasonalLeaderboard from "./pages/SeasonalLeaderboard";
import WhaleIOLeaderboard from "./pages/WhaleIO";
import Season2Leaderboard from "./pages/Season2";
import CommunityTournament from "./pages/CommunityTournament";
import PrivateGame from "./pages/PrivateGame";
import TONNationP1 from "./pages/TONNationP1";
import TONNationP1Details from "./pages/TONNationP1Details";
import TONNationP2 from "./pages/TONNationP2";
import TONNationP2Details from "./pages/TONNationP2Details";
import TONNationP3 from "./pages/TONNationP3";
import TONNationP3Details from "./pages/TONNationP3Details";
import TONNationP4 from "./pages/TONNationP4";
import TONNationP4Details from "./pages/TONNationP4Details";

function App() {

  return (
    <div className="flex justify-center max-w-[600px] w-screen h-screen p-4">
      <Router>
        <Routes>
          <Route path="/" element={<Season2Leaderboard />} />
          <Route path="/TONNation/Pool1" element={<TONNationP1 />} />
          <Route path="/TONNation/Pool1/Details" element={<TONNationP1Details />} />
          <Route path="/TONNation/Pool2" element={<TONNationP2 />} />
          <Route path="/TONNation/Pool2/Details" element={<TONNationP2Details />} />
          <Route path="/TONNation/Pool3" element={<TONNationP3 />} />
          <Route path="/TONNation/Pool3/Details" element={<TONNationP3Details />} />
          <Route path="/TONNation/Pool4" element={<TONNationP4 />} />
          <Route path="/TONNation/Pool4/Details" element={<TONNationP4Details />} />
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
