function Automata(subString) {
    length = subString.length
    alph = new Array()
    //Îïðåäåëÿåì àëôàâèò ñòðîêè t
    for (i = 0; i < length; i++)
        alph[subString.charAt(i)] = 0
    //Â äâóìåðíîì ìàññèâå del áóäåì õðàíèòü òàáëèöó ïåðåõîäîâ
    del = new Array(length + 1)
    for (j = 0; j <= length; j++)
        del[j] = new Array()
    //Èíèöèàëèçèðóåì òàáëèöó ïåðåõîäîâ
    for (i in alph)
        del[0][i] = 0
    //Ôîðìèðóåì òàáëèöó ïåðåõîäîâ
    for (j = 0; j < length; j++) {
        prev = del[j][subString.charAt(j)]
        del[j][subString.charAt(j)] = j + 1
        for (i in alph)
            del[j + 1][i] = del[prev][i]
    } 
    //Âûâîäèì òàáëèöó ïåðåõîäîâ
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
        if (del[positionInDel][string[i]] != undefined)
            positionInDel = del[positionInDel][string[i]]
        if (positionInDel == del[subString.length - 1][subString.charAt(subString.length - 1)]) {
            result.push(i + 1 - subString.length)            
            positionInDel = del[positionInDel][string[i]]
        }
    }
    if (result.length == 0)
        console.log('noIndexesFound')
    return result;
}

let fs = require('fs');
var string = fs.readFileSync('Alice.txt');
string = string.toString()
console.log(findIndexes('ababaabaaababababa', 'abc'));
console.log(findIndexes('ababaabaaababababa', 'aba'));
console.log(findIndexes(string, 'Alice'));
