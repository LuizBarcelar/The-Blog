import { Post } from '../entities/post.entity';
export declare class PostResponseDto {
    readonly id: string;
    readonly title: string;
    readonly slug: string;
    readonly content: string;
    readonly excerpt: string;
    readonly coverImageUrl: string | null;
    readonly published: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly author: {
        id: string;
        name: string;
        email: string;
    };
    constructor(post: Post);
}
