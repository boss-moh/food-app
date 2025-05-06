### TastyGo Food Delivery Platform

## Project Overview

TastyGo is a comprehensive food delivery platform built with modern web technologies. The application connects customers with restaurants, enabling seamless food ordering, preparation, and delivery tracking. The platform serves multiple user roles including customers, restaurant staff, delivery drivers, and administrators.

[Read me more about the project](./about.md)

[Demo](https://food-app-mu-opal.vercel.app/)

## Technologies Used

### Core Technologies

- **Next.js 15** with **App Router**: For server-side rendering, routing, and API routes
- **React 19**: For building the user interface with functional components and hooks
- **TypeScript**: For type-safe code and improved developer experience
- **Tailwind CSS**: For utility-first styling and responsive design
- **Prisma-ORM**: a to interact with a **PostgreSQL** database

## Folder Structure

The project is organized into the following main directories:

- **`/actions`**: Contains server action functions and other server-side logic.
- **`/app`**: Contains all the Next.js pages, including API routes and frontend pages.
- **`/auth`**: Configuration and utilities for NextAuth library.
- **`/components`**: Reusable React components used across the application.
- **`/constants`**: Contains constant variables like schemas, types, URL paths, etc., for the application.
- **`/styles`**: Contains global and component-specific styles, primarily using Tailwind CSS.
- **`/prisma`**: Includes the Prisma schema and migration files for database management.
- **`/public`**: Static assets such as images, icons, and fonts.
- **`/utils`**: Utility functions and helpers for common operations.
- **`/hooks`**: Custom React hooks for managing state and side effects.
- **`/middleware`**: Middleware for handling authentication and other server-side logic.
- **`/store`**: Contains the store for Context API and Zustand.
- **`/data`**: Contains functions for data fetching.

Each folder is structured to ensure scalability and maintainability of the codebase.

## Important Note

For fetching data, we use two approaches:

1. When fetching data on the server, use functions from the `/data` folder.
2. When fetching data on the client, use server actions.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
