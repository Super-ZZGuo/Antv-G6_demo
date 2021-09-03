
var Lastimagedata;
var Formerimagedata;
var canvas = document.getElementById('mycanvas');  //获取标签
var ctx = canvas.getContext("2d");
ctx.lineWidth = linw;
ctx.lineCap = "round"


//按下标记
var onoff = false;
var formerx = -9;
var formery = -9;
//设置颜色
var linecolor = "black";
var linw = 4;

function Total(){

    //自由绘制
    this.drawFree = function(){
        //鼠标落下

        canvas.onmousedown = function(e){

            //记录绘制前的画布信息
            Formerimagedata = ctx.getImageData(0,0,canvas.width,canvas.height)

            onoff = true;
            formerx = e.pageX-9;
            formery = e.pageY-9;
            ctx.lineWidth = linw;
            ctx.lineCap = "round"
            //从鼠标落下地方开始
            ctx.moveTo(formerx,formery);
            ctx.beginPath();
        }
        //鼠标移动
        canvas.onmousemove = function(e){
            if(onoff === true){
                var latterx = e.pageX - 9;
                var lattery = e.pageY - 9;
                ctx.lineTo(latterx,lattery);
                ctx.strokeStyle = linecolor;
                ctx.stroke();
                //更新线条
                formerx = latterx;
                formery = lattery;
            }
        }
        //鼠标弹起
        canvas.onmouseup = function(e){
            onoff = false;

            //记录绘制后的画布信息
            Lastimagedata = ctx.getImageData(0,0,canvas.width,canvas.height)
        }




    }
    //绘制直线
    this.drawStraight = function() {

        //鼠标落下
        canvas.onmousedown = function (e) {

            //记录绘制前的画布信息
            Formerimagedata = ctx.getImageData(0,0,canvas.width,canvas.height)

            onoff = true;
            formerx = e.pageX - 9;
            formery = e.pageY - 9;
            ctx.lineWidth = linw;
            ctx.lineCap = "round"

        }
        //鼠标移动
        canvas.onmousemove = function (e) {
            if (onoff === true) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                //输出保存的canvas画布，抵消clearReact的影响
                ctx.putImageData(Formerimagedata,0,0);


                var latterx = e.pageX - 9;
                var lattery = e.pageY - 9;
                ctx.beginPath();
                ctx.moveTo(formerx, formery);
                ctx.lineTo(latterx, lattery);
                ctx.stroke();

                ctx.strokeStyle = linecolor;

            }
        }
        //鼠标弹起
        canvas.onmouseup = function (e) {
            onoff = false;
            ctx.closePath();
            Lastimagedata = ctx.getImageData(0,0,canvas.width,canvas.height)
        }



    }
    //绘制矩形
    this.drawReact = function(){
        //鼠标落下
        canvas.onmousedown = function (e) {
            //记录绘制前的画布信息
            Formerimagedata = ctx.getImageData(0,0,canvas.width,canvas.height)

            onoff = true;
            formerx = e.pageX - 9;
            formery = e.pageY - 9;
            ctx.lineWidth = linw;
            ctx.lineCap = "round"

        }
        //鼠标移动
        canvas.onmousemove = function (e) {
            if (onoff === true) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                //输出保存的canvas画布，抵消clearReact的影响
                ctx.putImageData(Formerimagedata,0,0);

                var latterx = e.pageX - 9;
                var lattery = e.pageY - 9;
                ctx.strokeRect(formerx,formery,latterx-formerx,lattery-formery)
                ctx.strokeStyle = linecolor;

            }
        }
        //鼠标弹起
        canvas.onmouseup = function (e) {
            onoff = false;
            Lastimagedata = ctx.getImageData(0,0,canvas.width,canvas.height)

        }
    }
}

//自由绘画
function drawfree(){
    var tool = new Total();
    tool.drawFree();
}
//绘画直线
function drawStraightLine(){
    var tool = new Total();
    tool.drawStraight();
}
//绘画矩形
function drawReactLine(){
    var tool = new Total();
    tool.drawReact();
}

//清空画布
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//撤回
function reCanvas(){
    ctx.putImageData(Formerimagedata,0,0);
}
//保存图片为png
function downloadpng(selector) {
    // 通过 API 获取目标 canvas 元素
    const canvas = document.querySelector(selector);
    // 如果 toBlob 方法出现兼容性问题建议引入 https://github.com/eligrey/canvas-toBlob.js
    canvas.toBlob(function(blob) {
        saveAs(blob, '画布.png')
    });
}
//保存图片为jpeg
function downloadjpeg(selector) {
    // 通过 API 获取目标 canvas 元素
    const canvas = document.querySelector(selector);

    canvas.toBlob(function(blob) {
        saveAs(blob, '画布.jpeg')
    });
}
