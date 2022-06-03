import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Reservation } from '../../models/reservation';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { gql, useMutation, useQuery } from '@apollo/client';

type Props = {
    open: boolean
    onClose: () => void
    refetchSpectacleList: () => Promise<any>
    spectacleId: number
}

interface Column {
    id: string;
    label: any;
    minWidth?: number;
    width?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: '_id', label: 'Id', minWidth: 50 },
    { id: 'personName', label: 'Nome', minWidth: 170 },
    { id: 'personCPF', label: 'CPF', minWidth: 170 },
    { id: 'cancel', label: "cancelar", width: 10 },
];


const reservationsQuery = gql`
        query reservations($spectacleId: String!)  {
            reservations(spectacleId: $spectacleId) {
                _id
                personName
                personCPF
            }
        }
    `;

const deleteReservationQuery = gql`
    mutation deleteReservation($id:String!) {
    deleteReservation(id:$id)
    }
`

const ReservationsModal: React.FC<Props> = ({ onClose, open, spectacleId, refetchSpectacleList }) => {
    const [deleteReservation] = useMutation(deleteReservationQuery);
    const { data, refetch } = useQuery<{ reservations: Reservation[] }>(reservationsQuery, {
        variables: {
            spectacleId
        },
        skip: !spectacleId
    });

    useEffect(() => {
        if (spectacleId) {
            refetch()
        }
    }, [open, refetch, spectacleId])

    const rows = data ? data?.reservations?.map(({ _id, personCPF, personName }) => {
        return {
            _id, personCPF, personName, cancel: <IconButton onClick={async () => {
                deleteReservation({ variables: { id: _id } })
                refetchSpectacleList()
                refetch()
            }} color="primary" aria-label="upload picture" component="span">
                <Delete />
            </IconButton>
        }
    }) : []

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 4,
                        height: "100vh",
                        overflowY: "scroll"
                    }}
                >
                    <TableContainer sx={{ overflowY: "scroll" }}>
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
                            <TableBody sx={{ overflowY: "scroll" }}>
                                {rows?.map((row: any) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id} sx={{ cursor: "pointer" }} >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
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
                </Box>
            </Modal>
        </div>
    );
}

export default ReservationsModal;