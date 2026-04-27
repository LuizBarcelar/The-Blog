"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limits = exports.fileFilter = exports.storage = void 0;
const multer_1 = require("multer");
const common_1 = require("@nestjs/common");
exports.storage = (0, multer_1.memoryStorage)();
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new common_1.BadRequestException('Somente imagens são permitidas!'), false);
    }
    cb(null, true);
};
exports.fileFilter = fileFilter;
exports.limits = {};
//# sourceMappingURL=upload.config.js.map