import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    create() {
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }
}
