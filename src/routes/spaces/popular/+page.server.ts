import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../models/signup.type';
import { getTags } from '../../../service/trendingService';
import { getSpaces } from '../../../service/spaceService';


export const load: PageServerLoad = async ({ params, cookies }) => {
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined) {
        user = JSON.parse(userJson);
    }
    const spaces = await getSpaces('popular');
    return {
        user: user,
        spaces: spaces,
        params: params
    };
};