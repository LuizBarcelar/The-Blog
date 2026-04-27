"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const file_type_1 = require("file-type");
const fs_1 = require("fs");
const path_1 = require("path");
const generate_random_suffix_1 = require("../common/utils/generate-random-suffix");
let UploadService = class UploadService {
    async handleUpload(file) {
        if (!file) {
            throw new common_1.BadRequestException('Nenhum arquivo enviado.');
        }
        const maxFileSize = 900 * 1024;
        if (file.size > maxFileSize) {
            throw new common_1.BadRequestException('Arquivo muito grande');
        }
        const fileType = await (0, file_type_1.fromBuffer)(file.buffer);
        if (!fileType ||
            !['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(fileType.mime)) {
            throw new common_1.BadRequestException('Arquivo inválido ou tipo não permitido.');
        }
        const today = new Date().toISOString().split('T')[0];
        const uploadPath = (0, path_1.resolve)(process.cwd(), 'uploads', today);
        if (!(0, fs_1.existsSync)(uploadPath)) {
            (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
        }
        const uniqueSuffix = `${Date.now()}-${(0, generate_random_suffix_1.generateRandomSuffix)()}`;
        const fileExtension = fileType.ext;
        const fileName = `${uniqueSuffix}.${fileExtension}`;
        const fileFullPath = (0, path_1.resolve)(uploadPath, fileName);
        (0, fs_1.writeFileSync)(fileFullPath, file.buffer);
        return {
            url: `/${today}/${fileName}`,
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map