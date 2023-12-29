import { backendUrl } from "$lib/store/clientBackendUrl.js";
import { coockieStore } from "$lib/store/tokenStore.js";
import type { Vote, VotesMeta } from "../models/post.type.js";
import type { SignUp, LogIn, UserMeta } from "../models/signup.type.js";

export const vote = async (vote: Vote): Promise<any> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data = await fetch(`${backendUrl}/votes`, {
        method: 'POST',
        body: JSON.stringify(vote),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data;
}

export const getVotes = async (vote: Vote, id: number): Promise<VotesMeta> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const voteType = vote.vote_type;
    const data: Response = await fetch(`${backendUrl}/votes/${voteType}s/${id}/?userId=${user.user_id}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return await data.json();
}