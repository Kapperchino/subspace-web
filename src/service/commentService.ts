import type { AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";
import type { Comment, CommentData } from "../models/comment.type";
import axios from "axios";
import { env } from "$env/dynamic/private";


export const getCommentsForPost = async (userId: number, postId: number): Promise<Array<CommentData>> => {
    const data: AxiosResponse<Array<Comment>> = await axios.get(`${env.BACK_END}/comments?postId=${postId}&userId=${userId}&sort=popular&days=365`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    const comments = data.data;
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