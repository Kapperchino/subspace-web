import type { AxiosResponse } from "axios";
import type { SpacePrefixRes } from "../models/space.type";
import axios from "axios";
import { backendUrl } from "$lib/store/clientBackendUrl";
import type { UserInfo } from "../models/signup.type";

export const prefixSearchSpaces = async (prefix: string): Promise<AxiosResponse<Array<SpacePrefixRes>>> => {
    const data: AxiosResponse<Array<SpacePrefixRes>> = await axios.get(`${backendUrl}/search/spaces?prefix=${prefix}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}

export const prefixSearchUsers = async (prefix: string): Promise<AxiosResponse<Array<UserInfo>>> => {
    const data: AxiosResponse<Array<UserInfo>> = await axios.get(`${backendUrl}/search/users?prefix=${prefix}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}