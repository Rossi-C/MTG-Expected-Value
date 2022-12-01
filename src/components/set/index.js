import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Container, Row, Table, Col, Accordion } from 'react-bootstrap';
import { setEV } from '../../utils/calculator';
import { getSetInfo } from '../../api';
import DataTable from "./table";
import CalcAccordion from "./accordion";

function Set() {
    let { setCode } = useParams();
    const [packValue, setPackValue] = useState(null);
    const [boxValue, setBoxValue] = useState(null);
    const [filteredPackValue, setFilteredPackValue] = useState(null);
    const [filteredBoxValue, setFilteredBoxValue] = useState(null);
    const [totalSetData, setTotalSetData] = useState(null);
    const [setName, setSetName] = useState(null);
    const [errors, setErrors] = useState(false);


    const getSetData = async () => {
        try {
            const { packValue, boxValue, filteredPackValue, filteredBoxValue, totalSetData } = await setEV(setCode);
            if (packValue || boxValue || filteredPackValue || filteredBoxValue || totalSetData) {
                setPackValue(packValue);
                setBoxValue(boxValue);
                setFilteredPackValue(filteredPackValue);
                setFilteredBoxValue(filteredBoxValue);
                setTotalSetData(totalSetData);
            }
            let { name } = await getSetInfo(setCode);
            if (name) {
                setSetName(name);
            }
        } catch (err) {
            setErrors(true);
        };
    };

    useEffect(() => {
        getSetData();
    }, [])

    if (errors === true) {
        return (
            <div>
                <h1 className="text-center my-5">Could not retrieve the card data. Try again later!</h1>
            </div>
        )
    }

    return (
        <>
            {totalSetData ?
                <Container>
                    <Row className="pt-3 pb-5">
                        <h1 className="text-center">{setName}</h1>
                    </Row>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th colSpan={4} className='text-center'>Expected Values Including All Cards In {setName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Booster Pack</td>
                                <td>${packValue}</td>
                                <td>Booster Box</td>
                                <td>${boxValue}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover variant="dark" className="">
                        <thead>
                            <tr>
                                <th colSpan={4} className='text-center'>Expected Values Exluding All Cards With Value Less Than $2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Booster Pack</td>
                                <td>${filteredPackValue}</td>
                                <td>Booster Box</td>
                                <td>${filteredBoxValue}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Row className="py-5">
                        <h2 className="text-center">Card List</h2>
                    </Row>
                    <Row className='px-2 pb-5' style={{ color: 'white' }}>
                        <DataTable totalSetData={totalSetData} />
                    </Row>

                    <Row className="pb-3">
                        <CalcAccordion />
                    </Row>
                </Container>
                :
                <div>
                    <h1 className="text-center">Data Not Yet Available!</h1>
                </div>
            }
        </>
    )
}

export default Set;