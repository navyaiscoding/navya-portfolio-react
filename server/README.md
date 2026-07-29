# Portfolio API

A small Node.js + Express + TypeScript API built to learn REST API fundamentals,
and to power the contact form on the portfolio site (`ContactForm.tsx`).

## What it does

`POST /api/contact` receives `{ name, email, message }` from the frontend,
validates it, and emails it to you. If no SMTP credentials are configured yet,
it logs the submission to the console instead — so the whole thing runs and is
testable before you set up real email delivery.

## Concepts this project covers

- **Routing** — `src/routes/` maps HTTP method + path to a handler.
- **Controllers** — `src/controllers/` holds the actual request-handling logic, kept separate from routing.
- **Middleware** — functions that run before your handler: `cors`, `express.json()`, rate limiting, validation. Each does one job and calls `next()` to pass control along.
- **Validation** — `src/schemas/` uses [Zod](https://zod.dev) to reject malformed requests with a 400 before they ever reach a controller.
- **Centralized error handling** — controllers `throw`/`next(err)` instead of handling errors inline; one `errorHandler` middleware at the bottom of `app.ts` formats every error response consistently.
- **Environment config** — `src/config/env.ts` is the only file that reads `process.env`, so the rest of the app just imports typed values.
- **Rate limiting** — `express-rate-limit` caps how often the public contact endpoint can be hit, since it's unauthenticated and has a side effect (sending mail).

## Project structure

```
server/
  src/
    index.ts              starts the HTTP server
    app.ts                builds the Express app: middleware + routes
    config/env.ts          typed environment config
    routes/                 URL path -> controller
    controllers/            request handling logic
    services/mailer.ts      sends (or logs) contact emails
    schemas/                Zod request-validation schemas
    middleware/              cors/json are built-in; validate, rateLimiter, errorHandler, notFound are custom
    utils/ApiError.ts        typed error with an HTTP status
    types/                   shared TypeScript types
```

## Running it

```
cd server
npm install
cp .env.example .env
npm run dev
```

Starts on `http://localhost:4000` by default, with hot reload via `tsx watch`.

### Try it

```
curl http://localhost:4000/api/health

curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello!"}'
```

With no SMTP configured, that second call logs the submission to your terminal
and returns `{"ok":true,"message":"Message received."}`. Try omitting a field,
or sending an invalid email, to see the 400 validation response. Send 6
requests in a row to see the rate limiter kick in.

### Sending real email

Set these in `server/.env` (a free [Ethereal](https://ethereal.email) or
[Mailtrap](https://mailtrap.io) inbox works well for testing without spamming
a real address, or use a Gmail account with an
[app password](https://myaccount.google.com/apppasswords)):

```
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
CONTACT_TO_EMAIL=navyaanumula@gmail.com
```

## Connecting the frontend

The React contact form (`src/components/ContactForm/ContactForm.tsx`) already
POSTs to `contactFormEndpoint`, exported from `src/data.ts`. That's now wired
to read `VITE_CONTACT_API_URL` from the frontend's environment.

For local development, add to the **project root** `.env.local`:

```
VITE_CONTACT_API_URL=http://localhost:4000/api/contact
```

Run `npm run dev` in the server folder and `npm run dev` in the project root
at the same time, and the contact form will hit your local API.

## Deploying

This API is a standard Express app and can be deployed anywhere Node runs
(Render, Railway, Fly.io, a Vercel serverless function, etc.). Once deployed,
set `VITE_CONTACT_API_URL` in your frontend's production environment
(Vercel project settings) to the deployed API's `/api/contact` URL, and set
`CORS_ORIGIN` on the server to your production frontend URL.

## Next steps to keep learning

- Add a second resource (e.g. a `/api/projects` endpoint reading from a JSON file or database) to practice GET/POST/PUT/DELETE on something with state.
- Swap the console-log fallback for a real database (SQLite via `better-sqlite3` is a good first one) to persist contact submissions.
- Add automated tests with `supertest` + `vitest` for the routes.
- Add request logging middleware (`morgan`) to see every request/response in the terminal.
