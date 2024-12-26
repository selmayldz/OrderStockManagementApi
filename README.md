# Concurrent Order and Stock Management Application

This project is a system designed to digitalize and enhance the efficiency of business operational processes using multithreading and synchronization mechanisms. The system is developed with ASP.NET Core, React Vite, and Microsoft SQL Server technologies.

## 🚀 Project Objectives

- Solve concurrent data access issues using multithreading and synchronization mechanisms.
- Provide a user-friendly and secure solution by digitalizing stock and order processes for businesses.
- Ensure secure access with real-time notifications via SignalR and JWT-based authentication.

## 📋 Features

- **Order and Stock Management**: Concurrent management of orders and stocks.
- **Admin and User Systems**: Different roles with distinct access permissions.
- **Real-Time Notifications**: Order statuses and error logs via SignalR.
- **Layered Architecture**: Controller, Service, Repository, and Database layers.
- **Security and Logging**: JWT-based authentication and logging mechanisms.

## 🛠️ Technologies Used

- **Backend**: ASP.NET Core, Entity Framework Core
- **Frontend**: React Vite
- **Database**: Microsoft SQL Server
- **Real-Time Notifications**: SignalR
- **Authentication**: JWT (JSON Web Token)

## 📂 Project Structure

### Backend Layers
- **Controller Layer**: Handles user requests and directs them to the appropriate business logic.
- **Service Layer**: Contains business rules and logical operations.
- **Repository Layer**: Manages database operations.
- **Database Layer**: Database schema and relationships.

### Frontend Components
- **Customer Operations**: User registration, login, orders, and profile management.
- **Admin Panel**: Product, user, and order management.
- **Log Monitoring**: Real-time log tracking.

## 📈 Experimental Results

- Average order processing time: 150ms
- Concurrent user capacity: 500 users
- Real-time notification latency: <50ms
- Error log transmission time: 30ms

## ⏳ Setup

### Requirements
- .NET 6 SDK
- Node.js (v16 or higher)
- SQL Server

### Steps

1. **For Backend**:
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```

2. **For Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Database Configuration**:
   - Update the SQL Server connection string in the `appsettings.json` file.

## 🌟 Key Components

- **AdminController**: Special functions for users with admin permissions.
- **OrdersController**: Order creation and viewing operations.
- **ProductsController**: Adding, updating, and listing products.
- **SignalR**: Real-time notification mechanism.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
