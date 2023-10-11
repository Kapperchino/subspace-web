import type { SignUp, LogIn } from "../models/signup.type.ts";
import axios, { Axios, type AxiosResponse } from 'axios';

const url = 'https://subspace-backend.fly.dev';

export const signup = async (signUp: SignUp): any => {
    const data = await axios.post(`${url}/auth/user`, signUp);
    return data;
}

export const login = async (login: LogIn): UserMeta => {
    const data: AxiosResponse<UserMeta> = await axios.post(`${url}/auth/login`, login);
    return data.data;
}

