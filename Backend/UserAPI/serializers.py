from rest_framework import serializers
from .models import EMPLOYEES_DB

# Serializer to return our model as a API response.

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EMPLOYEES_DB
        fields = ('id', 'name', 'username', 'age', 'status', 'last_seen')