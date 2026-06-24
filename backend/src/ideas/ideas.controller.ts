import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Get('public/:id')
  getPublic(@Param('id') id: string) {
    return this.ideasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.ideasService.uploadFile(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No document uploaded');
    }
    return this.ideasService.uploadDocument(file);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/document')
  async getDecryptedDocument(@Param('id') id: string, @Request() req: any, @Res() res: Response) {
    const userId = req.user.id;
    const buffer = await this.ideasService.getDecryptedDocument(id, userId);
    res.setHeader('Content-Type', 'application/pdf'); // Defaulting to PDF as requested
    res.send(buffer);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/share-document')
  async shareDocument(
    @Param('id') id: string,
    @Body('targetUserId') targetUserId: string,
    @Request() req: any
  ) {
    const ownerId = req.user.id;
    return this.ideasService.grantDocumentAccess(id, targetUserId, ownerId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createIdeaDto: CreateIdeaDto,
    @Request() req: any
  ) {
    const userId = req.user.id;
    return this.ideasService.create(createIdeaDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyIdeas(@Request() req: any) {
    return this.ideasService.findAll(req.user.id);
  }

  @Get()
  findAll() {
    return this.ideasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdeaDto: UpdateIdeaDto) {
    return this.ideasService.update(id, updateIdeaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ideasService.remove(id);
  }
}
