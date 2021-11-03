$(function() {
    var playerOne = true;
    var playField = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ];

    $('.gamebtn').on('click', function(){
        var x = $(this).data('x');
        var y = $(this).data('y');

        if(playerOne == true)
        {
            playField[x][y] = 1;
            $(this).text("X");
            $(this).css('background-color', '#000000');
            $(this).css('color', '#ffffff');

            console.log(x, y);

            dropChip();
            checkWin();
        }
        else
        {
            playField[x][y] = 2;
            $(this).text("O");
            $(this).css('background-color', '#ffffff');
            $(this).css('color', '#000000');

            dropChip();
            checkWin();
        }
        playerOne = !playerOne;
        $(this).prop('disabled', true);
    });

    function dropChip()
    {
        // check for empty columns
        // add class .fall to element
        // let chip be placed at the bottom
    }

    function checkWin()
    {
        // check possible win situations
        // implement alpha-pruning to increase performance
    }
});