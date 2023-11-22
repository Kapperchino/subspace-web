import { setContext } from 'svelte';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../../models/signup.type';
import { getUser, getUserPosts } from '../../../../service/userService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const curUser: UserMeta = JSON.parse(cookies.get("user")!);
    const userId = Number(params.id);
    const user = await getUser(curUser, userId);
    if (user.status == 401) {
        throw redirect(302, '/login');
    }
    const posts = await getUserPosts(curUser, userId);
    if (posts.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        curUser: curUser,
        user: user.data,
        posts: posts.data,
        params: params
    };
};