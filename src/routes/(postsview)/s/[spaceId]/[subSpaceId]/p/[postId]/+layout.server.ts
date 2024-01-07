import { setContext } from 'svelte';
import type { UserMeta } from '../../../../../../../models/signup.type';
import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { Post } from '../../../../../../../models/post.type';
import type { CommentData, Comment } from '../../../../../../../models/comment.type';

export const load: LayoutServerLoad = async ({ params, cookies, fetch }) => {
    let userId = 0
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined) {
        user = JSON.parse(userJson);
    }
    const post = await getPost(userId, Number(params.postId), fetch);
    if (Number(params.spaceId) !== post.space_parent_id || Number(params.subSpaceId) !== post.space_id) {
        return;
    }
    const comments = await getCommentsForPost(userId, post.id, fetch);
    return {
        post: post,
        user: user,
        comments: comments
    };
};

const getPost = async (userId: number, postId: number, fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>): Promise<Post> => {
    const data: Response = await fetch(`${env.BACK_END}/posts/${postId}?userId=${userId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}

const getCommentsForPost = async (userId: number, postId: number, fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,): Promise<Array<CommentData>> => {
    const data: Response = await fetch(`${env.BACK_END}/comments?postId=${postId}&userId=${userId}&sort=popular&days=365`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    const comments = (await data.json()) as Array<Comment>;
    if (comments == null) {
        return [];
    }
    const commentsData: CommentData[] = comments.map((e) => <CommentData>{ comment: e, children: [] });
    const map: Map<number, CommentData> = new Map<number, CommentData>();
    const resList: CommentData[] = [];
    commentsData.forEach((val) => {
        map.set(val.comment.id, val);
    });
    map.forEach((value, key) => {
        if (!map.has(value.comment.parent_id)) {
        } else {
            map.get(value.comment.parent_id)!.children.push(value);
        }
    });
    commentsData.forEach((val) => {
        if (!map.has(val.comment.parent_id)) {
            resList.push(val);
        }
    });
    return resList;
}