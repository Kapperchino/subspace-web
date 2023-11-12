import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../models/signup.type';
import { getPosts } from '../../service/postsService';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const posts = await getPosts(user, 1);
    console.log(JSON.stringify(posts.data));
    if (posts.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        user: user,
        posts: posts.data,
        params: params
    };
};