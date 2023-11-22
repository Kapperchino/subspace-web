import { setContext } from 'svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { UserMeta } from '../../../models/signup.type';
import { getUser } from '../../../service/userService';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const curUser: UserMeta = JSON.parse(cookies.get("user")!);
    const userId = Number(params.id);
    const user = await getUser(curUser, userId);
    if (user.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        curUser: curUser,
        user: user.data,
        params: params
    };
};