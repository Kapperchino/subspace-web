import type { AxiosResponse } from "axios";
import type { PictureMeta, UserMeta } from "../models/signup.type";
import type { FileUploadRequest, PictureMetaResult, PictureRequestMeta, Post, PostCreation, VideoUploadRequest } from "../models/post.type";
import axios from "axios";
import { coockieStore } from "$lib/store/tokenStore";

const url = 'https://subspace-backend.fly.dev';

export const createPostClient = async (req: PostCreation): Promise<AxiosResponse<any>> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: AxiosResponse<any> = await axios.post(`${url}/posts/`,
        req,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user?.token}`,
            }
        });
    return data
}

export const uploadMedia = async (req: FileUploadRequest): Promise<AxiosResponse<PictureMetaResult>> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: AxiosResponse<PictureMetaResult> = await axios.put(`${url}/files`,
        req,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data;
}

export const uploadFile = async (file: File, url: string, mime: string): Promise<AxiosResponse<any>> => {
    const data: AxiosResponse<any> = await axios.put(`${url}`,
        file,
        {
            headers: {
                'Content-Type': mime,
            }
        });
    return data;
}

export const processVideo = async (id: number): Promise<AxiosResponse<any>> => {
    const req: VideoUploadRequest = { id: id };
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: AxiosResponse<any> = await axios.post(`${url}/videos`,
        req,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data;
}