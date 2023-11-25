import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../models/signup.type';
import { getPosts } from '../../service/postsService';
import type { Post } from '../../models/post.type';

export const load: PageServerLoad = async ({ params, cookies, url }) => {
    let userId = 0;
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined) {
        user = JSON.parse(userJson);
        if (user != null) {
            userId = user.user_id;
        }
    }

    const days = url.searchParams.get('days') ?? "7";
    const type = url.searchParams.get('type') ?? "popular";
    async function fetchFunction(): Promise<Post[]> {
        return (await getPosts(userId, 1, Number(days), type)).json();
    }
    return {
        user: user,
        streamed: {
            posts: fetchFunction()
        },
        params: params
    };
};