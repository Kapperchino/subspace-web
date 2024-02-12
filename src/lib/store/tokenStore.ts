import { persisted } from 'svelte-persisted-store'
import type { UserMeta } from '../../models/signup.type';
import { createCookieStorage } from '@macfja/svelte-persistent-store';

let curDate = new Date();
curDate.setDate(curDate.getDate() + 5);
export const coockieStore = createCookieStorage({ secure: true, expires: curDate });