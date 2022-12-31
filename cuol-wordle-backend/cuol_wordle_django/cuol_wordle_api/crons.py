from .models import Word

from english_words import english_words_lower_alpha_set as ewlas
from random import randrange


def choose_word():
    oldword: Word = Word.objects.get(is_chosen=True)
    if oldword is not None:
        oldword.is_chosen=False
        oldword.save()
    words = []
    for x in ewlas:
        # Set of words of length 4-8
        if len(x)>3 and len(x)<9:
            words.append(x)
    newword: str = words[randrange(len(words))]
    print(f"Chosen new word {newword}")
    newWord: Word = Word()
    newWord.is_chosen = True
    newWord.value = newword
    newWord.save()
