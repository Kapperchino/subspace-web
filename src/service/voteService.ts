import type { Vote, VotesMeta } from "../models/post.type.js";
import type { SignUp, LogIn, UserMeta } from "../models/signup.type.js";
import axios, { Axios, type AxiosResponse } from 'axios';

const url = 'https://subspace-backend.fly.dev';

export const vote = async (vote: Vote, user: UserMeta): Promise<any> => {
    const data = await axios.post(`${url}/votes`, vote, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data;
}

export const getVotes = async (vote: Vote, user: UserMeta, id: number): Promise<VotesMeta> => {
    const voteType = vote.vote_type;
    const data: AxiosResponse<VotesMeta> = await axios.get(`${url}/votes/${voteType}s/${id}/?userId=${user.user_id}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`,
        }
    });
    return data.data;
}