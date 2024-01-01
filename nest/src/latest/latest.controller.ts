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
  import { LatestService } from './latest.service';
  import { Latest as LatestEntity } from './latest.entity';
  import { RequestWithUser } from 'src/middleware/token.middleware';
  import { CreateLatestRequestDTO, CreateLatestResponseDTO } from './latest.dto';
  import { FileFieldsInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { resolve } from 'path';
  import e from 'express';
  import { generateUniqueFileName } from '../utils/utils.files';
  
  @Controller('latest')
  export class LatestController {
    private readonly logger = new Logger(LatestController.name);
    constructor(
      private readonly latestService: LatestService,
    ) {}
  
    /**
     * Create a new post
     * @param file
     * @param latestData - Partial data of PostEntity
     * @param request
     * @returns Created PostEntity object
     */
  
    @Post()
    @UseInterceptors(
      FileFieldsInterceptor([{ name: 'pic', maxCount: 1 }], {
        storage: diskStorage({
          destination: resolve('static', 'images'),
          /**
           * Provides a unique name for each file.
           * @param _
           * @param file
           * @param cb
           */
          filename(
            _: e.Request,
            file: Express.Multer.File,
            cb: (error: Error | null, filename: string) => void,
          ) {
            cb(null, generateUniqueFileName(file.originalname));
          },
        }),
      }),
    )
    async createLatest(
      @Body() latestData: Partial<CreateLatestRequestDTO>,
      @Req() request: RequestWithUser,
    ): Promise<CreateLatestResponseDTO> {
      const user = request.userEntity;
  
      const latest = await this.latestService.createLatest(latestData, user);
  
      return {
        latest_id: latest.latest_id,
      };
    }
  
  
    /**
     * Delete a post by ID
     * @param postId - ID of the post to delete
     * @param request
     */
    @Delete(':post_id')
    async deletePost(
      @Param('post_id') postId: string,
      @Req() request: RequestWithUser,
    ): Promise<void> {
      const user = request.userEntity;
      try {
        await this.latestService.deleteLatest(postId, user);
      } catch (error) {
        this.logger.fatal(error);
        throw new NotFoundException('Post not found');
      }
    }
  
    /**
     * Get posts by username
     * @param userName - Username to search for
     * @returns Array of PostEntity objects
     */
    @Get(':userName')
    async findLatestByUserName(
      @Param('userName') userName: string,
    ): Promise<LatestEntity[]> {
      const posts = await this.latestService.findLatestByUserName(userName);
      if (!posts || posts.length === 0) {
        throw new NotFoundException('No posts found for this user name');
      }
      return posts;
    }
  }