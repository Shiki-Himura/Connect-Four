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

    // listeners
    const $board = $('#connect-four');

    function findLastEmptyCell(col){
        const cells = $(`.col .gamebtn[data-y='${col}']`);
        for(let i = cells.length - 1; i >= 0; i--)
        {
            const $cell = $(cells[i]);
            if($cell.hasClass('empty'))
                return $cell;
        }
        return null;
    }

    $board.on('mouseenter', '.col .empty', function() {
        const col = $(this).data('y');
        const $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.addClass(`next-red`);
    });

    $board.on('mouseleave', '.col .gamebtn', function() {
        $('.col .gamebtn').removeClass(`next-red`);
    });

    $board.on('click', '.col .empty', function() {
        const col = $(this).data('y');
        const $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.removeClass('empty').addClass('red');
    });
});