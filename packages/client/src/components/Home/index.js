import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

function Home() {
    return (
        <Container className='' fluid>
            <Row className=' viewport align-items-center justify-content-center text-center' fluid lg>
                <Col className='' fluid md={10}>
                    <h1>MTG-EV</h1>
                    <h2>Check the value of your favorite Magic: The Gathering <Link to={'/setList'} >sets!</Link></h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;