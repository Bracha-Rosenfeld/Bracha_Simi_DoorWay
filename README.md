# DoorWay 🏠

A comprehensive full-stack rental management application that connects property owners with potential renters through an intuitive web platform.

## About This Project

DoorWay is a complete web application developed as a school project to demonstrate advanced full-stack development skills. The system features multiple user types, authentication systems, user permissions, and various media handling capabilities.

## Features

### User Management
- **Multiple User Types** - Property owners, renters, and administrators
- **Secure Authentication** - JWT-based login system with password management
- **Role-Based Permissions** - Different access levels for each user type
- **User Profiles** - Detailed profile management for all user types

### Property Management
- **Property Listings** - Add, edit, and manage rental properties with full details
- **Media Support** - Upload and manage property images
- **Advanced Search & Filtering** - Find properties by location, price, type, and amenities
- **Property Details** - Comprehensive property information display

### User Interface
- **Responsive Design** - Optimized for both desktop and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with pleasant design
- **Component Architecture** - Well-structured React components
- **Client-Side Routing** - Smooth navigation between different sections

### Technical Features
- **RESTful API** - Well-defined API endpoints for all operations
- **Database Integration** - MySQL with logical table architecture
- **File Management** - Handle media (images)
- **Modular Architecture** - Organized codebase with separation of concerns

## Tech Stack

### Frontend
- **React.js** - Component-based architecture with modern hooks
- **React Router** - Client-side routing and navigation
- **Responsive CSS** - Mobile-first design approach
- **Component Architecture** - Reusable and modular components

### Backend
- **Node.js** - Server-side runtime environment
- **Express.js** - Web framework with modular routing
- **JWT Authentication** - Secure token-based authentication
- **File Upload Handling** - Support for various media types

### Database
- **MySQL** - Relational database with structured table architecture
- **Database Design** - Normalized tables with proper relationships

### Media Support
- **Images** - Property photos and user avatars
- **Audio** - Property audio descriptions and tours
- **Documents** - Lease agreements and property documents
- **Text Content** - Rich property descriptions and user communications

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MySQL database set up locally

### Installation

1. **Clone the repository**
   ```bash
   gh repo clone Bracha-Rosenfeld/Bracha_Simi_DoorWay
   cd Bracha_Simi_DoorWay
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

4. **Database Setup**
   - Create a MySQL database named `mydatabase`
   - Run the SQL scripts in the `/database` folder to create tables
   - The database includes properly structured tables for users, properties, and media

5. **Environment Variables**
   Create a `.env` file in the server directory:
   ```
   MYSQL_HOST=localhost
   MYSQL_USER=your_mysql_username
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=mydatabase
   ```

6. **Run the application**
   ```bash
   # Start server (from server directory)
   npm start
   
   # Start client (from client directory)
   npm start
   ```

7. **Access the application**
   Open your browser and go to `http://localhost:5000`

## Project Structure

```
doorway/
├── client/            # React application
├── server/            # Node.js/Express server
├── database/          # SQL scripts and schema
└── README.md
```

## Usage

### For Property Owners
1. Register and login to your property owner account (regular or google login)
2. Add new rental properties with detailed information
3. Upload property images
4. Manage your property listings and view rental inquiries
5. Access owner dashboard with property analytics

### For Renters
1. Register and login to your renter account
2. Browse available properties with advanced search filters
3. View detailed property information including media content
4. Save favorite properties and create wish lists
5. Submit rental applications and track their status

### For Administrators
1. Access admin dashboard with system overview
2. Manage user accounts and permissions
3. Monitor property listings and user activities
4. Handle system maintenance and user support

## Built With

- **React.js** - Modern UI library with component architecture
- **Node.js & Express** - Server-side development with modular routing
- **MySQL** - Relational database with structured schema design
- **RESTful API** - Well-defined API endpoints for client-server communication
- **Media Handling** - Support for images uploads
- **Responsive Design** - Mobile and desktop optimized interface

---

*A comprehensive school project demonstrating advanced full-stack web development with multiple user types, authentication systems, and media management*
