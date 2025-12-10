# Recruiter - Professional Recruitment Platform

A modern web application for connecting employers with top talent, inspired by Search Solution Group. Built with Next.js 16, NextAuth.js, and Prisma for seamless recruitment management.

## 🚀 Features

- **Professional Landing Page**: Inspired by Search Solution Group design
- **User Authentication**: Secure sign-in/sign-out with role-based access (Admin, Client)
- **Employer Services**: Executive Search, Direct Hire, Recruitment Process Outsourcing
- **Industry Expertise**: Specialized recruitment in HR, IT, Finance, Engineering, and more
- **Job Seeker Portal**: Resume upload, profile management, job applications
- **Contract Management**: Create, send, and digitally sign employment contracts
- **Digital Signatures**: Integrated signature canvas for legal document signing
- **PDF Generation**: Generate professional PDFs from contracts and offers
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Live application and contract status tracking

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Signature Canvas** - Digital signature component

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js v4** - Authentication library
- **Prisma ORM** - Database toolkit
- **SQLite** - Database (development)

### Additional Tools
- **Puppeteer** - PDF generation and processing
- **PDF-lib** - PDF manipulation
- **PDF-parse** - Resume text extraction
- **ESLint** - Code linting
- **Prisma Studio** - Database management UI

## 📋 Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- **Git** for version control

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/superdividenz/Recruiter.git
   cd Recruiter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push database schema
   npx prisma db push

   # (Optional) Seed with sample data
   npm run db:seed
   ```

## 🚀 Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧹 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Seed database with sample data
npm run db:seed
```

## 📖 Usage Guide

### User Roles & Authentication

The app supports two main user roles:

- **Employers/Clients**: Can post jobs, manage applications, create contracts
- **Job Seekers**: Can upload resumes, apply to jobs, sign contracts

**Test Credentials:**
- **Admin**: `admin@example.com` / `password`
- **Client**: `client@example.com` / `password` (create via "Create Test Users" button first)

### Employer Workflow

1. **Sign In** and access the employer dashboard
2. **Post a Job**: Go to `/contracts/new` to create job postings
3. **Manage Applications**: View applications at `/contracts`
4. **Send Contracts**: Send offers to candidates
5. **Digital Signing**: Candidates can sign contracts at `/sign/[id]`

### Job Seeker Workflow

1. **Create Profile**: Upload resume and complete profile
2. **Browse Jobs**: View available positions
3. **Apply**: Submit applications to jobs
4. **Track Status**: Monitor application progress
5. **Sign Contracts**: Digitally sign offer letters

### Services Offered

- **Executive Search**: Headhunt top-tier leaders
- **Direct Hire**: Access mid-level professionals
- **Recruitment Process Outsourcing**: Full-cycle hiring support

### Industry Expertise

- Human Resources
- Accounting & Finance
- Sales & Business Development
- Operations & Manufacturing
- Information Technology
- Supply Chain & Logistics
- Marketing
- Engineering

## 🔌 API Endpoints

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handlers
- `POST /api/users` - Create new user

### Contracts/Jobs
- `GET /api/contracts` - Get all contracts/jobs
- `POST /api/contracts` - Create new contract/job
- `GET /api/contracts/[id]` - Get contract/job by ID
- `POST /api/contracts/[id]/send` - Send contract to candidate
- `POST /api/contracts/[id]/sign` - Sign contract

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String?
  name      String?
  role      String   @default("client") // admin, client, seeker
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Contract Model
```prisma
model Contract {
  id          String   @id @default(cuid())
  title       String
  content     String
  createdById String
  status      String   @default("draft") // draft, sent, signed
  industry    String?
  serviceType String?  // executive-search, direct-hire, rpo
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  sentAt      DateTime?
  signedAt    DateTime?
}
```

## 🏗️ Project Structure

```
Recruiter/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication routes
│   │   ├── contracts/     # Contract/Job management routes
│   │   └── users/         # User management routes
│   ├── auth/              # Authentication pages
│   ├── contracts/         # Job/Contract pages
│   ├── sign/              # Digital signing pages
│   ├── globals.css        # Global styles
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── header.tsx        # Navigation header
│   └── providers.tsx     # Context providers
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── temp-storage.ts   # Temporary storage
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema definition
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## 🔍 Development Notes

### Current Implementation Status

✅ **Completed Features:**
- Professional landing page with SSG-inspired design
- User authentication with role-based access
- Contract/job CRUD operations
- Digital signature functionality
- PDF generation capabilities
- Responsive UI with Tailwind CSS

⚠️ **Planned Enhancements:**
- Resume upload and parsing for job seekers
- Industry-specific job posting forms
- Employer consultation workflow
- Advanced search and filtering
- Email notifications
- Admin dashboard for recruiters

### Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/resume-upload

   # Make changes and test
   npm run dev

   # Commit changes
   git add .
   git commit -m "Add resume upload functionality"
   ```

2. **Database Changes**
   ```bash
   # Update schema.prisma
   npx prisma generate
   npx prisma db push
   ```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
- **Railway**: SQLite support
- **Render**: Full-stack deployment
- **Heroku**: Traditional hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Review the documentation
- Check code comments

---

**Built with ❤️ for seamless recruitment experiences**
   cd Recruiter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push database schema
   npx prisma db push

   # (Optional) Seed the database with sample data
   npm run db:seed
   ```

## 🚀 Running the Application

1. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧹 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Seed database with sample data
npm run db:seed
```

## 📖 Usage Guide

### User Roles & Authentication

The app supports three main user roles:

- **Employers/Clients**: Can post jobs, manage applications, create contracts
- **Job Seekers**: Can upload resumes, apply to jobs, sign contracts
- **Admins**: Full access to manage users, jobs, and system settings

**Test Credentials:**
- **Admin**: `admin@example.com` / `password`
- **Employer**: `client@example.com` / `password`
- **Job Seeker**: `seeker@example.com` / `password`

### User Onboarding & Role Selection

1. **Landing Page**: Professional homepage with role selection buttons
2. **Role Selection**: Choose "I'm an Employer" or "I'm a Job Seeker"
3. **Authentication**: Sign up or sign in with email/password

### Employer Workflow

1. **Sign In/Sign Up**: Access employer account
2. **Initial Consultation**: Fill out detailed hiring requirements at `/consultation`
3. **Post a Job**: Use industry-specific forms at `/contracts/new`
4. **Manage Applications**: View and track applications at `/contracts`
5. **Send Offers**: Send contracts to selected candidates
6. **Digital Signing**: Candidates sign contracts at `/sign/[id]`

### Job Seeker Workflow

1. **Sign In/Sign Up**: Create job seeker account
2. **Profile Creation**: Upload resume and complete profile at `/profile`
3. **Browse Jobs**: View available positions by industry and service type
4. **Apply**: Submit applications to relevant positions
5. **Track Applications**: Monitor application status and updates
6. **Sign Contracts**: Digitally sign offer letters and contracts

### Services Offered

- **Executive Search**: Headhunting top-tier leaders and executives
- **Direct Hire**: Recruiting mid-level and entry-level professionals
- **Recruitment Process Outsourcing**: Full-cycle hiring and recruitment support

### Industry Expertise

- Human Resources
- Accounting & Finance
- Sales & Business Development
- Operations & Manufacturing
- Information Technology
- Supply Chain & Logistics
- Marketing
- Engineering

### Database Management

- **View Database**: Use DB Browser for SQLite
  ```bash
  open -a "DB Browser for SQLite" dev.db
  ```
- **Reset Database**: Delete `dev.db` and run `npx prisma db push`

## 🔌 API Endpoints

### Authentication

- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handlers
- `POST /api/users` - Create new user

### Contracts/Jobs

- `GET /api/contracts` - Get all contracts/jobs
- `POST /api/contracts` - Create new contract/job
- `GET /api/contracts/[id]` - Get contract/job by ID
- `POST /api/contracts/[id]/send` - Send contract to candidate
- `POST /api/contracts/[id]/sign` - Sign contract

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String?
  name      String?
  role      String   @default("client") // admin, client, seeker
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Contract Model

```prisma
model Contract {
  id          String   @id @default(cuid())
  title       String
  content     String
  createdById String
  status      String   @default("draft") // draft, sent, signed
  industry    String?
  serviceType String?  // executive-search, direct-hire, rpo
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  sentAt      DateTime?
  signedAt    DateTime?
}
```

## 🏗️ Project Structure

```
Recruiter/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication routes
│   │   ├── contracts/     # Contract/Job management routes
│   │   └── users/         # User management routes
│   ├── auth/              # Authentication pages
│   ├── contracts/         # Job/Contract pages
│   ├── sign/              # Digital signing pages
│   ├── globals.css        # Global styles
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── header.tsx        # Navigation header
│   └── providers.tsx     # Context providers
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── temp-storage.ts   # Temporary storage
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema definition
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## 🔍 Development Notes

### Current Implementation Status

✅ **Completed Features:**

- Professional landing page inspired by Search Solution Group
- User authentication with role-based access
- Contract/job CRUD operations
- Digital signature functionality
- PDF generation capabilities
- Responsive UI with Tailwind CSS

⚠️ **Planned Enhancements:**

- Resume upload and parsing for job seekers
- Industry-specific job posting forms
- Employer consultation workflow
- Advanced search and filtering for jobs
- Email notifications for applications
- Admin dashboard for recruiters
- Application tracking system

### Development Workflow

1. **Feature Development**

   ```bash
   # Create feature branch
   git checkout -b feature/resume-upload

   # Make changes and test
   npm run dev

   # Commit changes
   git add .
   git commit -m "Add resume upload functionality"
   ```

2. **Database Changes**

   ```bash
   # Update schema.prisma
   # Then regenerate client
   npx prisma generate

   # Push changes to database
   npx prisma db push
   ```

### Testing

- **Manual Testing**: Use the application UI to test features
- **API Testing**: Use tools like Postman or curl for API endpoints
- **Database Testing**: Use DB Browser for SQLite to inspect data

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Other Platforms

- **Railway**: Supports SQLite databases
- **Render**: Good for full-stack applications
- **Heroku**: Traditional hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues:

- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ for seamless recruitment experiences**
