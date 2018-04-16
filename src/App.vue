<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style lang="scss">
  * {
    box-sizing: border-box;

    &:not(input) {
      user-select: none;
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 45px;
    cursor: default;
  }

  input {
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    padding: 0 60px;
  }
</style>
