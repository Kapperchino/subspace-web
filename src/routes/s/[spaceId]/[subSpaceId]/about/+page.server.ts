import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../../../models/signup.type';
import { getSpace } from '../../../../../service/spaceService';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const spaceId = Number(params.subSpaceId);
    const subspace = await getSpace(user, spaceId);
    if (subspace.status == 401) {
        throw redirect(302, '/login');
    }
    return {
        user: user,
        spaceId: spaceId,
        subspace: subspace.data,
        params: params
    };
};