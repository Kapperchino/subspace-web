import { setContext } from 'svelte';
import type { LayoutServerLoad } from '../../$types';
import type { UserMeta } from '../../../../../../../../../models/signup.type';
import { getComment, getCommentsForComments, getCommentsForPost } from '../../../../../../../../../service/commentService';
import { getPost } from '../../../../../../../../../service/postsService';

export const load: LayoutServerLoad = async ({ params, cookies, fetch }) => {
    let userId = 0
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined && userJson != 'undefined') {
        user = JSON.parse(userJson);
    }
    const post = await getPost(userId, Number(params.postId));
    if (Number(params.spaceId) !== post.space_parent_id || Number(params.subSpaceId) !== post.space_id) {
        return;
    }
    const rootComment = await getComment(Number(params.commentId), fetch);
    const comments = await getCommentsForComments(userId, Number(params.commentId), fetch);
    return {
        post: post,
        user: user,
        comments: comments,
        rootComment: rootComment
    };
};