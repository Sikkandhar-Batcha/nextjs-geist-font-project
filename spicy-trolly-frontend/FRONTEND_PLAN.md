# SPICY TROLLY FRONTEND PLAN

## Architecture Overview
- **Framework**: Vite + React + TypeScript + Material UI
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API calls
- **Charts**: MUI X Charts for reports visualization

## Project Structure
```
src/
├── components/           # Reusable components
│   ├── common/          # Common UI components
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── forms/           # Form components
├── pages/               # Page components
│   ├── public/          # Public pages
│   │   ├── Home.tsx     # Landing page with menu, about, contact
│   │   └── OrderForm.tsx # Order booking form
│   └── admin/           # Admin pages
│       ├── Login.tsx    # Admin login
│       ├── Dashboard.tsx # Admin dashboard
│       ├── Products.tsx # Product management
│       ├── RawProducts.tsx # Raw materials management
│       ├── Orders.tsx   # Order management
│       └── Reports.tsx  # Sales/Purchase reports with charts
├── services/            # API service functions
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── theme/               # Material UI theme configuration
```

## Features Implementation

### 1. Public Website
- **Landing Page**: Shop info, menu display, contact details
- **Menu Section**: Display all items with categories
- **Order Form**: Event order booking with email notification
- **Responsive Design**: Mobile-first approach

### 2. Admin Panel
- **Authentication**: Login system with session management
- **Dashboard**: Overview with key metrics
- **Product Management**: CRUD operations for menu items
- **Raw Materials**: Manage inventory and calculate profit/loss
- **Order Management**: View and manage customer orders
- **Reports**: Charts showing daily/weekly/monthly data

### 3. Menu Items
1. Chicken Thokku Biriyani
2. Chilli Biriyani
3. Empty Biriyani
4. Chicken 65
5. Idiyappam Thokku
6. Mojito Juices (5 Flavours)

### 4. Admin Features
- Create/Update/Delete menu items
- Categorize menu items
- Add raw products for profit/loss calculation
- Stock management and reporting
- Visualize data with pie and bar charts
- Email notifications for orders

## API Integration Points
- **Backend Base URL**: Will be configurable via environment variables
- **Authentication**: JWT token-based authentication
- **Order Submission**: POST to backend with email notification trigger
- **Product Management**: Full CRUD operations
- **Reports Data**: Fetch data for chart visualization

## Material UI Theme
- **Primary Color**: Food-themed warm colors (orange/red)
- **Typography**: Clean, readable fonts
- **Components**: Cards, Tables, Forms, Charts
- **Responsive**: Mobile-first design approach
