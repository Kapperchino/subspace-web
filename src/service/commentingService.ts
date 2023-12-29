import { coockieStore } from "$lib/store/tokenStore";
import type { CommentRequest } from "../models/comment.type";
import type { UserMeta } from "../models/signup.type";
import { backendUrl } from "$lib/store/clientBackendUrl";

export const createCommentClient = async (req: CommentRequest): Promise<Response> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: Response = await fetch(`${backendUrl}/comments/`,
        {
            body: JSON.stringify(req),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}