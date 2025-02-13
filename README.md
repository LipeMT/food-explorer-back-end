# Back-end for Food Explorer - A Restaurant System Solution

![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A modern Node.js application built with JavaScript, Node.js, Express, and SQLite.

## 🚀 Features

- **User Management**: Register and authenticate users with roles (Admin and Customer).
- **Dish Management**: Admin users can add, edit, and delete dishes.
- **Category Management**: Admin users can manage dish categories (add, edit, delete).
- **RESTful API**: Fully functional API for front-end integration.

## 📖 Description

This is the backend application for a restaurant system, where users can manage dishes and categories. The system supports two types of users: **Admin** and **Customer**.

- **Admin users** have full control over the system, including adding, editing, and deleting dishes and categories.
- **Customer users** can view available dishes and search for them by name or ingredients.

The backend provides a RESTful API that the front-end application can consume to perform all necessary operations.

## 📦 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- SQLite (for database)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/LipeMT/food-explorer-back-end.git
```

2. Navigate to the project directory:
```bash
cd food-explorer-back-end
```

3. Install dependencies:
```bash
npm install
```

4. Set up the database:
```bash
npm run migrate
```

## � Development

Start the development server:

```bash
npm run dev
```

The server will be available at `http://localhost:3000`

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## � Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📝 Project Structure

```
/
├── src/
│   ├── controllers/   # Controllers for handling requests
│   ├── models/        # Database models
│   ├── routes/        # Route configurations
│   ├── services/      # Business logic and utilities
│   ├── middleware/    # Custom middleware
│   ├── config/        # Configuration files
│   ├── database/      # Database setup and migrations
│   ├── app.js         # Main application file
│   └── server.js      # Server entry point
├── migrations/        # Database migration files
├── seeders/           # Database seed files
└── config files       # Various configuration files
```

## 💻 Deploy

To deploy this project, you can use any Node.js hosting service like Heroku, Vercel, or AWS. Ensure that the environment variables are properly set up.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Your Name - Luís Felipe Marques Tomé

LinkedIn: [https://www.linkedin.com/in/luisfelipemarquestome/](https://www.linkedin.com/in/luisfelipemarquestome/)

Project Link: [https://github.com/LipeMT/food-explorer-back-end.git](https://github.com/LipeMT/food-explorer-back-end.git)