from rest_framework import serializers
from .models import Word
from .models import UserStats
from .models import GuessDistribution


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = '__all__'


class GuessDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuessDistribution
        fields = '__all__'
