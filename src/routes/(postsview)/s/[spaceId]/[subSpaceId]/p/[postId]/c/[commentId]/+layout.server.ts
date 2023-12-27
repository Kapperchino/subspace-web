import { setContext } from 'svelte';
import type { LayoutServerLoad } from '../../$types';
import type { UserMeta } from '../../../../../../../../../models/signup.type';
import { getComment, getCommentsForComments, getCommentsForPost } from '../../../../../../../../../service/commentService';
import { getPost } from '../../../../../../../../../service/postsService';

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
    const rootComment = await getComment(Number(params.commentId));
    const comments = await getCommentsForComments(userId, Number(params.commentId));
    return {
        post: post,
        user: user,
        comments: comments,
        rootComment: rootComment
    };
};