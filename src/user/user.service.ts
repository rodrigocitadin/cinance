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
    return await this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  // TODO: Check data before user creation
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { cpf, email } = data;

    const userAlreadyExists = await this.prisma.user.findMany({ where: { cpf, email }});

    if (userAlreadyExists) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

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
