
from channels.generic.websocket import WebsocketConsumer
from .serializers import EmployeeSerializer
from asgiref.sync import async_to_sync
from .models import EMPLOYEES_DB
from django.utils import timezone
import json

# A consumer class that will listen for incoming web socket requests 
# and allow the sending and receiving of data in real time
# (Similar to `views.py` but it can both send and receive data.)
 
class EmployeeConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'AstudioRoom'

        # Add the user channel to the channel group
        async_to_sync(self.channel_layer.group_add) (
            self.room_name,
            self.channel_name
        )

        self.accept()

    def receive(self, text_data):
        data = json.loads(text_data)
        print("🚀 ~ data:", data)

        res = {
            'type': 'new_login',
            'message': 'A new employee has logged in.',
            'id': data['id'],
            'username': data['username'],
            'status': data['status']
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            res
        )

    def new_login(self, event):
        self.user_id = event['id']
        message = 'A new employee has logged in.'
        res = {
            'type': 'status_online',
            'id': event['id'],
            "message": message,
            'username': event['username'],
            'status': 2
        }
        self.send(text_data=json.dumps(res))

    def disconnect(self, text_data ):
        message = 'An employee has logged off: ' + str(self.user_id)
        
        res = {
            'type': 'status_offline',
            'message': 'An employee has logged off.',
            'id': self.user_id,
            'status': 0
        }
        self.send(text_data=json.dumps(res))
        checkUser = EMPLOYEES_DB.objects.filter(id=self.user_id).first()

        if checkUser:
            serializer = EmployeeSerializer(checkUser, many=False)
            checkUser.status = 0
            checkUser.last_seen = timezone.now() 
            checkUser.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            res
        )

        self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )
        

    def status_offline(self, event):
        self.user_id = event['id']
        message = event['message']
        res = {
            'type': 'status_offline',
            'id': self.user_id,
            'message': message,
            'status': 0
        }
        self.send(text_data=json.dumps(res))
        