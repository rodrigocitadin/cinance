import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(
    id: string,
    updateData: Prisma.UserUpdateInput,
  ): Promise<User> {
    await this.findById(id); // I really need this await? idk

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: string) {
    await this.findById(id);

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
