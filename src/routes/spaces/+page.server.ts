import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const user = cookies.get("user");
    if (user?.length != 0) {
        throw redirect(302, '/spaces/popular');
    }
    throw redirect(302, '/login');
};