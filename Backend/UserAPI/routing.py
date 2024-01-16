from django.urls import re_path
from . import consumers

# Routes the urls patterns with the web sockets consumers 
# (similar to urls.py but for web sockets.)
websocket_urlpatterns = [
    re_path(r'ws/employee-socket', consumers.EmployeeConsumer.as_asgi()),
]