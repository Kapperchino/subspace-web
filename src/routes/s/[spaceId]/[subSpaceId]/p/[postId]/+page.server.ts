import { setContext } from 'svelte';
import type { UserMeta } from '../../../../../../models/signup.type';
import { getPost } from '../../../../../../service/postsService';
import type { PageServerLoad } from './$types';
import { getCommentsForPost } from '../../../../../../service/commentService';

export const load: PageServerLoad = async ({ params, cookies }) => {
    let userId = 0;
    const user: UserMeta = JSON.parse(cookies.get("user") ?? "");
    if (user != null) {
        userId = user.user_id;
    }
    const post = await getPost(userId, Number(params.postId));
    if (Number(params.spaceId) !== post.space_parent_id || Number(params.subSpaceId) !== post.space_id) {
        return;
    }
    const comments = getCommentsForPost(userId, post.id);
    return {
        post: post,
        user: user,
        comments: comments
    };
};