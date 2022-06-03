import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Checkbox } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { Box } from '@mui/system';
import AddModal from './addModal';
import { Spectacle } from '../../models/spectacle';
import ChoiceModal from './choiceModal';
import EditModal from './editModal';
import AddReservatioModal from './addReservationModal';
import ReservationsModal from './reservationsModal';
import { gql, useMutation, useQuery } from '@apollo/client';

interface Column {
    id: string;
    label: any;
    minWidth?: number;
    width?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'check', label: "", width: 10 },
    { id: '_id', label: 'Id', minWidth: 50 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'reservations', label: 'Reservas', minWidth: 170 },
    { id: 'reservationsAvailable', label: 'Reservas disponíves', minWidth: 100 },
    { id: 'amountCollected', label: 'Arrecadação - impostos(14,33%)', minWidth: 170 },
];


const SpectaclesQuery = gql`
   query  {
       spectacles {
        _id
        name
        description
        name
        reservationLimit
        reservationPrice
        reservations {
            _id
            personName
        }
       } 
  }
`;

const deleteSpectacleGql = gql`
   mutation deleteSpectacle(
    $id: String!,
   ) {
     deleteSpectacle(id:$id)
  }
`;


const List: React.FC = () => {
    const [deleteSpectacle] = useMutation(deleteSpectacleGql);

    const { data, refetch } = useQuery<{ spectacles: Spectacle[] }>(SpectaclesQuery, { fetchPolicy: "no-cache" });
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [reservationsModalOpen, setReservationsModalOpen] = useState(false)
    const [editModalOpen, setEditAddModalOpen] = useState(false)
    const [choiceModalOpen, setChoiceModalOpen] = useState(false)
    const [reservationModalOpen, setreservationModalOpen] = useState(false)
    const [idClicked, setIdClicked] = useState(null)

    const [checkeds, setCheckeds] = React.useState<{ _id: number, checked: boolean }[]>([])

    const isChecked = (inputId: number) => {
        const checked = !!checkeds.find(({ _id, checked }) => _id === inputId && checked)
        return checked
    }

    useEffect(() => {
        if (data) {
            setCheckeds(data.spectacles.map(({ _id }) => ({ _id, checked: false })))
        }
    }, [data])


    const changeChecked = (inputId: number) => {

        const newValue = checkeds.map((v) => {
            if (v._id === inputId) {
                return { ...v, checked: !v.checked }
            }
            return v
        })

        setCheckeds(
            newValue
        )

    }

    const rows = data ? data.spectacles.map(({ _id, name, reservations, reservationPrice, reservationLimit }) => {

        const amountCollected = (reservationPrice * reservations.length)

        const tax = (amountCollected / 100 * 14.33)

        const finalAmountCollected = amountCollected - tax


        return {
            check: <Checkbox name='Checkbox' checked={isChecked(_id)} onChange={() => {
                changeChecked(_id)
            }} />,
            _id, name, reservations: reservations.length, reservationsAvailable: reservationLimit - reservations.length,
            amountCollected: `R$${amountCollected.toFixed(2)}  -  R$${tax.toFixed(2)}   →  R$${finalAmountCollected.toFixed(2)}`
        }
    }) : []


    return (
        <>
            <ReservationsModal onClose={() => setReservationsModalOpen(false)} open={reservationsModalOpen} spectacleId={idClicked!} refetchSpectacleList={refetch} />
            <AddReservatioModal onClose={() => setreservationModalOpen(false)} open={reservationModalOpen} spectacleId={idClicked!} refetchList={refetch} />
            <EditModal onClose={() => { setEditAddModalOpen(false) }} open={editModalOpen} id={idClicked!} refetchList={refetch} />
            <ChoiceModal
                onClose={() => setChoiceModalOpen(false)}
                open={choiceModalOpen}
                onOpenEditModal={() => {
                    setEditAddModalOpen(true)
                    setChoiceModalOpen(false)
                }}
                onOpenReservationModal={() => {
                    setreservationModalOpen(true)
                    setChoiceModalOpen(false)
                }}
                allowAddReservation={(() => {
                    if (data && idClicked) {
                        const spetacle = data!.spectacles.find(({ _id }) => idClicked === _id)
                        return spetacle!?.reservations?.length < spetacle!?.reservationLimit
                    }
                    return false
                })()}
                onOpenReservationsModal={() => {
                    setReservationsModalOpen(true)
                    setChoiceModalOpen(false)
                }}
            />
            <AddModal onClose={() => setAddModalOpen(false)} open={addModalOpen} refetchList={refetch} />
            <Box sx={{ padding: 1 }}>
                <Button
                    sx={{ marginRight: 1 }}
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={async () => {
                        await Promise.all(
                            checkeds.filter(({ checked }) => checked).map(({ _id }) => deleteSpectacle({ variables: { id: _id } }))
                        )
                        refetch()
                    }}>
                    Apagar
                </Button>
                <Button
                    variant="contained"
                    endIcon={<Add />} onClick={() => {
                        setAddModalOpen(true)
                    }}>
                    Adicionar
                </Button>
            </Box>
            <TableContainer sx={{}}>
                <Table >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth, width: column.width, fontWeight: "bold"
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id} sx={{ cursor: "pointer" }} >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} onClick={(v) => {
                                                if ((v.target as any).name !== "Checkbox") {
                                                    setChoiceModalOpen(true)
                                                    setIdClicked(row._id)
                                                }
                                            }} >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer >
        </>


    );
}

export default List;






