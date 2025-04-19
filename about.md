### TastyGo Food Delivery Platform

## Project Overview

TastyGo is a comprehensive food delivery platform built with modern web technologies. The application connects customers with restaurants, enabling seamless food ordering, preparation, and delivery tracking. The platform serves multiple user roles including customers, restaurant staff, delivery drivers, and administrators.

## Technologies Used

### Core Technologies

- **Next.js 15** with **App Router**: For server-side rendering, routing, and API routes
- **React 19**: For building the user interface with functional components and hooks
- **TypeScript**: For type-safe code and improved developer experience
- **Tailwind CSS**: For utility-first styling and responsive design

### Database & ORM

The application uses **Prisma** as the ORM (Object-Relational Mapping) tool to interact with a **PostgreSQL** database. This ensures efficient data modeling, type-safe queries, and seamless database migrations, providing a robust foundation for managing chefs' activities, including category and product management.

### UI Components & Design

- **shadcn/ui**: For accessible, customizable UI components
- **Lucide React**: For consistent, high-quality icons

### Form Handling & Validation

- **React Hook Form**: For efficient form state management
- **Zod**: For schema validation and type inference

### State Management

- **React Context API & Zustand**: For global state management (auth, cart, etc.)
- **Server Actions**: For server-side data mutations

### Authentication & Authorization

- Implemented a custom authentication system using the NextAuth library, enabling secure and flexible authentication.

- Protected routes that dynamically enforce access restrictions based on user roles, ensuring only authorized users can access specific parts of the application.

- Role-based access control to ensure appropriate access levels for different users.

## Features

### Customer Features

- **User Authentication**: Sign up, sign in, and profile management
- **Menu Browsing**: Browse restaurants and food items by categories
- **Product Details**: View detailed information about food items
- **Shopping Cart**: Add items, adjust quantities, and apply promo codes
- **Checkout Process**: Place orders with delivery information
- **Order Tracking**: Real-time updates on order status
- **Order History**: View past orders and reorder favorites

### Admin Features

- **Dashboard**: Overview of sales, orders, and user statistics
- **Order Management**: View, update, and manage all orders
- **Customer Management**: View and manage customer accounts
- **User Management**: Assign roles and permissions

### Chef Features

- **Kitchen Dashboard**: View incoming and active orders.
- **Preparation Tracking**: Update order status through various preparation stages.
- **Category Management**:
  - Create new product categories.
  - Edit existing categories.
  - View all available categories.
  - Delete categories when necessary.
- **Product Management**:
  - Add new products under relevant categories.
  - Modify details of existing products.
  - View the full list of products within each category.
  - Remove products that are no longer needed.

### Driver Features

- **Delivery Dashboard**: View assigned deliveries and routes
- **Order Details**: Access customer information and order contents
- **Delivery Status Updates**: Mark orders as picked up or delivered

### General Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Support for user preference
- **Search Functionality**: Find products, orders, and customers
- **Filtering & Sorting**: Organize data based on various criteria
- **Interactive UI**: Smooth transitions and intuitive interactions

## Architecture

The application follows a modern architecture with:

- **Server Components**: For improved performance and SEO
- **Client Components**: For interactive UI elements
- **API Routes**: For secure data operations
- **Database Integration**: Ready for connection to SQL or NoSQL databases
- **Authentication Middleware**: For protecting routes and resources
- **Responsive Layouts**: Adapting to different screen sizes
- **Component Modularity**: Reusable components across the application

---

TastyGo represents a comprehensive solution for food delivery operations, providing a seamless experience for all stakeholders in the food delivery ecosystem. The application's modular architecture allows for easy scaling and feature additions as business needs evolve.
