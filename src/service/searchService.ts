import type { AxiosResponse } from "axios";
import type { SpacePrefixRes } from "../models/space.type";
import axios from "axios";
import { backendUrl } from "$lib/store/clientBackendUrl";

export const prefixSearchSpaces = async (prefix: string): Promise<AxiosResponse<Array<SpacePrefixRes>>> => {
    const data: AxiosResponse<Array<SpacePrefixRes>> = await axios.get(`${backendUrl}/search/spaces?prefix=${prefix}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}