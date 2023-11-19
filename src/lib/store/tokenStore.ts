import { persisted } from 'svelte-persisted-store'
import type { UserMeta } from '../../models/signup.type';
import { createCookieStorage } from '@macfja/svelte-persistent-store';


export const coockieStore = createCookieStorage({});