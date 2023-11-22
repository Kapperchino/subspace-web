import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import type { UserMeta } from '../../../../models/signup.type';
import { getPosts } from '../../../../service/postsService';
import { redirect } from '@sveltejs/kit';
import { getSpace } from '../../../../service/spaceService';

export const load: PageServerLoad = async ({ params, cookies, url }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const days = url.searchParams.get('days') ?? "7";
    const type = url.searchParams.get('type') ?? "popular";
    const spaceId = Number(params.subSpaceId);
    const posts = await getPosts(user, spaceId, Number(days), type);
    if (posts.status == 401) {
        throw redirect(302, '/login');
    }
    const subspace = await getSpace(user, spaceId);
    if (subspace.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        user: user,
        posts: posts.data,
        spaceId: spaceId,
        subspace: subspace.data,
        params: params
    };
};