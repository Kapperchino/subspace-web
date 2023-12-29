import type { UserMeta } from "../models/signup.type";
import { backendUrl } from "$lib/store/clientBackendUrl";
import type { Post } from "../models/post.type";


export const getUserByAddress = async (address: string): Promise<UserMeta> => {
    const data: Response = await fetch(`${backendUrl}/users?address=${address}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}

export const getUserPosts = async (userId: number): Promise<Array<Post>> => {
    const data: Response = await fetch(`${backendUrl}/posts/users/${userId}?sort=latest&days=7`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}

