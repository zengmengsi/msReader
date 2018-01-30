<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
}

</script>

<style>
html {
    font-size: 20px;
}

body,
ul,
li {
    padding: 0;
    margin: 0;
}

a {
    text-decoration: none;
    color: #000;
}

li {
    list-style: none;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 0.8rem;
}
.mint-header{
    background-color: #e7604a !important;
}
.mint-header-title{
    font-size: 1rem !important;
}
.search-head{
    background-color: #e7604a !important;
}
.search-input{
    font-size: 0.8rem;
}
.mint-tabbar > .mint-tab-item.is-selected{
    color: #e7604a !important;
}
@font-face {
    font-family: 'iconfont';  /* project id 507671 */
    src: url('//at.alicdn.com/t/font_507671_5k3tdmcq9huuwhfr.eot');
    src: url('//at.alicdn.com/t/font_507671_5k3tdmcq9huuwhfr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_507671_5k3tdmcq9huuwhfr.woff') format('woff'),
    url('//at.alicdn.com/t/font_507671_5k3tdmcq9huuwhfr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_507671_5k3tdmcq9huuwhfr.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:24px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>
