import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        id: createUserDto.id, // We use the ID from Supabase Auth
        username: createUserDto.username,
        email: createUserDto.email,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { is_public: true },
      select: {
        id: true,
        username: true,
        profile_image: true,
        skills: true,
      }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        ideas: {
          orderBy: { created_at: 'desc' }
        },
      }
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
