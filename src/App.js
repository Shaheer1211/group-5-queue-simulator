import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import SimulatorLayout from './layouts/SimulatorLayout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/simulator/*' element={<SimulatorLayout />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
