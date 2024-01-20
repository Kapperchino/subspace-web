import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import type { UserMeta } from '../../models/signup.type';
import { getTags } from '../../service/trendingService';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined && userJson != 'undefined') {
        user = JSON.parse(userJson);
    }
    const tags = await getTags(fetch);
    return {
        user: user,
        tags: tags,
        params: params
    };
};

export const actions = {
    search: async ({ request, cookies }) => {
        const formData = await request.formData();
        const term = formData.get('search');
        redirect(302, `/search/posts?term=${term}`);
    }
} satisfies Actions;