
function changeSize(arry,num){


    if(Number(arry[0].size)+num<=0){
        alert("size过小！")
        return;
    }

    //修改图元大小
    arry.forEach(
        node => {node.size=Number(node.size)+num}
    );

    //给data赋值
    var tempArr = [];
    tempArr = tempArr.concat(circleArr,triangleArr,parallelogramArr);
    data.nodes = tempArr;

    //更新图元
    graph.refresh();
}
function changeSpecialSize(arry,num_1,num_2){

    if(Number(arry[0].size[0])+num_1<=10&&Number(arry[0].size[1])+num_2<=10){
        alert("size过小！")
        return;
    }
    //修改图元的大小
    arry.forEach(
        node => {
            node.size[0] += num_1;
            node.size[1] += num_2;
    });

    //给data赋值
    var tempArr = [];
    tempArr = tempArr.concat(circleArr,triangleArr,parallelogramArr);
    data.nodes = tempArr;

    //更新图元
    graph.refresh();
}
function changeColor(arry,Color) {

    //修改特定图元数据
    arry.forEach(node => {
        node.style.fill=Color;
    });

    //给data赋值
    var tempArr = [];
    tempArr = tempArr.concat( circleArr,triangleArr, parallelogramArr);
    data.nodes = tempArr;


    //更新graph
    graph.refresh();
}

function changeColor_2(arry,Color) {

    //修改特定图元数据
    arry.forEach(node => {
        node.color=Color;
    });

    //给data赋值
    var tempArr = [];
    tempArr = tempArr.concat( circleArr,triangleArr, parallelogramArr);
    data.nodes = tempArr;


    //更新graph
    graph.refresh();
}
//圆形size增大10
function CircleSizePlus(){
    changeSize(circleArr,10);
}
//圆形size增大10
function CircleSizeReduce(){
    changeSize(circleArr,-10);
}
//圆形颜色变红
function changeCircleColorRED(){
    changeColor(circleArr,"red")
}
//圆形颜色变绿
function changeCircleColorGREEN(){
    changeColor(circleArr,"green")
}

//三角形size增大10
function TriangleSizePlus(){
    changeSize(triangleArr,10);
}
//三角形size减小10
function TriangleSizeReduce(){
    changeSize(triangleArr,-10);
}
//三角形颜色变红
function changeTriangleColorRED(){
    changeColor(triangleArr,"red")
}
//三角形颜色变绿
function changeTriangleColorGREEN(){
    changeColor(triangleArr,"green")
}

//平行四边形size增大10
function ParallelogramSizePlus(){
    changeSpecialSize(parallelogramArr,10,10)
}
//平行四边形size减小10
function ParallelogramSizeReduce(){
    changeSpecialSize(parallelogramArr,-10,-10)
}
//平行四边形颜色变红
function changeParallelogramColorRED(){
    changeColor_2(parallelogramArr,"red")
}
//平行四边形颜色变绿
function changeParallelogramColorGREEN(){
    changeColor_2(parallelogramArr,"green")
}
