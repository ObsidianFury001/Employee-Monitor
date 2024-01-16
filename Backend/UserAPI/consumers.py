import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
 
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
            message = 'A new employee has logged in: ' + str(data['id']) + ' Status: ' + data['status']

            res = {
                'type': 'new_login',
                'message': message,
                'id': data['id'],
                'status': data['status']
            }
            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                res
            )

        def new_login(self, event):
            res = {
                'type': 'status_update',
                'message': event['message'],
                'id': event['id'],
                'username': event['username'],
                'status': event['status']
            }
            self.send(text_data=json.dumps(res))

        def disconnect(self, close_code):
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