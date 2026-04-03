# Finance Dashboard

XYZ Finance is a modern, frontend-focused finance dashboard built to evaluate UI/UX design paradigms, component-driven architecture, and efficient state management.it serves as a robust prototype for tracking transactions, analyzing spending behaviors, and managing mock user configurations.

---

## Tech Stack

- **React (Vite 8)**: Fast, modern frontend framework for seamless component rendering.
- **Tailwind CSS (v4)**: Utility-first CSS framework handling layout, responsive design, and deep theming (Dark/Light mode).
- **Zustand**: Minimalist, fast, and scalable global state management.
- **Recharts**: Composable charting library utilized for dynamic data visualization.
- **Lucide-React**: Clean, consistent, and customizable SVG iconography.

---

## Core Features

### Dashboard Overview
- **Summary Cards**: Dynamically calculated real-time snapshots of your Total Balance, Total Income, and Total Expenses.
- **Interactive Charts**: A smooth Line Chart mapping your historical `Balance Trend`, coupled with a sleek Donut Chart breaking down `Spending By Category`.

### Transaction Management
- Comprehensive, searchable, and filterable data table logging mock financial movements.
- Features include real-time text-based search queries alongside category-specific filtering.

### Role-Based UI (RBAC Simulation)
- A seamlessly integrated Role Toggler switches the application state between `Admin` and `Viewer`.
- **Admin**: Grants full access to Create, Read, Update, and Delete (CRUD) actions via a customized Transaction Modal.
- **Viewer**: Enforces a strict read-only mode, cleanly stripping administrative action buttons from the DOM.

### Insights Panel
- A dedicated analytics portal performing real-time sequential processing over the transaction array.
- Highlights "Peak Category" spending and visualizes `Expense Distribution` through responsive horizontal Bar Charts.

---

## State Management Approach

The dashboard abandons prop-drilling or bulky Context providers in favor of **Zustand**. 
Zustand was selected because it offers an extremely minimal boilerplate API while retaining high performance (isolated re-renders). It acts as the single source of truth for:
- The global `transactions` array mapping core financial data.
- The active `role` simulated by the user.
- The UI filters, `currentView` routing, and the active `theme`.
- **Persistence**: Zustand's built-in `persist` middleware synchronizes the entire application state with LocalStorage out of the box, ensuring data isn't lost on refresh.

---

## Setup Instructions

To get the application running locally:

1. **Clone and navigate to the project directory:**
   ```bash
   cd dashboard-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Spin up the development server:**
   ```bash
   npm run dev
   ```

4. Navigate to `http://localhost:5173` in your browser.

---

## Responsiveness & UX

- **Responsive Strategy**: Follows a strict Mobile-First paradigm. The application features a persistent bottom-navigation bar on mobile devices, which expands into a fully-fledged Side Navigation Bar on desktop viewports.
- **Dark Mode**: Integrated deeply with Tailwind's utility classes. Users can toggle a fully supported Dark Mode leveraging `document.documentElement`, shifting the application from crisp light layouts to a premium frosted "glassmorphism" night theme instantly.

---

## Project Structure

```text
src/
├── components/          # Reusable UI Blocks
│   ├── pages/           # View implementations (Dashboard, Insights, Settings)
│   ├── Charts.tsx       # Recharts abstraction layer
│   ├── DashboardLayout  # Root App Shell (SideNav, TopNav)
│   ├── StatCards.tsx    # Summary widgets
│   ├── TransactionList  # Filterable grid / Table
│   └── TransactionModal # Form Logic
├── store/
│   └── useStore.ts      # Global Zustand Store
├── types/
│   └── index.ts         # Global TypeScript interfaces
├── App.tsx              # Entry & Basic State-Routing
├── index.css            # Tailwind Directives & Base configurations
└── main.tsx             # React DOM injection
```
