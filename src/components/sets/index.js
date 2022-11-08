import './index.css';
import { getSetList } from '../../api/index';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Sets() {
    const [allSets, setAllSets] = useState(null);

    const getAllSets = async () => {
        setAllSets(await getSetList())
    }

    useEffect(() => {
        getAllSets();
    }, [])


    return (
        <Container className='body' fluid>
            <Row className='align-items-center text-center my-4'>
                <h1>Sets</h1>
            </Row>
            {allSets ?
                <SetType allSets={allSets} />
                :
                <h2 className='align-items-center text-center'>Retrieving Set List...</h2>}
        </Container>
    )
};

function SetType({ allSets }) {
    let expansionSets = allSets.map(({ name, set_type }, index) => {
        if (set_type === 'expansion') {
            return <a href='/' className='my-2' key={index}>{name}</a>
        }
    })

    let coreSets = allSets.map(({ name, set_type }, index) => {
        if (set_type === 'core') {
            return <a href='/' className='my-2' key={index}>{name}</a>
        }
    })

    let otherSets = allSets.map(({ name, set_type }, index) => {
        if (set_type !== 'expansion' && set_type !== 'core') {
            return <a href='/' className='my-2' key={index}>{name}</a>
        }
    })

    return (
        <Row>
            <Col>
                <h2 className='mb-4 type'>Expansion Sets</h2>
                <hr></hr>
                <Row>
                    {expansionSets}
                </Row>
            </Col>
            <Col>
                <h2 className='mb-4'>Core Sets</h2>
                <hr></hr>
                <Row>
                    {coreSets}
                </Row>
            </Col>
            <Col>
                <h2 className='mb-4'>Masters and Special Sets</h2>
                <hr></hr>
                <Row>
                    {otherSets}
                </Row>
            </Col>
        </Row>
    )
}

export default Sets;