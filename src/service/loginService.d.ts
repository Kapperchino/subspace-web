import type { SignUp, LogIn } from "../models/signup.type.ts";
import axios from 'axios';

const url = 'https://subspace-backend.fly.dev/auth/user';

export const signup = async (signUp: SignUp) : any => {
    const data = await axios.post(url, signUp);
    console.log(data);
}

export const login = async (login: LogIn) : any => {
    const data = await axios.post(url, login);
    console.log(data);
}

