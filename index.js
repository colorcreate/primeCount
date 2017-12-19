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
    $('#note').text('')

    if(!prime(number)){
        setTimeout(function(){
            find(number)
        }, 100)
    } else {
        put(number)
        $('#note').text('is the next prime number')
    } 

}

$('#next').on('click', function(){
    var number = parseInt($('#digit').val());
    find(number);
})

$('#reset').on('click', function(){
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