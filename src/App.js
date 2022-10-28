import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { packEV } from './components/calculator';
import Navigation from './components/navbar';

function App() {
  // const warOfTheSpark = getSetData(`https://api.scryfall.com/cards/search?q=s%3Awar+is%3Abooster`);
  // console.log(warOfTheSpark);
  console.log(packEV('war'));



  return (
    <>
      <Navigation />
      <Container className='' fluid>
        <Row className='my-3'>
          <h1 className='text-center'>Poopy</h1>
        </Row>
        <Row>
          <p></p>
        </Row>
      </Container>
    </>
  );
}

export default App;
