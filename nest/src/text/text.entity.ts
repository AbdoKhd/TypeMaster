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
  
  @Entity('texts')
  export class Text {
    // Primary key for the Post entity
    @PrimaryGeneratedColumn('uuid')
    text_id!: string;
  
    // Many-to-one relation with User entity, enforcing non-nullability
    @ManyToOne(() => Text, { nullable: true })
    @JoinColumn({ name: 'latest_text' })
    text: Text;


    /**
     * Constructor for the Post entity.
     * @param text - the text
     */
    constructor(text) {
      this.text = text;
    }
  }
  