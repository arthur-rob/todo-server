import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 120 })
    descriptionShort: string;

    @Column({ nullable: true })
    descriptionLong: string;

    @Column({ default: false })
    isCompleted: boolean;

    @Column({ type: 'timestamp', nullable: true })
    expireAt: Date;

    @ManyToOne(() => User, { eager: true, nullable: false })
    user: User;
}
