export type Post = {
    id: number;
    space_id: number;
    space_picture: PictureMeta;
    space_parent_id: number;
    space_name: string;
    poster_id: number;
    poster_name: string;
    poster_picture: PictureMeta;
    topic: string;
    link: string;
    body: string;
    post_pictures: PictureMeta[];
    post_videos: VideoMeta[];
    context_type: ContentType;
    up_votes: number;
    down_votes: number;
    comments_count: number;
    created: string;
    vote: Vote;
}

export type PictureMeta = {
    url: string;
    width: number;
    height: number;
    id: number;
}

export type VideoMeta = {
    thumbnail: string;
    url: string;
    duration: number;
    status: string;
    width: number;
    height: number;
    id: number;
}

export enum ContentType {
    Video = "video",
    Text = "text",
    Picture = "picture",
    Link = "link",
}

export enum VoteType {
    Post = "post",
    Comment = "comment"
}

export type Vote = {
    vote_id: number;
    user_id: number;
    post_or_comment_id: number;
    is_up_vote: boolean;
    vote_type: VoteType;
    is_deleted: boolean;
}

export type VoteRequest = {
    user_id: number;
    post_or_comment_id: number;
    is_up_vote: boolean;
    vote_type: VoteType;
}

export type VotesMeta = {
    vote_id: number;
    up_votes: number;
    down_votes: number;
    is_deleted: boolean;
    user_id: number;
    post_or_comment_id: number;
    is_up_vote: boolean;
    vote_type: VoteType;
}

export type PostCreation = {
    space_id: number,
    poster_id: number,
    topic: string,
    body: string,
    link: string,
    content_type: ContentType,
    file_ids: number[]
}

export type PictureRequestMeta = {
    height: number,
    url: string,
    width: number
}

export type PictureMetaResult = {
    height: number,
    url: string,
    width: number,
    id: number,
    presigned: string
}

export type FileUploadRequest = {
    picture_meta: PictureRequestMeta | undefined,
    file_type: string,
    is_link: boolean | undefined
}

export type VideoUploadRequest = {
    id: number
}