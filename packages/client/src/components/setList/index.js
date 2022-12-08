import './index.css';
import { getSetList } from '../../api/index';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SetList({ mode }) {
    const [allSets, setAllSets] = useState(null);
    const [errors, setErrors] = useState(false);

    const getAllSets = async () => {
        try {
            setAllSets(await getSetList())
        } catch (err) {
            setErrors(true);
        }

    }

    useEffect(() => {
        getAllSets();
    }, [])

    if (errors === true) {
        return (
            <div>
                <h1 className="text-center my-5">Could not retrieve the card data. Try again later!</h1>
            </div>
        )
    }

    return (
        <Container className='pb-5' fluid>
            <Row className='p-5'>
                <h1>Set List<hr className='title-hr'></hr></h1>
            </Row>
            {allSets ?
                <SetType allSets={allSets} />
                :
                <Row className={"h-50 p-5 viewport"}>
                    <Spinner className="m-auto" animation="border" role="status" variant={mode === 'light' ? 'dark' : 'light'}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            }
        </Container>
    )
};

function SetType({ allSets }) {
    let expansionSets = allSets.map(({ name, set_type, code }, index) => {
        if (set_type === 'expansion') {
            return <Link to={`/set/${code}`} className='my-2' key={index}>{name}</Link>
        }
    });

    let coreSets = allSets.map(({ name, set_type, code }, index) => {
        if (set_type === 'core') {
            return <Link to={`/set/${code}`} className='my-2' key={index}>{name}</Link>
        }
    });

    let otherSets = allSets.map(({ name, set_type, code }, index) => {
        if (set_type !== 'expansion' && set_type !== 'core') {
            return <Link to={`/set/${code}`} className='my-2' key={index}>{name}</Link>
        }
    });

    return (
        <Row className='px-5'>
            <Col lg={4}>
                <h2 className='my-4'>Expansion Sets</h2>
                <hr className='type-hr'></hr>
                <Row>
                    {expansionSets}
                </Row>
            </Col>
            <Col lg={4}>
                <h2 className='my-4'>Core Sets</h2>
                <hr className='type-hr'></hr>
                <Row>
                    {coreSets}
                </Row>
            </Col>
            <Col lg={4}>
                <h2 className='my-4'>Masters and Special Sets</h2>
                <hr className='type-hr'></hr>
                <Row>
                    {otherSets}
                </Row>
            </Col>
        </Row>
    )
}

export default SetList;