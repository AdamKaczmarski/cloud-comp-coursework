from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, parser_classes, throttle_classes
from .serializers import WordSerializer
from .models import Word

# Create your views here.

#Generic for testing
class WordView(generics.ListAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer


def get_value(request):
    return request.data['value']

@api_view(['GET'])
@parser_classes([JSONParser])
#@throttle_classes([OncePerDayUserThrottle])
def check_chosen(request):
    id_picked = get_value(request)
    print("THIS WORD IS NOT CHOSEN TODAY")
    #champion:Champion = Champion.objects.get(id=id_picked)
    #return JsonResponse({'is_chosen': champion.is_chosen_today()})

def stats(request):
    pass

