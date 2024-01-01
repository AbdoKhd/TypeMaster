import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Put,
    Req,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { UpdateUserDto } from './user.dto';
  import { FileFieldsInterceptor } from '@nestjs/platform-express';
  import { RequestWithUser } from '../middleware/token.middleware';
  import { diskStorage } from 'multer';
  import e from 'express';
  import { resolve } from 'path';
  import { generateUniqueFileName } from '../utils/utils.files';
  
  @Controller('users')
  export class UserController {
    constructor(
      private readonly userService: UserService,
    ) {}
  
    @Get('/:id')
    async getUserById(@Param('id') id: string) {
      const user = await this.userService.findOneById(id);
      if (!user) throw new NotFoundException('No such user');
      return {
        username: user.username,
        email: user.email,
      };
    }
  
    @Get('/:username')
    async getUserByUsername(@Param('username') username: string) {
      const user = await this.userService.findOneByUsername(username);
      if (!user) throw new NotFoundException('No such user.');
      return {
        username: user.username,
        email: user.email,
      };
    }
  
    @Put()
    async updateUser(@Body() id: string, @Body() user: UpdateUserDto) {
      return this.userService.updateUser(id, user);
    }
  
    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
      return this.userService.deleteUser(id);
    }
  }
  