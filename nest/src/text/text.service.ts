import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Text } from './text.entity';
import { CreateTextRequestDTO } from './text.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class TextService {
  constructor(
    @Inject('TEXT_REPOSITORY')
    private textRepository: Repository<Text>,
  ) {}

  /**
   * Find post with post_id.
   * @param text_id
   * @returns Promise<User | null>
   */
  async findOneById(text_id: string): Promise<Text | null> {
    return this.textRepository.findOne({
      where: { text_id },
    });
  }
  /**
   * Find all posts
   * @returns Array of text entities
   */
  async findAll(): Promise<Text[]> {
    return this.textRepository.find();
  }
}
