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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PostService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const create_slug_from_text_1 = require("../common/utils/create-slug-from-text");
let PostService = PostService_1 = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
        this.logger = new common_1.Logger(PostService_1.name);
    }
    async findOneOrFail(postData, author) {
        const post = await this.findOne(postData);
        if (!post) {
            throw new common_1.NotFoundException('Post não encontrado');
        }
        return post;
    }
    async findOne(postData) {
        const post = await this.postRepository.findOne({
            where: postData,
            relations: ['author'],
        });
        return post;
    }
    async findAll(postData) {
        const posts = await this.postRepository.find({
            where: postData,
            order: {
                createdAt: 'DESC',
            },
            relations: ['author'],
        });
        return posts;
    }
    async findOneOwnedOrFail(postData, author) {
        const post = await this.findOneOwned(postData, author);
        if (!post) {
            throw new common_1.NotFoundException('Post não encontrado');
        }
        return post;
    }
    async findOneOwned(postData, author) {
        if (!author || !author.id) {
            this.logger.error('Tentativa de buscar post sem um autor autenticado');
            return null;
        }
        const post = await this.postRepository.findOne({
            where: {
                ...postData,
                author: { id: author.id },
            },
            relations: ['author'],
        });
        return post;
    }
    async findAllOwned(author) {
        if (!author || !author.id)
            return [];
        return await this.postRepository.find({
            where: {
                author: { id: author.id },
            },
            order: {
                createdAt: 'DESC',
            },
            relations: ['author'],
        });
    }
    async create(dto, author) {
        const post = this.postRepository.create({
            title: dto.title || 'Post sem título',
            content: dto.content || 'Conteúdo padrão',
            excerpt: dto.excerpt || 'Resumo padrão',
            coverImageUrl: dto.coverImageUrl || '',
            slug: (0, create_slug_from_text_1.createSlugFromText)(dto.title || 'post'),
            author: author,
            published: true,
        });
        const savedPost = await this.postRepository.save(post).catch((err) => {
            this.logger.error(`Erro ao salvar no SQLite: ${err.message}`);
            throw new common_1.BadRequestException('Erro ao persistir o post');
        });
        return { ...savedPost, author };
    }
    async update(postData, dto, author) {
        if (Object.keys(dto).length === 0) {
            throw new common_1.BadRequestException('Dados não enviados');
        }
        const post = await this.findOneOrFail(postData, author);
        post.title = dto.title ?? post.title;
        post.content = dto.content ?? post.content;
        post.excerpt = dto.excerpt ?? post.excerpt;
        post.coverImageUrl = dto.coverImageUrl ?? post.coverImageUrl;
        post.published = dto.published ?? post.published;
        return this.postRepository.save(post);
    }
    async remove(postData, author) {
        if (!author || !author.id)
            throw new common_1.BadRequestException('Usuário não autenticado');
        const post = await this.findOneOrFail(postData, author);
        await this.postRepository.delete({
            ...postData,
            author: { id: author.id },
        });
        return post;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = PostService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map