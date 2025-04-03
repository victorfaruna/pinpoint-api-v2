export declare class ImageService {
    private supabase;
    constructor();
    getImage(path: string): Promise<void>;
    uploadImage(path: string): Promise<void>;
}
