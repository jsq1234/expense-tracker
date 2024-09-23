import sql from "@/config/db.config";

export async function createUUIDExtension() {
  await sql`create extension if not exists "uuid-ossp"`;
}

export async function createPgStatStatementExtension(){
  await sql`create extension if not exists "pg_stat_statements"`
}

export async function createProviderEnum() {
  await sql`
        do $$
        begin
            if not exists ( select 1 from pg_type where typname = 'provider_enum' )
            then create type provider_enum as enum ('email', 'google', 'github');
            end if;
        end $$;
    `;
}

export async function createRoleEnum() {
  await sql`
        do $$
        begin
            if not exists ( select 1 from pg_type where typname = 'role_enum' )
            then create type role_enum as enum ('user', 'admin');
            end if;
        end $$;
    `;
}
