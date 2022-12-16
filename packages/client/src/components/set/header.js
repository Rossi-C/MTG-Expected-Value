import {Col, Row} from "react-bootstrap";

export default function SetHeader(props) {
    const {data} = props;
    return <>
        <Row style={{minHeight: 300}}  className={'p-4'}>
            <Col>
                {/* eslint-disable-next-line */}
                <Row>
                    <h1 className="text-center text-decoration-underline">{data.name} ({data.code.toUpperCase()})</h1>
                    <img src={`${data.icon_svg_uri}`} className={'set-icon'} width={300} height={300}/>
                    <Col>
                        <h6>Released: {data.released_at}</h6>
                        <h6>Code: {data.code.toUpperCase()}</h6>
                        <h6>Cards: {data.card_count}</h6>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row className={'p-4'}>
                    <h1>
                        Expected Value Estimations:
                    </h1>
                    <Col className={'p-4'}>
                        <h1 className={'text-decoration-underline'}>Low*</h1>
                        <h2>Pack: {`$${props.filteredPackValue}`}</h2>
                        <h2>Box:  {`$${props.filteredBoxValue}`}</h2>
                    </Col>
                    <Col className={'p-4'}>
                        <h1 className={'text-decoration-underline'}>High*</h1>
                        <h2>Pack: {`$${props.packValue}`}</h2>
                        <h2>Box:  {`$${props.boxValue}`}</h2>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>;
}