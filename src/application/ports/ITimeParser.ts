export interface ITimeParser {
    parse(input: {
        text:string;
        timezone: string;
        referenceDate?: Date;
    }): Promise<{
        success: boolean;
        date?: Date;
        error?: string;
        isRecurring?: boolean;
        recurringRule?: string;
    }>;
}