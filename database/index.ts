import { env } from '@/lib/env';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({
    connection: {
        connectionString: env.DATABASE_URL,
        ssl: true
    }
});

export default db;
