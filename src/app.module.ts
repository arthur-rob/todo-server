import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { List } from './list/entities/list.entity';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DB_USER_PASSWORD || 'root',
            password: process.env.DB_USER_PASSWORD || '',
            database: process.env.DB_NAME || 'todo',
            entities: [User, Task, List],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        TaskModule,
        ListModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
