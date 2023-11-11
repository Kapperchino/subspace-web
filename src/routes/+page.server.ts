import { redirect } from '@sveltejs/kit';
import type { LogIn } from '../models/signup.type';
import { login } from '../service/loginService';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const user = cookies.get("user");
    if (user?.length != 0) {
        throw redirect(302, '/home');
    }
    throw redirect(302, '/login');
};