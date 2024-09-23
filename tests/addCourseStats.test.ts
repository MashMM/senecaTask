import request from 'supertest';
import testApp from './testApp';

describe('POST /courses/:courseId', () => {

  it('should return 201 if all required fields are present and the correct type', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'OK' });
  });

  it('should return 404 if courseId is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/`)
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(404);
  });

  it('should return 400 if userId is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'userId required' });
  });

  it('should return 400 if sessionId is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ totalModulesStudied: 5, averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'sessionId required' });
  });

  it('should return 400 if totalModulesStudied is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'totalModulesStudied required' });
  });

  it('should return 400 if averageScore is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', totalModulesStudied: 5, timeStudied: 120000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'averageScore required' });
  });

  it('should return 400 if timeStudied is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'timeStudied required' });
  });

  it('should return 400 if averageScore is not a number', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 'not-a-number', timeStudied: 120000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'invalid averageScore' });
  });

  it('should return 400 if totalModulesStudied is not a number', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', totalModulesStudied: 'not-a-number', averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'invalid totalModulesStudied' });
  });

  it('should return 400 if timeStudied is not a number', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80, timeStudied: 'not-a-number' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'invalid timeStudied' });
  });

  it('should return 400 if timeStudied is a negative number', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .set('X-User-Id', 'user-123')
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80, timeStudied: -1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'invalid timeStudied' });
  });
});