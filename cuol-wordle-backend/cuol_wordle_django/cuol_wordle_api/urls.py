from tabnanny import check
from django.urls import path
from .views import check_chosen

urlpatterns = [
    path('check_chosen',check_chosen)
]
