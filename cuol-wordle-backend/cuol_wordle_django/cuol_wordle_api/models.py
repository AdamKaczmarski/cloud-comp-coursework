from email.policy import default
from django.db import models

# Create your models here.


class Word(models.Model):
    id = models.IntegerField(primary_key=True)
    value = models.CharField(max_length=10, null=False)
    is_chosen = models.BooleanField(default=False)
    date_chosen = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.value

# Let's not think of users now as we may use AWS Identity solution
# class User(models.Model):
#    print()

#TODO: Ayesha


class UserStats(models.Model):
    id = models.IntegerField(primary_key=True)
    games_played = models.IntegerField(max_length=10, null=False)
    games_won = models.IntegerField(max_length=10, null=False)


class GuessDistribution(models.Model):
    id = models.IntegerField(primary_key=True)
    times_stamp = models.DateTimeField(auto_now_add=True)
    games_played = models.IntegerField(max_length=10, null=False)
    games_won = models.IntegerField(max_length=10, null=False)
