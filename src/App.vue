<template>
  <div id="app">
   
    <lxhyl-canvas/>
  </div>
</template>

<script>
import LxhylCanvas from './components/LxhylCanvas'

export default {
  name: 'App',
  components: {
    LxhylCanvas
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  color: #2c3e50;
  margin-top: 10px;
  left:0;
  padding: 0;
  position: relative;
}
</style>
