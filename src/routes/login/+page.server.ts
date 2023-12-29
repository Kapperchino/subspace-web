import { redirect } from '@sveltejs/kit';
import type { LogIn } from '../../models/signup.type';
import { login } from '../../service/loginService';
import type { Actions } from './$types';

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const info: LogIn = { email: formData.get('email')!.toString(), password: formData.get('password')!.toString() }
        const meta = await login(info);
        console.log(meta)
        cookies.set("user", JSON.stringify(meta), {
            path: '/'
        });
        redirect(302, '/home');
    }
} satisfies Actions;