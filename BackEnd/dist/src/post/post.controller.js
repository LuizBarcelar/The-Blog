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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_post_dto_1 = require("./dto/create-post.dto");
const post_response_dto_1 = require("./dto/post-response.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(req, dto) {
        const post = await this.postService.create(dto, req.user);
        return new post_response_dto_1.PostResponseDto(post);
    }
    async findOneOwned(req, id) {
        return this.postService.findOneOwnedOrFail({ id }, req.user);
    }
    async findAllOwned(req) {
        const posts = await this.postService.findAllOwned(req.user);
        return posts.map((post) => new post_response_dto_1.PostResponseDto(post));
    }
    async update(id, req, dto) {
        const post = await this.postService.update({ id }, dto, req.user);
        return new post_response_dto_1.PostResponseDto(post);
    }
    async remove(id, req) {
        const post = await this.postService.remove({ id }, req.user);
        return new post_response_dto_1.PostResponseDto(post);
    }
    async findOnePublished(slug) {
        const post = await this.postService.findOneOrFail({
            slug,
            published: true,
        });
        return new post_response_dto_1.PostResponseDto(post);
    }
    async findAllPublished() {
        const posts = await this.postService.findAll({ published: true });
        return posts.map((post) => new post_response_dto_1.PostResponseDto(post));
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findOneOwned", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAllOwned", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('me/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('me/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findOnePublished", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAllPublished", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map