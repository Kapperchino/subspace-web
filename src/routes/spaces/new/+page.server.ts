import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../models/signup.type';
import { getTags } from '../../../service/trendingService';
import { getSpaces } from '../../../service/spaceService';


export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const spaces = await getSpaces(user, 'latest');
    if (spaces.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        user: user,
        spaces: spaces.data,
        params: params
    };
};