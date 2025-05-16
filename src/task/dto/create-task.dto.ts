export class CreateTaskDto {
    title: string;
    descriptionShort: string;
    descriptionLong?: string;
    isCompleted: boolean;
    expireAt?: Date;
    userId: number;
}
