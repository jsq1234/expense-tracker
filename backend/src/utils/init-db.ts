import sql from "@/config/db.config";
import { createUUIDExtension } from "./sql.utils";

export async function initDatabase(){
    await createUUIDExtension();
    await createUserTable();
    await createUserProvidersTable();
    await createIndexes();
}

async function createUserTable(){
    await sql`
        CREATE TABLE IF NOT EXISTS users(
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            username VARCHAR(255) UNIQUE,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
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

async function createIndexes(){
    
    await sql`CREATE INDEX idx_users_email ON users(email)`;
    await sql`CREATE INDEX idx_user_providers_user_id ON user_providers(user_id)`;
    await sql`CREATE INDEX idx_user_providers_provider_user_id ON user_providers(provider, provider_user_id)`;
    
    console.log("created indexes successfully!");
}