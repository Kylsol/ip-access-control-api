const { sequelize, User, Service, IpRecord } = require('./models');

async function seed() {
  try {
    console.log('Resetting database...');
    await sequelize.sync({ force: true });

    console.log('Creating sample users...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    });

    const secEng = await User.create({
      name: 'Security Engineer',
      email: 'seceng@example.com',
      role: 'sec'
    });

    const client = await User.create({
      name: 'Client App',
      email: 'client@example.com',
      role: 'client'
    });

    console.log('Creating sample services...');
    const dashboard = await Service.create({
      name: 'Internal Dashboard',
      description: 'Main internal dashboard for staff.'
    });

    const reportsTool = await Service.create({
      name: 'Reports Tool',
      description: 'Internal reporting analytics.'
    });

    console.log('Creating sample IP records...');
    await IpRecord.create({
      ipAddress: '203.0.113.10',
      label: 'Office Network',
      userId: secEng.id,
      serviceId: dashboard.id
    });

    await IpRecord.create({
      ipAddress: '198.51.100.5',
      label: 'VPN Exit Node',
      userId: admin.id,
      serviceId: reportsTool.id
    });

    await IpRecord.create({
      ipAddress: '192.168.1.25',
      label: 'Home Dev Machine',
      userId: client.id,
      serviceId: dashboard.id
    });

    console.log('Seeding complete.');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

seed();
