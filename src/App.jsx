import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Main} from './layouts'
import Store from '../src/store/configureStore'

function App() {
  return (
      <Router>
        <Sidebar />
          <Store>
              <Main />
          </Store>
        <Routes>

        </Routes>
      </Router>
  );
}

export default App;
