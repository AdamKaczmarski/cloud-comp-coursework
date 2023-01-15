from django.http import HttpResponse
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, parser_classes, throttle_classes,permission_classes
from .serializers import WordSerializer, UserStatsSerializer, GuessDistributionSerializer
from .models import Word, UserStats, GuessDistribution
from auth_wordle.models import User
from string import digits
import json
from datetime import datetime
from django.db.models import Sum, Count

from rest_framework.permissions import IsAuthenticated

def get_value(request):
    return request.data['value']

#This is not returning correct number of words when words are duplicated since dicts has to have unique keys
#change it to an array of dicts
#for example the response will be of structure [{},{},{}]
def word_to_dict(winner_word,word,responseArr):
    for index_l, l in enumerate(list(word)):
        response={}
        response[l]={'index':index_l,"isCorrectPosition":False,"isInTheWord":False}
        for index_x, x in enumerate(list(winner_word)):
            if x == l:
                response.get(l)['isInTheWord']=True
                if index_x == index_l:
                    response.get(l)['isCorrectPosition']=True
        responseArr.append(response)
    return responseArr

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_length(self):
    return HttpResponse(len(Word.objects.get(is_chosen=True).value))


@api_view(['POST'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
#@throttle_classes([OncePerDayUserThrottle])
def check_chosen(request):
    user = User.objects.get(email=request.user)
    if not UserStats.objects.filter(user_id=user).exists():
        newStats = UserStats(games_played=1,games_won=0,user_id=user)
        newStats.save()
    userstats = UserStats.objects.get(user_id = user)
    today = datetime.today().date()
    if userstats.last_played_date != today:
        userstats.games_played+=1
    userstats.total_guesses+=1
    word = request.data['chosen_word']

    winner_word: str = Word.objects.get(is_chosen=True).value

    remove_digits = str.maketrans('', '', digits)
    word = word.translate(remove_digits).lower().strip()
    if len(word) != len(winner_word):
        return HttpResponse(json.dumps({"decision":False}))
    response={}
    if word==winner_word:
        response={"decision":True}
        if userstats.last_won_date != today or userstats.last_won_date is None:
            userstats.games_won+=1
            userstats.last_won_date = today 
    else:
        response={"decision":False}
    response["word"] = word_to_dict(winner_word,word,[])
    userstats.save()
    return HttpResponse(json.dumps(response))
    
        
@api_view(['GET'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
def user_stats(request):
    user = User.objects.get(email=request.user)
    if not UserStats.objects.filter(user_id=user).exists():
        newStats = UserStats(games_played=0,games_won=0,user_id=user)
        newStats.save()
        #I forgot how to serialize those
        response = {"games_played":userstats.games_played,"games_won":userstats.games_won,"total_guesses":userstats.total_guesses }
        return HttpResponse(json.dumps(response))
    else:
        userstats = UserStats.objects.get(user_id = user)
        #I forgot how to serialize those
        response = {"games_played":userstats.games_played,"games_won":userstats.games_won,"total_guesses":userstats.total_guesses }
        return HttpResponse(json.dumps(response))

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def global_stats(request):
    today = datetime.now().date()
    #total games plaead
    total_games = UserStats.objects.aggregate(Sum('games_played')).get('games_played__sum')   
    #total games won 
    total_won = UserStats.objects.aggregate(Sum('games_won')).get('games_won__sum')
    #played today
    today_played = UserStats.objects.filter(last_played_date=today).aggregate(Count('id')).get('id__count')
    #won today 
    today_won= UserStats.objects.filter(last_played_date=today).aggregate(Sum('games_won')).get('games_won__sum')
    if today_won is None:
        today_won=0
    response = {"total_games":total_games,'total_won':total_won,'today_played':today_played,'today_won':today_won}
    return HttpResponse(json.dumps(response))
