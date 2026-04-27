"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        const isHttpException = exception instanceof common_1.HttpException;
        const status = isHttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const defaultMessage = 'Internal Server Error';
        const defaultError = 'Internal Server Error';
        let messages = [defaultMessage];
        let errorName = defaultError;
        if (isHttpException) {
            const responseData = exception.getResponse();
            if (typeof responseData === 'string') {
                messages = [responseData];
            }
            if (typeof responseData === 'object' && responseData !== null) {
                const { message, error } = responseData;
                if (Array.isArray(message)) {
                    messages = message;
                }
                else if (typeof message === 'string') {
                    messages = [message];
                }
                if (typeof error === 'string') {
                    errorName = error;
                }
            }
        }
        if (!(exception instanceof common_1.HttpException)) {
            this.logger.error(`Erro interno inesperado`, exception.stack || 'sem stack');
        }
        else {
            this.logger.warn(`${status} - ${errorName}: ${messages.join(' | ')}`);
        }
        return response.status(status).json({
            message: messages,
            error: errorName,
            statusCode: status,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map