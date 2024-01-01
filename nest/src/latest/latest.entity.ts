import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Text } from '../text/text.entity';
  import { User } from '../user/user.entity';
  
  @Entity('latest')
  export class Latest {
    // Primary key for the Post entity
    @PrimaryGeneratedColumn('uuid')
    latest_id!: string;

    // Many-to-one relation with User entity, enforcing non-nullability
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    // Many-to-one relation with User entity, enforcing non-nullability
    @ManyToOne(() => Text, { nullable: false })
    @JoinColumn({ name: 'latest_text' })
    text: Text;

    // Column for the content of the post, non-nullable text
    @Column({ type: 'text', nullable: false })
    latest_wpm: number;

    @Column({ type: 'text', nullable: false })
    latest_raw: number;

    @Column({ type: 'text', nullable: false })
    latest_time: string;
  
    /**
     * Constructor for the Post entity.
     * @param user - User who created the post
     * @param text - Content of the post
     * @param latest_wpm - Picture associated with the post
     * @param latest_raw - Content of the post
     * @param latest_time - Picture associated with the post
     */
    constructor(user: User, text: Text, latest_wpm: number, latest_raw: number, latest_time: string) {
      this.user = user;
      this.text = text;
      this.latest_wpm = latest_wpm;
      this.latest_raw = latest_raw;
      this.latest_time = latest_time;
    }
  }
  