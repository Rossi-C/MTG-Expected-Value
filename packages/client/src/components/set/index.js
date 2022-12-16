import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import {Container, Row, Spinner} from 'react-bootstrap';
import {setEV} from '../../utils/calculator';
import {getSetInfo} from '../../api';
import DataTable from "./table";
import CalcAccordion from "./accordion";
import SetHeader from "./header";


function Set({mode}) {
    let {setCode} = useParams();
    const [packValue, setPackValue] = useState(null);
    const [boxValue, setBoxValue] = useState(null);
    const [filteredPackValue, setFilteredPackValue] = useState(null);
    const [filteredBoxValue, setFilteredBoxValue] = useState(null);
    const [totalSetData, setTotalSetData] = useState(null);
    const [setData, setSetData] = useState(null);
    const [errors, setErrors] = useState(false);


    const getSetData = async () => {
        try {
            const {packValue, boxValue, filteredPackValue, filteredBoxValue, totalSetData} = await setEV(setCode);
            if (packValue || boxValue || filteredPackValue || filteredBoxValue || totalSetData) {
                setPackValue(packValue);
                setBoxValue(boxValue);
                setFilteredPackValue(filteredPackValue);
                setFilteredBoxValue(filteredBoxValue);
                setTotalSetData(totalSetData);
            }
            let data = await getSetInfo(setCode);
            if (data) {
                console.log(data);
                setSetData(data);
            }
        } catch (err) {
            setErrors(true);
        }
        ;
    };

    useEffect(() => {
        getSetData();
        // eslint-disable-next-line
    }, [])

    if (errors === true) {
        return (
            <div>
                <h1 className="text-center my-5 viewport">Could not retrieve the card data. Try again later!</h1>
            </div>
        )
    }

    return (
        <>
            {totalSetData && setData ?
                <Container>
                    <SetHeader
                        data={setData}
                        packValue={packValue}
                        boxValue={boxValue}
                        filteredPackValue={filteredPackValue}
                        filteredBoxValue={filteredBoxValue}
                    />

                    <Row className="py-5">
                        <h2 className="text-center">Card List</h2>
                    </Row>
                    <Row className='px-2 pb-5' style={{color: 'white'}}>
                        <DataTable totalSetData={totalSetData}/>
                    </Row>
                    <Row className="pb-3">
                        <CalcAccordion/>
                    </Row>
                </Container>
                :
                <Row className={"h-50 p-5 viewport"}>
                    <Spinner className="m-auto" animation="border" role="status"
                             variant={mode === 'light' ? 'dark' : 'light'}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            }
        </>
    )
}



export default Set;