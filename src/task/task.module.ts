import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { List } from 'src/list/entities/list.entity';
import { ListModule } from 'src/list/list.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task, User, List]),
        UsersModule,
        forwardRef(() => ListModule),
    ],
    providers: [TaskService],
    controllers: [TaskController],
    exports: [TaskService],
})
export class TaskModule {}
