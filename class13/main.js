var map;
var rows = 4;
var columns = 4;
var count = 0;

//게임 시작 화면 구성
function gameStart() 
{
    //map 배열에 모든 값을 0으로 맞춘다.
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

    //행과 열에 맞춰 보드판에 4x4로 블럭을 생성한다. 그 후 블럭에 map 배열에 저장된 값을 넣는다.
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            //블럭을 div로 생성한다.
            let block = document.createElement("div");
            //블럭의 id를 행(i)의 값 + 열(j)의 값을 넣는다.
            block.id = i.toString() + j.toString();
            //블럭의 숫자를 맵의 배열에 저장된 값으로 생성한다.
            let num = map[i][j];
            //setcoord() 함수로 생성한 블럭에 "block" 클래스를 넣고 num 값을 블럭의 값으로 설정한다.
            setcoord(block, num);
            //app div 아래에 블럭을 생성한다.
            document.getElementById("app").append(block);
        }
    }
}

//게임 시작 버튼 클릭
function init()
{
    //점수 초기화
    count = 0;
    //score에 id가 count인 요소를 불러온다.
    var score = document.getElementById("count");
    //score에 점수를 표기한다.
    score.innerHTML = "score : " + count;

    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            //map의 값을 0으로 초기화한다.
            map[i][j] = 0;
            //block에 id가 행(i)의 값 + 열(j)의 값인 요소를 불러온다.
            let block = document.getElementById(i.toString() + j.toString())
            //block에 표기되는 텍스트를 지운다.
            block.innerText = "";
            //block에 들어가 있는 "x2", "x4", "x8", "x16", "x32", "x64", "x128", "x256", "x512", "x1024", "x2048" 클래스를 지운다.
            block.classList.remove("x2", "x4", "x8", "x16", "x32", "x64", "x128", "x256", "x512", "x1024", "x2048");
        }
    }

    //난수 생성 (0 ~ 2)
    let random = parseInt(Math.random() * 3)

    //random의 값이 0일 경우
    if (random == 0)
    {
        //블럭 2를 생성한다.
        addblock2();
    }
    //random의 값이 1일 경우
    else if (random == 1)
    {
        //블럭 4를 생성한다.
        addblock4();
    }
    //random의 값이 0, 1이 아닐 경우
    else
    {
        //블럭 2와 4를 각각 하나씩 생성한다.
        addblock2();
        addblock4();
    }
}

//게임 클리어 시
function gameclear()
{
    //clear에 id가 gameresult인 요소를 불러온다.
    var clear = document.getElementById("gameresult");
    //clear에 게임 클리어 텍스트를 표기한다.
    clear.innerHTML = "게임 클리어";
    //background 클래스를 가진 요소를 찾은 후 클래스 명을 background show로 변경한다.
    document.querySelector(".background").className = "background show";
}

//게임 오버 시
function gameover()
{
    //over에 id가 gameresult인 요소를 불러온다.
    var over = document.getElementById("gameresult");
    //over에 게임 오버 텍스트를 표기한다.
    over.innerHTML = "게임 오버";
    //background 클래스를 가진 요소를 찾은 후 클래스 명을 background show로 변경한다.
    document.querySelector(".background").className = "background show";
}

//popup 클래스를 가진 요소를 찾은 후 클릭 시 close() 함수가 실행되는 이벤트를 추가한다.
document.querySelector(".popup").addEventListener("click", close);

function close()
{
    //background 클래스를 가진 요소를 찾은 후 클래스 명을 background로 변경한다.
    document.querySelector(".background").className = "background";
}

//게임 클리어 체크
function checkclear()
{
    //map 배열에 2048이 들어있을 경우 게임 클리어
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

//게임 오버 체크
function checkgameover()
{
    //게임 오버 체크용 bool 값을 생성한다.
    var gameOver = true;
    //아래에 있는 블럭과 위에 있는 블럭이 합쳐질 수 있을 경우에 gameOver는 false
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

    //왼쪽에 있는 블럭과 오른쪽에 있는 블럭이 합쳐질 수 있을 경우에 gameOver는 false
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
    //gameOver가 true라면 게임 오버
    if (gameOver)
    {
        gameover();
    }
}

//점수 증가
function addcount()
{
    //점수 1 증가
    count += 1;
    //score에 id가 count인 요소를 불러온다.
    var score = document.getElementById("count");
    //score에 점수를 표기한다.
    score.innerHTML = "score : " + count;
}

//블럭 숫자 변경
function setcoord(block, num) 
{
    //block에 표기되는 텍스트를 지운다.
    block.innerText = "";
    //block의 값을 지운다.
    block.classList.value = "";
    //block에 "block" 클래스를 추가한다.
    block.classList.add("block");
    //num이 0보다 큰 경우
    if (num > 0)
    {
        //block에 num을 표기한다.
        block.innerText = num.toString();
        //num이 2048보다 작거나 같은 경우
        if (num <= 2048)
        {
            //block에 "'x' + num" 클래스를 추가한다.
            block.classList.add("x" + num.toString());
        } 
    }   
}

//0 제거
function filter(row)
{
    //row의 값 중 0이 아닌 것들만 모아 배열로 반환한다.
    return row.filter(num => num != 0);
}

//숫자 이동
function move(row)
{
    //row의 값 중 0이 아닌 것들만 모아 배열로 반환한다.
    row = filter(row);

    //i번째 배열의 수와 i + 1번째 배열의 수가 같다면 i번째 배열의 수 x 2를 한다. 그 후 i + 1번째 배열의 수를 0으로 한다.
    for (let i = 0; i < row.length - 1; i++)
    {
        if (row[i] == row[i + 1])
        {
            row[i] *= 2;
            row[i + 1] = 0;

        }
    }
    //row의 길이가 columns보다 작은 동안 row의 배열에 0을 추가한다.
    while (row.length < columns)
    {
        row.push(0);
    }
    //row를 반환한다.
    return row;
}

//방향키 왼쪽
function moveleft() 
{
    for (let i = 0; i < rows; i++) 
    {
        //map의 행을 row에 저장한다.
        let row = map[i];
        //row에 move() 함수를 사용한 값을 row에 넣는다.
        row = move(row);
        //row를 map의 행에 적용한다.
        map[i] = row;
        for (let j = 0; j < columns; j++)
        {
            //block에 id가 행(i)의 값 + 열(j)의 값인 요소를 불러온다.
            let block = document.getElementById(i.toString() + j.toString());
            //num은 map[i][j]에 저장된 값을 받는다.
            let num = map[i][j];
            //setcoord() 함수로 block에 "block" 클래스를 넣고 num 값을 블럭의 값으로 설정한다.
            setcoord(block, num);
        }
    }
}

//방향키 오른쪽
function moveright()
{
    for (let i = 0; i < rows; i++)
    {
        //map의 행을 row에 저장한다.
        let row = map[i];
        //row에 저장된 배열의 순서를 거꾸로 만든다.
        row.reverse();
        //row에 move() 함수를 사용한 값을 row에 넣는다.
        row = move(row);
        //row에 저장된 배열의 순서를 거꾸로 만든 뒤 map의 행에 적용한다.
        map[i] = row.reverse();
        for (let j = 0; j < columns; j++)
        {
            //block에 id가 행(i)의 값 + 열(j)의 값인 요소를 불러온다.
            let block = document.getElementById(i.toString() + j.toString());
            //num은 map[i][j]에 저장된 값을 받는다.
            let num = map[i][j];
            //setcoord() 함수로 block에 "block" 클래스를 넣고 num 값을 블럭의 값으로 설정한다.
            setcoord(block, num);
        }
    }
}

//방향키 위쪽
function moveup() 
{
    for (let j = 0; j < columns; j++) 
    {
        //map의 열을 row에 저장한다.
        let row = [map[0][j], map[1][j], map[2][j], map[3][j]];
        //row에 move() 함수를 사용한 값을 row에 넣는다.
        row = move(row);
        for (let i = 0; i < rows; i++)
        {
            //map[i][j]는 row[i]에 저장된 값을 받는다.
            map[i][j] = row[i];
            //block에 id가 행(i)의 값 + 열(j)의 값인 요소를 불러온다.
            let block = document.getElementById(i.toString() + j.toString());
            //num은 map[i][j]에 저장된 값을 받는다.
            let num = map[i][j];
            //setcoord() 함수로 block에 "block" 클래스를 넣고 num 값을 블럭의 값으로 설정한다.
            setcoord(block, num);
        }
    }
}

//방향키 아래쪽
function movedown() 
{
    for (let j = 0; j < columns; j++) 
    {
        //map의 열을 row에 저장한다.
        let row = [map[0][j], map[1][j], map[2][j], map[3][j]];
        //row에 저장된 배열의 순서를 거꾸로 만든다.
        row.reverse();
        //row에 move() 함수를 사용한 값을 row에 넣는다.
        row = move(row);
        //row에 저장된 배열의 순서를 거꾸로 만든다.
        row.reverse();
        for (let i = 0; i < rows; i++)
        {
            //map[i][j]는 row[i]에 저장된 값을 받는다.
            map[i][j] = row[i];
            //block에 id가 행(i)의 값 + 열(j)의 값인 요소를 불러온다.
            let block = document.getElementById(i.toString() + j.toString());
            //num은 map[i][j]에 저장된 값을 받는다.
            let num = map[i][j];
            //setcoord() 함수로 block에 "block" 클래스를 넣고 num 값을 블럭의 값으로 설정한다.
            setcoord(block, num);
        }
    }
}

//블럭 2 생성
function addblock2()
{
    //빈 공간 체크용 bool 값을 생성한다.
    let found = false;
    //found가 false인 동안 실행한다.
    while (!found)
    {
        //난수 생성 (0 ~ 행의 길이(4) - 1)
        let row = Math.floor(Math.random() * rows);
        //난수 생성 (0 ~ 열의 길이(4) - 1)
        let column = Math.floor(Math.random() * columns);

        //map[row][column]의 값이 0인 경우
        if (map[row][column] == 0)
        {
            //map[row][column]의 값을 2로 설정한다.
            map[row][column] = 2;
            //block에 id가 행(row)의 값 + 열(column)의 값인 요소를 불러온다.
            let block = document.getElementById(row.toString() + column.toString())
            //block에 2를 표기한다.
            block.innerText = "2";
            //block에 "x2" 클래스를 추가한다.
            block.classList.add("x2");
            //found 값을 true로 바꿔 while문을 종료한다.
            found = true;
        }
    }
}

//블럭 4 생성
function addblock4()
{
    //빈 공간 체크용 bool 값을 생성한다.
    let found = false;
    //found가 false인 동안 실행한다.
    while (!found)
    {
        //난수 생성 (0 ~ 행의 길이(4) - 1)
        let row = Math.floor(Math.random() * rows);
        //난수 생성 (0 ~ 열의 길이(4) - 1)
        let column = Math.floor(Math.random() * columns);

        //map[row][column]의 값이 0인 경우
        if (map[row][column] == 0)
        {
            //map[row][column]의 값을 4로 설정한다.
            map[row][column] = 4;
            //block에 id가 행(row)의 값 + 열(column)의 값인 요소를 불러온다.
            let block = document.getElementById(row.toString() + column.toString())
            //block에 4를 표기한다.
            block.innerText = "4";
            //block에 "x4" 클래스를 추가한다.
            block.classList.add("x4");
            //found 값을 true로 바꿔 while문을 종료한다.
            found = true;
        }
    }
}

//키가 눌렸을 때 keylog() 함수를 실행한다.
window.onkeydown = keylog;

//키 입력
function keylog(e)
{
    //눌린 키를 로그창에 나타낸다.
    console.log(e.key);
    switch(e.key){
        //방향키 왼쪽이 눌렸을 경우
        case 'ArrowLeft':
            //이동(왼쪽)
            moveleft();
            //블럭 2 생성
            addblock2();
            //점수 증가
            addcount();
            //게임 클리어 체크
            checkclear();
            //게임 오버 체크
            checkgameover();
            //종료
            break;
        //방향키 오른쪽이 눌렸을 경우
        case 'ArrowRight':
            //이동(오른쪽)
            moveright();
            //블럭 2 생성
            addblock2();
            //점수 증가
            addcount();
            //게임 클리어 체크
            checkclear();
            //게임 오버 체크
            checkgameover();
            //종료
            break;
        //방향키 위쪽이 눌렸을 경우
        case 'ArrowUp':
            //이동(위쪽)
            moveup();
            //블럭 2 생성
            addblock2();
            //점수 증가
            addcount();
            //게임 클리어 체크
            checkclear();
            //게임 오버 체크
            checkgameover();
            //종료
            break;
        //방향키 아래쪽이 눌렸을 경우
        case 'ArrowDown':
            //이동(아래쪽)
            movedown();
            //블럭 2 생성
            addblock2();
            //점수 증가
            addcount();
            //게임 클리어 체크
            checkclear();
            //게임 오버 체크
            checkgameover();
            //종료
            break;
        //그 외의 경우
        default:      
            //종료      
            break;
    }
}

//페이지가 로드될 시 gameStart() 함수를 실행한다.
window.onload = function () 
{
    gameStart();
}