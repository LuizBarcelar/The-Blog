import { Strategy } from 'passport-jwt';
import { JwtPayload } from './types/jwt-payload.type';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: JwtPayload): Promise<import("../user/entities/user.entity").User>;
}
export {};
