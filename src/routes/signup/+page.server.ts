import { fail, redirect } from '@sveltejs/kit';
import type { SignUp } from '../../models/signup.type';
import { signup } from '../../service/loginService';
import type { Actions } from './$types';
import { z } from 'zod';
import validator from 'validator';
import { superValidate } from 'sveltekit-superforms/server';


const user_address = z.string().refine((val) => validator.matches(val, "^[a-z0-9]+$"), {
    message: "Can only contain a-z and 0-9",
});

const schema = z.object({
    display_name: z.string().min(3, "Need at least 3 characters for the display name"),
    email: z.string().email(),
    password: z.string().min(8, "Need at least 8 characters for the password"),
    user_address: user_address
});

export const load = async () => {
    // Server API:
    const form = await superValidate(schema);

    // Unless you throw, always return { form } in load and form actions.
    return { form };
};

export const actions = {
    signup: async ({ request, cookies }) => {
        const form = await superValidate(request, schema);
        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }
        const req: SignUp = {
            display_name: form.data.display_name,
            email: form.data.email,
            password: form.data.password,
            user_address: form.data.user_address
        };
        try {
            const meta = await signup(req);
            cookies.set("user", JSON.stringify(meta.data), {
                path: '/'
            });
        } catch (e: any) {
            if (e.response?.status == 409) {
                if (e.response.data === 'email') {
                    form.errors.email = ['Email already registered'];
                    return fail(409, { form });
                }
                if (e.response.data === 'display_name') {
                    form.errors.display_name = ['Display name already registered'];
                    return fail(409, { form });
                }
                if (e.response.data === 'user_address') {
                    form.errors.user_address = ['Address already registered'];
                    return fail(409, { form });
                }
            }
            return fail(500);
        }
        redirect(302, '/home');
    }
} satisfies Actions;