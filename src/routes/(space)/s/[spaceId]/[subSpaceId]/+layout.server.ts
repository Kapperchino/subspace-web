import type { UserMeta } from "../../../../../models/signup.type";
import { getSpace } from "../../../../../service/spaceService";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params, cookies, url }) => {
    let userId = 0;
    const userJson = cookies.get("user");
    let user: UserMeta | undefined;
    if (userJson != undefined) {
        user = JSON.parse(userJson);
        if (user != null) {
            userId = user.user_id;
        }
    }
    const spaceId = Number(params.subSpaceId);
    const subspace = await getSpace(spaceId);
    return {
        spaceId: spaceId,
        subspace: subspace,
        params: params
    };
};