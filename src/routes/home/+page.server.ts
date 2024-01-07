import { setContext } from 'svelte';
import type { Actions, PageServerLoad } from './$types';
import type { UserMeta } from '../../models/signup.type';
import { getPosts } from '../../service/postsService';
import type { Post } from '../../models/post.type';
import { env } from '$env/dynamic/private';


async function fetchFunction(fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>, userId: number, days: string, type: string, offset: number): Promise<Post[]> {
    const data: Response = await fetch(`${env.BACK_END}/posts/spaces/1?sort=${type}&days=${days}&userId=${userId}&start=${offset}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });
    return data.json();
}

export const load: PageServerLoad = async ({ params, cookies, url, fetch }) => {
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
    return {
        user: user,
        posts: await fetchFunction(fetch, userId, days, type, 0),
        params: params
    };
};