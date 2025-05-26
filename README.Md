# TeamPulse

TeamPulse is a lightweight internal web app designed to help companies manage team status updates and availability in real time. Built with a modern stack — Next.js + Tailwind CSS on the frontend and NestJS + Supabase on the backend — it allows Admins to create teams, invite users, and view team-wide status updates.

## Live Link

### `https://team-pulse-zeta.vercel.app`


## Tech Stack

* **Frontend**: Next.js, Tailwind CSS, Sonner (for toasts)
* **Backend**: NestJS (REST API)
* **Auth & Database**: Supabase (email/password auth, PostgreSQL)

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or later)
* Supabase project with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

---

## 📁 Project Structure

```
team-pulse/
├── apps/
│   ├── backend/           # NestJS backend
│   └── frontend/          # Next.js frontend
├── .env                 # Root .env if needed
├── README.md            # General setup
└── ...
```

---

## 🔧 Backend Setup (NestJS)

1. Navigate to the server folder:

   ```bash
   cd apps/backend
   ```

2. Create a `.env` file:

   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_anon_key
   FRONTEND_URL=http://localhost:3000
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run start:dev
   ```

Backend runs on `http://localhost:5000`

---

## 🎨 Frontend Setup (Next.js)

1. Navigate to the frontend folder:

   ```bash
   cd apps/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` (if needed for Supabase public access or API keys):

4. Start the frontend:

   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:3000`

---

## 🔐 Supabase Auth

* Auth flows are managed by Supabase email/password.
* JWTs are sent from Supabase to the backend and decoded to apply role-based access.

---

## 🧪 Features

* Admin:

  * Create teams
  * Invite users (role-based)
  * View team statuses
* Members:

  * Submit/update status
  * View own team updates

---

## 📄 License


