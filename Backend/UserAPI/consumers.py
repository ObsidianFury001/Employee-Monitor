import json
from channels.generic.websocket import WebsocketConsumer
 
# A consumer class that will listen for incoming web socket requests 
# and allow the sending and receiving of data in real time
# (Similar to `views.py` but it can both send and receive data.)
 
class EmployeeConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(text_data = json.dumps({
            'type': 'con_success.',
            'message': 'Success! You are now connected.'
        }))

    def updateStatus(self, json_data):
        text_data_json = json.loads(json_data)
        message = 'A new employee has logged in: ' + text_data_json['id']
        self.send(text_data = json.dumps({
            'type': 'new_login',
            'message': message,
            'data': {
                'id': text_data_json['id'],
                'username': text_data_json['username']
            }
        }))
    # def disconnect(self):
    # pass
