from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email","password",'is_active']
        validate_password = make_password
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user