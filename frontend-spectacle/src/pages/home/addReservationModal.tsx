/* eslint-disable react/jsx-no-duplicate-props */

import { gql, useMutation } from '@apollo/client';
import { Button, Modal, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

const validations = yup.object({
    personName: yup.string().required("informe o nome"),
    personCPF: yup.string().required("informe o nome"),
}).required()


type Props = {
    open: boolean
    onClose: () => void
    spectacleId: number
    refetchList: () => Promise<any>
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    p: 4,
};

const addReservationGql = gql`
   mutation createSpectacle(
    $spectacle: String!,
    $personName: String!,
    $personCPF: String!,
   ) {
    createReservation(input:{
        spectacle: $spectacle
        personName: $personName
        personCPF: $personCPF
    }) {
        personName
    }
  }
`;


const AddReservatioModal: React.FC<Props> = ({ onClose, open, spectacleId, refetchList }) => {
    const [addReservation] = useMutation(addReservationGql);


    const formik = useFormik({
        initialValues: {
            personName: "",
            personCPF: "",
        },
        onSubmit: async ({ personCPF, personName }) => {
            await addReservation({ variables: { personCPF, personName, spectacle: spectacleId } })
            refetchList()
            onClose()
        },
        validationSchema: validations
    });

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
                    component="form"
                    onSubmit={formik.handleSubmit}
                >
                    <Stack>
                        <TextField
                            id="personName"
                            name='personName'
                            label="Nome da pessoa"
                            onChange={formik.handleChange}
                            value={formik.values.personName}
                            error={!!formik.errors.personName && formik.touched.personName}
                            helperText={formik.errors.personName}
                            sx={{ marginBottom: 1 }}
                        />
                        <TextField
                            id="personCPF"
                            name='personCPF'
                            label="CPF"
                            onChange={formik.handleChange}
                            value={formik.values.personCPF}
                            error={!!formik.errors.personCPF && formik.touched.personCPF}
                            helperText={formik.errors.personCPF}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: 3 }}>
                        <Button variant="outlined" color="error" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="success" type='submit'>
                            Salvar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}

export default AddReservatioModal;