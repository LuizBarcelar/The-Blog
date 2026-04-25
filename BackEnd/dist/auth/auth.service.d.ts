import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly hashingService;
    private readonly jwtService;
    constructor(userService: UserService, hashingService: HashingService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
