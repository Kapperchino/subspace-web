import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import type { UserMeta } from '../../models/signup.type';
import { getSubscriptions } from '../../service/postsService';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url, fetch }) => {
    if (cookies.get("user") == undefined) {
        redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const days = url.searchParams.get('days') ?? "7";
    const type = url.searchParams.get('type') ?? "popular";
    const res = await getSubscriptions(user, Number(days), type, fetch);
    if (res.status == 401) {
        redirect(302, '/login');
    }
    const posts = await res.json();
    return {
        user: user,
        posts: posts
    };
};