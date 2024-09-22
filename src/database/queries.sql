CREATE TABLE CourseStats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    courseId TEXT NOT NULL,
    sessionId TEXT NOT NULL,
    totalModulesStudied INTEGER NOT NULL,
    averageScore REAL NOT NULL,
    timeStudied INTEGER NOT NULL
);