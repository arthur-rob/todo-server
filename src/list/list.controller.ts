import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(
        @Body() createListDto: CreateListDto,
        @Request() req: Request & { user: User },
    ) {
        const user = req.user;
        return await this.listService.create(createListDto, user);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('me')
    async getLists(@Request() req: Request & { user: User }): Promise<List[]> {
        const user = req.user;
        return await this.listService.findByUser(user);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.listService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: number, @Request() req: Request & { user: User }) {
        return this.listService.remove(id, req.user);
    }
}
