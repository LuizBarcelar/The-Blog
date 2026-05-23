"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResponseDto = void 0;
class PostResponseDto {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.slug = post.slug;
        this.content = post.content;
        this.excerpt = post.excerpt;
        this.coverImageUrl = post.coverImageUrl ?? null;
        this.published = post.published;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.author = {
            id: post.author?.id ?? '',
            name: post.author?.name || 'Autor Desconhecido',
            email: post.author?.email || '',
        };
    }
}
exports.PostResponseDto = PostResponseDto;
//# sourceMappingURL=post-response.dto.js.map