import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

@Injectable()
export class IdeasService {
  constructor(private prisma: PrismaService) {}

  create(createIdeaDto: CreateIdeaDto, userId: string) {
    return this.prisma.idea.create({
      data: {
        title: createIdeaDto.title,
        description: createIdeaDto.description,
        tags: createIdeaDto.tags,
        is_anonymous: createIdeaDto.is_anonymous || false,
        owner_id: userId,
      },
    });
  }

  findAll() {
    return this.prisma.idea.findMany({
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
