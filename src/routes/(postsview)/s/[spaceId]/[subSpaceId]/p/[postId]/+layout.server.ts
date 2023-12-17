import { setContext } from 'svelte';
import type { UserMeta } from '../../../../../../../models/signup.type';
import { getCommentsForPost } from '../../../../../../../service/commentService';
import { getPost } from '../../../../../../../service/postsService';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
    let userId = 0
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined) {
        user = JSON.parse(userJson);
    }
    const post = await getPost(userId, Number(params.postId));
    if (Number(params.spaceId) !== post.space_parent_id || Number(params.subSpaceId) !== post.space_id) {
        return;
    }
    const comments = await getCommentsForPost(userId, post.id);
    return {
        post: post,
        user: user,
        comments: comments
    };
};