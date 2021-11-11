class Connect4
{
    constructor(selector)
    {
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        this.selector = selector;
        this.setupEventListeners();
    } 

    setupEventListeners()
    {
        const $board = $(this.selector);
        const that = this;


        $board.on('mouseenter', '.empty', function() 
        {
            const col = $(this).data('y');
            const $lastEmptyCell = findLastEmptyCell(col);

            $lastEmptyCell.addClass(`next-${that.player}`);
        });

        $board.on('mouseleave', '.gamebtn', function() 
        {
            $('.gamebtn').removeClass(`next-${that.player}`);
        });

        $board.on('click', '.empty', function() 
        {
            const row = $(this).data('x');
            const col = $(this).data('y');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty ${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data("player", `${that.player}`);

            const winner = that.checkforWinner(row,col);
            if(winner) 
            {
                alert(`Game Over! Player ${that.player} has Won!`);
                return;
            }
            that.player = (that.player === 'red') ? 'black' : 'red';
            $(this).trigger('mouseenter');
        });

        function findLastEmptyCell(col)
        {
            const cells = $(`.gamebtn[data-y='${col}']`);

            for(let i = cells.length - 1; i >= 0; i--)
            {
                const $cell = $(cells[i]);
                if($cell.hasClass('empty'))
                    return $cell;
            }
            return null;
        }

    }

    checkforWinner(row,col)
    {
        const that = this;
        function checkDirection(direction)
        {
            let total = 1;
            let x = row + direction.i;
            let y = col + direction.j;
            let $nextCell = $getCell(x, y);
            
            while(x >= 0 && x < that.ROWS && y >= 0 && y < that.COLS && $nextCell.data('player') === that.player)
            {
                total++;
                x += direction.i;
                y += direction.j;
                $nextCell = $getCell(x, y);
            }
            return total;
        }

        function $getCell(x, y)
        {
            return $(`.gamebtn[data-x='${x}'] [data-y='${y}']`);
        }

        function checkWin(directionX, directionY) 
        {
            const total = 1 + checkDirection(directionX) + checkDirection(directionY);
            if(total >= 4) 
            {
                return that.player;
            }
            else 
            {
                return null;
            }
        }

        function checkVerticals() 
        {
            return checkWin({i: -1, j: 0}, {i: 1, j: 0});
        }

        return checkVerticals();
    }
}