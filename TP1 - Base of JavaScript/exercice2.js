"use strict";
//Question 2a:
function countWords(cara){
    //process the string to abtain the list of words
    var caraMin = cara.replace(/[\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|<|\.|\>|\/|\?\d]/g, " ").toLowerCase().trim();
    var mots = caraMin.split(/[\ ]+/g).sort();

    var dict = [];
    var ifExist = new Array();
    var ind = 0;
    mots.map(function(o){
        if((typeof ifExist[o]) === "undefined"){
            //create a structured object and put it into the dictionnary
            dict.push((function(mot){ var obj = { occurence: 1, thisWord: mot}; return obj; })(o));
            ifExist[o] = ind;
            ind++;
        }else{
            dict[ifExist[o]].occurence += 1;
        }
    });
    return dict;
}

//Question 2b:
function WordList(cara){
    this.listOfWords = countWords(cara);

    this.maxCountWord =  function(){
        var maxCount = Math.max.apply(Math, this.listOfWords.map(function(o){return o.occurence;}));
        var maxCountObj = this.listOfWords.find(function(o){ return o.occurence === maxCount; });
        return maxCountObj.thisWord;
    };

    this.minCountWord = function(){
        var minCount = Math.min.apply(Math, this.listOfWords.map(function(o){return o.occurence;}));
        var minCountObj = this.listOfWords.find(function(o){ return o.occurence === minCount; });
        return minCountObj.thisWord;
    };

    this.getWords = function(){
         return this.listOfWords.map(function(o){return o.thisWord;})
    };

    this.getCount = function(Word){
        var wordMin = Word.toLowerCase();
        var findObj = this.listOfWords.find(function(o){return o.thisWord === wordMin;});
        if (!(typeof findObj === "undefined")) {return findObj.occurence;}
        else {return 0;}
    };

    //Question 2c
    this.applyWordFunc = function(func){
        return this.listOfWords.map(func);
    };
}



//test:
function test(){
    var lines = "Vous rendrez les résultats de cet exercice dans un fichier nommé exercice2.jsQuestion 2a: écrivez une fonction 'countWords' qui, pour chaque mot d'une chaine de caractères, compte le nombre d'occurences de ce mot dans cette chaine. La fonction retournera une sructure données contenant ces résultats et permettant facilement d'obtenir le nombre d'occurences d'un mot donné. On s'assurera que cette fonction fonctionne sur une chaine de caractères d'au moins 500 mots, contenant potentiellement de la ponctuation. Question 2b: écrivez un constructeur 'WordList' qui prend en entrée une chaine de caractères et qui retourne un objet avec les méthodes suivantes: 'maxCountWord()' (resp. 'minCountWord()') qui retourne le mot avec le plus grand (resp. faible) nombre d'occurences, getWords() qui retourne un tableau des mots (sans doublons) présents dans le texte initial, et 'getCount(word)' qui donne le nombre d'occurence pour un mot donné. Question 2c: ajouter à WordList une méthode 'applyWordFunc()' permettant d'appliquer une fonction quelconque à chaque mot et de retourner un tableau des résultats.Question 2d: appeler la méthode 'applyWordFunc' avec une fonction anonyme retournant pour chaque mot un objet avec comme propriétés: son nombre d'occurence et sa longueur."
    var test = new WordList(lines);
    console.log(test.listOfWords);
    console.log(test.maxCountWord());
    console.log(test.minCountWord());
    console.log(test.getWords());
    console.log();
    console.log("The occurence of the word \"Vous\": " + test.getCount("Vous"));
    console.log("The occurence of the word \"Are\": " + test.getCount("Are"));
    console.log();

//Question 2d
    console.log(test.applyWordFunc(function(EveryWord){
        var obj2 = { mot: EveryWord.thisWord, nombreOccurence: EveryWord.occurence, longueur: EveryWord.thisWord.length};
        return obj2;
    }));
}
test();

