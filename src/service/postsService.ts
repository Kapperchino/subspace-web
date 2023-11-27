import axios, { type AxiosResponse } from 'axios';
import type { PictureMeta, UserMeta } from '../models/signup.type';
import type { PictureMetaResult, Post } from '../models/post.type';
import { env } from '$env/dynamic/private';
import { coockieStore } from '$lib/store/tokenStore';

export const getPost = async (userId: number, postId: number): Promise<Post> => {
    const data: AxiosResponse<Post> = await axios.get(`${env.BACK_END}/posts/${postId}?userId=${userId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data.data
}

export const getPosts = async (fetch: any, userId: number, spaceId: number, days: number, sortType: string, offset: number): Promise<Response> => {
    const data = await fetch(`${env.BACK_END}/posts/spaces/${spaceId}?sort=${sortType}&days=${days}&userId=${userId}&start=${offset}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    return data;
}

export const getSearchPosts = async (user: UserMeta, term: string, isTag: boolean): Promise<AxiosResponse<Array<Post>>> => {
    const data: AxiosResponse<Array<Post>> = await axios.get(`${env.BACK_END}/search/posts?term=${term}&userId=${user.user_id}&isTag=${isTag}&sort=popular&days=60`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}

export const getSubscriptions = async (user: UserMeta, days: number, sortType: string): Promise<AxiosResponse<Array<Post>>> => {
    const data: AxiosResponse<Array<Post>> = await axios.get(`${env.BACK_END}/posts/users/${user!.user_id}/subscriptions?sort=${sortType}&days=${days}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}