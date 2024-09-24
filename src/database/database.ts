import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDatabase() {

  const dbUrl = process.env.NODE_ENV === 'test'
    ? './tests/testDatabase'
    : './database';

  if (!dbUrl) {
    throw new Error('Database URL is not defined in environment variables');
  }

  const db = await open({
    filename: dbUrl,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS CourseStats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      courseId TEXT NOT NULL,
      sessionId TEXT NOT NULL,
      totalModulesStudied INTEGER NOT NULL,
      averageScore REAL NOT NULL,
      timeStudied INTEGER NOT NULL
    );
  `);

  return db;
}