from django.urls import path
from .views import check_chosen, WordView, get_length, user_stats, global_stats
from .views import UserStatsView
from .views import GuessDistributionView

urlpatterns = [
    path('check_chosen', check_chosen),
    path('get_length',get_length),
    path('user_stats',user_stats),
    path('global_stats',global_stats),
    path('words', WordView.as_view()),
    path('stats', UserStatsView.as_view()),  # API endpoint for user stats page
    path('g_stats', GuessDistributionView.as_view()),

]
