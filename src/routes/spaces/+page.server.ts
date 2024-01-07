import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
    redirect(302, '/spaces/popular');
};

export const actions = {
    create: async ({ cookies, fetch }) => {
    }
} satisfies Actions;