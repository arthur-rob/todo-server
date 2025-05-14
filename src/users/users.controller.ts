import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create() {
        return '';
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
