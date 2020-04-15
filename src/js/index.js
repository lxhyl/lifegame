class Lxhyl {
    constructor(el) {
        this.el = el; //canvas dom
        this.list = []; //二维数字
        this.context = null; //2d 对象
        this.item = null;  // 单个元素边长
    }
    //初始化
    init(width, height, item) {
        this.item = item;
        const x = Math.floor(width / item);
        const y = Math.floor(height / item);
        this.list = new Array(y).fill(undefined).map(() => new Array(x).fill(0));
        this.context = this.el.getContext('2d');
        this.el.addEventListener('click', (event) => {
            //getEventPositionChangeList 得到点击的位置  改变list
            // 绘制
            this.drawPoint(this.getEventPositionChangeList(event));
        })

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
        //  console.log('y:',y,'x:',x)
        let e = { x: Math.floor(x / this.item), y: Math.floor(y / this.item) };
        // console.log(e.x,e.y);
        this.list[e.y][e.x] = 1;
        return e;
    }
    // 根据list画图
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
                let al = 0;
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
                        die.push([i,j])
                    }
                    if(al == 2 || al == 3){
                        live.push([i,j]);
                    }
                }
                //此时死亡时
                if (this.list[i][j] == 0) {
                    if (al == 3) {
                        live.push([i,j]);
                    }
                }

            }
        }
        //清除细胞
        for(let index = 0;index<die.length;index++){
            let x = die[index][1];
            let y = die[index][0];
            this.list[y][x] = 0;
            this.context.clearRect(x*r,y*r,r,r);
        }
        //生成细胞
        for(let index = 0;index<live.length;index++){
            let x = live[index][1];
            let y = live[index][0];
            this.list[y][x] = 1;
            this.context.fillStyle = '#E91E63';
            this.context.fillRect(x*r,y*r,r,r);
        }
        
    }
    random(){
        console.log(Math.floor(Math.random()*2));
        let r = this.item;
        let yLength = this.list.length;
        let xLength = this.list[0].length;
        for (let i = 1; i < yLength - 1; i++) {
            for (let j = 1; j < xLength - 1; j++) {
                this.list[i][j] = Math.floor(Math.random()*2);
                if(this.list[i][j] == 1){
                    this.context.fillStyle = '#E91E63';
                    this.context.fillRect(j*r,i*r,r,r);
                }
            }
        }
    }

}

export {
    Lxhyl
}