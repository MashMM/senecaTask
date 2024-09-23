import request from 'supertest';
import testApp from './testApp';
import { getDatabase } from '../src/database/database';
import insertMockData, { mockData } from './mockData/insertMockData';
import clearCourseStats from './mockData/clearMockData';

describe('GET /courses/:courseId', () => {

  beforeAll(async () => {
    await insertMockData();
  })

  it('should return 200 if session stats are found', async () => {
    const response = await request(testApp)
      .get(`/courses/${mockData.courseId}/sessions/${mockData.sessionId[0]}`)
      .set('X-User-Id', mockData.userId);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      sessionId: mockData.sessionId[0],
      totalModulesStudied: mockData.totalModulesStudied[0],
      averageScore: mockData.averageScore[0],
      timeStudied: mockData.timeStudied[0],
    });
  });

  it('should return 404 if courseId is missing', async () => {
    const response = await request(testApp)
      .get('/courses/')
      .set('X-User-Id', 'user-123');

    expect(response.status).toBe(404);
  });

  it('should return 404 if sessionId is missing', async () => {
    const response = await request(testApp)
      .get('/courses//${courseId}/sessions/')
      .set('X-User-Id', 'user-123');

    expect(response.status).toBe(404);
  });

  it('should return 404 if userId is missing', async () => {
    const response = await request(testApp)
      .get('/courses/${courseId}/sessions/${sessionId[0]}')

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    clearCourseStats();
  });

})