import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import Copyright from './copyright';

import * as yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { RegistrationPageRouter } from '../registration';
export const LoginPageRouter = "/login"

const validations = yup.object({
    email: yup.string().email("email inválido").required("informe o email"),
    password: yup.string().required("informe a senha").min(6, "senha inválida")
}).required()

const LoginPage: React.FC = () => {

    const { login } = useAuth()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ email, password }) => {
            login(email, password)
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
                    Login
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Esqueceu a senha?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={RegistrationPageRouter} variant="body2">
                                Não tem uma conta? Cadastre-se
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container></>);
}

export default LoginPage;