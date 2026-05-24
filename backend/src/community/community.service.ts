import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  getUserProjects(userId: string) {
    return this.prisma.projectMember.findMany({
      where: { user_id: userId },
      include: {
        project: {
          include: {
            members: {
              include: { user: { select: { username: true, profile_image: true } } }
            }
          }
        }
      }
    });
  }

  createCollabRequest(senderId: string, receiverId: string, ideaId: string, message: string) {
    return this.prisma.collaborationRequest.create({
      data: {
        sender_id: senderId,
        receiver_id: receiverId,
        idea_id: ideaId,
        request_type: 'JOIN_REQUEST',
        message,
      }
    });
  }
}
