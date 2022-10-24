from tabnanny import check
from django.urls import path
from .views import check_chosen, WordView

urlpatterns = [
    path('check_chosen',check_chosen),
    path('words', WordView.as_view()),
]
