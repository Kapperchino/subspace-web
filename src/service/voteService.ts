import { backendUrl } from "$lib/store/clientBackendUrl.js";
import { coockieStore } from "$lib/store/tokenStore.js";
import type { Vote, VotesMeta } from "../models/post.type.js";
import type { SignUp, LogIn, UserMeta } from "../models/signup.type.js";
import axios, { Axios, type AxiosResponse } from 'axios';

export const vote = async (vote: Vote): Promise<any> => {
    const user: UserMeta = coockieStore.getValue("cookie");
    const data = await axios.post(`${backendUrl}/votes`, vote, {
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
    const data: AxiosResponse<VotesMeta> = await axios.get(`${backendUrl}/votes/${voteType}s/${id}/?userId=${user.user_id}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data.data;
}