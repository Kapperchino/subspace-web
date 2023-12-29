import { coockieStore } from "$lib/store/tokenStore";
import type { UserMeta } from "../models/signup.type";
import { backendUrl } from "$lib/store/clientBackendUrl";

export const getSubscription = async (subspaceId: number, user: UserMeta): Promise<Response> => {
    const data = await fetch(`${backendUrl}/subscriptions/users/${user.user_id}?spaceId=${subspaceId}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        },
    });
    return data;
}

export const subscribe = async (subspaceId: number): Promise<any> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data = await fetch(`${backendUrl}/subscriptions/`,
        {
            body: JSON.stringify({ user_id: user.user_id, space_id: subspaceId }),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`,
            }
        });
    return data;
}

export const deleteSubscription = async (subspaceId: number): Promise<any> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data = await fetch(`${backendUrl}/subscriptions/?spaceId=${subspaceId}&userId=${user.user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data;
}
