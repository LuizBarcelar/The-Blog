"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePostDto {
    title;
    excerpt;
    content;
    coverImageUrl;
    published;
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Título precisa ser uma string' }),
    (0, class_validator_1.Length)(10, 150, { message: 'Título precisa ter entre 10 e 150 caracteres' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Excerto precisa ser uma string' }),
    (0, class_validator_1.Length)(10, 200, { message: 'Excerto precisa ter entre 10 e 200 caracteres' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "excerpt", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Conteúdo precisa ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Conteúdo não pode ficar vazio' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ require_tld: false }, { message: 'URL da imagem precisa ser uma URL válida' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "coverImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'O campo publicado precisa ser um booleano' }),
    __metadata("design:type", Boolean)
], CreatePostDto.prototype, "published", void 0);
//# sourceMappingURL=create-post.dto.js.map