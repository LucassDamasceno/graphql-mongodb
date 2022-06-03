import { LoginPageRouter } from "./../pages/login/index";
import { authSlice } from "./../redux/auth";
import { useSystem } from "./../hooks/system";

import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HomePageRouter } from "../pages/home";

type UseAuth = {
  login: (email: string, password: string) => void;
  signOut: () => void;
};

export const useAuth = (): UseAuth => {
  const { auth } = useSystem();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store: StoreState) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(HomePageRouter);
    }
    if (location.pathname === HomePageRouter && !isLoggedIn) {
      navigate(LoginPageRouter);
    }
  }, [navigate, isLoggedIn, location.pathname]);

  const login = async (email: string, password: string) => {
    const res = await auth.signIn(email, password);
    dispatch(authSlice.actions.login({ token: res.accessToken }));
  };

  const signOut = () => {
    dispatch(authSlice.actions.reset());
  };

  return { login, signOut };
};
