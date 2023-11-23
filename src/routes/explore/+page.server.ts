import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import type { UserMeta } from '../../models/signup.type';
import { getPosts } from '../../service/postsService';
import { getTags } from '../../service/trendingService';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const tags = await getTags(user);
    if (tags.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        user: user,
        tags: tags.data,
        params: params
    };
};

export const actions = {
    search: async ({ request, cookies }) => {
        const formData = await request.formData();
        const term = formData.get('search');
        throw redirect(302, `/search/posts?term=${term}`);
    }
} satisfies Actions;