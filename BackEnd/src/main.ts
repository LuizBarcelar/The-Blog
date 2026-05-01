import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { parseCorsWhitelist } from './common/utils/parse-cors-whitelist';

// --- IMPORTANTE: ADICIONE O IMPORT DO USER SERVICE ---
import { UserService } from './user/user.service'; 
import { PostService } from './post/post.service'; 
import { SEED_POSTS } from './database/seeds/post.seed';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const corsWhiteList = parseCorsWhitelist(process.env.CORS_WHITELIST ?? '');

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || corsWhiteList.includes(origin) || origin === 'http://localhost:3000') {
        return callback(null, true);
      };
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

// --- LÓGICA DE SEED (VERSÃO COMPATÍVEL) ---
if (process.env.NODE_ENV !== 'production') {
  const userService = app.get(UserService);
  const postService = app.get(PostService);
  
  // 1. Verificar se o admin existe pelo e-mail (já que não temos findAll)
  const adminEmail = 'admin@admin.com';
  let admin = await userService.findByEmail(adminEmail);
  
  if (!admin) {
    console.log('👤 Criando usuário administrador...');
    admin = await userService.create({
      name: 'Luiz Barcelar',
      email: adminEmail,
      password: '123456',
    } as any)
  }

  // 2. Criar os Posts (usando o ID real do admin encontrado ou criado)
  const existingPosts = await postService.findAll({} as any).catch(() => []); 
  
  if (existingPosts.length === 0) {
    console.log('🌱 Banco SQLite vazio! Inserindo posts de segurança...')
    for (const postData of SEED_POSTS) {
      await postService.create({
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        coverImageUrl: postData.coverImageUrl,
        published: true
      }, admin)
    }
  }
}
  // --- FIM DA LÓGICA DE SEED ---

  const port = process.env.PORT || process.env.APP_PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend rodando na porta ${port}`);
}

void bootstrap();