from django.shortcuts import render
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
)
from .models import Task
from .forms import TaskForm
from .serializers import TaskSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


class HomeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        print(request.user)
        content = {"message": "Success request"}
        return Response(content)


def index(request):
    return render(request, "index.html", {})


class TaskListCreateView(ListCreateAPIView):
    # queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskRUDView(RetrieveUpdateAPIView, DestroyAPIView):
    # queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class LogOutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.user["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
