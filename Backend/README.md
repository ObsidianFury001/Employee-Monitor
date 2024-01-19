# Backend (Python - Django)

- The application uses the following folder structure.

    ```bash
    UserAPI
    └── .env
        ├── admin.py
        ├── consumers.py
        ├── models.py
        ├── routing.py
        ├── serializers.py
        └── views.py
            ...
    ├──  settings.py
    └── requirements.txt

- `./settings.py` is the web configuration file for this application.

- `./UserAPI/models.py` contains all the db models.

- `./UserAPI/admin.py` is where the admin module gets registered for devs to have a look at the visual representation of the Django admin dashboard.

- `./UserAPI/serializer.py` contains a custom serializer to serialize and return model records for the API response.

- `./UserAPI/views.py` contains all the API methods.

- `./UserAPI/urls.py` contains the routes that set the API end points listners for an incoming API request.
