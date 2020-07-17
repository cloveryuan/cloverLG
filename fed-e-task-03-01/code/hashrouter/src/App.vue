<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/timg.jpg">
    <ul>
      <li>
        <router-link to="/hello">hello</router-link>
      </li>
      <li>
        <router-link to="/home">home</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  ul{
    text-align: center;
    li{
      display: inline-block;
      cursor:pointer;
      list-style-type: none;
      padding-right: 20px;
      &{
        :hover{
          color:#f40;
        }
      }
    }
  }
}
</style>
