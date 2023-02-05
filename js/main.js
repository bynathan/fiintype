var tempoInicial = document.getElementById('typing-time').innerText;
var field = $('#field-typing');
var phrase = $('#phrase').text();

$(document).ready(() => {
    atualizaphrase();
    initializeCounters();
    initializeStopwatch();
    newPhase();
    $('#reset-button').on('click', restartGame);
});

var newPhaseActual = prompt('Escolha uma palavra:');
$('#phrase').text(newPhaseActual);
var newSecounds = newPhaseActual.split(/\S+/).length - 1;
var secoudnForPhrase = newSecounds * 2;
$('#typing-time').text(secoudnForPhrase)

function atualizaphrase(){
    var numWords = phrase.split(" ").length;
    var tamphrase = $('#size-phrase');
    tamphrase.text(numWords);
};

function initializeCounters(){
    field.on('input', () => {
        var conteudo = field.val();
    
        var qtdWords = conteudo.split(/\S+/).length - 1;
        $('#word-counter').text(qtdWords);
    
        var qtdCharacters = conteudo.length;
        $('#character-counter').text(qtdCharacters);
    });
}

var phrase = $('#phrase').text()
field.on('input', ()=>{
    var contentField = field.val();
    var comparison = phrase.substr(0, contentField.length);

    if(contentField == comparison){
        field.removeClass('wrong')
        field.addClass('correct')
    }else{
        field.removeClass('correct')
        field.addClass('wrong')
    }
})

function restartGame(){
    field.attr('disabled', false);
    field.val('')

    $('#word-counter').text('0');
    $('#character-counter').text('0');
    $('#typing-time').text(tempoInicial);

    field.removeClass('wrong')
    field.removeClass('correct')

    initializeStopwatch()
}

function initializeStopwatch(){
    field.one('focus', () => {
        var tempoRestante = $('#typing-time').text();
    
        var cronometro = setInterval(() => {
            tempoRestante--;
    
            $('#typing-time').text(tempoRestante)
    
            if(tempoRestante == 0){
                clearInterval(cronometro)
                finishGame();
            }else if(field.val() == phrase){
                clearInterval(cronometro)
                finishGame();
            }
        }, 1000);
    });
}

function finishGame(){
    field.attr('disabled', true);
    newScore()
}

function newScore(){
    var tabela = $('#score').find('tbody');
    var numWords = $('#word-counter').text();
    var numSecounds = document.getElementById('typing-time').innerText;

    if(field.text() == phrase){
        var line = "<tr class='correct'>" +
                        "<td>"+ numWords + "</td>"+
                        "<td>"+ numSecounds + "</td>"+
                     "</tr>";

        tabela.append(line)
    }else{
        var line = "<tr class='wrong'>" +
                        "<td>"+ numWords + "</td>"+
                        "<td>"+ numSecounds + "</td>"+
                    "</tr>";

                tabela.append(line)
    }
}