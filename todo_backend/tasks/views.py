from django.shortcuts import render
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .forms import TaskForm
from .serializers import TaskSerializer


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
