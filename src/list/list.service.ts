import {
    Injectable,
    ConflictException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>,
    ) {}

    async create(createListDto: CreateListDto, user: User): Promise<List> {
        const existingListName = await this.listRepository.findOneBy({
            name: createListDto.name,
        });
        if (existingListName) {
            throw new ConflictException('Name already in use');
        }
        return await this.listRepository.save({ ...createListDto, user });
    }

    async findByUser(user: { id: number }): Promise<List[]> {
        return await this.listRepository.find({
            where: { user: { id: user.id } },
        });
    }

    async findOne(id: number): Promise<List | null> {
        return await this.listRepository.findOne({ where: { id } });
    }

    async remove(id: number, user: User): Promise<void> {
        const list = await this.listRepository.findOne({ where: { id } });
        if (!list) {
            throw new NotFoundException(`List with ID ${id} not found`);
        }
        if (list.user.id !== user.id) {
            throw new ForbiddenException(
                'You do not have permission to delete this list',
            );
        }
        await this.listRepository.delete(list.id);
    }
}
