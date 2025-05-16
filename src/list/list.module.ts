import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { List } from 'src/list/entities/list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { UsersModule } from 'src/users/users.module';
import { TaskModule } from 'src/task/task.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task, User, List]),
        UsersModule,
        forwardRef(() => TaskModule),
    ],
    controllers: [ListController],
    providers: [ListService],
    exports: [ListService],
})
export class ListModule {}
