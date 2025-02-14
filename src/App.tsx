import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Airdrop from './pages/Airdrop'
import './App.css'

function App() {

  return (
    <div className="w-screen h-screen">
      <Router>
        <nav>
          <Link to="/Airdrop">Airdrop</Link>
        </nav>
        <Routes>
          <Route path="/Airdrop" element={<Airdrop />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
