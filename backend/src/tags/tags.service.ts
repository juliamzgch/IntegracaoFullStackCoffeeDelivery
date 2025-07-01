import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async create(createTagDto: CreateTagDto) {
    try {
      return await this.prisma.tag.create({
        data: createTagDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Tag with name ${createTagDto.name} already exists`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    // Verificar se a tag existe
    await this.findOne(id);

    // Remover a tag
    return this.prisma.tag.delete({
      where: { id },
    });
  }
} 