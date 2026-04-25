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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const hashing_service_1 = require("../common/hashing/hashing.service");
let UserService = class UserService {
    userRepository;
    hashingService;
    constructor(userRepository, hashingService) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
    }
    async failIfEmailExists(email) {
        const exists = await this.userRepository.existsBy({
            email,
        });
        if (exists) {
            throw new common_1.ConflictException('E-mail já existe');
        }
    }
    async findOneByOrFail(userData) {
        const user = await this.userRepository.findOneBy(userData);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return user;
    }
    async create(dto) {
        await this.failIfEmailExists(dto.email);
        const hashedPassword = await this.hashingService.hash(dto.password);
        const newUser = {
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        };
        const create = await this.userRepository.save(newUser);
        return create;
    }
    findByEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
    findById(id) {
        return this.userRepository.findOneBy({ id });
    }
    async update(id, dto) {
        if (!dto.name && !dto.email) {
            throw new common_1.BadRequestException('Dados não enviados');
        }
        const user = await this.findOneByOrFail({ id });
        user.name = dto.name ?? user.name;
        if (dto.email && dto.email !== user.email) {
            await this.failIfEmailExists(dto.email);
            user.email = dto.email;
            user.forceLogout = true;
        }
        return this.save(user);
    }
    async updatePassword(id, dto) {
        const user = await this.findOneByOrFail({ id });
        const isCurrentPasswordValid = await this.hashingService.compare(dto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.UnauthorizedException('Senha atual inválida');
        }
        user.password = await this.hashingService.hash(dto.newPassword);
        user.forceLogout = true;
        return this.save(user);
    }
    async remove(id) {
        const user = await this.findOneByOrFail({ id });
        await this.userRepository.delete({ id });
        return user;
    }
    save(user) {
        return this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_service_1.HashingService])
], UserService);
//# sourceMappingURL=user.service.js.map