from django.shortcuts import render
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
)
from rest_framework import permissions
from .models import Task
from .forms import TaskForm
from .serializers import TaskSerializer

# from django.views.generic import View, ListView, CreateView, UpdateView, DeleteView


def index(request):
    return render(request, "index.html", {})


class TaskListCreateView(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskRUDView(RetrieveUpdateAPIView, DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


# class TaskListView(ListView):
#     model = Task
#     queryset = Task.objects.all()
#     context_object_name = "tasks"
#     template_name = "task_list.html"

# class TaskCreateView(CreateView):
#     model = Task
#     form_class = TaskForm
#     template_name = "task_form.html"
#     success_url = reverse_lazy("task_list")


# class TaskUpdateView(UpdateView):
#     model = Task
#     form_class = TaskForm
#     template_name = "task_form.html"
#     success_url = reverse_lazy("task_list")


# class TaskDeleteView(DeleteView):
#     model = Task
#     template_name = "task_confirm_delete.html"
#     success_url = reverse_lazy("task_list")

# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
