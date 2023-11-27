import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import type { UserMeta } from '../../../../models/signup.type';
import { getPosts } from '../../../../service/postsService';
import { redirect } from '@sveltejs/kit';
import { getSpace } from '../../../../service/spaceService';

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
    const spaceId = Number(params.subSpaceId);
    const posts = (await getPosts(fetch, userId, spaceId, Number(days), type, 0)).json();
    const subspace = await getSpace(spaceId);
    return {
        user: user,
        posts: posts,
        spaceId: spaceId,
        subspace: subspace.data,
        params: params
    };
};