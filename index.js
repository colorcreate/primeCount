function getInit(){
    $('#note').text('loading...')
    $.ajax({
        url: 'https://5a391579413d2400125bb1e7.mockapi.io/api/v1/note/1',
        method: 'get',
        success: function(result){
            console.log('let\'s start the game from ' + result.prime)
            $('#note').text('let\'s start the game')
            $('#digit').val(result.prime)
        },
        error: function(request, status, error){
            console.error(request.responseText)
            $('#note').text('connection error')
            $('#note').addClass('danger')
        }
    })
};

function put(number){
    $.ajax({
        url: 'https://5a391579413d2400125bb1e7.mockapi.io/api/v1/note/1',
        method: 'put',
        data: {prime: number},
        success: function(){
            console.log('success add ' + number + ' into mockdata')
        },
        error: function(request, status, error){
            console.error(request.responseText)
            $('#note').text('connection error')
            $('#note').addClass('danger')
        }
    })
}

function prime(number) {
    var result = true;

    if (number == 2) {
        result = true;
    } else if (number % 2 == 0 || number == 1 || number <= 0) {
        result = false;
    } else {
        var i = 3;
        while(i<=Math.sqrt(number) && result){
            if (number % i == 0) {
                result = false;
            }
            i+=2;
        }
    }

    return result;
}

function find(number) {
    number++;
    $('#digit').val(number)
    playSound()
    $('#note').text('')
    if(number == 9999999) {
        $('#note').text('cannot generate prime exceed 9999999, try another one')
        $('#digit').addClass('danger')
        $('#note').addClass('danger')
        return 
    }
    if(!prime(number)){
        setTimeout(function(){
            find(number)
        }, 100)
    } else {
        put(number)
        $('#note').text('is the next prime number')
    } 

}

function playSound() {
    const audio = $('audio')[0]
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }

$('#next').on('click', function(){
    $('#digit').removeClass('danger')
    $('#note').removeClass('danger')
    var number = parseInt($('#digit').val());
    var e = /^\d{1,9999999}$/;

    if(number == 9999999) {
        $('#note').text('cannot generate prime exceed 9999999, try another one')
        $('#digit').addClass('danger')
        $('#note').addClass('danger')
        return 
    }
    
    if( !e.test($('#digit').val())){
        $('#digit').addClass('danger')
        $('#note').addClass('danger')
        $('#note').text('it\'s not a positif integer')
        return
    }
    find(number);
})

$('#reset').on('click', function(){
    $('#digit').removeClass('danger')
    $('#note').removeClass('danger')
    put(0);
    $('#digit').val(0)
    $('#note').text('reset')
})

getInit();
var text = [
    '<div>a few information you should know before play</div>'+
    '<div>1. the init number come from database and everytime you run the program it will update automatically</div>'+
    '<div>2. you can customize init number, just type your number in input field</div>'+
    '<div>3. have fun</div>'
].join('\n')
$('#review').append(text)