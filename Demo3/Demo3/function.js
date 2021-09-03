//1.封装一个兼容的获取样式的函数
function getStyle(node,cssStyle){
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}
//2.封装一个获取随机颜色的函数	
function randomColor(){
    let str="rgba("+parseInt(Math.random()*256)+","+ parseInt(Math.random()*256) +","+ parseInt(Math.random()*256) +",1)";
    return str;
}
//3.自定义获取节点下的符合的classname
function elementByClassName(node,classStr){
    //获取node节点下的class----函数功能：代替不兼容的node.getElementsByClassName
    let nodes=node.getElementsByTagName("*");
    let arr=[];//存储符合条件的节点
    for(let i=0;i<nodes.length;i++)
    {
        if(nodes[i].className==classStr){
            arr.push(nodes[i]);
        }
    }
    return arr;
}
/* 4. */
function $(id){
    return document.getElementById(id);
}
let Game=$("game");
let Ball=$("ball");
let Brick=$("brick");


//1.让球每次都获得一个随机的速度
let speedX=parseInt(Math.random()*5+5);
let speedY=parseInt(Math.random()*6+4);
let direct = Math.random();

//2.创建砖块
function creatBrick(n) {
    for (let i = 0; i < n; i++) {
        let node = document.createElement("div");
        node.style.backgroundColor = randomColor();
        Brick.appendChild(node);
    }

    let oBricks = Brick.getElementsByTagName("div");
    for (let i = 0; i < oBricks.length; i++) {


        oBricks[i].style.left = parseInt(Math.random() * 502) + 'px';
        oBricks[i].style.top = parseInt(Math.random() * 550) + 'px';
        for (let i = 0; i < oBricks.length; i++) {
            oBricks[i].style.position = "absolute";
        }
    }
}
creatBrick(5);
let oBricks=Brick.getElementsByTagName("div");
//3.判断碰撞（在运动时检测）
function knock(node1,node2){
    let l1=node1.offsetLeft;
    let r1=node1.offsetLeft+node1.offsetWidth;
    let t1=node1.offsetTop;
    let b1=node1.offsetTop+node1.offsetHeight;

    let l2=node2.offsetLeft;
    let r2=node2.offsetLeft+node2.offsetWidth;
    let t2=node2.offsetTop;
    let b2=node2.offsetTop+node2.offsetHeight;
    if(l2>r1||r2<l1||t2>b1||b2<t1){
        //不碰撞
        return false;
    }else{
        //碰撞
        return true;
    }
}
//判断碰撞速度改变的方向
function knockjudge(node1,node2){
    let l1=node1.offsetLeft;
    let r1=node1.offsetLeft+node1.offsetWidth;
    let t1=node1.offsetTop;
    let b1=node1.offsetTop+node1.offsetHeight;

    let l2=node2.offsetLeft;
    let r2=node2.offsetLeft+node2.offsetWidth;
    let t2=node2.offsetTop;
    let b2=node2.offsetTop+node2.offsetHeight;
    //上下碰撞
    if(l1<=l2&&r2<=r1){
        return speedY*=-1;
    }
    //左右碰撞
    else if(t1<=t2&&b2<=b1){
        return speedX*=-1;
    }
}


//运动
setInterval(function(){
    Ball.style.left=Ball.offsetLeft+speedX+'px';
    Ball.style.top=Ball.offsetTop+speedY+'px';
    if(Ball.offsetLeft<=0||Ball.offsetLeft>=590){
        speedX*=-1;
    }
    if(Ball.offsetTop<=0||Ball.offsetTop>=590){
        speedY*=-1;
    }

    //5.碰撞检测

    //(1)与砖块的碰撞
    for(let i=0;i<oBricks.length;i++){
        if(knock(oBricks[i],Ball)){
            knockjudge(oBricks[i],Ball)

            break;
        }
        /* if(knockY(oBricks[i],Ball)){
            speedY*=-1;
            Brick.removeChild(oBricks[i]);
            break;
        } */
    }

},30)






