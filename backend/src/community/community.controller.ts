import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get('projects')
  getUserProjects(@Headers('x-user-id') userId: string) {
    if (!userId) throw new Error("Missing x-user-id header");
    return this.communityService.getUserProjects(userId);
  }

  @Post('request')
  createRequest(
    @Headers('x-user-id') senderId: string,
    @Body() body: { receiverId: string; ideaId: string; message: string }
  ) {
    if (!senderId) throw new Error("Missing x-user-id header");
    return this.communityService.createCollabRequest(
      senderId,
      body.receiverId,
      body.ideaId,
      body.message
    );
  }
}
