import { Container, Nav, Navbar, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Navigation({ toggleMode }) {

    return (
        <Navbar sticky='top' collapseOnSelect bg="dark" variant='dark' expand="md" fluid>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>Magic: The Gathering - EV</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to='/'>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/setList'>
                            <Nav.Link>Set List</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Text className='px-2'>Light Mode</Navbar.Text>
                    <Form className='d-flex'>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            onClick={toggleMode}
                        />
                    </Form>
                    <Navbar.Text className=''>Dark Mode</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;