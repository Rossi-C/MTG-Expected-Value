import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { packEV } from './components/calculator';
import Navigation from './components/navbar';
import Sets from './components/sets';
import Home from './components/Home';
import { getSetList } from './api';

function App() {
  const packData = packEV('war');
  // console.log(packData);
  getSetList();


  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='sets'
            element={<Sets />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
