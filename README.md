# Real-Time Chat Application

A real-time chat application built using Node.js, React, and Supabase.

## Overview

This project is a simple yet functional real-time chat application that allows users to exchange messages instantly. It leverages the power of Node.js for the backend, React for the frontend user interface, and Supabase for the database and real-time capabilities.

## Tech Stack

* **Backend:** [Node.js](https://nodejs.org/) - JavaScript runtime environment for server-side development.
* **Frontend:** [React](https://react.dev/) - JavaScript library for building user interfaces.
* **Database & Realtime:** [Supabase](https://supabase.com/) - Open-source Firebase alternative providing PostgreSQL database, real-time subscriptions, authentication, and more.

## Features

* **Real-time Messaging:** Send and receive messages instantly.
* **User Authentication:** Secure user registration and login (using Supabase Auth).
* **Multiple Chat Rooms (Optional - can be easily extended):** Join different chat rooms to communicate with specific groups.
* **Private Messaging (Optional - can be easily extended):** Send direct messages to individual users.
* **Message History:** View previous messages in a chat room.
* **User Presence (Optional - can be easily extended):** See who is online.

## Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/en/download/) (version >= 16)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager
* A [Supabase](https://supabase.com/) account (free tier is sufficient)

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_NAME>
```

### 2. Set up Supabase

* Create a new project on [Supabase](https://supabase.com/).
* Navigate to your project's **Database** section and create a table named (e.g., `messages`) with the following columns:
    * `id` (UUID, primary key)
    * `content` (TEXT)
    * `user_id` (UUID, foreign key referencing your `auth.users` table)
    * `created_at` (TIMESTAMP WITH TIME ZONE)
    * `room_id` (TEXT, optional for multiple rooms)
* Go to your project's **Authentication** section and ensure email/password sign-in is enabled.
* Navigate to your project's **API** section and copy your **Project URL** and **Anon Key**.

### 3. Configure Environment Variables

Create `.env` files in both the `backend` and `frontend` directories and populate them with your Supabase credentials.

#### Backend (`backend/.env`)


SUPABASE_URL=<YOUR_SUPABASE_PROJECT_URL>
SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
PORT=3001 # Or any other preferred port for the backend


#### Frontend (`frontend/.env.local`)


VITE_SUPABASE_URL=<YOUR_SUPABASE_PROJECT_URL>
VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>


**Note:** For production builds of the frontend, you might need to configure environment variables differently based on your hosting provider.

### 4. Install Backend Dependencies and Run the Server

bash
cd backend
npm install  # or yarn install
npm run dev  # or yarn dev (if you have a dev script defined in package.json, e.g., using nodemon)


### 5. Install Frontend Dependencies and Run the Application

```bash
cd ../frontend
npm install  # or yarn install
npm run dev  # or yarn dev
```

The frontend application should now be running at `http://localhost:3000` (or a different port if configured).

## Usage

1.  Open the application in your web browser.
2.  You will be prompted to sign up or log in.
3.  Once authenticated, you can start sending and receiving messages in the default chat room.
4.  (If implemented) You can switch between different chat rooms or initiate private conversations.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them: `git commit -m "Add your feature"`
4.  Push your changes to your fork: `git push origin feature/your-feature-name`
5.  Create a pull request to the main repository.

Please ensure your code follows the project's coding style and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.




