import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/navbar';
import SetList from './components/setList';
import Home from './components/Home';
import Set from './components/set';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    mode === 'light' ? setMode('dark') : setMode('light');
  }

  return (
    <>
      <div className={mode === 'light' ? 'light' : 'dark'}>
        <BrowserRouter>
          <Navigation toggleMode={toggleMode} m-0 p-0 />
          <div className='px-5'>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/setList'
                element={<SetList />}
              />
              <Route
                path='/set/:setCode'
                element={<Set />}>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
