var map;
var rows = 4;
var columns = 4;

function gameStart() 
{
    map = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            let block = document.createElement("div");
            block.id = i.toString() + j.toString();
            let num = map[i][j];
            setcoord(block, num);
            document.getElementById("app").append(block);
        }
    }

    addblock();
    addblock();
}

function setcoord(block, num) 
{
    block.innerText = "";
    block.classList.value = "";
    block.classList.add("block");
    if (num > 0)
    {
        block.innerText = num.toString();
    }    
}

function filter(row)
{
    return row.filter(num => num != 0);
}

function move(row)
{
    row = filter(row);

    while (row.length < columns)
    {
        row.push(0);
    }
    return row;
}

function moveleft() 
{
    for (let i = 0; i < rows; i++) 
    {
        let row = map[i];
        row = move(row);
        map[i] = row;
        for (let j = 0; j < columns; j++)
        {
            let block = document.getElementById(i.toString() + j.toString());
            let num = map[i][j];
            setcoord(block, num);
        }
    }
}

function moveright()
{
    for (let i = 0; i < rows; i++)
    {
        let row = map[i];
        row.reverse();
        row = move(row);
        map[i] = row.reverse();
        for (let j = 0; j < columns; j++)
        {
            let block = document.getElementById(i.toString() + j.toString());
            let num = map[i][j];
            setcoord(block, num);
        }
    }
}

function moveup() 
{
    for (let j = 0; j < columns; j++) 
    {
        let row = [map[0][j], map[1][j], map[2][j], map[3][j]];
        row = move(row);
        for (let i = 0; i < rows; i++)
        {
            map[i][j] = row[i];
            let block = document.getElementById(i.toString() + j.toString());
            let num = map[i][j];
            setcoord(block, num);
        }
    }
}

function movedown() 
{
    for (let j = 0; j < columns; j++) 
    {
        let row = [map[0][j], map[1][j], map[2][j], map[3][j]];
        row.reverse();
        row = move(row);
        row.reverse();
        for (let i = 0; i < rows; i++)
        {
            map[i][j] = row[i];
            let block = document.getElementById(i.toString() + j.toString());
            let num = map[i][j];
            setcoord(block, num);
        }
    }
}

function addblock()
{
    let found = false;
    while (!found)
    {
        let row = Math.floor(Math.random() * rows);
        let column = Math.floor(Math.random() * columns);
        let random = parseInt(Math.random() * 5);
        if (map[row][column] == 0)
        {
            if (random == 0)
            {
                map[row][column] = 4;
            }
            else
            {
                map[row][column] = 2;
            }
            let block = document.getElementById(row.toString() + column.toString());
            if (random == 0)
            {
                block.innerText = "4";
            }
            else
            {
                block.innerText = "2";
            }
            found = true;
        }
    }
}

window.onkeydown = keylog;

function keylog(e)
{
    console.log(e.key);
    switch(e.key){
        case 'ArrowLeft':
            moveleft();
            addblock();
            break;
        case 'ArrowRight':
            moveright();
            addblock();
            break;
        case 'ArrowUp':
            moveup();
            addblock();
            break;
        case 'ArrowDown':
            movedown();
            addblock();
            break;
        default:            
            break;
    }
}

window.onload = function () 
{
    gameStart();
}