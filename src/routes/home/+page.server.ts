import { redirect } from '@sveltejs/kit';
 
export function load() {
  // ...
  throw redirect(302, '/s/1/1');
}