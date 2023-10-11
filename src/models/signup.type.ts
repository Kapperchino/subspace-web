export type SignUp = {
    display_name: string;
    email: string;
    password: string;
    user_address: string;
}

export type LogIn = {
    email: string;
    password: string;
}

export type UserMeta = {
    user_id: number;
    display_name: string;
    picture_meta: PictureMeta;
    bio: string;
    token: string;
    email: string;
    user_address: string;
}

export type PictureMeta = {
    url: string;
    width: number;
    height: number;
    id: number;
}