import { PostService } from './post.service';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(req: AuthenticatedRequest, dto: CreatePostDto): Promise<PostResponseDto>;
    findOneOwned(req: AuthenticatedRequest, id: string): Promise<import("./entities/post.entity").Post>;
    findAllOwned(req: AuthenticatedRequest): Promise<PostResponseDto[]>;
    update(id: string, req: AuthenticatedRequest, dto: UpdatePostDto): Promise<PostResponseDto>;
    remove(id: string, req: AuthenticatedRequest): Promise<PostResponseDto>;
    findOnePublished(slug: string): Promise<PostResponseDto>;
    findAllPublished(): Promise<PostResponseDto[]>;
}
