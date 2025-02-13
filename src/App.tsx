import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Airdrop from './pages/Airdrop'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <nav>
          <Link to="/Airdrop">Airdrop</Link>
        </nav>
        <Routes>
          <Route path="/Airdrop" element={<Airdrop />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
