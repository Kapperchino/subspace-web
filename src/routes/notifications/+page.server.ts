import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../models/signup.type';
import { getPosts } from '../../service/postsService';
import { getTags } from '../../service/trendingService';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    throw redirect(302, '/notifications/all');
};