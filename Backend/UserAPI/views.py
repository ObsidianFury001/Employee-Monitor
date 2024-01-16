from .models import EMPLOYEES_DB
from .serializers import EmployeeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
import logging

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
            
            res = {
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
              
            res = {
                "data": [],
                "success": False,
                "message": "Invalid data passed."
            }  
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)

    except Exception as e:
        # Return error response if there's an exception
        res = {
            "data": [],
            "success": False,
            "message": "Server error occurred.",
            "error_message": str(e)
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
                res = {
                    "data": serializer.data,
                    "success": True,
                    "message": "Successfully logged in."
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
                req.session['id'] = serializer.data['id']
                req.session['username'] = serializer.data['username']
                req.session['name'] = serializer.data['name']
                
                # Log session information
                logging.info("Session data: %s", req.session["username"])

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
        res = {
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
                serializer.status = True
                serializer.save()

                res = {
                    "data": serializer.data,
                    "success": True,
                    "message": "Successfully logged in."
                }  
                req.session['id'] = serializer.data['id']
                req.session['username'] = serializer.data['username']
                req.session['name'] = serializer.data['name']
                
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
                # Log session information
                logging.info("Session data: %s", req.session["username"])

                # Return serialized results        
                return Response(res, status=status.HTTP_200_OK)
            
            res = {
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
    