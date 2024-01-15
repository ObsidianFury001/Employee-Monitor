# Overview

This is a full stack implementation of the employee montoring web application. The backend is developed using Python Django.

## Initial Setup

- Clone the following repository and navigate into it.

    ```git
    git clone https://github.com/ObsidianFury001/Employee-Monitor.git    
    cd ./Employee-Monitor/
    ```

## 1. MySql Database setup

1. Install MySQL, create a new connection and create a new database user. Or skip this step and reuse an existing connection as required.

    ```sql
    CREATE USER 'root@localhost' IDENTIFIED by 'root';
    GRANT ALL PRIVILEGES ON *.* TO 'root@localhost' with GRANT OPTION;
    ```

2. Create a new database using the following commands

    ```sql
    CREATE DATABASE EMPLOYEES_DB;
    ```

## 2. Backend Setup (Python - Django) `./Backend`

    - Navigate into the Backend folder.

    ```bash
    cd ./Backend/
    ```

- `./UserAPI/models.py` contains all the db models.

- `./UserAPI/admin.py` is where the admin module gets registered for devs to have a look at the visual representation of the Django admin dashboard.

- `./UserAPI/serializer.py` contains a custom serializer to serialize and return model records for the API response.

- `./UserAPI/views.py` contains all the API methods.

- `./UserAPI/urls.py` contains the routes that set the API end points listners for an incoming API request.

---

1. Create and activate the virtual environment and install the python dependencies for the same.

    ```bash
    python venv .venv
    . .venv/scripts/activate        
    pip install django djangorestframework python-dotenv logging
    ```

2. Apply migration settings, and run the server.

    ```bash
    python manage.py migrate
    ```

3. Create a new super user with your own credentials.

    ```bash
    python manage.py createsuperuser
    ```

4. Create a new file `.env` and ensure the environment variable names are the same as provided.

    `.env`

    ```bash
    DATABASE_NAME=YOUR_DB_NAME
    DATABASE_USER=YOUR_USERNAME
    DATABASE_PASS=YOUR_PASSWORD
    DATABASE_HOST=_YOUR_HOST
    DABTASE_PORT=3306
    ```

    The final setup is to add and apply the migration settings.

    ```bash
    python manage.py makemigrations UserAPI    
    python manage.py migrate
    ```

5. You access your admin login page at `http://127.0.0.1:8000/admin` and create some sample users for testing purposes.

    ```bash
    python manage.py migrate
    ```

6. Run the following command to start the backend server.

    ```bash
    python manage.py runserver
    ```

## 3. Frontend Setup (React) `./Frontend`
