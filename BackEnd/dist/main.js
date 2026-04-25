"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const parse_cors_whitelist_1 = require("./common/utils/parse-cors-whitelist");
const user_service_1 = require("./user/user.service");
const post_service_1 = require("./post/post.service");
const post_seed_1 = require("./database/seeds/post.seed");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    const corsWhiteList = (0, parse_cors_whitelist_1.parseCorsWhitelist)(process.env.CORS_WHITELIST ?? '');
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || corsWhiteList.includes(origin) || origin === 'http://localhost:3000') {
                return callback(null, true);
            }
            ;
            return callback(new Error('Not allowed by CORS'), false);
        },
        credentials: true
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const userService = app.get(user_service_1.UserService);
    const postService = app.get(post_service_1.PostService);
    const adminEmail = 'admin@admin.com';
    let admin = await userService.findByEmail(adminEmail);
    if (!admin) {
        console.log('👤 Criando usuário administrador...');
        admin = await userService.create({
            name: 'Luiz Barcelar',
            email: adminEmail,
            password: '123456',
        });
        console.log('✅ Usuário administrador criado com ID:', admin.id);
    }
    const existingPosts = await postService.findAll({}).catch(() => []);
    if (existingPosts.length === 0) {
        console.log('🌱 Banco SQLite vazio! Inserindo posts de segurança...');
        const idDoAutor = admin.id;
        for (const postData of post_seed_1.SEED_POSTS) {
            const idDoAutor = admin.id;
            await postService.create({
                title: postData.title,
                content: postData.content,
                excerpt: postData.excerpt,
                coverImageUrl: postData.coverImageUrl,
                published: true
            }, admin).catch(err => console.error(err.message));
        }
        console.log('✅ Seeds de posts finalizados.');
    }
    const port = process.env.APP_PORT ?? 3001;
    await app.listen(port);
    console.log(`🚀 Backend rodando na porta ${port}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map