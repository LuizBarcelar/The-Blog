export declare class UploadService {
    handleUpload(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
