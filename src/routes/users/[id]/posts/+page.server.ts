import { setContext } from 'svelte';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../../models/signup.type';
import { getUser, getUserPosts } from '../../../../service/userService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const userJson = cookies.get("user");
    let curUser: UserMeta | undefined;
    if (userJson != undefined) {
        curUser = JSON.parse(userJson);
    }
    const userId = Number(params.id);
    const user = await getUser(userId);
    const posts = await getUserPosts(userId);
    return {
        curUser: curUser,
        user: user.data,
        posts: posts.data,
        params: params
    };
};