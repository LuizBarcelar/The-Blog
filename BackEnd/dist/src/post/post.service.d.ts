import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private readonly postRepository;
    private readonly logger;
    constructor(postRepository: Repository<Post>);
    findOneOrFail(postData: Partial<Post>, author?: User): Promise<Post>;
    findOne(postData: Partial<Post>): Promise<Post | null>;
    findAll(postData: Partial<Post>): Promise<Post[]>;
    findOneOwnedOrFail(postData: Partial<Post>, author: User): Promise<Post>;
    findOneOwned(postData: Partial<Post>, author: User): Promise<Post | null>;
    findAllOwned(author: User): Promise<Post[]>;
    create(dto: CreatePostDto, author: User): Promise<{
        author: User;
        id: string;
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        coverImageUrl: string;
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(postData: Partial<Post>, dto: UpdatePostDto, author: User): Promise<Post>;
    remove(postData: Partial<Post>, author: User): Promise<Post>;
}
