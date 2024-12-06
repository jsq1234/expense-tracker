export enum TransactionType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

export enum PaymentMethod {
    DEBIT_CARD = 'DEBIT_CARD',
    UPI = 'UPI',
    CREDIT_CARD = 'CREDIT_CARD',
    NET_BANKING = 'NET_BANKING',
    CASH = 'CASH',
}

export enum Category{
    EXPENSE = 'EXPENSE',
    SAVINGS = 'SAVINGS',
    INCOME = 'INCOME'
}

export enum SubCategory{
    GROCERY = 'GROCERY',        
    RENT = 'RENT',
    ELECTRICITY = 'ELECTRICITY',
    TRANSPORTATION = 'TRANSPORTATION',
    ENTERTAINMENT = 'ENTERTAINMENT',
    DINING = 'DINING',
    HEALTHCARE = 'HEALTHCARE',
    EDUCATION = 'EDUCATION',
    CLOTHING = 'CLOTHING',
    TRAVEL = 'TRAVEL',
    MAINTENANCE = 'MAINTENANCE',
    PERONSAL_CARE = 'PERSONAL_CARE',
    EMERGENCY_FUND = 'EMERGENCY_FUND',
    RETIREMENT = 'RETIREMENT',
    INVESTMENTS = 'INVESTMENTS',
    SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
    DOWN_PAYMENT = 'DOWN_PAYMENT'
}

export class FinancialRecord {
    id?: number; // Optional, since it's auto-generated
    userId!: string; // UUID type in PostgreSQL
    type!: number;
    amount!: number;
    transactionType!: TransactionType;
    transactionDate?: Date; // Optional, default is CURRENT_DATE
    paymentMethod!: PaymentMethod;
    description?: string; // Optional
    createdAt?: Date; // Optional, default is CURRENT_TIMESTAMP

    constructor(init?: Partial<FinancialRecord>) {
        Object.assign(this, init);
    }
}
