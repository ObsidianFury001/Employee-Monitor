# EmployeeX overview

EmployeeX is an employee monitoring application developed using Python, React and MySQL. It contains a **User Login** page and a **Employee Dashboard** page.

- Once the user is authorized the app navigates to the dashboard page.

- The Dashboard page updates the online status of each connected employee in real time,
along with timestamps, and providing basic sorting and filtering options.

![EmployeeX](./Frontend/public/assets/logo.png)

## Additional features

1. *Pagination* - to support large employee datasets

2. *Theme toggler* - for the user use their preferred theme for better UX.

## Demo

![Demo](Demo.gif)

## Project Setup

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

## 2. [Backend Setup (Python - Django) `./Backend` title](./Backend/README.md)

- Navigate into the Backend directory.

    ```bash
    cd ./Backend/
    ```

- The application uses the following folder structure.

    ```bash
    UserAPI
        ├── admin.py
        ├── consumers.py
        ├── models.py
        ├── routing.py
        ├── serializers.py
        └── views.py
            ...
    ├── .env
    ├── urls.py
    └── settings.py

- `./UserAPI/admin.py` is where the admin module gets registered for devs to have a look at the visual representation of the Django admin dashboard.

- `./UserAPI/consumers.py` contains a custom consumer that listes for requests and allows authorized clients to connect to the web socket. Connected clients will be receiving real time updates through these sockets.

- `./UserAPI/models.py` contains all the db models.

- `./UserAPI/routing.py` routes the web socket connection end point with the ASGI consumer.

- `./UserAPI/serializers.py` contains a custom `EMPLOYEES_DB` serializer to serialize and return model records for the API response.

- `./UserAPI/views.py` contains all the API methods.

- `./UserAPI/urls.py` contains the routes that set the API end points listners for an incoming API request.

- `./settings.py` is the web configuration file for this application.

---

1. Create and activate the virtual environment and install the python dependencies for the same.

    ```bash
    python venv .venv
    . .venv/scripts/activate        
    pip install -r requirements.txt
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
    EMAIL_HASH_SALT=YOUR_SUPER_SECRET_SALT_KEY
    ```

    The final setup is to add and apply the migration settings for the modified modules.

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

## 3. [Frontend Setup (React - ShadnCN and TailwindCSS) `./Frontend`](./Frontend/README.md)

- Navigate into the Frontend directory.

    ```bash
    cd ./Frontend/
    ```

- The application uses the following folder structure:

    ```bash
    Frontend
    └── src
        └── components
            └── datatable
                ├── Cell.jsx
                ├── ColumnFilter.jsx
                ├── DataTable.jsx
                ├── StatusCell.jsx
                └── TimeStampCell.jsx
            └── header
                └── Header.jsx
            └── ui
                ...
    └── hooks
        └── UseCookie.jsx
    └── pages
        ├── Dashboard.jsx
        └── Login.jsx
    └── App.jsx
    └── main.jsx
    ```

- `./src/components/` contains all custom and built in components like datatable, header and other built in copmonents.

- `./src/hooks/` contains all the custom react hooks.

- `./src/pages` has all the avaiable pages response.

- `./src/Main.jsx` is the parent component that is rendered first.

- `./src/App.jsx` is the root component and manages the application routing.

---

1. Run the following command to start the frontend server.

    ```bash
    npm run dev
    ```
