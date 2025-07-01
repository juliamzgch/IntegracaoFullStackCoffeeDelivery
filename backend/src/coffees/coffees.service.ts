import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { start } from 'repl';
import { skip } from '@prisma/client/runtime/library';
import { filter, min, take } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoffeesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const coffees = await this.prisma.coffee.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return coffees.map(coffee => ({
      ...coffee,
      price: Number(coffee.price),
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag),
    }));
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    return {
      ...coffee,
      price: Number(coffee.price),
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag),
    };
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // código aqui

    const { name, description, price, imageUrl, tags } = createCoffeeDto;

    const existingCoffee = await this.prisma.coffee.findFirst({
      where: { name },
    });

    if (existingCoffee) {
      throw new BadRequestException(`Coffee with name: ${name} already exists`);
    }

    const normalizedTags = tags.map(t => t.toLowerCase().trim());

    const coffee = await this.prisma.coffee.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        tags: {
          create: normalizedTags.map(tag => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        }
      }
    });

    return {
      ...coffee,
      price: Number(coffee.price),
      tags: coffee.tags.map(coffeeTag => coffeeTag.tag.name),
      message: "Coffee created sucessfully"
    }
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id }
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    const { name, description, price, imageUrl, tags } = updateCoffeeDto;

    if (tags) {
      // Normalizar tags para lowercase e trim
      const normalizedTags = tags.map(tag => tag.toLowerCase().trim());

      // Apaga os relacionamentos atuais
      await this.prisma.coffeeTag.deleteMany({
        where: { coffeeId: id }
      });

      // Cria os relacionamentos com connectOrCreate, usando tags normalizadas
      await Promise.all(
        normalizedTags.map(tag =>
          this.prisma.coffeeTag.create({
            data: {
              coffee: { connect: { id } },
              tag: {
                connectOrCreate: {
                  where: { name: tag },
                  create: { name: tag },
                },
              },
            },
          }),
        ),
      );
    }

    const updatedCoffee = await this.prisma.coffee.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Atualizar os dados do café retornando price como number e tags normalizadas
    return {
      ...updatedCoffee,
      price: Number(updatedCoffee.price),
      tags: updatedCoffee.tags.map(coffeeTag => coffeeTag.tag.name),
      message: "Coffee updated successfully",
    };
  }



  async remove(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }

    const deletedCoffee = await this.prisma.coffee.delete({
      where: { id },
    });

    return {
      coffee: deletedCoffee,
      message: "Coffee deleted sucessfully"
    }
  }

  async searchCoffees(params: {
    startDate?: Date;
    endDate?: Date;
    minPrice?: number;
    maxPrice?: number;
    name?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }) {
    const { startDate, endDate, minPrice, maxPrice, name, tags, limit = 10, offset = 0 } = params;

    const normalizedTags = tags?.map(tag => tag.toLowerCase().trim()) || [];

    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (normalizedTags.length > 0) {
      where.tags = {
        some: {
          tag: {
            name: {
              in: normalizedTags,
            },
          },
        },
      };
    }

    const coffees = await this.prisma.coffee.findMany({
      where,
      include: {
        tags: {
          include: { tag: true },
        },
      },
      skip: offset,
      take: limit,
    });

    const totalCount = await this.prisma.coffee.count({ where });

    const formatted = coffees.map(coffee => ({
      ...coffee,
      price: Number(coffee.price),
      tags: coffee.tags.map(ct => ct.tag.name),
    }));

    return {
      data: formatted,
      pagination: {
        limit,
        offset,
        totalCount,
        hasMore: offset + coffees.length < totalCount,
      },
    };
  }

} 