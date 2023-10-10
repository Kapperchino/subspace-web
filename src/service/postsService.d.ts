import axios from 'axios';
import { jwtToken } from '../lib/jwtStore.d.ts';

const url = 'https://subspace-backend.fly.dev';

export const getPost = async () : any => {
    const data = await axios.post(`${url}/auth/user`, signUp);
    jwtToken.set(data.data.token);
}


