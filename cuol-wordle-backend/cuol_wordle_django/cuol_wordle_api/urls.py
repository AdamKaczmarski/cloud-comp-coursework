from django.urls import path
from .views import check_chosen, get_length, user_stats, global_stats

urlpatterns = [
    path('check_chosen', check_chosen),
    path('get_length',get_length),
    path('user_stats',user_stats),
    path('global_stats',global_stats),
]
