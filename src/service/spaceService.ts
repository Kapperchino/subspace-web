import type { AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";
import axios from "axios";
import type { TagMeta } from "../models/trending.type";
import type { Space } from "../models/space.type";
import { env } from "$env/dynamic/private";

export const getSpaces = async (sort: string): Promise<AxiosResponse<Array<Space>>> => {
    const data: AxiosResponse<Array<Space>> = await axios.get(`${env.BACK_END}/spaces/sort?sortBy=${sort}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}

export const getSpace = async (spaceId: number): Promise<AxiosResponse<Space>> => {
    const data: AxiosResponse<Space> = await axios.get(`${env.BACK_END}/spaces/${spaceId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}