from django.apps import AppConfig
from django.conf import settings

class CuolWordleApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cuol_wordle_api'

    def ready(self):
        if settings.SCHEDULER_DEFAULT:
            from cuol_wordle_django import operator
            operator.start()
