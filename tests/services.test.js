const request = require('supertest');
const { app, sequelize } = require('../app');
const { User, Service, IpRecord } = require('../database/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('POST /services creates a service', async () => {
  const res = await request(app)
    .post('/services')
    .send({ name: 'InternalDashboard', description: 'Main dashboard' });

  expect(res.statusCode).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe('InternalDashboard');
});

test('POST /services returns 400 when name missing', async () => {
  const res = await request(app)
    .post('/services')
    .send({ description: 'No name here' });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeDefined();
});
