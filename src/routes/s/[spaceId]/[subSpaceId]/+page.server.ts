import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import type { UserMeta } from '../../../../models/signup.type';
import { getPosts } from '../../../../service/postsService';
import { redirect } from '@sveltejs/kit';
import { getSpace } from '../../../../service/spaceService';

export const load: PageServerLoad = async ({ params, cookies, url, fetch }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const days = url.searchParams.get('days') ?? "7";
    const type = url.searchParams.get('type') ?? "popular";
    const spaceId = Number(params.subSpaceId);
    const posts = (await getPosts(fetch, user.user_id, spaceId, Number(days), type, 0)).json();
    const subspace = await getSpace(user, spaceId);
    return {
        user: user,
        posts: posts,
        spaceId: spaceId,
        subspace: subspace.data,
        params: params
    };
};