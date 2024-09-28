from django.urls import path

from .views import index, TaskListCreateView, TaskRUDView, HomeView
from .views import index, HomeView, LogOutView

# app_name = "tasks"
urlpatterns = [
    # path("create/", TaskCreateView.as_view(), name="task_create"),
    # path("update/<int:pk>", TaskUpdateView.as_view(), name="task_update"),
    # path("delete/<int:pk>", TaskDeleteView.as_view(), name="task_delete"),
    path("", TaskListCreateView.as_view(), name="task-list-create"),
    path("<int:pk>/", TaskRUDView.as_view(), name="task-rud"),
    path("index/", index, name="index"),
    path("home/", HomeView.as_view(), name="home"),
    path("logout/", LogOutView.as_view(), name="logout"),
]
