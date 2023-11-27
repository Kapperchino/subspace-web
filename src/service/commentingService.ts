import { coockieStore } from "$lib/store/tokenStore";
import type { AxiosResponse } from "axios";
import type { CommentRequest } from "../models/comment.type";
import type { UserMeta } from "../models/signup.type";
import axios from "axios";
import { backendUrl } from "$lib/store/clientBackendUrl";

export const createCommentClient = async (req: CommentRequest): Promise<AxiosResponse<any>> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: AxiosResponse<any> = await axios.post(`${backendUrl}/comments/`,
        req,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}