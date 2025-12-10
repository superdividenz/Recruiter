import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

async function main() {
  // Hash passwords
  const hashedAdminPassword = await bcrypt.hash('password', 12)
  const hashedClientPassword = await bcrypt.hash('password', 12)
  const hashedSeekerPassword = await bcrypt.hash('password', 12)
  const hashedEmployer1Password = await bcrypt.hash('password', 12)
  const hashedEmployer2Password = await bcrypt.hash('password', 12)
  const hashedSeeker1Password = await bcrypt.hash('password', 12)
  const hashedSeeker2Password = await bcrypt.hash('password', 12)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedAdminPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  // Create employer users
  const employer1 = await prisma.user.upsert({
    where: { email: 'employer1@example.com' },
    update: {},
    create: {
      email: 'employer1@example.com',
      password: hashedEmployer1Password,
      name: 'John Smith',
      role: 'client',
    },
  })

  const employer2 = await prisma.user.upsert({
    where: { email: 'employer2@example.com' },
    update: {},
    create: {
      email: 'employer2@example.com',
      password: hashedEmployer2Password,
      name: 'Sarah Johnson',
      role: 'client',
    },
  })

  // Create job seeker users
  const seeker1 = await prisma.user.upsert({
    where: { email: 'seeker1@example.com' },
    update: {},
    create: {
      email: 'seeker1@example.com',
      password: hashedSeeker1Password,
      name: 'Mike Davis',
      role: 'seeker',
    },
  })

  const seeker2 = await prisma.user.upsert({
    where: { email: 'seeker2@example.com' },
    update: {},
    create: {
      email: 'seeker2@example.com',
      password: hashedSeeker2Password,
      name: 'Emily Chen',
      role: 'seeker',
    },
  })

  // Create sample contracts
  const contract1 = await prisma.contract.create({
    data: {
      title: 'Software Developer Employment Contract',
      content: 'This employment contract is between TechCorp Inc. and John Smith for the position of Senior Software Developer. Terms include: salary $120,000/year, benefits package, 2 weeks vacation, health insurance, and standard company policies.',
      status: 'signed',
      sentAt: new Date('2024-12-01'),
      signedAt: new Date('2024-12-05'),
      createdById: employer1.id,
      signedById: seeker1.id,
    },
  })

  const contract2 = await prisma.contract.create({
    data: {
      title: 'Marketing Manager Position',
      content: 'Employment agreement for Marketing Manager position at Global Marketing Solutions. Compensation: $85,000 base salary plus performance bonuses. Benefits include health insurance, dental, 401k matching, and flexible work arrangements.',
      status: 'sent',
      sentAt: new Date('2024-12-08'),
      createdById: employer2.id,
      signedById: seeker2.id,
    },
  })

  const contract3 = await prisma.contract.create({
    data: {
      title: 'Data Analyst Contract',
      content: 'Contract for Data Analyst position at DataTech Solutions. This is a 6-month contract with possibility of extension. Rate: $65/hour. Responsibilities include data analysis, reporting, and dashboard creation using SQL, Python, and Tableau.',
      status: 'draft',
      createdById: employer1.id,
    },
  })

  const contract4 = await prisma.contract.create({
    data: {
      title: 'UX Designer Employment Agreement',
      content: 'Full-time UX Designer position at Creative Design Studio. Salary: $90,000/year. Benefits package includes health insurance, creative tools stipend, conference attendance budget, and flexible hours.',
      status: 'signed',
      sentAt: new Date('2024-11-20'),
      signedAt: new Date('2024-11-25'),
      createdById: employer2.id,
      signedById: seeker1.id,
    },
  })

  // Create sample signatures
  await prisma.signature.create({
    data: {
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', // placeholder signature
      signedAt: new Date('2024-12-05'),
      contractId: contract1.id,
    },
  })

  await prisma.signature.create({
    data: {
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', // placeholder signature
      signedAt: new Date('2024-11-25'),
      contractId: contract4.id,
    },
  })

  console.log('Database seeded successfully!')
  console.log('Users created:', {
    admin: admin.email,
    employers: [employer1.email, employer2.email],
    seekers: [seeker1.email, seeker2.email]
  })
  console.log('Contracts created:', {
    total: 4,
    signed: 2,
    sent: 1,
    draft: 1
  })
  console.log('Signatures created: 2')
  console.log('\nTest Credentials:')
  console.log('Admin: admin@example.com / password')
  console.log('Employer 1: employer1@example.com / password')
  console.log('Employer 2: employer2@example.com / password')
  console.log('Seeker 1: seeker1@example.com / password')
  console.log('Seeker 2: seeker2@example.com / password')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })