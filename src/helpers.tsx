export function timeConvert(n: number) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${rhours > 0 ? `${rhours} ${pluarlify('hour', rhours)} ` : ''}${rminutes > 0 ? `${rminutes} ${pluarlify('minute', rminutes)}` : ''}`;
}

export function aAnNone(word: string) {
    const strippedWord = word.replace(/\(*\)/, '');
    if(strippedWord.endsWith('s')) return '';

    if(['a,e,i,o,h'].includes(word[0])) return 'an';

    return 'a';
}

function pluarlify(word: string, value: number) {
    return value > 1 ? word.concat('s') : word;
}

console.log(timeConvert(200));