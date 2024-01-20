import type { UserMeta } from "../../../../../models/signup.type";
import type { Space } from "../../../../../models/space.type";
import type { LayoutServerLoad } from "./$types";
import { env } from "$env/dynamic/private";


export const load: LayoutServerLoad = async ({ params, cookies, fetch }) => {
    let userId = 0;
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined && userJson != 'undefined') {
        user = JSON.parse(userJson);
        if (user != null) {
            userId = user.user_id;
        }
    }
    const spaceId = Number(params.subSpaceId);
    const subspace = await getSpace(spaceId, fetch);
    return {
        spaceId: spaceId,
        subspace: subspace,
        params: params
    };
};

const getSpace = async (spaceId: number, fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>): Promise<Space> => {
    const data: Response = await fetch(`${env.BACK_END}/spaces/${spaceId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}