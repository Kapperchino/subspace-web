import axios, { type AxiosResponse } from 'axios';
import type { UserMeta } from '../models/signup.type';
import type { Post } from '../models/post.type';

const url = 'https://subspace-backend.fly.dev';

export const getPost = async (user: UserMeta, postId: number): Promise<Post> => {
    const data: AxiosResponse<Post> = await axios.get(`${url}/posts/${postId}?userId=${user.user_id}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data.data
}

export const getPosts = async (user: UserMeta, spaceId: number): Promise<AxiosResponse<Array<Post>>> => {
    const data: AxiosResponse<Array<Post>> = await axios.get(`${url}/posts/spaces/${spaceId}?sort=latest&days=7&userId=${user!.user_id}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}

export const getSubscriptions = async (user: UserMeta): Promise<AxiosResponse<Array<Post>>> => {
    const data: AxiosResponse<Array<Post>> = await axios.get(`${url}/posts/users/${user!.user_id}/subscriptions`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}


