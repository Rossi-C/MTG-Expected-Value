import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/navbar';
import SetList from './components/setList';
import Home from './components/Home';
import Set from './components/set';
import { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    mode === 'light' ? setMode('dark') : setMode('light');
  }

  return (
    <>
      <Container className={`px-0 ${mode === 'light' ? 'light' : 'dark'}`} style={{ minHeight: '100vh' }} fluid>
        <BrowserRouter>
          <Navigation toggleMode={toggleMode} />
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
        </BrowserRouter>
        <Row className='disclaimer m-0' fluid>
          <hr className={mode === 'light' ? 'text-dark' : 'text-light'} />
          <Col className={'m-auto text-center py-2 px-0'} lg='6' fluid>
            <p className='statement'>The information presented on this site about Magic: The Gathering, both literal and graphical, is copyrighted by Wizards of the Coast (a subsidiary of Hasbro, Inc.), which includes, but is not limited to, card images, the mana symbols, and Oracle text.</p>
            <p className='statement'>This website is not produced, endorsed, supported, or affiliated with Wizards of the Coast.</p>
            <p className='statement'>Nothing on this site constitutes professional and/or financial advice. Always do your own research</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
