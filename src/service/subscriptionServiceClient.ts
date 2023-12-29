import type { UserMeta } from "../models/signup.type";
import type { Post } from "../models/post.type";
import { backendUrl } from "$lib/store/clientBackendUrl";

export const getSubscriptionsClient = async (user: UserMeta, days: number, sortType: string): Promise<Array<Post>> => {
    const data: Response = await fetch(`${backendUrl}/posts/users/${user!.user_id}/subscriptions?sort=${sortType}&days=${days}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return await data.json();
}