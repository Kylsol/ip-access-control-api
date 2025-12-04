const request = require('supertest');
const { app, sequelize } = require('../app');
const { User, Service, IpRecord } = require('../database/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({
    name: 'Test User',
    email: 'test@example.com',
    role: 'client'
  });
});

afterAll(async () => {
  await sequelize.close();
});

test('GET /users returns list of users', async () => {
  const res = await request(app).get('/users');

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test('POST /users validates required fields', async () => {
  const res = await request(app).post('/users').send({ name: '' });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeDefined();
});
