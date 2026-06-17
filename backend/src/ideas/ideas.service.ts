import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class IdeasService {
  private supabase: SupabaseClient | null = null;

  constructor(private prisma: PrismaService) {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      this.supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
      );
    }
  }

  async uploadFile(file: Express.Multer.File) {
    if (!this.supabase) {
      throw new InternalServerErrorException('Supabase URL or Key not configured in environment variables.');
    }

    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const bucket = 'ideahub-media';

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new InternalServerErrorException(`Failed to upload to Supabase: ${error.message}`);
    }

    const { data: publicUrlData } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return { url: publicUrlData.publicUrl };
  }

  create(createIdeaDto: CreateIdeaDto, userId: string) {
    return this.prisma.idea.create({
      data: {
        title: createIdeaDto.title,
        description: createIdeaDto.description,
        tags: createIdeaDto.tags,
        media_url: createIdeaDto.media_url,
        media_type: createIdeaDto.media_type,
        is_anonymous: createIdeaDto.is_anonymous || false,
        owner_id: userId,
      },
    });
  }

  findAll(ownerId?: string) {
    return this.prisma.idea.findMany({
      where: ownerId ? { owner_id: ownerId } : undefined,
      include: {
        owner: {
          select: { username: true, profile_image: true },
        },
        _count: {
          select: { votes: true, comments: true }
        }
      },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.idea.findUnique({
      where: { id },
      include: {
        owner: { select: { username: true, profile_image: true } },
        comments: { 
          include: { 
            user: { select: { username: true, profile_image: true } } 
          },
          orderBy: { created_at: 'asc' }
        },
        _count: {
          select: { votes: true }
        }
      },
    });
  }

  update(id: string, updateIdeaDto: UpdateIdeaDto) {
    return this.prisma.idea.update({
      where: { id },
      data: updateIdeaDto,
    });
  }

  remove(id: string) {
    return this.prisma.idea.delete({
      where: { id },
    });
  }
}
