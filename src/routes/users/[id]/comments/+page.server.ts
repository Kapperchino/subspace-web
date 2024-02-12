import { setContext } from 'svelte';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../../models/signup.type';
import { getUser, getUserComments, getUserPosts } from '../../../../service/userService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, fetch, url }) => {
    const userJson = cookies.get("user");
    let curUser: UserMeta | undefined;
    if (userJson != undefined && userJson != 'undefined') {
        curUser = JSON.parse(userJson);
    }
    const userId = Number(params.id);
    const user = await getUser(userId, fetch);
    const days = url.searchParams.get('days') ?? "7";
    const type = url.searchParams.get('type') ?? "popular";
    const comments = await getUserComments(userId, curUser?.user_id ?? -1, fetch, type, Number(days));
    return {
        curUser: curUser,
        user: user,
        comments: comments,
        params: params
    };
};