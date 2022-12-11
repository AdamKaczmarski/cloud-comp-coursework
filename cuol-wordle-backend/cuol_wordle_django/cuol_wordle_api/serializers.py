from rest_framework import serializers
from .models import Word, UserStats, GuessDistribution

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = ["games_played","games_won","total_guesses"]


class GuessDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuessDistribution
        fields = '__all__'

