import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('all')
  async getAllPost() {
    return await this.postService.getAllPost();
  }
}
