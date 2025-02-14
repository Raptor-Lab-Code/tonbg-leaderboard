import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Airdrop from './pages/Airdrop'
import './App.css'

function App() {

  return (
    <div className="flex justify-center max-w-[600px] w-screen h-screen p-4">
      <Router>
        {/*<nav>
          <Link to="/Airdrop">Airdrop</Link>
        </nav>*/}
        <Routes>
          <Route path="/Airdrop" element={<Airdrop />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
