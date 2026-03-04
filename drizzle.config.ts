import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from './lib/env';

export default defineConfig({
    out: './database/migrations',
    schema: './database/schema/*',
    dialect: 'postgresql',
    schemaFilter: "public",
    dbCredentials: {
        url: env.DATABASE_URL!,
    },
    migrations: {
        prefix: "timestamp",
        table: "__drizzle_migrations",
        schema: "public"
    },
    strict: true,
    verbose: true,
    breakpoints: true

});
