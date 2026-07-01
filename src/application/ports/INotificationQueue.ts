export interface INotificationQueue {
    add(data: {
        reminderId: string;
        userId: string;
        scheduledAt: Date;
        content: string;
    }): Promise<void>;

    addRecurring(data: {
        reminderId: string;
        userId: string;
        cronExpression: string;
        content: string;
    }): Promise<void>;

    remove(reminderId: string): Promise<void>;
}