import type { UserMeta } from "../models/signup.type";
import { env } from "$env/dynamic/private";
import type { Post } from "../models/post.type";
import type { SvelteFetch } from "../models/common.type"


export const getUser = async (userId: number, fetch: SvelteFetch): Promise<UserMeta> => {
    const data: Response = await fetch(`${env.BACK_END}/users/${userId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}

export const getUserPosts = async (userId: number, fetch: SvelteFetch): Promise<Array<Post>> => {
    const data: Response = await fetch(`${env.BACK_END}/posts/users/${userId}?sort=latest&days=7`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}
