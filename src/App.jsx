import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Team from './pages/Team';

function App() {
  return (
      <Router>
        <Sidebar />
        <Routes>

        </Routes>
      </Router>
  );
}

export default App;
