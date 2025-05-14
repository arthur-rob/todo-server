import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100, default: '' })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
