from django.db import models

# Create your models here.
class Word(models.Model):
    id = models.IntegerField(primary_key=True)
    value = models.CharField(max_lenght=10,null=False)
    is_chosen = models.BooleanField(default=False)

    def __str__(self):
        return self.value
class User(models.Model):
    print()



class Stats(models.Model):
    print()