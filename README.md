# Project Title
A web application built with React that includes user authentication, content management, and dynamic navigation.

## Author
**Yair Yerushalmi**

## Project Overview
This project is a web-based application that integrates a REST API for server-side communication. The application allows users to manage and publish content dynamically based on user roles and permissions.

## Features
- **User Authentication**: Sign-up and login system with JWT-based authentication.
- **Role-Based Access Control**: Different access levels for Admin, Business, and Regular users.
- **Content Management**: Users can create, edit, and delete content dynamically.
- **Dynamic Navigation**: Navigation menu adapts to user roles.
- **Search Functionality**: Allows users to search for content dynamically.
- **Dark Mode Toggle**: Users can switch between light and dark mode.
- **Business Cards Management**: Users can create, view, and manage business cards.
- **Favorites System**: Users can mark business cards as favorites.
- **Admin Dashboard**: Allows administrators to manage users and content.

## Technologies Used
- **Frontend**: React, CSS (with responsive design), React Icons
- **Backend**: Node.js, Express (for API handling)
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **HTTP Requests**: Axios for API calls

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yair02010/MyFirstReact.git
   ```
2. Navigate to the project folder:
   ```sh
   cd project-directory
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- Users can sign up and log in to access different functionalities based on their roles.
- Admins can manage users and oversee content.
- Business users can create and manage business cards.
- Regular users can view content and interact with the system.

## Project Structure
```
project-directory/
│── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── styles/
│── public/
│── package.json
│── README.md
```

## Deployment
To deploy the project, use a hosting service like Vercel or Netlify for the frontend and a cloud provider (such as Heroku) for the backend.

## Contributing
If you want to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them.
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

---
This README provides an overview of the project, its features, installation, and usage instructions. Let me know if you'd like any modifications!

