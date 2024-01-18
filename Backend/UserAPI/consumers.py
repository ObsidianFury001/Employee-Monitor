import json
from channels.generic.websocket import WebsocketConsumer
from .serializers import EmployeeSerializer
from asgiref.sync import async_to_sync
from .models import EMPLOYEES_DB
 
# A consumer class that will listen for incoming web socket requests 
# and allow the sending and receiving of data in real time
# (Similar to `views.py` but it can both send and receive data.)
 
class EmployeeConsumer(WebsocketConsumer):
    try:
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
                'status': event['status']
            }
            self.send(text_data=json.dumps(res))

        def disconnect(self, text_data ):
            message = 'An employee has logged off: ' + str(self.user_id) + ' Status: ' 
            print(self.status)
            
            res = {
                'type': 'status_offline',
                'message': message,
                'id': self.user_id,
                'status': 0
            }
            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                res
            )

            checkUser = EMPLOYEES_DB.objects.filter(id=self.user_id).first()

            if checkUser:
                serializer = EmployeeSerializer(checkUser, many=False)
                checkUser.status = 0
                checkUser.save()

            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                res
            )

            self.channel_layer.group_discard(
                self.room_name,
                self.channel_name
            )
            
    except Exception as e:
        # Return error response if there's an exception
        res = {
            "data": [],
            "success": False,
            "message": "Server error occurred.",
            "error_message": str(e)
        }
        print(res)