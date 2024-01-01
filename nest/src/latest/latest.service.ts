import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Latest } from './latest.entity';
import { CreateLatestRequestDTO } from './latest.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class LatestService {
  constructor(
    @Inject('LATEST_REPOSITORY')
    private latestRepository: Repository<Latest>,
  ) {}

  /**
   * Find post with post_id.
   * @param latest_id
   * @returns Promise<User | null>
   */
  async findOneById(latest_id: string): Promise<Latest | null> {
    return this.latestRepository.findOne({
      where: { latest_id },
    });
  }
  /**
   * Find all posts
   * @returns Array of Post entities
   */
  async findAll(): Promise<Latest[]> {
    return this.latestRepository.find();
  }

  /**
   * Find posts by user ID
   * @param user_id - User ID to search for
   * @returns Array of Post entities
   */
  async findByUserId(user_id: string): Promise<Latest[]> {
    return this.latestRepository.find({
      where: { user: { user_id } },
    });
  }

  /**
   * Create a new post
   * @param latestData - Partial Post entity data
   * @param user
   * @returns Newly created Post entity
   */
  async createLatest(
    latestData: Partial<CreateLatestRequestDTO>,
    user: User,
  ): Promise<Latest> {
    const newLatest = this.latestRepository.create({
      ...latestData,
      user,
    });
    return this.latestRepository.save(newLatest);
  }

  /**
   * Delete a post by ID associated with a specific user
   * @param latest_id - ID of the post to delete
   * @param user - User associated with the post
   */
  async deleteLatest(latest_id: string, user: User): Promise<void> {
    const postToDelete = await this.latestRepository.findOne({
      where: { latest_id: latest_id, user: { user_id: user.user_id } },
    });
    if (!postToDelete) {
      throw new Error('Post not found');
    }
    await this.latestRepository.remove(postToDelete);
  }

  /**
   * Find posts by username
   * @param userName - Username to search for
   * @returns Array of Post entities
   */
  async findLatestByUserName(userName: string): Promise<Latest[]> {
    return this.latestRepository
      .createQueryBuilder('latest')
      .innerJoin('latest.user', 'user')
      .where('user.user_name = :userName', { userName })
      .getMany();
  }
}
