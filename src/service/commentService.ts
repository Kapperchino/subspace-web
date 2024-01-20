import type { UserMeta } from "../models/signup.type";
import type { Comment, CommentData } from "../models/comment.type";
import { env } from "$env/dynamic/private";
import type { SvelteFetch } from "../models/common.type";


export const getCommentsForPost = async (userId: number, postId: number, fetch: SvelteFetch): Promise<Array<CommentData>> => {
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

export const getComment = async (commentId: number, fetch: SvelteFetch): Promise<Comment> => {
    const data: Response = await fetch(`${env.BACK_END}/comments/${commentId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data.json();
}

export const getCommentsForComments = async (userId: number, commentId: number, fetch: SvelteFetch): Promise<Array<CommentData>> => {
    const data: Response = await fetch(`${env.BACK_END}/comments?commentId=${commentId}&userId=${userId}&sort=popular&days=365`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    const comments: Comment[] = await data.json();
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