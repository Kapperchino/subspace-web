import { setContext } from 'svelte';
import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../models/signup.type';
import { getPosts, getSearchPosts } from '../../../service/postsService';

export const load: PageServerLoad = async ({ params, cookies, url }) => {
    if (cookies.get("user") == undefined) {
        redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const term = url.searchParams.get('term') ?? "";
    const posts = await getSearchPosts(user, term, false);
    if (posts.status == 401) {
        redirect(302, '/login');
    }
    return {
        user: user,
        posts: posts.data,
        params: params
    };
};