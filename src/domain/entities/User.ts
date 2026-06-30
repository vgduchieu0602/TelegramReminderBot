import { DomainError } from "@shared/errors/DomainError";

export interface UserProps {
    id?: string;
    telegramId: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    timezone?: string;
    language?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User {
    public readonly id: string;
    public readonly telegramId: string;
    public username: string | null;
    public firstName: string;
    public lastName: string | null;
    public timezone: string;
    public language: string;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(props: UserProps) {
        if (!props.telegramId) {
            throw new DomainError('Yêu cầu phải có TelegramId')
        }
        if (!props.firstName) {
            throw new DomainError('Yêu cầu phải có firstName')
        }

        this.id = props.id || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
        this.telegramId = props.telegramId;
        this.username = props.username || null;
        this.firstName = props.firstName;
        this.lastName = props.lastName || null;
        this.timezone = props.timezone || 'Asia/Ho_Chi_Minh';
        this.language = props.language || 'vi';
        this.isActive = props.isActive !== undefined ? props.isActive : true;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }

    public updateProfile (data: Partial<UserProps>): void {
        if (data.firstName) {
            this.firstName = data.firstName
        }

        if (data.lastName !== undefined) {
            this.lastName = data.lastName
        }

        if (data.username !== undefined) {
            this.username = data.username
        }

        if (data.timezone) {
            this.timezone = data.timezone
        }

        if (data.language) {
            this.language = data.language
        }

        this.updatedAt = new Date()
    }

    public deactivate(): void {
        this.isActive = false;
        this.updatedAt = new Date();
    }

    public reactivate(): void {
        this.isActive = true;
        this.updatedAt = new Date()
    }

    public toJSON() {
        return {
            id: this.id,
            telegramId: this.telegramId,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            timezone: this.timezone,
            language: this.language,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}