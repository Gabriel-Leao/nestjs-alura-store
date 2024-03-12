import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './user.dto'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUsers(@Body() payload: CreateUserDto) {
    return this.userService.save(payload)
  }

  @Get()
  async getUsers() {
    return this.userService.getAll()
  }
}
