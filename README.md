# BazaarLeads

A comprehensive platform for managing business leads and connections.

## Project Structure

The project is divided into three main parts:

1. **Frontend** (`/frontend`): The main user-facing application
2. **Admin Panel** (`/admin`): Administrative interface for managing the platform
3. **Server** (`/server`): Backend API server

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bazaarleads.git
cd bazaarleads
```

2. Install dependencies for each project:
```bash
# Frontend
cd frontend
npm install

# Admin Panel
cd ../admin
npm install

# Server
cd ../server
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each project directory
   - Update the variables as needed

### Running the Projects

1. Start the server:
```bash
cd server
npm start
```

2. Start the frontend:
```bash
cd frontend
npm run dev
```

3. Start the admin panel:
```bash
cd admin
npm run dev
```

## Development

- Frontend runs on: http://localhost:5173
- Admin Panel runs on: http://localhost:5174
- Server runs on: http://localhost:4000

## License

This project is private and confidential. 