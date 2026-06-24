import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import * as crypto from 'crypto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = crypto.scryptSync('ideahub-secure-doc-key-2026!', 'salt', 32);

@Injectable()
export class IdeasService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_KEY || ''
    );
  }

  async uploadFile(file: Express.Multer.File) {
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await this.supabase.storage
      .from('media')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new InternalServerErrorException(`Failed to upload media to Supabase: ${error.message}`);
    }

    const { data: publicData } = this.supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    return { url: publicData.publicUrl };
  }

  async uploadDocument(file: Express.Multer.File) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    
    const encryptedBuffer = Buffer.concat([cipher.update(file.buffer), cipher.final()]);
    const fileExt = file.originalname.split('.').pop();
    const fileName = `enc-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await this.supabase.storage
      .from('documents')
      .upload(fileName, encryptedBuffer, {
        contentType: 'application/octet-stream',
        upsert: true,
      });

    if (error) {
      throw new InternalServerErrorException(`Failed to upload document to Supabase: ${error.message}`);
    }
    
    return { 
      encrypted_doc_path: fileName, 
      doc_iv: iv.toString('hex') 
    };
  }

  async getDecryptedDocument(ideaId: string, userId: string) {
    const idea = await this.prisma.idea.findUnique({
      where: { id: ideaId },
      include: { document_access: true }
    });

    if (!idea || !idea.encrypted_doc_path || !idea.doc_iv) {
      throw new InternalServerErrorException('Document not found or not encrypted');
    }

    // Check access: Owner or explicitly granted
    const hasAccess = idea.owner_id === userId || idea.document_access.some(acc => acc.user_id === userId);
    if (!hasAccess) {
      throw new InternalServerErrorException('Access Denied');
    }

    const { data, error } = await this.supabase.storage
      .from('documents')
      .download(idea.encrypted_doc_path);

    if (error || !data) {
      throw new InternalServerErrorException('Encrypted file missing from Supabase');
    }

    const encryptedBuffer = Buffer.from(await data.arrayBuffer());
    const iv = Buffer.from(idea.doc_iv, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
    
    return decryptedBuffer;
  }

  async grantDocumentAccess(ideaId: string, targetUserId: string, ownerId: string) {
    const idea = await this.prisma.idea.findUnique({ where: { id: ideaId } });
    if (!idea || idea.owner_id !== ownerId) {
      throw new InternalServerErrorException('Only owner can grant access');
    }

    // Upsert or create
    return this.prisma.documentAccess.create({
      data: {
        idea_id: ideaId,
        user_id: targetUserId,
      }
    }).catch(e => {
      // Ignore if already exists (Unique constraint)
      return { success: true, message: 'Access already granted' };
    });
  }

  create(createIdeaDto: CreateIdeaDto, userId: string) {
    return this.prisma.idea.create({
      data: {
        title: createIdeaDto.title,
        description: createIdeaDto.description,
        tags: createIdeaDto.tags,
        media_url: createIdeaDto.media_url,
        media_type: createIdeaDto.media_type,
        encrypted_doc_path: createIdeaDto.encrypted_doc_path,
        doc_iv: createIdeaDto.doc_iv,
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
