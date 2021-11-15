class Connect4
{
    constructor(selector)
    {
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red';
        this.selector = selector;
        this.eventListeners();
    } 

    eventListeners()
    {
        const $board = $(this.selector);
        const that = this;


        $board.on('mouseenter', '.row .col .empty', function() 
        {
            const col = $(this).data('y');
            const $lastEmptyCell = findLastEmptyCell(col);

            $lastEmptyCell.addClass(`next-${that.player}`);
        });

        $board.on('mouseleave', '.gamebtn', function() 
        {
            $('.gamebtn').removeClass(`next-${that.player}`);
        });

        $board.on('click', '.row .col .empty', function() 
        {
            const row = $(this).data('x');
            const col = $(this).data('y');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.attr("player", `${that.player}`);

            const winner = ValidateWinner($lastEmptyCell);
            if(winner)
            {
                $('.row .col .gamebtn').prop('disabled', true);
                alert(`Game Over! Player ${that.player.toUpperCase()} has Won!`);
                return;
            }
            //that.player = (that.player === 'red') ? 'black' : 'red';
            that.player = 'black';

            if(that.player === 'black')
            {
                // TODO: implement AI
                const fields = document.getElementsByClassName('empty');
                const randomField = fields[randomIndex(fields)];
                const col = $(randomField).data('y');
                const $lastEmptyCell = findLastEmptyCell(col);

                $lastEmptyCell.removeClass(`empty next-${that.player}`);
                $lastEmptyCell.addClass(that.player);
                $lastEmptyCell.attr("player", `${that.player}`);

                const winner = ValidateWinner($lastEmptyCell);
                if(winner)
                {
                    $('.row .col .gamebtn').prop('disabled', true);
                    alert(`Game Over! Player ${that.player.toUpperCase()} has Won!`);
                    return;
                }

                that.player = 'red';
            }

            $(this).trigger('mouseenter');
        });

        function ValidateWinner($lastEmptyCell)
        {
            return that.checkforWinner($lastEmptyCell.data('x'), $lastEmptyCell.data('y'))
        }

        function findLastEmptyCell(col)
        {
            const cells = $(`.row .col .gamebtn[data-y='${col}']`);

            for(let i = cells.length - 1; i >= 0; i--)
            {
                const $cell = $(cells[i]);
                if($cell.hasClass('empty'))
                    return $cell;
            }
            return null;
        }

        function randomIndex(field)
        {
            return Math.floor(Math.random() * field.length);
        }
    }

    checkforWinner(row,col)
    {
        const that = this;
        function checkDirection(direction)
        {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $nextCell = $getCell(i, j);
            
            while(i >= 0 && i < that.ROWS && j >= 0 && j < that.COLS && $nextCell.attr('player') === that.player)
            {
                total++;
                i += direction.i;
                j += direction.j;
                $nextCell = $getCell(i, j);
            }
            return total;
        }

        function $getCell(x, y)
        {
            return $(`.row .col .gamebtn[data-x='${x}'][data-y='${y}']`);
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
        function checkHorizontals()
        {
            return checkWin({i: 0, j: -1}, {i: 0, j: 1});
        }
        function checkDiagonalRight()
        {
            return checkWin({i: -1, j: 1}, {i: 1, j: -1});
        }
        function checkDiagonalLeft()
        {
            return checkWin({i: -1, j: -1}, {i: 1, j: 1});
        }
        
        return checkVerticals() || checkHorizontals() || checkDiagonalRight() || checkDiagonalLeft();
    }
}