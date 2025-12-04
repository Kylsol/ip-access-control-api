const request = require('supertest');
const { app, sequelize } = require('../app');
const { User, Service, IpRecord } = require('../database/models');

let testUser;
let testService;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  testUser = await User.create({
    name: 'IP Owner',
    email: 'ipowner@example.com',
    role: 'sec'
  });

  testService = await Service.create({
    name: 'ReportingTool',
    description: 'Reports'
  });
});

afterAll(async () => {
  await sequelize.close();
});

test('POST /ips creates a new IP record', async () => {
  const res = await request(app)
    .post('/ips')
    .send({
      ipAddress: '203.0.113.10',
      label: 'Office IP',
      userId: testUser.id,
      serviceId: testService.id
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.ipAddress).toBe('203.0.113.10');
});

test('POST /ips returns 400 when required fields missing', async () => {
  const res = await request(app)
    .post('/ips')
    .send({
      label: 'Missing IP'
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeDefined();
});
