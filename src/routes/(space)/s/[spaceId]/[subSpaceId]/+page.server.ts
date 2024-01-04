import type { PageServerLoad } from './$types';
import type { UserMeta } from '../../../../../models/signup.type';
import { getPosts } from '../../../../../service/postsService';
import type { Post } from '../../../../../models/post.type';

export const load: PageServerLoad = async ({ parent, params, cookies, url, fetch }) => {
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
    const postsFuture: Promise<Post[]> = getPosts(fetch, userId, spaceId, Number(days), type, 0)
        .then(res => res.json());
    const posts = await postsFuture;
    var subspace = await parent();
    return {
        user: user,
        posts: posts,
        spaceId: spaceId,
        subspace: subspace.subspace,
        params: params
    };
};