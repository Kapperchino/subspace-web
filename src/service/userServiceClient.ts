import type { AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";
import axios from "axios";
import { backendUrl } from "$lib/store/clientBackendUrl";
import type { Post } from "../models/post.type";


export const getUserByAddress = async (address: string): Promise<AxiosResponse<UserMeta>> => {
    const data: AxiosResponse<UserMeta> = await axios.get(`${backendUrl}/users?address=${address}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}

export const getUserPosts = async (userId: number): Promise<AxiosResponse<Array<Post>>> => {
    const data: AxiosResponse<Array<Post>> = await axios.get(`${backendUrl}/posts/users/${userId}?sort=latest&days=7`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}

