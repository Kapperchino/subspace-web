import { env } from "$env/dynamic/private";
import type { SignUp, LogIn, UserMeta } from "../models/signup.type.js";
import axios, { Axios, type AxiosResponse } from 'axios';

export const signup = async (signUp: SignUp): Promise<UserMeta> => {
    const data: AxiosResponse<UserMeta> = await axios.post(`${env.BACK_END}/auth/user`, signUp);
    return data.data;
}

export const login = async (login: LogIn): Promise<UserMeta> => {
    const data: AxiosResponse<UserMeta> = await axios.post(`${env.BACK_END}/auth/login`, login);
    return data.data;
}

