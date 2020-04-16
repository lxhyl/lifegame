
import {wending} from './template'

class Lxhyl {
    constructor(el) {
        this.el = el; //canvas dom
        this.list = []; //二维数字
        this.context = null; //2d 对象
        this.item = null;   // 单个元素边长
        this.timer = null;  //解决双击触发单击事件
        this.template = wending.fangkuai; //模板
    }
    //初始化
    init(width, height, item) {
        this.item = item;
        const x = Math.floor(width / item);
        const y = Math.floor(height / item);
        this.list = new Array(y).fill(undefined).map(() => new Array(x).fill(0));
        this.context = this.el.getContext('2d');
        // 监听单机时间
        this.el.addEventListener('click', (event) => {
            // 得到点击的位置  改变list
            // 绘制

            clearTimeout(this.timer);
            
            this.timer = setTimeout(()=>{
                this.drawPoint(this.getEventPositionChangeList(event));
            },300)
          
        },true)
        //监听双击
        this.el.addEventListener('dblclick', (ev) => {
             clearTimeout(this.timer);
             let posi = this.getdblclickPosi(ev);
             this.drawTemplate(this.template,posi);
        }, false)
    }
    //得到点击的位置  改变list
    getEventPositionChangeList(ev) {
        var x, y;
        if (ev.layerX || ev.layerX == 0) {
            x = ev.layerX;
            y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            x = ev.offsetX;
            y = ev.offsetY;
        }
        let e = { x: Math.floor(x / this.item), y: Math.floor(y / this.item) };
        this.list[e.y][e.x] = 1;
        return e;
    }
    // 根据list画点
    drawPoint(e) {
        let item = this.item;
        this.context.fillStyle = "#E91E63";
        this.context.fillRect(e.x * item, e.y * item, item, item);
    }
    // 绘制每一帧
    run() {
        let r = this.item;
        let yLength = this.list.length;
        let xLength = this.list[0].length;
        let die = [];
        let live = [];
        //遍历确定下一帧细胞状态 改变下一帧数组list
        for (let i = 1; i < yLength - 1; i++) {
            for (let j = 1; j < xLength - 1; j++) {

                let al = 0; //周围8个元素 存活细胞总量
                if (this.list[i - 1][j - 1]) {
                    al++;
                }
                if (this.list[i - 1][j]) {
                    al++;
                }
                if (this.list[i - 1][j + 1]) {
                    al++;
                }
                if (this.list[i][j - 1]) {
                    al++;
                }
                if (this.list[i][j + 1]) {
                    al++;
                }
                if (this.list[i + 1][j - 1]) {
                    al++;
                }
                if (this.list[i + 1][j]) {
                    al++;
                }
                if (this.list[i + 1][j + 1]) {
                    al++;
                }
                //此时存活时
                if (this.list[i][j] == 1) {

                    if (al < 2 || al > 3) {
                        die.push([i, j])
                    }
                    if (al == 2 || al == 3) {
                        live.push([i, j]);
                    }
                }
                //此时死亡时
                if (this.list[i][j] == 0) {
                    if (al == 3) {
                        live.push([i, j]);
                    }
                }
            }
        }
        // 重绘
        //清除细胞
        for (let index = 0; index < die.length; index++) {
            let x = die[index][1];
            let y = die[index][0];
            this.list[y][x] = 0;
            this.context.clearRect(x * r, y * r, r, r);
        }
        //生成细胞
        for (let index = 0; index < live.length; index++) {
            let x = live[index][1];
            let y = live[index][0];
            this.list[y][x] = 1;
            this.context.fillStyle = '#E91E63';
            this.context.fillRect(x * r, y * r, r, r);
        }

    }
    // 随机渲染存活细胞 
    random(e) {
        let r = this.item;
        let yLength = this.list.length;
        let xLength = this.list[0].length;
        for (let i = 1; i < yLength - 1; i++) {
            for (let j = 1; j < xLength - 1; j++) {
                let num = Math.floor(Math.random() * e);
                if (num == 1) {
                    this.list[i][j] = 1;
                }
                if (this.list[i][j] == 1) {
                    this.context.fillStyle = '#E91E63';
                    this.context.fillRect(j * r, i * r, r, r);
                }
            }
        }
    }
    // 得到双击位置
    getdblclickPosi(ev) {
        const item = this.item; 
            let x, y;
            if (ev.layerX || ev.layerX == 0) {
                x = ev.layerX;
                y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                x = ev.offsetX;
                y = ev.offsetY;
            }
            let posi = { x: Math.floor(x / item), y: Math.floor(y / item) };
            return posi       
    }
    // 改变list 绘制模板 参数为二维坐标模板,双击位置
    drawTemplate(e,posi) {
        const r = this.item;
        const yLength =  e.length;
        const x = posi.x;
        const y = posi.y;
        for(let i = 0;i<yLength;i++){
               
               let  newX = x+e[i][1];
               let  newY = y+e[i][0];
               if(newX < this.list[0].length - 1 && newY < this.list.length){
               this.list[newY][newX] = 1;
               this.context.fillStyle = "#E91E63";
               this.context.fillRect(newX * r,newY*r,r,r);   
               }
        }
    }
    //更换模板
    changeTemplate(e){
        console.log(e);
        this.template = e;
    }

}

export {
    Lxhyl
}