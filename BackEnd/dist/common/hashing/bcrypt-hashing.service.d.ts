import { HashingService } from './hashing.service';
export declare class BcryptHashingService extends HashingService {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
