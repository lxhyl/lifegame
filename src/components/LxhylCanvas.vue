<template>
  <div class="main">
    <button @click="drawer = true">点击打开配置项</button>
     <p>
          点击开始
          <button @click="reload">重玩</button>
          <button @click="run">开始</button>
          <button @click="stop">停止</button>
          <button @click="stepOne">单步</button>
        </p>
        <p>
          速度
          <button @click="speed(10)">超快(1/100秒)</button>
          <button @click="speed(100)">快(1/10秒)</button>
          <button @click="speed(1000)">匀速(1秒)</button>
          <button @click="speed(2000)">慢(2秒)</button>
        </p>
        <p>运行了{{index}}次----FPS:{{fps}}</p>
    <el-drawer title="标题" :visible.sync="drawer" direction="ltr" :with-header="false">
      <div>
        <p>
          单个元素大小
          <button @click="size(2)">小</button>
          <button @click="size(5)">中</button>
          <button @click="size(10)">大</button>
        </p>
        <p>
          随机初始化
          <button @click="random(2)">1/2</button>
          <button @click="random(5)">1/5</button>
          <button @click="random(10)">1/10</button>
          <button @click="random(20)">1/20</button>
        </p>
        <h3>模板(点击模板，再双击灰色画布，即可放置)</h3>
        <p>
          稳定状态：
          <button @click="changeTemplate(wending.fangkuai)">方块</button>
          <button @click="changeTemplate(wending.fengchao)">蜂巢</button>
        </p>
        <p>
          震荡状态
          <button @click="changeTemplate(zhendang.honglvdeng)">红绿灯</button>
          <button @click="changeTemplate(zhendang.wa)">蛙</button>
        </p>
        <p>
          移动状态
          <button @click="changeTemplate(yidong.huaxiangji)">滑翔机</button>
          <button @click="changeTemplate(yidong.qxfc)">轻型飞船</button>
          <button @click="changeTemplate(yidong.zxfc)">中型飞船</button>
        </p>
       
      </div>
    </el-drawer>
    <canvas width="1400" height="800"></canvas>
  </div>
</template>

<script>
import { Lxhyl } from "../js/index";
import { wending, zhendang, yidong } from "../js/template";
export default {
  name: "LxhylCanvas",
  data() {
    return {
      drawer:false,
      lxhyl: null, //lxhyl对像
      timer: null, //定时器
      time: 100, // 定时器时间
      item: 5, //单个元素边长
      index: 0, //运行了多少次
      fps: 0, //刷新率
      wending: wending, //稳定状态
      zhendang: zhendang, //震荡状态
      yidong: yidong //移动状态
    };
  },
  created() {},
  mounted() {
    let elCanvas = document.getElementsByTagName("canvas")[0];
    this.lxhyl = new Lxhyl(elCanvas);
    this.lxhyl.init(1400, 800, this.item);
    this.fpsFun();
  },
  methods: {
    //开始
    run() {
      this.timer = setInterval(() => {
        this.lxhyl.run();
        this.index++;
      }, this.time);
    },
    // 随机生成细胞
    random(e) {
      this.lxhyl.random(e);
    },
    // 单个item大小
    size(e) {
      this.item = e;
      this.lxhyl.init(1400, 800, e);
    },
    // 单步
    stepOne() {
      clearInterval(this.timer);
      this.timer = null;
      this.lxhyl.run();
    },
    // 停止
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    reload() {
      location.reload();
    },
    // 变速
    speed(e) {
      this.time = e;
      clearInterval(this.timer);
      this.timer = null;
      this.run();
    },
    // 计算fps
    fpsFun() {
      var _this = this;
      var rAF = (function() {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();
      var frame = 0;
      var allFrameCount = 0;
      var lastTime = Date.now();
      var lastFameTime = Date.now();
      var loop = function() {
        var now = Date.now();
        var fs = now - lastFameTime;
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
          var fps = Math.round((frame * 1000) / (now - lastTime));
          _this.fps = fps;
          frame = 0;
          lastTime = now;
        }
        rAF(loop);
      };
      loop();
    },
    // 改变模板
    changeTemplate(name) {
      this.lxhyl.changeTemplate(name);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  left: 0;
}
canvas {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 1400px;
  height: 800px;
  background-color: #cfd8dc;
}
</style>
