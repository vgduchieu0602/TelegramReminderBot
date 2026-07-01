import { User } from "@domain/entities/User";

export interface IUserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByTelegramId(telegramId: string): Promise<User | null>;
    update(user: User): Promise<User[]>;
    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
}