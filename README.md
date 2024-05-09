# InstaVibe

## Features

- User authentication (sign up, log in, log out)
- Upload and share photos
- Like and comment on posts

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for building custom designs without having to leave your HTML.
- Flask: A lightweight WSGI web application framework in Python.
- bcrypt: A password-hashing function designed to securely hash passwords.

## Setup

### Frontend

1. Clone the repository:

   ```bash
   git clone git@github.com:Whoami-Voyager/InstaVibe.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

### Backend

1. Clone the repository (if not already done):

   ```bash
   git clone git@github.com:Whoami-Voyager/InstaVibe.git
   ```


2. Install dependencies:

   ```bash
   pipenv install
   ```

3. Activate the virtual environment:

   ```bash
   pipenv shell
   ```

4. Set up the database:

   ```bash
   export FLASK_APP=app.py
   export FLASK_RUN_PORT=5555
   flask db init
   flask db migrate -m 'Create tables'
   flask db upgrade
   ```

5. Navigate to the backend directory:

   ```bash
   cd server
   ```

6. Run the Flask application:

   ```bash
   python app.py
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Sign up for a new account or log in if you already have one.
3. Start exploring, sharing photos, and interacting with other users.
