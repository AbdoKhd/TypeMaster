import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    NotFoundException,
    Param,
    Post,
    Put,
    Req,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { TextService } from './text.service';
  import { Text as TextEntity } from './text.entity';
  import { RequestWithUser } from 'src/middleware/token.middleware';
  import { CreateTextRequestDTO, CreateTextResponseDTO } from './text.dto';
  import { FileFieldsInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { resolve } from 'path';
  import e from 'express';
  import { generateUniqueFileName } from '../utils/utils.files';
  
  @Controller('text')
  export class TextController {
    private readonly logger = new Logger(TextController.name);
    constructor(
      private readonly textService: TextService,
    ) {}
  
    @Get('getTexts')
    async getAll(): Promise<TextEntity[]> {
      const texts = await this.textService.findAll();
      if (!texts || texts.length === 0) {
        throw new NotFoundException('No texts found');
      }
      return texts;
    }
  }