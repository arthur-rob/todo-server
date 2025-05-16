import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @OneToMany(() => Task, (task) => task.list)
    tasks: Task[];

    @ManyToOne(() => User, { eager: true, nullable: false })
    user: User;
}
