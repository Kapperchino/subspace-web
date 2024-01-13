import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { SpaceCreationReq } from "../../models/space.type";
import { env } from "$env/dynamic/private";
import type { UserMeta } from "../../models/signup.type";


export const load: PageServerLoad = async ({ cookies }) => {
    redirect(302, '/spaces/popular');
};

export const actions = {
    create: async ({ cookies, fetch, request }) => {
        const formData = await request.formData();
        const req = <SpaceCreationReq>{ name: formData.get('name')?.toString(), description: 'subspace', parent: 1 }
        const user: UserMeta = JSON.parse(cookies.get("user")!);
        if (!user) {
            redirect(302, `/login`);
        }
        const res = await createSpace(req, user);
        console.log(res)
        redirect(302, `/spaces`);
    }
} satisfies Actions;

const createSpace = async (req: SpaceCreationReq, user: UserMeta): Promise<Response> => {
    const data: Response = await fetch(`${env.BACK_END}/spaces`, {
        method: "POST", body: JSON.stringify(req), headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data;
}