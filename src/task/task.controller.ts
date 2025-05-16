import {
    Body,
    Controller,
    Delete,
    Get,
    Request,
    Patch,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    Param,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Get('me')
    async getTasks(@Request() req: Request & { user: User }): Promise<Task[]> {
        const user = req.user;
        return await this.taskService.findByUser(user);
    }

    @UseGuards(AuthGuard)
    @Get('list/:listId')
    async findByList(@Param('listId') listId: number): Promise<Task[]> {
        return await this.taskService.findByList(listId);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(
        @Body() dto: CreateTaskDto,
        @Request() req: Request & { user: User },
    ): Promise<Task> {
        const user = req.user;
        return await this.taskService.create(dto, user);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @Request() req: Request & { user: User },
    ): Promise<Task | null> {
        const user = req.user;
        return await this.taskService.update(id, updateTaskDto, user);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(
        @Param('id') id: number,
        @Request() req: Request & { user: User },
    ): Promise<void> {
        const user = req.user;
        return await this.taskService.remove(id, user);
    }
}
