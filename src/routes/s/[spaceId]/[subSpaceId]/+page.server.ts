import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import type { UserMeta } from '../../../../models/signup.type';
import { getPosts } from '../../../../service/postsService';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if(cookies.get("user") == undefined){
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const posts = await getPosts(user, Number(params.spaceId));
    if(posts.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        user: user,
        posts: posts.data,
        params: params
    };  
};