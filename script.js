$(function() {
    var playerOne = true;
    var playField = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    $('.gamebtn').on('click', function(){
        var x = $(this).data('x');
        var y = $(this).data('y');

        if(playerOne == true)
        {
            $(this).text("X");
            playField[x][y] = 1;

            $(this).css('background-color', '#55ff55');
        }
        else
        {
            $(this).text("O");
            playField[x][y] = 2;

            $(this).css('background-color', '#ff5555');
        }
        playerOne = !playerOne;
        $(this).prop('disabled', true);
    });

});