import { env } from "$env/dynamic/private";
import type { SignUp, LogIn, UserMeta } from "../models/signup.type.js";

export const signup = async (signUp: SignUp): Promise<UserMeta> => {
    const future: Promise<UserMeta> = (await fetch(`${env.BACK_END}/auth/user`, { method: "POST", body: JSON.stringify(signUp) })).json()
    return future;
}

export const login = async (login: LogIn): Promise<UserMeta> => {
    const data: UserMeta = await (await fetch(`${env.BACK_END}/auth/login`, { method: "POST", body: JSON.stringify(login) })).json();
    return data;
}

