import sql from "@/config/db.config";
import { createUUIDExtension } from "./sql.utils";

export async function initDatabase(){
    await createUUIDExtension();
    //await createEnums();
    await createCategory();
    await createSubCategories();
    await createUserTable();
    await createUserProvidersTable();
    await createFinancialRecordsTable();
    await createIndexes();
}

async function createUserTable(){
    await sql`
        CREATE TABLE IF NOT EXISTS users(
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            username VARCHAR(255) UNIQUE NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_verified bit(1) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `;
    console.log("created user table successfully!");
}

async function createUserProvidersTable(){
    await sql`
        CREATE TABLE IF NOT EXISTS user_providers(
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            provider VARCHAR(20) NOT NULL,
            provider_user_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (provider, provider_user_id)
        )
    `
    console.log("created user_providers table successfully!");
}

async function createFinancialRecordsTable(){
    await sql`
        CREATE TABLE IF NOT EXISTS financial_records(
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            type INT NOT NULL REFERENCES subcategories(id) ON DELETE CASCADE,
            amount NUMERIC(10,2) NOT NULL,
            transaction_type transaction_type NOT NULL,
            transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
            payment_method payment_method NOT NULL,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `
    console.log("created financial_records table successfully!");
}

async function createEnums(){
    const e1 = sql`CREATE TYPE IF NOT EXISTS transaction_type AS ENUM ('CREDIT', 'DEBIT')`;
    const e2 = sql`CREATE TYPE IF NOT EXISTS payment_method AS ENUM('DEBIT_CARD', 'UPI', 'CREDIT_CARD', 'NET_BANKING')`;

    await Promise.all([e1,e2]);
}

async function createCategory(){
    await sql`CREATE TABLE IF NOT EXISTS categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) UNIQUE NOT NULL
    )`
    console.log("Created categories table.");
}

async function createSubCategories(){
    await sql`CREATE TABLE IF NOT EXISTS subcategories(
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        name VARCHAR(150) NOT NULL UNIQUE
    )
    `
    console.log("Created subcategories table.");
}
async function createIndexes(){
    
    const i1 = sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    const i2 = sql`CREATE INDEX IF NOT EXISTS idx_user_providers_user_id ON user_providers(user_id)`;
    const i3 = sql`CREATE INDEX IF NOT EXISTS idx_user_providers_provider_user_id ON user_providers(provider, provider_user_id)`;
    const i4 = sql`CREATE INDEX IF NOT EXISTS idx_financial_records_user_id ON financial_records(user_id)`;
    const i5 = sql`CREATE INDEX IF NOT EXISTS idx_financial_records_type ON financial_records(type)`;
    
    await Promise.all([i1, i2, i3, i4, i5]);
    console.log("created indexes successfully!");
}