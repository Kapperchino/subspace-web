import { setContext } from 'svelte';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../models/signup.type';
import { getPosts } from '../../service/postsService';
import { getTags } from '../../service/trendingService';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        redirect(302, '/login');
    }
    redirect(302, '/search/posts');
};