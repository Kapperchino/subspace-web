import type { AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";
import axios from "axios";
import { backendUrl } from "$lib/store/clientBackendUrl";


export const getUserByAddress = async (address: string): Promise<AxiosResponse<UserMeta>> => {
    const data: AxiosResponse<UserMeta> = await axios.get(`${backendUrl}/users?address=${address}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return data
}
