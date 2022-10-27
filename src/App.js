import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { getSetData } from './api';
import Navigation from './components/navbar';
// import background from './damnation.jpg';

function App() {
  const warOfTheSpark = getSetData(`https://api.scryfall.com/cards/search?q=s%3Awar+is%3Abooster`);
  console.log(warOfTheSpark);

  return (
    <>
      <Navigation />
      <Container className='' fluid>
        {/* <img className='bg' src={background} alt='damnation' /> */}
        <Row className='my-3'>
          <h1 className='text-center'>Poopy</h1>
        </Row>
      </Container>
    </>
  );
}

export default App;
