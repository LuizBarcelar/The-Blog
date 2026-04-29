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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_response_dto_1 = require("./dto/user-response.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
let UserController = class UserController {
    constructor(configService, userService) {
        this.configService = configService;
        this.userService = userService;
    }
    async findOne(req) {
        const user = await this.userService.findOneByOrFail({ id: req.user.id });
        return new user_response_dto_1.UserResponseDto(user);
    }
    async create(dto) {
        const user = await this.userService.create(dto);
        return new user_response_dto_1.UserResponseDto(user);
    }
    async update(req, dto) {
        const user = await this.userService.update(req.user.id, dto);
        return new user_response_dto_1.UserResponseDto(user);
    }
    async updatePassword(req, dto) {
        const user = await this.userService.updatePassword(req.user.id, dto);
        return new user_response_dto_1.UserResponseDto(user);
    }
    async remove(req) {
        const user = await this.userService.remove(req.user.id);
        return new user_response_dto_1.UserResponseDto(user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('me/password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map