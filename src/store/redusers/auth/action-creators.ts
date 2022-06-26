import {IUser} from "../../../models/IUser";
import {AuthActionEnum, SetErrorAction, SetAuthAction, SetIsLoadingAction, SetUserAction} from "./types";
import { AppDispatch } from "../../index";
import axios from "axios";


export const AuthActionCreators = {


    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: isAuth,
    }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload }),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout( async () => {
                const response = await axios.get<IUser[]>('./users.json');
                const mockUsers = response.data.find(user => user.username === username && user.password === password);
                if(mockUsers) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUsers.username);
                    dispatch(AuthActionCreators.setIsAuth(true));
                    dispatch(AuthActionCreators.setUser(mockUsers));
                } else {
                    dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
                }
            }, 1000);

            dispatch(AuthActionCreators.setIsLoading(false));
            //console.log(mockUsers);
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка при Логине'));
        }

    },


    logout: () => async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('Auth');
            localStorage.removeItem('username');
            dispatch(AuthActionCreators.setUser({} as IUser ));
            dispatch(AuthActionCreators.setIsAuth(false));
        } catch (e) {

        }
    }

}