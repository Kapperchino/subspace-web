import type { Actions } from './$types';
import { login } from '../../service/loginService.d.ts';
import { type SignUp, LogIn, type UserMeta } from "../../models/signup.type.ts";


export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const info: LogIn = { email: formData.get('email')!.toString(), password: formData.get('password')!.toString() }
        const meta = await login(info);
        cookies.set("user", JSON.stringify(meta));
        return {
            success: true
        };
    }
} satisfies Actions;