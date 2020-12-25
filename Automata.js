function Automata(subString) {
    length = subString.length
    alph = new Array()
    //Определяем алфавит строки t
    for (i = 0; i < length; i++)
        alph[subString.charAt(i)] = 0
    //В двумерном массиве del будем хранить таблицу переходов
    del = new Array(length + 1)
    for (j = 0; j <= length; j++)
        del[j] = new Array()
    //Инициализируем таблицу переходов
    for (i in alph)
        del[0][i] = 0
    //Формируем таблицу переходов
    for (j = 0; j < length; j++) {
        prev = del[j][subString.charAt(j)]
        del[j][subString.charAt(j)] = j + 1
        for (i in alph)
            del[j + 1][i] = del[prev][i]
    } 
    //Выводим таблицу переходов
    for (j = 0; j <= length; j++) {
        out = ''
        for (i in alph)
            out += del[j][i] + ' '
        console.log(out)
    }
}

function findIndexes(string, subString) {
    let result = new Array();    
    var positionInDel = 0;
    Automata(subString);
    for (let i = 0; i < string.length; i++) {
        for (var letter in alph) {
            if (letter == string[i]) {
                positionInDel = del[positionInDel][string[i]]
            }
        }
        if (positionInDel == del[subString.length - 1][subString.charAt(subString.length - 1)]) {
            result.push(i + 1 - subString.length)            
            positionInDel = del[positionInDel][string[i]]
        }
    }
    return result;
}

let fs = require('fs');
var string = fs.readFileSync('Alice.txt');
string = string.toString();
console.log(findIndexes('ababaabaaababababa', 'aba'));
console.log(findIndexes(string, 'Alice'));