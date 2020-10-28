class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plot(context, center) {
        context.beginPath();
        context.strokeStyle = "#000000";
        context.moveTo(this.x + center.x , this.y + center.y );
        context.lineTo(this.x + 1 + center.x, this.y + center.y);
        context.lineTo(this.x+1 + center.x, this.y+1 + center.y);
        context.lineTo(this.x + center.x, this.y + center.y);
        context.stroke();
    }
    print() {
        console.log("P(" + this.x + "," + this.y + ")");
    }
}
function midpointRasterizationPoints(r) {
    points = [];
    x = 0;
    y = r;
    po = (5 / 4) - r;
    while (x < y) {
        x=x+1;
        if (po < 0) {
            po = po + 2 * x + 1;
        }
        else {
            y=y-1;
            po = po + 2 * x + 1 - (2 * y);
        }
        p1 = new Point(x , y );
        p2 = new Point(x , -y );
        p3 = new Point(-x , y );
        p4 = new Point(-x , -y );
        p5 = new Point(y , x );
        p6 = new Point(-y , x );
        p7 = new Point(y , -x );
        p8 = new Point(-y , -x );
        points = [...points,p1,p2,p3,p4,p5,p6,p7,p8];
    }
    return points;
}
function polarRasterizationPoints(r,theta){
    points=[];
    i=theta;
    while(i<=360){
        x = r * Math.cos(i*Math.PI/180);
        y = r * Math.sin(i*Math.PI/180);
        p = new Point(x,y);
        points=[...points,p]
        i+=theta;
    }
    return points;
}
function plotPoints(canvas, points){
    var width = canvas.scrollWidth;
    var height = canvas.scrollHeight;
    var center = new Point(width/2,height/2);
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    drawCanvas(canvas);
    points.forEach(element => {
        element.plot(context,center);
    });
}
function drawCanvas(canvas){
    var context = canvas.getContext("2d");
    context.beginPath();
    //context.fillStyle = "#FF0000";
    context.font = "10px Arial Bold";
    context.strokeStyle = "#878787";
    context.moveTo(canvas.width/2,0);
    context.lineTo(canvas.width/2,canvas.height);
    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.stroke();
    context.fillText("Y = 250",canvas.width/2 +5, 20);
    context.fillText("Y = -250",canvas.width/2 +5, canvas.height-5);
    context.fillText("X = -250",5,canvas.height/2-5);
    context.fillText("X = 250",canvas.width -40, canvas.height/2 -5);
}
var canvas1 = document.getElementById("polarCanvas");
var canvas2 = document.getElementById("midpointCanvas");
drawCanvas(canvas1);
drawCanvas(canvas2);
function drawMidPointCircle(){
    var canvas = document.getElementById("midpointCanvas");
    var radius = document.getElementById("mr").value;
    var x = document.getElementById("mx").value;
    var y = document.getElementById("my").value;
    if(x==""||y==""||radius=="")
        alert("Please enter valid inputs!");
    else{
        var t0 = performance.now()
        points = midpointRasterizationPoints(parseInt(radius));
        var t1 = performance.now();
        points.forEach(element => {
            element.x+=parseInt(x);
            element.y-=parseInt(y);
        });
        document.getElementById('mpt').innerHTML="Processing Time:&emsp;"+Math.round(((t1-t0)*100))/100+"ms";
        plotPoints(canvas,points);
    }
}
function drawPolarCircle(){
    var canvas = document.getElementById("polarCanvas");
    var radius = document.getElementById("pr").value;
    var x = document.getElementById("px").value;
    var y = document.getElementById("py").value;
    var theta = document.getElementById("theta").value;
    if(x==""||y==""||radius==""||theta==""||theta=="0"||theta[0]=="-")
        alert("Please enter valid inputs!");
    else{
        var t0 = performance.now()
        points = polarRasterizationPoints(parseInt(radius),parseInt(theta));
        var t1 = performance.now()
        points.forEach(element => {
            element.x+=parseInt(x);
            element.y-=parseInt(y);
        });
        document.getElementById('ppt').innerHTML="Processing Time:&emsp;"+Math.round(((t1-t0)*100))/100+"ms";
        plotPoints(canvas,points);
    }
}
