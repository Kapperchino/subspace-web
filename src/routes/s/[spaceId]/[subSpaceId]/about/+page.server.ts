import { setContext } from 'svelte';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import type { UserMeta } from '../../../../../models/signup.type';
import { getSpace } from '../../../../../service/spaceService';
import { getSubscription } from '../../../../../service/subscriptionService';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (cookies.get("user") == undefined) {
        throw redirect(302, '/login');
    }
    const user: UserMeta = JSON.parse(cookies.get("user")!);
    const spaceId = Number(params.subSpaceId);
    const subspace = await getSpace(spaceId);
    const subRes = await getSubscription(spaceId, user);
    const isSubbed = subRes.status == 200;
    return {
        user: user,
        spaceId: spaceId,
        isSubbed: isSubbed,
        subspace: subspace.data,
        params: params
    };
};