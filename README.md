# Work
# MERN Stack Spreadsheet App

## Overview

The MERN Stack Spreadsheet App is a web application that allows users to create, manage, and interact with data in a spreadsheet format. Built using MongoDB, Express.js, React.js, and Node.js, this app provides a seamless user experience with features such as cell editing, data storage, search functionality, pagination, and undo/redo operations.

## Technologies Used

- **MongoDB**: NoSQL database for storing spreadsheet data.
- **Express.js**: Web application framework for Node.js to handle server-side logic.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for the backend server.
- **Zustand**: State management library for handling global state in React.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.

## Features

- **Dynamic Grid Rendering**: Displays a grid of 1000 blank cells.
- **Cell Editing**: Users can edit cell contents directly within the grid.
- **Real-time Updates**: Changes to cell data are reflected immediately.
- **Search Functionality**: Easily search for specific data entries within the grid.
- **Pagination**: Efficiently navigate through large datasets with pagination controls.
- **Undo/Redo Operations**: Revert or reapply changes effortlessly.
- **Responsive Design**: Optimized for various screen sizes with Tailwind CSS.

## Installation

To run the Spreadsheet App locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone [repository-url]

Navigate to the project directory:

bash

cd assignment

Install backend dependencies:

bash

cd server
npm install

Install frontend dependencies:

bash

cd ../client
npm install

Set up environment variables: Create a .env file in the server directory and add the following:

makefile

MONGODB_URI=[your_mongodb_connection_string]
PORT=5000

Replace [your_mongodb_connection_string] with your actual MongoDB connection string.

Start the backend server:

bash

cd server
npm start

Start the frontend application:

bash

    cd ../client
    npm start

    Open your browser and go to http://localhost:3000.

Usage

    Once the app is running, you can interact with the grid by clicking on the cells to edit their contents.
    Use the search bar to find specific entries.
    Navigate through the pages using the pagination controls.
    Utilize the undo/redo buttons to manage your edits.

Contributing

Contributions are welcome! If you have suggestions for improvements or features, please feel free to submit a pull request or open an issue.
License

This project is licensed under the MIT License. See the LICENSE file for more details.
Acknowledgments

    MongoDB
    Express.js
    React.js
    Node.js
    Zustand
    Tailwind CSS

sql


### Customization:
- Replace `[repository-url]` with the actual URL of your project repository.
- Ensure that any specific installation or setup instructions are accurate for your project.
- Add any other acknowledgments or contributors if applicable.

Feel free to modify or expand the sections as needed!
