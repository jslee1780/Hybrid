const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class button
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

var button1 = new button(150, 180, 50, 50);

drawButton(button1, "red");

function drawButton(name, color) {
    ctx.fillStyle = color;
    ctx.fillRect(name.x, name.y, name.width, name.height);
}

function isInsideButton(pos, rect)
{
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

function getMousePos(canvas, event)
{
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInsideButton(mousePos, button1))
    {
        drawButton(button1, "green");
    }
});

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInsideButton(mousePos, button1))
    {
        drawButton(button1, "blue");
    }
    else
    {
        drawButton(button1, "red");
    }
});