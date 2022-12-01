import { DataGrid, gridNumberComparator, gridStringOrNumberComparator } from '@mui/x-data-grid'
import { Box, Link } from '@mui/material';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './index.css';

function DataTable({ totalSetData }) {
    const cardNameComparator = (v1, v2) => (v1.name.toLowerCase()).localeCompare((v2.name.toLowerCase()));

    const columns = [
        {
            field: 'cardName',
            headerName: 'Card Name',
            sortComparator: cardNameComparator,
            width: 400,
            renderCell: (params) => (
                <OverlayTrigger
                    placement='top'
                    overlay={
                        <Tooltip>
                            <img className='popUpImg' src={params.value.images.normal} />
                        </Tooltip>
                    }
                >
                    <Link href={params.value.images.normal} target='_blank' color='inherit'>{params.value.name}</Link>
                </OverlayTrigger>
            ),
        },
        { field: 'rarity', headerName: 'Rarity', headerAlign: 'right', align: 'right', width: 200 },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            sortComparator: gridNumberComparator,
            width: 200,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                }

                const valueFormatted = Number(params.value).toFixed(2).toLocaleString();
                return `$ ${valueFormatted}`;
            }
        },
        {
            field: 'probability',
            headerName: 'Probability Per Pack',
            type: 'number',
            sortComparator: gridNumberComparator,
            width: 200,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                }

                const valueFormatted = Number(params.value).toFixed(2).toLocaleString();
                return `${valueFormatted} %`;
            }
        },
        {
            field: 'packEV',
            headerName: 'Contributed Pack EV',
            type: 'number',
            sortComparator: gridNumberComparator,
            width: 200,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                }

                const valueFormatted = Number(params.value).toLocaleString();
                return `$ ${valueFormatted}`;
            }
        },
    ];

    const filteredData = totalSetData.filter(card => card.images === undefined)

    const generateRows = () => {
        let rows = [];
        let row = {};
        for (let card of totalSetData) {
            row = {
                id: card.name, cardName: card, rarity: card.rarity, price: card.price, probability: (card.probability * 100).toFixed(2), packEV: (card.probability * card.price).toFixed(3),
            }
            rows.push(row);
        }
        return rows;
    }

    const rows = generateRows();

    return (
        <Box sx={{ height: 631, width: '100%', background: '#212529', color: 'white', paddingLeft: 0, paddingRight: 0 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[10, 50, 100]}
                sx={{ color: 'white' }}
            />
        </Box>
    );
}

export default DataTable;