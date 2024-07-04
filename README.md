# Welcome to Dreamestate

Dreamestate is your ultimate destination for exploring real estate with a modern twist. This MERN stack project, enhanced by Prisma for efficient database management and Socket.IO for real-time communication, redefines how you discover and engage with properties.

## Key Features

- **Comprehensive Listings**: Explore a wide range of properties, from urban apartments to rural estates, with detailed descriptions, high-quality images, and interactive maps.

- **Real-Time Chats**: Seamlessly connect with sellers, agents, and other users through our integrated real-time chat feature powered by Socket.IO. Discuss properties, negotiate deals, and get instant updates—all in one place.

- **User-Centric Experience**: Designed with React on the frontend, Dreamestate offers a responsive and intuitive interface. Enjoy smooth navigation, advanced search options, and personalized recommendations tailored to your preferences.

- **Secure and Scalable Backend**: Prisma handles backend operations, ensuring data security and scalability, so you can focus on finding your dream property without worrying about technical complexities.

## Setup Instructions

### 1. API Backend

To run the API backend:

```bash
cd api
pnpm install
node app.js
```

2. React Estate UI
To run the React Estate UI:

```bash
Copy code
cd react-estate-ui
pnpm install
pnpm run dev
```
3. Sockets
To run the Socket.IO server:

```bash
Copy code
cd sockets
pnpm i
node app.js
```
Folder Structure

api: Contains the backend API server built with Node.js and Express. Install dependencies with npm install and start the server with node app.js.

react-estate-ui: Frontend built with React.js for the user interface of Dreamestate. Install dependencies with pnpm install and start the development server with pnpm run dev.

sockets: Includes Socket.IO server setup for real-time chat functionality. Install dependencies with pnpm i and start the server with node app.js.
