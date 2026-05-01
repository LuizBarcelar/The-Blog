import { BadRequestException, Injectable } from '@nestjs/common'
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { generateRandomSuffix } from '../common/utils/generate-random-suffix';

@Injectable()
export class UploadService {
  async handleUpload(file: any) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const maxFileSize = 900 * 1024;

    if (file.size > maxFileSize) {
      throw new BadRequestException('Arquivo muito grande');
    }

    const fileTypeModule = await import('file-type');
    const type = await fileTypeModule.fileTypeFromBuffer(file.buffer);

    if (
      !type ||
      !['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(type.mime)
    ) {
      throw new BadRequestException('Arquivo inválido ou tipo não permitido.');
    }

    const today = new Date().toISOString().split('T')[0];
    const uploadPath = resolve(process.cwd(), 'uploads', today);

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueSuffix = `${Date.now()}-${generateRandomSuffix()}`;
    const fileName = `${uniqueSuffix}.${type.ext}`;
    const fileFullPath = resolve(uploadPath, fileName);

    writeFileSync(fileFullPath, file.buffer)

    return {
      url: `/${today}/${fileName}`,
    };
  }
}
