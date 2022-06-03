import { Button, Modal, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type Props = {
    open: boolean
    onClose: () => void
    onOpenEditModal: () => void
    onOpenReservationModal: () => void
    onOpenReservationsModal: () => void
    allowAddReservation: boolean
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 4,
};


const ChoiceModal: React.FC<Props> = ({ onClose, open, onOpenEditModal, onOpenReservationModal, allowAddReservation, onOpenReservationsModal }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                >
                    <Stack spacing={2}>
                        <Button variant="contained" color="primary" type='submit' onClick={onOpenReservationModal} disabled={!allowAddReservation}>
                            Adicionar reserva
                        </Button>
                        <Button variant="contained" color="primary" type='submit' onClick={onOpenReservationsModal}>
                            listar reservas
                        </Button>
                        <Button variant="contained" color="primary" type='submit' onClick={onOpenEditModal}>
                            Editar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default ChoiceModal;