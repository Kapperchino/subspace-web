import type { Actions } from './$types';
import { signup } from '../../service/loginService.d.ts';
import { type SignUp, LogIn, type UserMeta } from "../../models/signup.type.ts";


export const actions = {
    signup: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        const req: SignUp = formData as SignUp;
        const meta = await signup(req);
        console.log(meta);
        return {
            success: true
        };
    }
} satisfies Actions;