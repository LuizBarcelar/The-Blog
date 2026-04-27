import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly hashingService;
    constructor(userRepository: Repository<User>, hashingService: HashingService);
    failIfEmailExists(email: string): Promise<void>;
    findOneByOrFail(userData: Partial<User>): Promise<User>;
    create(dto: CreateUserDto): Promise<CreateUserDto & User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    updatePassword(id: string, dto: UpdatePasswordDto): Promise<User>;
    remove(id: string): Promise<User>;
    save(user: User): Promise<User>;
}
