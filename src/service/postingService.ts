import type { UserMeta } from "../models/signup.type";
import type { FileUploadRequest, PictureMetaResult, PostCreation, VideoUploadRequest } from "../models/post.type";
import { coockieStore } from "$lib/store/tokenStore";
import { backendUrl } from "$lib/store/clientBackendUrl";

export const createPostClient = async (req: PostCreation): Promise<Response> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: Response = await fetch(`${backendUrl}/posts/`,
        {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user?.token}`,
            }
        });
    return data
}

export const uploadMedia = async (req: FileUploadRequest): Promise<PictureMetaResult> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: Response = await fetch(`${backendUrl}/files`,
        {
            method: 'PUT',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user?.token}`,
            }
        });
    return await data.json();
}

export const uploadFile = async (file: File, url: string, mime: string): Promise<Response> => {
    const data: Response = await fetch(`${url}`,
        {
            method: 'PUT',
            body: JSON.stringify(file),
            headers: {
                'Content-Type': mime,
            }
        });
    return data;
}

export const processVideo = async (id: number): Promise<Response> => {
    const req: VideoUploadRequest = { id: id };
    const user: UserMeta = coockieStore.getValue("cookie");
    const data: Response = await fetch(`${backendUrl}/videos`,
        {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data;
}