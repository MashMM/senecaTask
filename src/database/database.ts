import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

export async function getDatabase() {

  dotenv.config();
  const dbUrl = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error('Database URL is not defined in environment variables');
  }

  const db = await open({
    filename: dbUrl,
    driver: sqlite3.Database,
  });

  return db;
}