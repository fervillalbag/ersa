import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { CreateUserDTO, LoginUserDTO } from './dto/user.dto';
import { UserInterface } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserInterface> {
    const user = await this.userService.createUser(createUserDTO);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'User created!',
      success: true,
      user,
    });
  }

  @Post('/login')
  async loginUser(
    @Res() res,
    @Body() loginUserDTO: LoginUserDTO,
  ): Promise<UserInterface> {
    const token = await this.userService.loginUser(loginUserDTO);

    if (!token) {
      throw new Error('User not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'User logged',
      success: true,
      token,
    });
  }

  @Put('/:id')
  async updateUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDTO,
    @Param('id') id: string,
  ): Promise<UserInterface> {
    const user = await this.userService.updateUser(id, createUserDTO);

    if (!user) throw new NotFoundException('User not found');

    return res.status(HttpStatus.OK).json({
      message: 'User updated!',
      success: true,
      user,
    });
  }

  @Delete('/:id')
  async deleteUser(
    @Res() res,
    @Param('id') id: string,
  ): Promise<UserInterface> {
    const user = await this.userService.deleteUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'User deleted!',
      success: true,
      user,
    });
  }

  @Get('/')
  async getUsers(@Res() res): Promise<UserInterface[]> {
    const users = await this.userService.getUsers();

    if (!users) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Users fetched!',
      success: true,
      users,
    });
  }

  @Get('/:id')
  async getUser(@Res() res, @Param('id') id: string): Promise<UserInterface> {
    const user = await this.userService.getUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'User fetched!',
      success: true,
      user,
    });
  }
}
