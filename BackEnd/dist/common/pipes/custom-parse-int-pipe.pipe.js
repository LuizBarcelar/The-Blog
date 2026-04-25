"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomParseIntPipe = void 0;
const common_1 = require("@nestjs/common");
class CustomParseIntPipe extends common_1.ParseIntPipe {
    constructor() {
        super({
            exceptionFactory: () => new common_1.BadRequestException('Parâmetro precisa ser um número '),
        });
    }
}
exports.CustomParseIntPipe = CustomParseIntPipe;
//# sourceMappingURL=custom-parse-int-pipe.pipe.js.map