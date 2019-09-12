<template>
  <div id="app">
    <photo-wall />
  </div>
</template>

<script>
  import photoWall from './components/photo-wall.vue'

  export default {
    name: 'app',
    components: {
      photoWall
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>