from django.urls import path

from .views import TaskListCreateView, TaskRUDView, HomeView

app_name = "tasks"
urlpatterns = [
    path("", TaskListCreateView.as_view(), name="task-list-create"),
    path("<int:pk>/", TaskRUDView.as_view(), name="task-rud"),
    path("home/", HomeView.as_view(), name="home"),
]
