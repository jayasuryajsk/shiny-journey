import { config } from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

config({ path: '.env.local' });

async function resetDatabase() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined in .env.local');
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });

  console.log('⏳ Dropping existing schema...');
  // Drop everything including the schema
  await connection`DROP SCHEMA IF EXISTS public CASCADE;`;
  await connection`CREATE SCHEMA public;`;
  await connection`GRANT ALL ON SCHEMA public TO public;`;

  const db = drizzle(connection);

  console.log('⏳ Running migrations...');
  const start = Date.now();
  await migrate(db, { migrationsFolder: './lib/db/migrations' });
  const end = Date.now();

  console.log('✅ Database reset and migrations completed in', end - start, 'ms');
  process.exit(0);
}

resetDatabase().catch((err) => {
  console.error('❌ Database reset failed:', err);
  process.exit(1);
}); 