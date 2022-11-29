from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, parser_classes, throttle_classes,permission_classes
from .serializers import WordSerializer, UserStatsSerializer, GuessDistributionSerializer
from .models import Word, UserStats, GuessDistribution
from string import digits
import json


from rest_framework.permissions import IsAuthenticated

# Generic for testing


class WordView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    model = Word
    queryset = Word.objects.all()
    serializer_class = WordSerializer


class UserStatsView(generics.ListAPIView):
    queryset = UserStats.objects.all()
    serializer_class = UserStatsSerializer


class GuessDistributionView(generics.ListAPIView):
    queryset = GuessDistribution.objects.all()
    serializer_class = GuessDistributionSerializer


def get_value(request):
    return request.data['value']

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_length(self):
    winner_word="house"
    return HttpResponse(len(winner_word))


@api_view(['POST'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
# @throttle_classes([OncePerDayUserThrottle])
def check_chosen(request):
    print(request)
    word = request.data['chosen_word']
    winner_word="house" #LATER ON it'll Pulled from the db
    remove_digits = str.maketrans('', '', digits)
    word = word.translate(remove_digits).lower().strip()
    if len(word) != len(winner_word):
        return False
    if word==winner_word:
        return True
    else:
        response={}
        for index_l, l in enumerate(list(word)):
            response[l]={'index':index_l,"isCorrectPosition":False,"isInTheWord":False}
            for index_x, x in enumerate(list(winner_word)):
                if x == l:
                    response.get(l)['isInTheWord']=True
                    if index_x == index_l:
                        response.get(l)['isCorrectPosition']=True
        return HttpResponse(json.dumps(response))

        
def stats(request):
    pass
