# Theoria — Product Design Studio

Modern portfolio website built with Next.js 16, featuring cinematic animations, case studies, and an admin panel.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** SQLite (local) / PostgreSQL (production, Vercel Postgres) with Prisma ORM
- **Storage:** Vercel Blob for images
- **Auth:** NextAuth.js with Google OAuth
- **Styling:** Tailwind CSS
- **Animations:** GSAP with ScrollTrigger

## Local Development

1. **Clone and install:**
   ```bash
   git clone <repo-url>
   npm install
   ```

2. **Setup environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run dev server:**
   ```bash
   npm run dev
   ```

## Deployment to Vercel

### 1. Update Prisma Schema for Production
Before deploying, update `prisma/schema.prisma` to use PostgreSQL:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 2. Create Vercel Project
```bash
vercel
```

### 3. Add Vercel Postgres
1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Environment variables `DATABASE_URL` and `DIRECT_URL` are auto-added

### 4. Enable Vercel Blob
1. In **Storage** tab
2. Click **Create Store** → **Blob**
3. `BLOB_READ_WRITE_TOKEN` is auto-added

### 5. Set Additional Environment Variables
Add these in Vercel project settings → Environment Variables:

```
AUTH_SECRET=<generate with: openssl rand -base64 32>
AUTH_URL=https://your-domain.vercel.app
AUTH_GOOGLE_ID=<your-google-oauth-client-id>
AUTH_GOOGLE_SECRET=<your-google-oauth-secret>
BYPASS_AUTH=false
```

### 6. Deploy and Run Migrations
After first deployment:
```bash
vercel env pull .env.production
npx prisma db push
```

**Note:** Switch back to `provider = "sqlite"` in `schema.prisma` for local development.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel routes
│   └── api/               # API routes
├── components/
│   ├── admin/             # Admin UI components
│   ├── case-studies/      # Custom case study components
│   └── home/              # Landing page components
├── lib/                   # Utilities
└── prisma/                # Database schema
```

## Features

- 🎬 Cinematic homepage with video background
- 🎨 Custom case study pages with GSAP animations
- 🔐 Protected admin panel
- 📱 Fully responsive design
- ⚡ Optimized with Turbopack
- 🖼️ Image management with Vercel Blob
