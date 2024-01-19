# Backend (Python - Django)

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
