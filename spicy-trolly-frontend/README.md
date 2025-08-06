# Spicy Trolly Frontend

A modern React frontend application for Spicy Trolly restaurant management system, built with Vite, TypeScript, and Material UI.

## Features

### Public Website
- **Landing Page**: Beautiful homepage showcasing the restaurant's offerings
- **Menu Display**: Complete menu with categories (Biriyani, Appetizers, Traditional, Beverages)
- **Event Order Booking**: Comprehensive order form for weddings, receptions, and events
- **Contact Information**: Business details and contact information
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Admin Panel
- **Dashboard**: Overview with key metrics, charts, and recent activity
- **Product Management**: CRUD operations for menu items with categories
- **Raw Products & Inventory**: Manage raw materials with stock tracking and low-stock alerts
- **Order Management**: View, update, and manage customer orders with status tracking
- **Reports & Analytics**: 
  - Sales trends with line charts
  - Category distribution with pie charts
  - Revenue analysis with bar charts
  - Profit & loss calculations
  - Top-selling items analysis

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material UI (MUI) v5
- **Routing**: React Router DOM
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Styling**: Material UI's emotion-based styling system

## Menu Items

1. **Chicken Thokku Biriyani** - ₹250
2. **Chilli Biriyani** - ₹220
3. **Empty Biriyani** - ₹180
4. **Chicken 65** - ₹200
5. **Idiyappam Thokku** - ₹150
6. **Mojito Juices (5 Flavours)** - ₹80

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── common/          # Common UI components
│   └── layout/          # Layout components (Header, Footer, Sidebar)
├── pages/               # Page components
│   ├── public/          # Public pages (Home, OrderForm)
│   └── admin/           # Admin pages (Dashboard, Products, etc.)
├── services/            # API service functions
├── types/               # TypeScript type definitions
├── theme/               # Material UI theme configuration
└── utils/               # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spicy-trolly-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Spicy Trolly
VITE_APP_VERSION=1.0.0
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

The frontend is designed to work with a separate Node.js backend service. The API endpoints include:

- **Authentication**: `/api/auth/login`, `/api/auth/logout`
- **Menu Items**: `/api/menu` (CRUD operations)
- **Orders**: `/api/orders` (CRUD operations)
- **Raw Products**: `/api/raw-products` (CRUD operations)
- **Reports**: `/api/reports/*` (various report endpoints)

## Admin Credentials (Demo)

For testing purposes, use these demo credentials:
- **Email**: admin@spicytrolly.com
- **Password**: admin123

## Features in Detail

### Order Management
- Real-time order status updates
- Email notifications to admins when new orders are placed
- Order filtering and search capabilities
- Detailed order views with customer and event information

### Inventory Management
- Raw product stock tracking
- Low stock alerts and warnings
- Cost calculation for profit/loss analysis
- Supplier information management

### Analytics & Reports
- Daily, weekly, and monthly sales reports
- Category-wise revenue analysis
- Top-selling items tracking
- Profit margin calculations
- Visual charts and graphs for better insights

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interface
- Modern Material Design principles

## Deployment

The application can be deployed to any static hosting service:

1. **Vercel**: Connect your repository and deploy automatically
2. **Netlify**: Drag and drop the `dist` folder after building
3. **AWS S3 + CloudFront**: Upload build files to S3 bucket
4. **GitHub Pages**: Use GitHub Actions for automated deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact:
- Email: support@spicytrolly.com
- Phone: +91 XXXXX XXXXX

---

Built with ❤️ for Spicy Trolly Restaurant
