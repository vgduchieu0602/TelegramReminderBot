export class DomainError extends Error {
    public readonly code: string;

    constructor (message: string, code: string = "DOMAIN_ERROR") {
        super(message);
        this.name = 'DomainError';
        this.code = code

        Object.setPrototypeOf(this, DomainError.prototype)
    }
}

export class NotFoundError extends DomainError {
    constructor (resource: string, id: string) {
        super(`${resource} with id ${id} not found`, 'NOT_FOUND')
        this.name = 'NotFoundError'
    }
}

export class ValidationError extends DomainError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR')
        this.name = 'ValidationError'
    }
}

export class BusinessRuleError extends DomainError {
    constructor (message: string) {
        super(message, 'BUSINESS_RULE_ERROR')
        this.name = 'BusinessRuleError'
    }
}