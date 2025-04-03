import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAllPost(): Promise<{
        message: string;
        posts: any;
    }>;
}
