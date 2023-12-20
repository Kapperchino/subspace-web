import { redirect } from '@sveltejs/kit';
import type { LogIn } from '../../models/signup.type';
import { login } from '../../service/loginService';
import type { Actions } from './$types';

export const actions = {
    logout: async ({ cookies }) => {
        cookies.delete("user", {
            path: '/'
        });
        redirect(302, '/login');
    }
} satisfies Actions;