
// 创建 G6 图实例
const graph = new G6.Graph({
    container: 'mountNode', // 指定图画布的容器 id
    // 画布宽高
    width: 1000,
    height: window.innerHeight
    // fitView: true,
    // fitViewPadding: [ 20, 40, 50, 20 ]
});


//自定义数据类型
G6.registerNode('parallelogram', {
    draw(cfg, group) {

        const keyshape = group.addShape('path', {
            attrs: {
                // 根据配置获取路径
                path: this.getPath(cfg),
                // 填充颜色
                fill:cfg.color,
            },
            name: 'path-shape',
        });
        if (cfg.label) {
            const label = group.addShape('text', {
                // attrs: style
                attrs: {
                    x: 50, // 居中
                    y: 20,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: cfg.label,
                    fill: '#666',
                },
            });
        }
        return keyshape;
    },

    // 返回自定义图形的路径
    getPath(cfg) {
        const size = cfg.size || [100, 50, 0.3]; // 如果没有 size 时的默认大小
        const AB = size[0]; //100
        const AD = size[1]; //100
        const angle=size[2];
        //    D————C
        //   /    /
        //  A————B
        const path = [
            ['M', 0, 0], // A
            ['L', AB, 0], // B
            ['L', AD*Math.cos(angle*Math.PI)+AB,-AD*Math.sin(angle*Math.PI)], // C
            ['L', AD*Math.cos(angle*Math.PI),-AD*Math.sin(angle*Math.PI)], // D
            ['Z'], // 封闭
        ];
        return path;
    },
});

// 定义数据源
const data = {

    // 点集
    nodes: [{
        type:'circle',
        id: 'circle_1',
        label: '圆形',
        size: 50,
        x: 200,
        y: 300,
        style:{
            fill:"#cce5ff"
        }
    },{
        type:'triangle',
        id:'triangle_1',
        label:'三角形',
        size:50,
        x:400,
        y:300,
        style:{
            fill:"#cce5ff"
        }
    },{
        type: 'parallelogram',
        id: 'parallelogram_1',
        label: '平行四边形',
        size:[100,50,0.3],
        x: 600,
        y: 300,
        color:"#cce5ff",

    },],
    //边集
    edges: []
};

//创建数组名
const nodes=data.nodes;
var circleArr=[];
var triangleArr=[];
var parallelogramArr=[];

nodes.forEach((node)=>{
    switch(node.type){
        case 'circle':{
            circleArr.push(node);
            break;
        }
        case 'triangle':{
            triangleArr.push(node);
            break;
        }
        case 'parallelogram': {
            parallelogramArr.push(node);
            break;
        }
    }
});




// 读取数据
graph.data(data);
// 渲染图
graph.render();