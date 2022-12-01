import { Row, Col, Container, Accordion } from "react-bootstrap";

function CalcAccordion() {

    return (
        <Accordion defaultActiveKey="0" className="my-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Calculation Information</Accordion.Header>
                <Accordion.Body className="py-2">
                    <Row>
                        <Col className="p-0">
                            <Container>
                                <Row className="accordText">
                                    Older sets such as Alpha and Arabian Nights may be missing pricing data for certain cards that will affect the set's value.
                                </Row>
                                <Row className="accordText">
                                    Foils and variants are not included for value calculations.
                                </Row>
                                <Row className="accordText">
                                    Time Spiral Remastered includes Timeshifted cards.
                                </Row>
                            </Container>
                        </Col>
                        <Col className="p-0">
                            <Container>
                                <Row className="accordText">
                                    Booster boxes are assumed to have 36 packs in them with the exception of:
                                </Row>
                                <Row className="subText">
                                    &nbsp;&nbsp;&nbsp;&nbsp;- Masters set boxes, excluding Time Spiral Remastered, have 24 packs per box.
                                </Row>
                                <Row className="subText">
                                    &nbsp;&nbsp;&nbsp;&nbsp;- Chronicles and Alliances boxes have 45 packs per box.
                                </Row>
                                <Row className="subText">
                                    &nbsp;&nbsp;&nbsp;&nbsp;- Arabian Nights, Antiquities, The Dark, Fallen Empires, and Homelands boxes have 60 packs per box.
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default CalcAccordion;