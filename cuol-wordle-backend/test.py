from english_words import english_words_lower_alpha_set as ewlas
from random import randrange
words =[]
for x in ewlas:
    #Set of words of length 4-8
    if len(x)>3 and len(x)<9:
        words.append(x)

print(len(words))


print(f"WORD OF THE DAY:{words[randrange(len(words))]}")
