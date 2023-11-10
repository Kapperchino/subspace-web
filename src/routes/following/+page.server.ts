import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import type { UserMeta } from '../../models/signup.type';
import { getSubscriptions } from '../../service/postsService';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    if(cookies.get("user") == undefined){
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const posts = await getSubscriptions(user);
    if(posts.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        user: user,
        posts: posts.data
    };  
};