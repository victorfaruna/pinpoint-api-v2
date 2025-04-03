import { Controller, Get, Param, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':path')
  async getImage(@Param('path') path: string) {
    return await this.imageService.getImage(path);
  }

  @Post(':path')
  async uploadImage(@Param('path') path: string) {
    return await this.imageService.uploadImage(path);
  }
}
