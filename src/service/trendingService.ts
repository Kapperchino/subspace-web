import type { TagMeta } from "../models/trending.type";
import { env } from "$env/dynamic/private";

export const getTags = async (): Promise<Array<TagMeta>> => {
    const data: Response = await fetch(`${env.BACK_END}/tags`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}
