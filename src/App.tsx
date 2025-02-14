import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Airdrop from './pages/Airdrop'
import Community from './pages/Community';
import './App.css'

function App() {

  return (
    <div className="flex justify-center max-w-[600px] w-screen h-screen p-4">
      <Router>
        {/*<nav>
          <Link to="/Airdrop">Airdrop</Link>
        </nav>*/}
        <Routes>
        <Route path="/" element={<Airdrop />} />
        <Route path="/Community" element={<Community />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
