<template>
  <div class="main">
    <div>
      <p>
        单个元素大小
        <button @click="size(2)">小</button>
        <button @click="size(5)">中</button>
        <button @click="size(10)">大</button>
      </p>
      <p>
        随机初始化
        <button @click="random">大密度</button>
      </p>
      <p>点击开始
      <button @click="run">RUN</button>
      </p>
    </div>
    <canvas width="1400" height="800"></canvas>
  </div>
</template>

<script>
import { Lxhyl } from "../js/index";
export default {
  name: "LxhylCanvas",
  data() {
    return {
      lxhyl: null,
      timer: null
    };
  },
  created() {},
  mounted() {
    let elCanvas = document.getElementsByTagName("canvas")[0];
    this.lxhyl = new Lxhyl(elCanvas);
    this.lxhyl.init(1400, 800, 5);
  },
  methods: {
    run() {
      this.timer = setInterval(() => {
        this.lxhyl.run();
      }, 100);
    },
    random() {
      this.lxhyl.random();
    },
    size(e) {
      this.lxhyl.init(1400, 800, e);
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
