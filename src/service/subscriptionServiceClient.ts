import type { AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";
import type { Post } from "../models/post.type";
import axios from "axios";
import { backendUrl } from "$lib/store/clientBackendUrl";

export const getSubscriptionsClient = async (user: UserMeta, days: number, sortType: string): Promise<AxiosResponse<Array<Post>>> => {
    const data: AxiosResponse<Array<Post>> = await axios.get(`${backendUrl}/posts/users/${user!.user_id}/subscriptions?sort=${sortType}&days=${days}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}