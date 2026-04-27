import { User } from 'src/user/entities/user.entity';
export declare class Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImageUrl: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: User;
}
