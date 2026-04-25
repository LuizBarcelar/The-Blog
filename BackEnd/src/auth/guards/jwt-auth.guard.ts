import { ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowLogin = Number(process.env.ALLOW_LOGIN);

    try {

      const isValid = await super.canActivate(context);
      if (isValid) return true;
    } catch (error) {

      if (allowLogin === 1) {
        const request = context.switchToHttp().getRequest();

        if (!request.user) {
          request.user = { 
            id: 'ID_DO_SEU_ADMIN_NO_SQLITE',
            email: 'admin@admin.com',
            name: 'Admin Liberado'
          };
          console.log('⚠️ Acesso via Mock (Usuário não logado)');
        }
        return true;
      }

      throw new UnauthorizedException('Sessão expirada ou inválida');
    };
    return false;
  }

  handleRequest(err, user) {
    if (err || !user) {

      return null;
    }
    return user;
  };
};