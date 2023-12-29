import type { SpacePrefixRes } from "../models/space.type";
import { backendUrl } from "$lib/store/clientBackendUrl";
import type { UserInfo } from "../models/signup.type";
import type { TagName } from "../models/trending.type";

export const prefixSearchSpaces = async (prefix: string): Promise<Array<SpacePrefixRes>> => {
    const data: Response = await fetch(`${backendUrl}/search/spaces?prefix=${prefix}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}

export const prefixSearchUsers = async (prefix: string): Promise<Array<UserInfo>> => {
    const data: Response = await fetch(`${backendUrl}/search/users?prefix=${prefix}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}

export const prefixSearchTags = async (prefix: string): Promise<Array<TagName>> => {
    const data: Response = await fetch(`${backendUrl}/search/tags?prefix=${prefix}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}