import type { AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";
import axios from "axios";
import { env } from "$env/dynamic/private";
import type { Post } from "../models/post.type";


export const getUser = async (user: UserMeta, userId: number): Promise<AxiosResponse<UserMeta>> => {
    const data: AxiosResponse<UserMeta> = await axios.get(`${env.BACK_END}/users/${userId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}

export const getUserPosts = async (user: UserMeta, userId: number): Promise<AxiosResponse<Array<Post>>> => {
    const data: AxiosResponse<Array<Post>> = await axios.get(`${env.BACK_END}/posts/users/${userId}?sort=latest&days=7`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}
