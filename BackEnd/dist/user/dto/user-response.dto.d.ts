import { User } from 'src/user/entities/user.entity';
export declare class UserResponseDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(user: User);
}
