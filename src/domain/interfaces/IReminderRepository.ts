import { Reminder } from "@domain/entities/Reminder";
import { ReminderStatus } from "@domain/enums/ReminderStatus";

export interface IReminderRepository {
    save (reminder: Reminder): Promise<Reminder>;
    findById (id: string): Promise<Reminder | null>;
    findByUser (userId: string): Promise<Reminder[]>;
    findByStatus (status: ReminderStatus): Promise<Reminder[]>;
    findPendingRemindersUpTo (date: Date): Promise<Reminder[]>;
    update (reminder: Reminder): Promise<Reminder>;
    delete (id: string): Promise<void>;
    countByUser (userId: string): Promise<number>;
}