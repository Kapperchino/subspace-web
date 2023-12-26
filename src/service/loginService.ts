import { env } from "$env/dynamic/private";
import type { SignUp, LogIn, UserMeta } from "../models/signup.type.js";
import axios, { Axios, type AxiosResponse } from 'axios';

export const signup = async (signUp: SignUp): Promise<AxiosResponse<UserMeta>> => {
    const future: Promise<AxiosResponse<UserMeta>> = axios.post(`${env.BACK_END}/auth/user`, signUp)
    return future;
}

export const login = async (login: LogIn): Promise<UserMeta> => {
    const data: AxiosResponse<UserMeta> = await axios.post(`${env.BACK_END}/auth/login`, login);
    return data.data;
}

