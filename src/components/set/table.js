import { DataGrid, gridNumberComparator } from '@mui/x-data-grid'
import { Box, Link } from '@mui/material';
import './index.css';

function DataTable({ totalSetData }) {
    const columns = [
        {
            field: 'cardName',
            headerName: 'Card Name',
            width: 400,
            renderCell: (params) => (
                <Link href={params.value.images.normal} target='_blank' color='inherit'>{params.value.name}</Link>
            )
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

                const valueFormatted = Number(params.value).toLocaleString();
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

                const valueFormatted = Number(params.value).toLocaleString();
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

    console.log(totalSetData);

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