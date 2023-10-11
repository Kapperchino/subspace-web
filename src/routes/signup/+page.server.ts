import type { SignUp } from '../../models/signup.type';
import { signup } from '../../service/loginService';
import type { Actions } from './$types';


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