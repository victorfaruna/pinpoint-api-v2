import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    getImage(path: string): Promise<void>;
    uploadImage(path: string): Promise<void>;
}
