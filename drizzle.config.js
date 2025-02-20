import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    schema: "./utils/schema.js",
    dbCredentials: {
        url: 'postgresql://neondb_owner:BUQFa5YS6ezA@ep-lively-math-a52fq9uh.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
      },
  });