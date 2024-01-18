from .models import EMPLOYEES_DB
from .serializers import EmployeeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver

import hashlib
from dotenv import load_dotenv
import os

load_dotenv()

def hash_username(username):
    # Generate a random salt (you can use a user-specific salt if needed)
    salt = os.environ.get('username_HASH_SALT')

    # Combine the username and salt
    salted_username = f"{username}{salt}"

    # Hash the salted username using a secure hashing algorithm (e.g., SHA-256)
    hashed_username = hashlib.sha256(salted_username.encode()).hexdigest()

    return hashed_username, salt

@api_view(['GET', 'POST'])
def employee_list(req):
    try:
        if req.method == "GET":
            # Get all employees
            allRecords = EMPLOYEES_DB.objects.all()

            if allRecords:                    
                # Serialize results 
                serializedData = EmployeeSerializer(allRecords, many = True)

                # Return serialized results   
                res = {
                    "data": serializedData.data,
                    "success": True,
                }
                return Response(res, status=status.HTTP_200_OK)
            
            res =  {
                "data": [],
                "success": False,
                "message": "No records found."
            }
            return Response(res, status=status.HTTP_404_NOT_FOUND)
            
        # Additional function
        elif req.method == "POST":
            # Register a new user.
            serializer = EmployeeSerializer(data=req.data)

            if serializer.is_valid():
                serializer.save()
                res = {
                    "data": serializer.data,
                    "success": True,
                }
                return Response(res, status=status.HTTP_201_CREATED)          
              
            res =  {
                "result": {
                    "data": [],
                    "success": False,
                    "message": "Invalid data passed."
                }
            }  
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)

    except Exception as e:
        # Return error response if there's an exception
        res =  {
            "result": {
                "data": [],
                "success": False,
                "message": "Server error occurred.",
                "error_message": str(e)
            }
        }
        return Response(res, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def employee_login(req):
    try:         
        if req.method == "POST":
            username = req.data.get('username')
            password = req.data.get('password')

            # Search credentials 
            checkUser = EMPLOYEES_DB.objects.filter(username=username, 
                                                    password=password).first()

            if checkUser:
                # Serialize results 
                checkUser.status = True           
                checkUser.save()

                serializer = EmployeeSerializer(checkUser, many=False)
                token = hash_username(serializer.data['username'])
                res = {
                    "data": serializer.data,
                    "success": True,
                    "message": "Successfully logged in.",
                    "token": token
                }

                current_channel = get_channel_layer()
                async_to_sync(current_channel.group_send) (
                    "AstudioRoom",
                    {
                        "type": "new_login",             
                        "message": "New User " + serializer.data['username'] + " has logged in.",       
                        'id': serializer.data['id'],
                        'username': serializer.data['username'],
                        "status": serializer.data['status'],
                    }
                )

                # Return serialized results        
                return Response(res, status=status.HTTP_202_ACCEPTED)
            
            res = {
                    "data": [],
                    "success": False,
                    "message": "Invalid username or password."
            }
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
            

    except Exception as e:
        # Return error response if there's an exception
        res =  {
                "data": [],
                "success": False,
                "message": "Server error occurred.",
                "error_message": str(e)
        }
        return Response(res, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['POST'])
def employee_logout(req):    
    try:         
        if req.method == "POST":
            id = req.data.get('id')

            # Search credentials 
            checkUser = EMPLOYEES_DB.objects.filter(pk=id)

            if checkUser:
                # Serialize results 
                serializer = EmployeeSerializer(checkUser, many=False)
                serializer.status = False
                serializer.save()

                res = {
                    "data": serializer.data,
                    "success": True,
                    "message": "Successfully logged in."
                }
                
                current_channel_layer = get_channel_layer()
                async_to_sync(current_channel_layer.group_send) (
                    'AstudioRoom',
                    {
                        'type': 'new_login',
                        'message': 'A new employee has logged in',
                        'id': serializer.data.id,
                        'status': serializer.data.status
                    }
                )

                # Return serialized results        
                return Response(res, status=status.HTTP_200_OK)
            
            res =  {
                "data": [],
                "success": False,
                "message": "Invalid username or password."
            }
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
            

    except Exception as e:
        # Return error response if there's an exception
        res = {
            "data": [],
            "success": False,
            "message": "Server error occurred.",
            "error_message": str(e)
        }
        return Response(res, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    