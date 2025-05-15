import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = this.taskRepository.save({ ...createTaskDto, user });
        return task;
    }

    async findByUser(user: User): Promise<Task[]> {
        return await this.taskRepository.find({ where: { user } });
    }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async findOne(id: number): Promise<Task | null> {
        return await this.taskRepository.findOne({ where: { id } });
    }

    async update(
        id: number,
        updateTaskDto: UpdateTaskDto,
        user: User,
    ): Promise<Task | null> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        // Check if the task belongs to the user
        if (task.user.id !== user.id) {
            throw new ForbiddenException(
                'You do not have permission to update this task',
            );
        }

        const updatedTask = { ...task, ...updateTaskDto };
        return await this.taskRepository.save(updatedTask);
    }

    async remove(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}
