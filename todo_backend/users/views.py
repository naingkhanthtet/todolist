from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView,
)
from rest_framework import permissions
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer

# Create your views here.


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
