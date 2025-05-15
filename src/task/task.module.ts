import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity'; // Import User entity if needed
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task, User]), // Add your Task entity here
        UsersModule,
    ],
    providers: [TaskService],
    controllers: [TaskController],
    exports: [TaskService], // Export TaskService if needed in other modules
})
export class TaskModule {}
