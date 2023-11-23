import { coockieStore } from "$lib/store/tokenStore";
import axios, { type AxiosResponse } from "axios";
import type { UserMeta } from "../models/signup.type";

const url = 'https://subspace-backend.fly.dev';

export const getSubscription = async (subspaceId: number, user: UserMeta): Promise<AxiosResponse<any>> => {
    const data = await axios.get(`${url}/subscriptions/users/${user.user_id}?spaceId=${subspaceId}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        },
        validateStatus: (val) => { return true },
    });
    return data;
}

export const subscribe = async (subspaceId: number): Promise<any> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data = await axios.put(`${url}/subscriptions/`,
        { user_id: user.user_id, space_id: subspaceId }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data;
}

export const deleteSubscription = async (subspaceId: number): Promise<any> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data = await axios.delete(`${url}/subscriptions/?spaceId=${subspaceId}&userId=${user.user_id}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data;
}
