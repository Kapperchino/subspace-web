import type { Space } from "../models/space.type";
import { env } from "$env/dynamic/private";

export const getSpaces = async (sort: string): Promise<Array<Space>> => {
    const data: Response = await fetch(`${env.BACK_END}/spaces/sort?sortBy=${sort}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json()
}

export const getSpace = async (spaceId: number): Promise<Space> => {
    const data: Response = await fetch(`${env.BACK_END}/spaces/${spaceId}`,
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
    return await data.json();
}