var map;
var rows = 4;
var columns = 4;
var count = 0;

function gameStart() 
{
    map = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    /*map = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 0],
        [4, 2, 4, 4]
    ];*/

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
}

function init()
{
    count = 0;
    var score = document.getElementById("count");
    score.innerHTML = "score : " + count;

    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            map[i][j] = 0;
            let block = document.getElementById(i.toString() + j.toString())
            block.innerText = "";
            block.classList.remove("x2", "x4", "x8", "x16", "x32", "x64", "x128", "x256", "x512", "x1024", "x2048");
        }
    }

    let random = parseInt(Math.random() * 3)

    if (random == 0)
    {
        addblock2();
    }
    else if (random == 1)
    {
        addblock4();
    }
    else
    {
        addblock2();
        addblock4();
    }
}

function gameclear()
{
    var clear = document.getElementById("gameresult");
    clear.innerHTML = "게임 클리어";
    document.querySelector(".background").className = "background show";
}

function gameover()
{
    var over = document.getElementById("gameresult");
    over.innerHTML = "게임 오버";
    document.querySelector(".background").className = "background show";
}

document.querySelector(".popup").addEventListener("click", close);

function close()
{
    document.querySelector(".background").className = "background";
}

function checkclear()
{
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            if(map[i][j] == 2048)
            {
                gameclear();
            }
        }
    }
}

function checkgameover()
{
    var gameOver = true;
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            if (map[i][j] == map[i][j + 1])
            {
                gameOver = false;
                break;
            }
        }
    }

    for (let j = 0; j < columns; j++)
    {
        for (let i = 0; i < rows; i++)
        {
            if (map[i][j] == map?.[i + 1]?.[j])
            {
                gameOver = false;
                break;
            }
        }
    }
    if (gameOver)
    {
        gameover();
    }
}

function addcount()
{
    count += 1;
    var score = document.getElementById("count");
    score.innerHTML = "score : " + count;
}

function setcoord(block, num) 
{
    block.innerText = "";
    block.classList.value = "";
    block.classList.add("block");
    if (num > 0)
    {
        block.innerText = num.toString();
        if (num <= 2048)
        {
            block.classList.add("x" + num.toString());
        } 
    }   
}

function filter(row)
{
    return row.filter(num => num != 0);
}

function move(row)
{
    row = filter(row);

    for (let i = 0; i < row.length - 1; i++)
    {
        if (row[i] == row[i + 1])
        {
            row[i] *= 2;
            row[i + 1] = 0;

        }
    }
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

function addblock2()
{
    let found = false;
    while (!found)
    {
        let row = Math.floor(Math.random() * rows);
        let column = Math.floor(Math.random() * columns);

        if (map[row][column] == 0)
        {
            map[row][column] = 2;
            let block = document.getElementById(row.toString() + column.toString())
            block.innerText = "2";
            block.classList.add("x2");
            found = true;
        }
    }
}

function addblock4()
{
    let found = false;
    while (!found)
    {
        let row = Math.floor(Math.random() * rows);
        let column = Math.floor(Math.random() * columns);

        if (map[row][column] == 0)
        {
            map[row][column] = 4;
            let block = document.getElementById(row.toString() + column.toString())
            block.innerText = "4";
            block.classList.add("x4");
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
            addblock2();
            addcount();
            checkclear();
            checkgameover();
            break;
        case 'ArrowRight':
            moveright();
            addblock2();
            addcount();
            checkclear();
            checkgameover();
            break;
        case 'ArrowUp':
            moveup();
            addblock2();
            addcount();
            checkclear();
            checkgameover();
            break;
        case 'ArrowDown':
            movedown();
            addblock2();
            addcount();
            checkclear();
            checkgameover();
            break;
        default:            
            break;
    }
}

window.onload = function () 
{
    gameStart();
}