import type { AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";
import axios from "axios";
import type { TagMeta } from "../models/trending.type";
import { env } from "$env/dynamic/private";

const url = 'https://subspace-backend.fly.dev';

export const getTags = async (user: UserMeta): Promise<AxiosResponse<Array<TagMeta>>> => {
    const data: AxiosResponse<Array<TagMeta>> = await axios.get(`${env.BACK_END}/tags`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data
}
