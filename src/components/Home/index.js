import { Container, Row, Col } from 'react-bootstrap';
import './index.css';

function Home() {
    return (
        <Container className='' fluid>
            <Row className='align-items-center viewport text-center'>
                <Col>
                    <h1>MTG-EV</h1>
                    <h2>Check the value of your favorite sets!</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;