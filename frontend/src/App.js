import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProblemSelection from './ProblemSelection';
import Home from './Home';
import PFGraphMaker from './PF-GraphMaker';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ProblemSelection" element={<ProblemSelection/>} />
      <Route path = "/PF-GraphMaker" element = {<PFGraphMaker/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;