# WebAppStore (PWAS)

A comprehensive Progressive Web App Store application built with React, Vite, and Tailwind CSS. This platform serves as a marketplace where users can browse, install, and review apps, vendors can manage and upload their applications, and administrators can oversee the entire ecosystem.

## 🚀 Features

-   **Public Storefront**: Browse featured apps, top charts, and categories.
-   **User Accounts**: Authentication system for users to review apps.
-   **Vendor Portal**: Dedicated dashboard for developers to:
    -   Upload and manage applications.
    -   View analytics (downloads, revenue).
    -   Manage subscriptions.
-   **Admin Dashboard**: Powerful control panel to:
    -   Approve or reject app submissions.
    -   Monitor platform analytics.
    -   Manage users and vendors.
-   **Responsive Design**: Fully optimized for mobile and desktop using Tailwind CSS.
-   **Dark Mode**: Built-in theme toggling.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **State Management**: React Context API (`AppContext`)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

The project code is located in the `src` directory. Here is a detailed breakdown:

### Root Directory (`src/`)
-   **`main.jsx`**: The entry point of the application. Mounts the React app to the DOM.
-   **`App.tsx`**: The main application component. It handles:
    -   **Routing**: Defines all public, vendor, and admin routes.
    -   **Providers**: Wraps the app in `QueryClientProvider`, `AppProvider` (state), and `TooltipProvider`.
    -   **Route Guards**: Implements `ProtectedAdminRoute`, `ProtectedVendorRoute`, etc., to secure pages.

### Components (`src/components/`)
Reusable UI components used throughout the application.
-   **`Navbar.jsx`**: Main navigation bar. Adapts based on user role (Guest, User, Vendor, Admin).
-   **`Sidebar.jsx`**: Navigation sidebar for dashboard views.
-   **`CategorySidebar.tsx`**: Sidebar for browsing app categories in the public store.
-   **`ui/`**: Directory containing generic UI components (Buttons, Cards, Inputs) powered by shadcn/ui.
-   **`ProtectedRoute.tsx`**: (Legacy) Wrapper for securing routes.

### Pages (`src/pages/`)
Contains the main view components for different routes.
-   **Public**:
    -   `Index.tsx`: Home page.
    -   `AppDetails.tsx`: Detailed view of a specific app.
    -   `Policies.tsx`: Static pages for terms, privacy, etc.
-   **Vendor**:
    -   `VendorLogin.tsx`: Login page for vendors.
    -   `VendorDashboard.tsx`: Main hub for vendors.
    -   `VendorUpload.tsx`: Form to upload new apps.
    -   `VendorApps.tsx`: Public profile page for a vendor.
-   **Admin**:
    -   `AdminLogin.tsx`: specific login for administrators.
    -   `AdminDashboard.tsx`: Overview of platform stats and moderation queue.
    -   `AdminAppDetails.tsx`: Admin view of an app for moderation purposes.

### Context (`src/context/`)
-   **`AppContext.tsx`**: The core "brain" of the application. It manages global state.

## 🧠 State Management (App Context)

The `AppContext.tsx` file provides a centralized state for the application. It mocks a backend by persisting data to `localStorage`.

### Key Functions and Data

1.  **State Variables**:
    -   `apps`: List of all applications in the store.
    -   `users`: List of registered users.
    -   `vendors`: List of registered vendor profiles.
    -   `currentUser`: The currently logged-in user entity.

2.  **`login(email, password)`**:
    -   Authenticates a user against the `users` list.
    -   Sets `currentUser` and persists session to `localStorage`.
    -   Handles role-specific logic (Vendor vs Admin).

3.  **`registerVendor(name, email, password, companyName)`**:
    -   Creates a new `User` entry and a linked `Vendor` profile.
    -   Automatically logs the new vendor in.

4.  **`updateAppStatus(appId, status)`**:
    -   Used by Admins to 'approve', 'reject', or set apps to 'review'.
    -   Updates the status of an app in the global `apps` list.

5.  **`addApp(app)`**:
    -   Used by Vendors to submit a new application.
    -   Generates a new ID and initializes metrics (downloads: 0, etc.).

6.  **`logout()`**:
    -   Clears the current session data from state and `localStorage`.

## 🛣️ Routing Logic

Defined in `App.tsx`, the application uses `react-router-dom` with custom guard components:

-   **`HomeRoute`**: Intelligent redirector.
    -   If Admin logged in -> Redirects to `/admin/dashboard`
    -   If Vendor logged in -> Redirects to `/:vendorName/dashboard`
    -   Otherwise -> Shows Public Home (`Index.tsx`)
-   **`ProtectedVendorRoute`**: Ensures only authenticated vendors can access dashboard pages. Redirects others to login.
-   **`ProtectedAdminRoute`**: Ensures only authenticated admins can access moderation tools.

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will start at `http://localhost:8080` (or similar).

4.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🔐 Default Credentials (Mock Data)

Since the app uses local mock data, you can use these defaults purely for testing (if not already in your localStorage):

-   **Admin**: Account logic often checks for specific email domains or flags set in `AppContext`.
    -   *Check `src/data/apps.ts` or `initialUsers` for pre-seeded accounts.*

---

**Note**: This project is a frontend-focused application using local storage for persistence. In a real-world scenario, `AppContext` would be replaced or connected to a real backend API (Node.js, Firebase, Supabase, etc.).
