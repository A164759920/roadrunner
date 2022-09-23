<template>
  <div class="container">
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css" />
    <div class="verticalMenu" v-if="isShowMenu">
      <div @click="offVerticalMenu">
        <img src="../../public/close.svg" alt="" class="offButton">
      </div>
      <div class="el-menu-vertical">
        <div class="vertical-item" @click="goToMenu('car')">CARS</div>
        <div class="vertical-item" @click="goToMenu('rat')">RAT FINK</div>
        <div class="vertical-item" @click="goToMenu('album')">ALBUM</div>
        <div class="vertical-item" @click="goToMenu('wallpaper')">WALLPAPER</div>
      </div>
      <div class='menuFooter'>
        <div class="footerlogo">
          <em class="logoText" style="">
            <div>ROADRUNNER</div>
            <div style="color:white;margin-left: 80px;">2002.top</div>
          </em>
        </div>
      </div>
    </div>
    <div class=header v-sticky="{top:0,isVertical:false}">
      <div class="small-menu">
        <img src="../../public/menu.svg" alt="" @click="onVerticalMenu">
      </div>
      <div class="logo">
        <img src="../../public/logo.png" style="width: 60px;height: 60px;" alt="">
        <em class="logoText">
          <div>ROADRUNNER</div>
          <div style="color:white;margin-left: 80px;">2002.top</div>
        </em>
      </div>
      <el-menu :default-active="activeIndex2" class="el-menu" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1" @click="goToMenu('car')">CARS</el-menu-item>
        <el-menu-item index="2" @click="goToMenu('rat')">RAT FINK</el-menu-item>
        <el-menu-item index="3" @click="goToMenu('album')">ALBUM</el-menu-item>
        <el-menu-item index="4">WALLPAPAER</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isShowMenu: false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goToMenu(path) {
      this.$router.push(`/${path}`)
      this.isShowMenu = false
    },
    onVerticalMenu() {
      this.isShowMenu = true
      console.log("打开")
    },
    offVerticalMenu() {
      this.isShowMenu = false
      console.log("关闭")
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 1;
  width: 100%;
  display: flex;
  background-color: rgb(84 92 100);
  padding-left: 5px;
  border-bottom: 5px solid rgb(255 208 75);
  .small-menu {
    display: none;
  }

  .logo {
    display: flex;
    color: rgb(255 208 75);
    font-family: Russo One, Arial, sans-serif;
    width: 250px;
    border-right: 1px solid whitesmoke;
    font-weight: 600;

    .logoText {
      margin-left: 5px;
      padding-top: 15px;
    }
  }

  .el-menu {
    flex-grow: 1;
  }
}

.container {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}

.el-menu-item {
  width: 25%;
  border-right: 1px solid whitesmoke;
  text-align: center;
  font-family: Russo One, Arial, sans-serif;
  font-weight: 600;
  font-size: 18px;
}

.content {
  width: 100%;
  height: 100%;

}

.verticalMenu {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  width: 200px;
  height: 100%;
  background-color: #e8e8e8;

  .offButton {
    width: 30px;
    height: 30px;
    padding-left: 5px;
    padding-top: 5px;
  }

  .offButton:hover {
    cursor: pointer;
  }

  .el-menu-vertical {
    width: 100%;

    .vertical-item {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-family: Russo One, Arial, sans-serif;
      font-weight: 600;
      border-bottom: 1px solid rgb(255 208 75);
      text-align: center;
      font-size: 20px;


    }

    .vertical-item:hover {
      cursor: pointer;
      font-size: 25px;
      background-color: lightgray;
    }

  }

  .menuFooter {
    width: 100%;
    height: 100%;
    padding-top: 30px;
    background-color: rgb(84 92 100);
    text-align: center;

    .footerlogo {
      color: rgb(255 208 75);
    }
  }
}

// @media screen and (min-width:577px) and (max-width:768px) {}
@media screen and (min-width:769px) {
  .verticalMenu {
    display: none;
  }

}

@media screen and (max-width:768px) {
  .el-menu {
    //横向菜单
    display: none;
  }

  .header {
    justify-content: center;
    align-items: center;
    position: relative;

    .logo {
      border-right: 0px;
      margin-left: 15px;
    }

    .small-menu {
      display: block;
      position: absolute;
      left: 10px;
    }

    .small-menu:hover {
      cursor: pointer;
    }
  }
}
</style>