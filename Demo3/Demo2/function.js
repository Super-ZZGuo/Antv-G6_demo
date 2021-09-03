let screenX = 0;
let screenY = 0;
window.onload = function() {
    watchChangeSize();
    //被移动物 相关方法 start
    var oDiv = document.getElementById('div1');
    oDiv.onmousedown = function(ev) {
        var speedX = 0,
            speedY = 0; //要求的速度
        var lastX = 0,
            lastY = 0; //最后一次的距离
        var oEvt = ev || event;
        var disX = oEvt.clientX - oDiv.offsetLeft;
        var disY = oEvt.clientY - oDiv.offsetTop;
        document.onmousemove = function(ev) {


            var oEvt = ev || event;
            oDiv.style.left = oEvt.clientX - disX + 'px';
            oDiv.style.top = oEvt.clientY - disY + 'px';

            speedX = oDiv.offsetLeft - lastX
            speedY = oDiv.offsetTop - lastY

            lastX = oDiv.offsetLeft
            lastY = oDiv.offsetTop
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            move(oDiv, speedX, speedY);
        };
        return false;
    };

    function move(obj, speedX, speedY) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            speedX *= 1 //摩擦
            speedY *= 1 //摩擦
            let tempDoneX = obj.offsetLeft + speedX; //临时的最终X轴坐标
            if (tempDoneX < 0) {
                speedX = -speedX
            } else if ((tempDoneX+parseInt(obj.style.width)) > screenX) {
                speedX = -speedX

            }
            obj.style.left = tempDoneX + 'px';

            let tempDoneY = obj.offsetTop + speedY;
            if (tempDoneY < 0) {
                speedY = -speedY
            } else if ((tempDoneY+parseInt(obj.style.height)) > screenY) {
                speedY = -speedY

            }
            obj.style.top = tempDoneY + 'px';
            if (Math.abs(speedX) < 1 ) speedX = 0;
            if (Math.abs(speedY) < 1 ) speedY = 0;
            if (speedX == 0 && speedY == 0) {
                clearInterval(obj.timer);
            }
        }, 30);
    }

};
window.onresize = function() {
    watchChangeSize();
}

function watchChangeSize() {

    var offsetWid = document.documentElement.clientWidth;
    var offsetHei = document.documentElement.clientHeight;
    screenX = offsetWid;
    screenY = offsetHei;
}