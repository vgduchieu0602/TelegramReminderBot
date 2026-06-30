import {ReminderStatus} from '../enums/ReminderStatus';
import {DomainError, BusinessRuleError} from '../../shared/errors/DomainError';

export interface ReminderProps {
    id?: string;
    userId: string;
    content: string;
    scheduledAt: Date;
    status?: ReminderStatus;
    createdAt?: Date;
    updatedAt?: Date;
    retryCount?: number;
    isRecurring?: boolean;
    recurringRule?: string | null;
    isAutoComplete?: boolean;
}

export class Reminder {
    public readonly id: string;
    public readonly userId: string;
    public content: string;
    public scheduledAt: Date;
    public status: ReminderStatus;
    public createdAt: Date;
    public updatedAt: Date;
    public retryCount: number;
    public isRecurring: boolean;
    public recurringRule: string | null;
    public isAutoComplete: boolean;

    constructor (props: ReminderProps) {
        if(!props.userId) {
            throw new DomainError('Yêu cầu UserId!')
        }

        if(!props.content || props.content.trim().length === 0) {
            throw new DomainError('Yêu cầu nội dung!')
        }

        if (!props.scheduledAt || props.scheduledAt < new Date()) {
            throw new DomainError('Kế hoạch nhắc nhở phải sau thời gian hiện tại!')
        }

        this.id = props.id || `rem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
        this.userId = props.userId;
        this.content = props.content;
        this.scheduledAt = props.scheduledAt;
        this.status = props.status || ReminderStatus.PENDING;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
        this.retryCount = props.retryCount || 0;
        this.isRecurring = props.isRecurring || false;
        this.recurringRule = props.recurringRule || null;
        this.isAutoComplete = props.isAutoComplete || false;
    }

    public markCompleted(): void {
        if (this.status === ReminderStatus.COMPLETED) {
            throw new BusinessRuleError('Nhắc nhở đã hoàn thành!')
        }
        if (this.status === ReminderStatus.CANCELLED) {
            throw new BusinessRuleError('Nhắc nhở đã bị hủy!')
        }
        this.status = ReminderStatus.COMPLETED;
        this.updatedAt = new Date();
    }

    public markCancelled(): void {
        if (this.status !== ReminderStatus.COMPLETED) {
            throw new BusinessRuleError('Chỉ có thể hủy nhắc nhở đã hoàn thành!')
        }
        this.status = ReminderStatus.CANCELLED;
        this.updatedAt = new Date();
    }

    public snooze(minutes: number): void {
        if (this.status !== ReminderStatus.PENDING) {
            throw new BusinessRuleError('Chỉ có thể tạm hoãn nhắc nhở đang chờ!')
        }

        if (minutes <= 0) {
            throw new DomainError('Số phút tạm hoãn phải lớn hơn 0!')
        }

        if (this.retryCount >= 3) {
            throw new DomainError('Đã đạt giới hạn tạm hoãn!')
        }

        this.scheduledAt = new Date(this.scheduledAt.getTime() + minutes * 60 * 1000)
        this.retryCount += 1;
        this.updatedAt = new Date();
    }

    public isOverdue(): boolean {
        return this.status === ReminderStatus.PENDING && this.scheduledAt < new Date();
    }

    public canRetry (): boolean {
        return this.retryCount < 3;
    }

    public toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            content: this.content,
            scheduledAt: this.scheduledAt,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            retryCount: this.retryCount,
            isRecurring: this.isRecurring,
            recurringRule: this.recurringRule,
            isAutoComplete: this.isAutoComplete
        }
    }
}
