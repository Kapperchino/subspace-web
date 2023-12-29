import { setContext } from 'svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { UserMeta } from '../../../models/signup.type';
import { getUser } from '../../../service/userService';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
    const userJson = cookies.get("user");
    let curUser: UserMeta | undefined;
    if (userJson != undefined) {
        curUser = JSON.parse(userJson);
    }
    const userId = Number(params.id);
    const user = await getUser(userId);
    return {
        curUser: curUser,
        user: user,
        params: params
    };
};