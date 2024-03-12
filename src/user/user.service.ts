import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './user.dto'
import { PrismaService } from '../prisma.service'
import { v4 } from 'uuid'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async save(userData: CreateUserDto) {
    try {
      await this.prisma.users.findUniqueOrThrow({
        where: {
          email: userData.email
        }
      })
      return {
        message: 'E-mail já cadastrado!'
      }
    } catch (NotFoundError) {
      const user = {
        id: v4(),
        ...userData
      }
      await this.prisma.users.create({ data: user })
      return {
        message: 'Usuário cadastrado com sucesso!'
      }
    }
  }

  async getAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
        role: true
      }
    })
  }
}
