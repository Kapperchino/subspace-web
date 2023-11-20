import type { ContentType, PictureMeta, Vote } from "./post.type";

export type Comment = {
    id: number;
    poster_id: number;
    poster_name: string;
    post_id: number;
    body: string;
    content: string;
    poster_picture: PictureMeta;
    parent_id: number;
    up_votes: number;
    down_votes: number;
    created: string;
    content_type: ContentType;
    vote: Vote;
}

export type CommentData = {
    comment: Comment;
    children: CommentData[];
}