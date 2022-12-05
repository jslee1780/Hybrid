class BlockMap{
    constructor(row,column){
        this.Row = row;
        this.Column = column;
        this.Map = Array.from(Array(row), ()=> Array(column).fill(0));
        this.div_app = document.getElementById("app");        
    }
    addblock(x,y,block){
        block.setactive(true);
        block.setcoord(x,y);
        this.Map[x][y] = block;
        block.setcoord(x,y);
        
        this.div_app.appendChild(block.div_element)
    }
    addrandomblock(block){

        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);

        if (this.Map[x][y] != block)
        {
            block.setactive(true);
            block.setcoord(x,y);
            this.Map[x][y] = block;
        }
        else if (this.Map[x][y] == block)
        {
            return this.addrandomblock(new Block(2));
        }

        this.div_app.appendChild(block.div_element)
    }
    removeblock(x,y){
        block.setactive(false);
        this.Map[x][y] = null;
    }
    moveleft(){
          
    }
    moveright(){
        for (let i = 0; i < 4; i++)
        {
            for (let j = 3; j >= 0; j--)
            {
                if (this.Map[i][j] == block)
                {
                    continue;
                }
                else if (this.Map[i][j] != block)
                {
                    let posX = j - 1;
                    if (this.Map[i][posX] == block)
                    {
                        block.setactive(true);
                        block.setcoord(i, j);
                        this.Map[i][j] = block;
                        block.removeblock(i, posX);
                        this.Map[i][posX] = null;
                    }
                }
            }
        }
    }
    moveup(){

    }
    movedown(){

    } 

    draw(){

    }
}

class Block{
    constructor(value){
        this.Value = value;
        this.Active = false;
        this.XPos = 20;
        this.YPos = 20;
        this.div_element = document.createElement("div");
        this.div_element.setAttribute("class","blockPrefab")
        this.div_element.appendChild(document.createTextNode("2"));
    }
    changevalue(value){
        this.Value = value;
    }
    setactive(isActivated){
        this.Active = isActivated;        
    }
    setcoord(x,y){
        this.XPos = 150 * x + 20;
        this.YPos = 150 * y + 20;
        this.div_element.style.left = this.XPos + "px";
        this.div_element.style.top = this.YPos + "px";
    }
    removeblock(){
        this.Active = false;
        this.XPos = 20;
        this.YPos = 20;
    }

}

var blockmap = new BlockMap(4,4);

function gameStart(){    
    blockmap.addrandomblock(new Block(2));
}

function keylog(e){
    console.log(e.key);
    switch(e.key){
        case 'Enter':
            gameStart();
            break;
        case 'ArrowRight':
            blockmap.moveright();
            break;
        case 'ArrowLeft':
            blockmap.moveleft();
            break;
        case 'ArrowUp':
            blockmap.moveup();
            break;
        case 'ArrowDown':
            blockmap.movedown();
            break;
        default:            
            break;
    }
}

window.onkeydown = keylog;