# Angular Signals Ticket Dashboard

A modern **Ticket Management Dashboard** built with Angular 19, showcasing senior-level architecture, clean signals usage, and a professional PrimeNG UI with enhanced styling and user experience.

## 🎯 Project Purpose

This project demonstrates a full-featured ticket management system with:

- Complete CRUD operations for tickets
- Advanced filtering and sorting capabilities
- Real-time analytics dashboard with charts
- Professional UI built with PrimeNG components
- State management using Angular Signals (no NgRx)
- Enhanced UI/UX with modern design patterns

## 🛠️ Tech Stack & Tools

### Core Framework

- **Angular 19.2.0** - Latest Angular framework with standalone components
- **TypeScript 5.7.2** - Strict mode enabled, no `any` types
- **RxJS 7.8.0** - Reactive programming and async operations
- **Zone.js 0.15.0** - Angular change detection

### UI Libraries & Components

- **PrimeNG 20.3.0** - Professional UI component library
  - Table, Select, InputText, Textarea, Button, Tag, Card, Chart, ConfirmDialog, ProgressSpinner
- **PrimeNG Charts** - Data visualization with Chart.js integration
- **@primeng/themes 20.3.0** - PrimeNG theme system (Lara Dark Blue)
- **PrimeIcons 7.0.0** - Icon library for PrimeNG components
- **PrimeFlex 4.0.0** - Utility-first CSS framework for responsive layouts

### Data Visualization

- **Chart.js 4.5.1** - Charting library (used by PrimeNG Charts)
  - Doughnut charts for status distribution
  - Bar charts for priority analysis

### Code Quality & Formatting

- **ESLint 9.39.1** - JavaScript/TypeScript linting
  - @angular-eslint/eslint-plugin 21.0.1
  - @angular-eslint/template-parser 21.0.1
  - @typescript-eslint/eslint-plugin 8.48.0
  - @typescript-eslint/parser 8.48.0
- **Prettier 3.7.3** - Code formatter
- **eslint-config-prettier 10.1.8** - Disables ESLint rules that conflict with Prettier
- **eslint-plugin-prettier 5.5.4** - Runs Prettier as an ESLint rule

### Development Tools

- **Angular CLI 19.2.5** - Command-line interface for Angular
- **@angular-devkit/build-angular 19.2.5** - Build system
- **Karma 6.4.0** - Test runner
- **Jasmine 5.6.0** - Testing framework

### State Management

- **Angular Signals** - Built-in reactive state management (no external library needed)
  - Signals for state
  - Computed signals for derived state
  - Effect for side effects

## ✨ Features

### Ticket Management

- ✅ **List View** - Paginated table with sorting and filtering
- ✅ **Create Ticket** - Form-based ticket creation with validation
- ✅ **Edit Ticket** - Update existing tickets
- ✅ **View Details** - Detailed ticket information display
- ✅ **Delete Ticket** - With enhanced confirmation dialog
- ✅ **Filtering** - By status, priority, and search text
- ✅ **Sorting** - Multiple column sorting support

### Dashboard Analytics

- 📊 **KPI Cards** - Total tickets, open tickets, critical tickets with gradient styling
- 📈 **Status Chart** - Doughnut chart showing tickets by status
- 📊 **Priority Chart** - Bar chart showing tickets by priority
- 🔄 **Real-time Updates** - Charts update automatically using computed signals

### UI/UX Enhancements

- 🎨 **Modern Dark Theme** - Custom styled with gradients and shadows
- 🎯 **Enhanced Forms** - Sectioned forms with icons and help text
- 💫 **Smooth Animations** - Transitions and hover effects throughout
- 📱 **Responsive Design** - Mobile-friendly layout using PrimeFlex
- 🎭 **Custom Styled Components** - Enhanced buttons, cards, and dialogs
- 🔍 **Improved Filters** - Better spacing and visual hierarchy
- 🎪 **Enhanced Confirmation Dialogs** - Blur backdrop, styled buttons, and better UX

## 🏗️ Architecture

### Feature-Based Structure

```
src/app/
├── core/                    # Cross-cutting concerns
│   ├── services/           # LoggerService, NotificationService
│   └── index.ts
├── domain/                 # Domain models and interfaces
│   ├── entities/          # Ticket model, DTOs, types
│   └── index.ts
├── features/              # Feature modules
│   ├── tickets/           # Tickets feature
│   │   ├── components/   # Presentational components
│   │   │   ├── ticket-list/
│   │   │   ├── ticket-form/
│   │   │   ├── ticket-filters/
│   │   │   └── ticket-details/
│   │   ├── pages/        # Smart/container components
│   │   │   ├── tickets.page.ts
│   │   │   ├── ticket-form.page.ts
│   │   │   └── ticket-details.page.ts
│   │   ├── services/     # TicketService (data layer)
│   │   └── store/        # TicketsStore (signals-based state)
│   └── dashboard/         # Dashboard feature
│       └── pages/         # Dashboard page with charts
├── shared/                # Reusable components
│   └── components/        # StatusBadge, PriorityBadge, LoadingSpinner
└── app.component.ts       # Root component with navigation
```

### State Management with Signals

The `TicketsStore` service uses Angular Signals as a single source of truth:

- **Signals**: `tickets`, `selectedTicketId`, `filter`, `loading`, `error`
- **Computed Signals**: `filteredTickets`, `statsByStatus`, `statsByPriority`, `totalTickets`, `openTickets`, `criticalTickets`
- **Methods**: `loadTickets()`, `createTicket()`, `updateTicket()`, `deleteTicket()`, `setFilter()`, `clearFilter()`, etc.

### Smart vs Dumb Components

- **Smart/Container Components** (Pages): `TicketsPageComponent`, `TicketFormPageComponent`, `TicketDetailsPageComponent`, `DashboardPageComponent`
  - Handle business logic
  - Interact with the store
  - Manage routing and navigation
  - Use `OnPush` change detection

- **Dumb/Presentational Components**: `TicketListComponent`, `TicketFormComponent`, `TicketFiltersComponent`, `TicketDetailsComponent`
  - Receive data via `@Input()`
  - Emit events via `@Output()`
  - Use `OnPush` change detection
  - No direct store access

### Data Layer

The `TicketService` simulates backend API calls with:

- In-memory data storage
- Async operations using RxJS `of()` and `delay()`
- Easy to replace with real HTTP calls
- Error handling simulation

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Angular CLI 19+**

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:

   ```bash
   npm install --legacy-peer-deps
   ```

   > Note: `--legacy-peer-deps` is used due to PrimeNG 20 compatibility with Angular 19

3. **Start the development server**:

   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser** and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/angular-signals-ticket-dashboard/browser/` directory.

## 🚀 Deployment

### Quick Deploy to GitHub

1. **Create Repository on GitHub**:
   - Go to [GitHub](https://github.com/new)
   - Repository name: `angular-signals-ticket-dashboard`
   - Description: `Modern Ticket Management Dashboard built with Angular 19, Signals, and PrimeNG`
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Push to GitHub**:

   ```bash
   # Option 1: Use the provided script
   ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME

   # Option 2: Manual push
   git remote add origin https://github.com/YOUR_USERNAME/angular-signals-ticket-dashboard.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel** (Recommended):
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`
   - Click "Deploy"

4. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Click "Deploy site"

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md) and [SETUP_REPO.md](./SETUP_REPO.md).

## 📁 Project Structure Details

### Domain Layer

- `ticket.model.ts` - Ticket interface, DTOs (`CreateTicketDto`, `UpdateTicketDto`), and type definitions (`TicketStatus`, `TicketPriority`)

### Core Services

- `LoggerService` - Centralized logging utility
- `NotificationService` - User notifications using signals (can be extended with PrimeNG Toast)

### Tickets Feature

#### Components

- `TicketListComponent` - PrimeNG table with pagination, sorting, and action buttons
- `TicketFiltersComponent` - Filter by status, priority, and search with enhanced UI
- `TicketFormComponent` - Reactive form for create/edit with sectioned layout
- `TicketDetailsComponent` - Detailed ticket view with formatted information

#### Pages

- `TicketsPageComponent` - Main tickets list page (container)
- `TicketFormPageComponent` - Create/edit ticket page
- `TicketDetailsPageComponent` - Ticket details page with delete confirmation

#### Services & Store

- `TicketService` - Data access layer (simulated API with in-memory storage)
- `TicketsStore` - Signals-based state management with computed values

### Dashboard Feature

- `DashboardPageComponent` - Analytics dashboard with PrimeNG charts and KPI cards

### Shared Components

- `StatusBadgeComponent` - Status indicator with color coding using PrimeNG Tag
- `PriorityBadgeComponent` - Priority indicator with color coding using PrimeNG Tag
- `LoadingSpinnerComponent` - Loading indicator using PrimeNG ProgressSpinner

## 🎨 UI/UX Features

### Theme & Styling

- **Dark Theme** - PrimeNG Lara Dark Blue theme with custom enhancements
- **Custom CSS** - Enhanced styling for all components
- **Gradient Effects** - Modern gradient backgrounds for headers and buttons
- **Shadow Effects** - Layered shadows for depth and elevation
- **Smooth Transitions** - CSS transitions for interactive elements

### Components Styling

- **Enhanced Forms** - Sectioned forms with icons, help text, and better spacing
- **Styled Buttons** - Gradient backgrounds, hover effects, and proper sizing
- **Custom Cards** - Enhanced card styling with gradients and shadows
- **Improved Tables** - Better header styling, row hover effects, and pagination
- **Enhanced Dialogs** - Blur backdrop, styled buttons, and better spacing

### Responsive Design

- **PrimeFlex Utilities** - Mobile-friendly layout using utility classes
- **Breakpoints** - Responsive design for tablets and mobile devices
- **Flexible Grids** - CSS Grid and Flexbox for adaptive layouts

### User Experience

- **Loading States** - Spinners during data operations
- **Error Handling** - User-friendly error messages
- **Confirmation Dialogs** - Enhanced PrimeNG ConfirmDialog with blur backdrop
- **Form Validation** - Reactive forms with validation feedback
- **Tooltips** - Helpful tooltips on action buttons
- **Empty States** - Friendly empty state messages

## 🔧 Configuration

### TypeScript

- Strict mode enabled (`strict: true`)
- No `any` types allowed
- Strong typing throughout
- Readonly where applicable

### ESLint & Prettier

- Angular ESLint rules configured
- Prettier for code formatting
- Consistent code style enforced
- Prettier integrated with ESLint

### Change Detection

- `OnPush` strategy used for all components
- Optimized performance with signals
- Minimal change detection cycles

### Angular Configuration

- Standalone components (no NgModules)
- Lazy loading for routes
- `provideAnimationsAsync()` for PrimeNG animations

## 🔄 Routing

- `/` → Redirects to `/dashboard`
- `/dashboard` → Dashboard with analytics
- `/tickets` → Tickets list page
- `/tickets/new` → Create new ticket
- `/tickets/:id` → Ticket details
- `/tickets/:id/edit` → Edit ticket

## 📦 Dependencies Summary

### Production Dependencies

```json
{
  "@angular/*": "^19.2.0",
  "@primeng/themes": "^20.3.0",
  "chart.js": "^4.5.1",
  "primeflex": "^4.0.0",
  "primeicons": "^7.0.0",
  "primeng": "^20.3.0",
  "rxjs": "~7.8.0"
}
```

### Development Dependencies

```json
{
  "@angular/cli": "^19.2.5",
  "@angular-eslint/*": "^21.0.1",
  "@typescript-eslint/*": "^8.48.0",
  "eslint": "^9.39.1",
  "prettier": "^3.7.3",
  "typescript": "~5.7.2"
}
```

## 🚧 Future Enhancements

- [ ] Real backend API integration (replace TicketService with HTTP calls)
- [ ] User authentication and authorization
- [ ] Advanced filtering options (date range, assignee, tags)
- [ ] Export functionality (CSV, PDF)
- [ ] Real-time updates (WebSocket integration)
- [ ] Ticket comments/activity log
- [ ] File attachments
- [ ] Email notifications
- [ ] Bulk operations (bulk delete, bulk update)
- [ ] Advanced search with filters
- [ ] Ticket templates
- [ ] User preferences and settings

## 📝 Code Quality

- ✅ Strict TypeScript configuration
- ✅ ESLint configured with Angular rules
- ✅ Prettier configured for consistent formatting
- ✅ OnPush change detection strategy
- ✅ No `any` types used
- ✅ Readonly where applicable
- ✅ Feature-based architecture
- ✅ Separation of concerns (Smart/Dumb components)
- ✅ Barrel exports for clean imports
- ✅ Consistent naming conventions

## 👨‍💻 Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
# or
npx prettier --write "src/**/*.{ts,html,css}"
```

## 🎯 Key Design Decisions

1. **Angular Signals over NgRx** - Simpler state management for this use case
2. **Standalone Components** - Modern Angular approach, no NgModules
3. **Feature-Based Architecture** - Better organization and scalability
4. **Smart/Dumb Component Pattern** - Clear separation of concerns
5. **PrimeNG for UI** - Professional components out of the box
6. **Custom Styling** - Enhanced UI beyond default PrimeNG theme
7. **OnPush Change Detection** - Performance optimization
8. **Strict TypeScript** - Type safety and better developer experience

## 📄 License

This project is created for demonstration purposes.

## 🙏 Acknowledgments

- [Angular](https://angular.dev/) - The web framework
- [PrimeNG](https://primeng.org/) - UI component library
- [PrimeFlex](https://primeflex.org/) - CSS utility library
- [Chart.js](https://www.chartjs.org/) - Charting library
- [PrimeIcons](https://primeng.org/icons) - Icon library

---

**Built with ❤️ using Angular 19, Signals, and PrimeNG**
