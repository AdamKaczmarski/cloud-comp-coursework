from django.urls import path
from .views import check_chosen, WordView, get_length
from .views import UserStatsView
from .views import GuessDistributionView

urlpatterns = [
    path('check_chosen', check_chosen),
    path('get_length',get_length),
    path('words', WordView.as_view()),
    path('stats', UserStatsView.as_view()),  # API endpoint for user stats page
    path('g_stats', GuessDistributionView.as_view()),

]
