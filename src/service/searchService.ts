import type { AxiosResponse } from "axios";
import type { SpacePrefixRes } from "../models/space.type";
import axios from "axios";

const url = 'https://subspace-backend.fly.dev';

export const prefixSearchSpaces = async (prefix: string): Promise<AxiosResponse<Array<SpacePrefixRes>>> => {
    const data: AxiosResponse<Array<SpacePrefixRes>> = await axios.get(`${url}/search/spaces?prefix=${prefix}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}