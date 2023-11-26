import type { PictureMeta } from "./signup.type";

export type Space = {
    id: number;
    parent_id: number;
    name: string;
    description: string;
    small_picture: PictureMeta;
    background_picture: PictureMeta;
    sub_count: number;
}

export type SpacePrefixRes = {
    id: number;
    parent_id: number;
    name: string;
    small_picture: PictureMeta;
    sub_count: number;
}

export enum SpacePrefixState {
    Init,
    Selecting,
    Selected
}