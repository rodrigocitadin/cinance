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

    const cpfAlreadyExists = await this.prisma.user.findFirst({
      where: { cpf },
    });

    if (cpfAlreadyExists) {
      throw new HttpException(
        { error: 'User with this cpf already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const emailAlreadyExists = await this.prisma.user.findFirst({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new HttpException(
        { error: 'User with this email already exists' },
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
