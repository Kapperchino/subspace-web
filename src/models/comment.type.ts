import type { ContentType, PictureMeta, VideoMeta, Vote } from "./post.type";

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
    comment_pictures: PictureMeta[];
    comment_videos: VideoMeta[];
}

export type CommentData = {
    comment: Comment;
    children: CommentData[];
}

export type CommentRequest = {
    poster_id: number;
    post_id: number;
    body: string;
    parent_id: number;
    content_type: ContentType;
    file_ids: number[];
}