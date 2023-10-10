export type Post = {
    id: number;
    space_id: number;
    space_picture: PictureMeta;
    space_parent_id: number;
    space_name: string;
    poster_id: string;
    poster_name: string;
    poster_picture: PictureMeta;
    topic: string;
    link: string;
    body: string;
    post_pictures: PictureMeta[];
    context_type: ContentType;
    up_votes: number;
    down_votes: number;
    comments_count: number;
    created: Date;
    vote: Vote;
}

export type PictureMeta = {
    url: string;
    width: string;
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