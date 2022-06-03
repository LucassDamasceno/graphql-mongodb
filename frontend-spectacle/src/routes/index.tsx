import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes as ReactRoutes, } from 'react-router-dom';
import HomePage, { HomePageRouter } from '../pages/home';
import LoginPage, { LoginPageRouter } from '../pages/login';
import RegistrationPage, { RegistrationPageRouter } from '../pages/registration';
import { StoreState } from '../redux';

const Routes: React.FC = () => {
    const auth = useSelector((store: StoreState) => store.auth)

    return (
        <>
            <ReactRoutes>
                <Route index element={auth.isLoggedIn ? <HomePage /> : <LoginPage />} />
                <Route path={RegistrationPageRouter} element={<RegistrationPage />} />
                <Route path={LoginPageRouter} element={<LoginPage />} />
                <Route path={HomePageRouter} element={<HomePage />} />
            </ReactRoutes>
        </>
    )
}

export default Routes;