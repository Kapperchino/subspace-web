import type { SignUp, LogIn } from "../models/signup.type.ts";
import axios from 'axios';
import { jwtToken } from '../lib/jwtStore.d.ts';

const url = 'https://subspace-backend.fly.dev';

export const signup = async (signUp: SignUp) : any => {
    const data = await axios.post(`${url}/auth/user`, signUp);
    jwtToken.set(data.data.token);
}

export const login = async (login: LogIn) : any => {
    const data = await axios.post(`${url}/auth/login`, login);
    jwtToken.set(data.data.token);
}

