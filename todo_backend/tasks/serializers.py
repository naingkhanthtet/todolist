from .models import Task
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "completed", "user"]
        read_only_fields = ["user"]
