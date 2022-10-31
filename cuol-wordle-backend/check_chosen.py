class Letter():
    letter = ""
    isCorrectPosition = ""
    isInTheWord = ""
    index = 0
    def __init__(self,letter,index,isCorrectPosition=False,isInTheWord=False):
        self.letter=letter
        self.index = index
    def __str__(self):
        return f"{self.letter}, {self.isCorrectPosition}, {self.isInTheWord}"

def check_chosen(word):
    winner_word="HOUSE" #LATER ON it'll Pulled from the db
    """
    CODE LOGIC TO COMPARE THE WORDS, EG. WORD TO UPPER CASE,STRIP FROM NUMBERS, STRIP FROM WHITESPACES
    """ 
    
    if word==winner_word:
        return True
    else:
        response=[]
        for index, l in list(word):
            letter = Letter(l,index)
            """
            COMPARE THE LETTER POSITION WITH THE WINNING WORD
            AND YOU SET THE Letter properties accordingly
            WHAT DOES FRONT-END NEED. YOU'RE GOING TO RETURN AN ARRAY OF LETTER OBJECTS
            """
            response.append(Letter(l))
        
        return False

word = None
while word is None:
    word = input("Guess the word\n")

if word is not None:
    print(check_chosen(word))



"""
FOR INPUT "FAITH" YOU'RE LOOKING TO RESPOND WITH THIS
{
    ["F": {
        "isCorrectPosition":"False",
        "isInTheWord": "False",
        "index":0
    },
    "A": {
        "isCorrectPosition":"False",
        "isInTheWord": "False","index":1
    },
    "I": {
        "isCorrectPosition":"False",
        "isInTheWord": "False","index":2
    },
    "T": {
        "isCorrectPosition":"False",
        "isInTheWord": "False","index":3
    },
    "H": {
        "isCorrectPosition":"False",
        "isInTheWord": "True","index":4
    }]
}


"""