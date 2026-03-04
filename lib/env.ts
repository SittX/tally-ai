import { config } from "dotenv";
import { resolve } from "path";


const nodeEnv = process.env.NODE_ENV || "development";
const rootDir = process.cwd();

config({ path: resolve(rootDir, ".env") });

if (nodeEnv !== "test") {
    config({ path: resolve(rootDir, `.env.${nodeEnv}`) });
} else {
    config({ path: resolve(rootDir, ".env.test") });
}

config({ path: resolve(rootDir, ".env.local") });

export const env = {
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: nodeEnv,
} as const;

const requiredEnvVars = [
    "DATABASE_URL",
] as const;

for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(
            `Missing required environment variable: ${varName}. ` +
            `Please check your .env.local or .env.${nodeEnv} file.`
        );
    }
}
