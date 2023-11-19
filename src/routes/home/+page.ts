import type { PageLoad, PageServerLoad } from './$types';
import { coockieStore } from '$lib/store/tokenStore';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ data }) => {
    if (browser) {
        coockieStore.setValue("cookie", data.user);
    }
    return data;
}; 