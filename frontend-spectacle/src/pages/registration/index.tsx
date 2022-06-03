import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import Copyright from './copyright';

import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LoginPageRouter } from '../login';
import { gql, useMutation } from '@apollo/client';

export const RegistrationPageRouter = "/registration"

const createUserGql = gql`
   mutation createSpectacle(
    $name: String!,
    $email: String!,
    $password: String!,
   ) {
    createUser(
        name: $name
        email: $email
        password: $password
    ){
        _id
        name
        email
        password
        createdAt 
    }
  }
`;

const validations = yup.object({
    name: yup.string().required("informe o nome"),
    email: yup.string().email("email inválido").required("informe o email"),
    password: yup.string().required("informe a senha").min(6, "senha inválida")
}).required()


const RegistrationPage: React.FC = () => {
    const [createUser] = useMutation(createUserGql);
    const navigation = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        onSubmit: async (data) => {
            await createUser({ variables: { ...data } })
            navigation(LoginPageRouter)
        },
        validationSchema: validations
    });

    return (<>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastre-se
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome"
                        name="name"
                        autoComplete="nome"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={!!formik.errors.name && formik.touched.name}
                        helperText={formik.errors.name}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={!!formik.errors.email && formik.touched.email}
                        helperText={formik.errors.email}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={!!formik.errors.password && formik.touched.password}
                        helperText={formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container></>);
}

export default RegistrationPage;