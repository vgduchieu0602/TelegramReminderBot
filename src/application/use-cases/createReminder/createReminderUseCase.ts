import {Reminder} from '../../../domain/entities/Reminder'
import { IReminderRepository } from '@domain/interfaces/IReminderRepository'
import { IUserRepository } from '@domain/interfaces/IUserRepository'
import { ITimeParser } from '@application/ports/ITimeParser'
import { INotificationQueue } from '@application/ports/INotificationQueue'
import { NotFoundError, ValidationError } from '@shared/errors/DomainError'

export interface CreateReminderInput {
    userId: string;
    content: string;
    timeExpression: string;
    autoComplete?: boolean;
}

export interface CreateReminderOutput {
    id: string;
    content: string;
    scheduledAt: Date;
    message: string;
}

export class CreateReminderUseCase {
    constructor (
        private reminderRepo: IReminderRepository,
        private userRepo: IUserRepository,
        private timeParser: ITimeParser,
        private notificationQueue: INotificationQueue
    ) {}

    async execute(input: CreateReminderInput): Promise<CreateReminderOutput> {
        //Step 1: Validate user exists
        const user = await this.userRepo.findById(input.userId)
        if(!user) {
            throw new NotFoundError('User', input.userId)
        }

        //Step 2: Parse time expression
        const parseResult = await this.timeParser.parse({
            text: input.timeExpression,
            timezone: user.timezone
        });

        if(!parseResult.success || !parseResult.date) {
            throw new ValidationError(`Invalid time expression: ${parseResult.error}`)
        }

        //Step 3: Create reminder entity
        const reminder = new Reminder({
            userId: input.userId,
            content: input.content,
            scheduledAt: parseResult.date,
            isRecurring: parseResult.isRecurring || false,
            recurringRule: parseResult.recurringRule || null,
            isAutoComplete: input.autoComplete || false
        })

        //Step 4: Save to database
        const savedReminder = await this.reminderRepo.save(reminder)

        //Step 5: Schedule notification
        if (reminder.isRecurring && reminder.recurringRule) {
            await this.notificationQueue.addRecurring({
                reminderId: savedReminder.id,
                userId: input.userId,
                cronExpression: reminder.recurringRule,
                content: savedReminder.content
            })
        } else {
            await this.notificationQueue.add({
                reminderId: savedReminder.id,
                userId: input.userId,
                scheduledAt: savedReminder.scheduledAt,
                content: savedReminder.content
            })
        }

        //Step 6: Return result
        return {
            id: savedReminder.id,
            content: savedReminder.content,
            scheduledAt: savedReminder.scheduledAt,
            message: `✅ Đã đặt nhắc việc: "${savedReminder.content}" vào lúc ${savedReminder.scheduledAt.toLocaleString('vi-VN')}` +
               (savedReminder.isAutoComplete ? '\n🔄 Sẽ tự động hoàn thành sau khi nhắc' : '')
        }
    }
}