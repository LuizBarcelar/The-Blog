import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';

import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findOneOrFail(postData: Partial<Post>, author?: User) {
    const post = await this.findOne(postData);

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  async findOne(postData: Partial<Post>) {
    const post = await this.postRepository.findOne({
      where: postData,
      relations: ['author'],
    });

    return post;
  }

  async findAll(postData: Partial<Post>) {
    const posts = await this.postRepository.find({
      where: postData,
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    return posts;
  }

  async findOneOwnedOrFail(postData: Partial<Post>, author: User) {
    const post = await this.findOneOwned(postData, author);

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  async findOneOwned(postData: Partial<Post>, author: User) {

    if (!author || !author.id) {
      this.logger.error('Tentativa de buscar post sem um autor autenticado')
      return null;
    }

    const post = await this.postRepository.findOne({
      where: {
        ...postData,
        author: { id: author.id },
      },
      relations: ['author'],
    });

    return post;
  }

  async findAllOwned(author: User) {

    if (!author || !author.id) return [];

    return await this.postRepository.find({
      where: {
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });
  }

  async create(dto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      title: dto.title || 'Post sem título',
      content: dto.content || 'Conteúdo padrão',
      excerpt: dto.excerpt || 'Resumo padrão',
      coverImageUrl: dto.coverImageUrl || '',
      slug: createSlugFromText(dto.title || 'post'),
      author: author,
      published: true,
    });

    // 2. Salvamento com log de erro detalhado
    const savedPost = await this.postRepository.save(post).catch((err: any) => {
      this.logger.error(`Erro ao salvar no SQLite: ${err.message}`);
      throw new BadRequestException('Erro ao persistir o post');
    });

    return { ...savedPost, author };
  }

  async update(postData: Partial<Post>, dto: UpdatePostDto, author: User) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Dados não enviados');
    }

    const post = await this.findOneOrFail(postData, author);

    post.title = dto.title ?? post.title;
    post.content = dto.content ?? post.content;
    post.excerpt = dto.excerpt ?? post.excerpt;
    post.coverImageUrl = dto.coverImageUrl ?? post.coverImageUrl;
    post.published = dto.published ?? post.published;

    return this.postRepository.save(post);
  }

  async remove(postData: Partial<Post>, author: User) {

    if (!author || !author.id) throw new BadRequestException('Usuário não autenticado');
    
    const post = await this.findOneOrFail(postData, author);
    await this.postRepository.delete({
      ...postData,
      author: { id: author.id },
    });
    return post;
  }
}
