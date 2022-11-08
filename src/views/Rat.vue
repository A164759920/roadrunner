<template>
    <div class="container">
        <div class="scroll">
            <div class="scroll-left">
                <div class="left-LOGO">
                    <div>ROADRUNNER</div>
                    <div style="color:whitesmoke;margin-left: 150px;">2002.top</div>
                </div>
                <div class="leftList">
                    Rat Fink is one of the several hot-rod characters created by one of the originators of Kustom
                    Kulture, Ed “Big Daddy” Roth. Roth’s dislike for Mickey Mouse led him to draw the original Rat Fink
                    art. After he placed Rat Fink art on an airbrushed monster shirt, the character soon came to
                    symbolize the entire hot-rod/Kustom Kulture scene of the 1950s and 1960s. Roth is accepted as the
                    individual who popularized “Monster Hot Rod” art form.
                    <a style="color: rgb(255 208 75);" href="https://www.ratfink.com/">www.ratfink.com</a>
                </div>

            </div>

            <div class="scroll-right">
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="(item, index) in scrollList" :key="index">
                        <img class="scrollItem" :src="item" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="scrollBottom">
            <p>
                Rat Fink is one of the several hot-rod characters created by one of the originators of Kustom
                Kulture, Ed “Big Daddy” Roth. Roth’s dislike for Mickey Mouse led him to draw the original Rat Fink
                art. After he placed Rat Fink art on an airbrushed monster shirt, the character soon came to
                symbolize the entire hot-rod/Kustom Kulture scene of the 1950s and 1960s. Roth is accepted as the
                individual who popularized “Monster Hot Rod” art form.
            </p>
            <p style="text-align: center;">
                <a style="color: rgb(255 208 75);" href="https://www.ratfink.com/">www.ratfink.com</a>
            </p>
        </div>
        <div class="body">
            <div class="listTitle">
                <em style="color:rgb(255 208 75)">RECENT </em>PHOTOS
            </div>
            <div class="wrapper">
                <div class="wf-item" v-for="(item, index) in rat" :key="index">
                    <img :src="item" alt="" class="wf-img">
                </div>
            </div>
        </div>

        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div class="BacktoTop" v-show='showTop' @click="BacktoTop">
                <div class="topButton">
                    <img src="../../public/top.svg" alt="" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import * as _COS from "../../utils/Promise.Bucket.js"
export default {
    data: function () {
        return {
            showTop: false, //是否显示返回顶部按钮
            scrollList: [], // 轮播图URL数据
            KeyList: "img/rat",
            rat: [],
        }
    },
    methods: {
        toLocation(id) {
            document.getElementById(id).scrollIntoView({ behavior: "smooth" })
        },
        BacktoTop() {
            var timer = setInterval(() => {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop
                let ispeed = Math.floor(-osTop / 2);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                if (osTop === 0) {
                    clearInterval(timer);
                }
            }, 30)
        },
        scrollEvent() {
            //显示回到顶部按钮
            this.$nextTick(() => {
                var viewHeight = document.documentElement.clientHeight
                var scrTop = document.documentElement.scrollTop;
                if (scrTop >= viewHeight) {
                    this.showTop = true;
                } else {
                    this.showTop = false;
                }
            })
        },
        initBucketPic() {
            const that = this
            _COS.getURLbyBucketKey(that.KeyList).then(urlList => {
                // 测试环境
                that.rat = urlList
                that.rat = that.rat.concat(urlList)
                that.rat = that.rat.concat(urlList)
                that.rat = that.rat.concat(urlList)
                that.scrollList.push(urlList[0])
                that.scrollList.push(urlList[1])
                that.scrollList.push(urlList[2])
            })
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollEvent);
        // 图片数据初始化
        this.initBucketPic()
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollEvent, false);
    },
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    background-color: #e8e8e8;
}

.scroll {
    width: 100%;
    height: 500px;
    display: flex;
    background-color: rgb(84 92 100);
    position: relative;
    z-index: 1;

    .scroll-left {
        width: 25%;
        min-width: 225px;

        .left-LOGO {
            color: rgb(255 208 75);
            font-family: Russo One, Arial, sans-serif;
            font-weight: 700;
            background-color: black;
            font-size: 30px;
            padding-left: 30px;
            height: 75px;
            padding-top: 80px;
            padding-bottom: 20px;
        }

        .leftList {
            color: whitesmoke;
            padding-left: 10px;
            padding-right: 5px;
            padding-top: 10px;
            font-family: Russo One, Arial, sans-serif;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1vw;
            overflow: hidden;
            word-break: break-word; //用来控制是否切分单词
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 20; //用来控制显示行数
            text-align: center;
        }

    }

    .scroll-right {
        flex-grow: 1;
    }
}

.scrollBottom {
    display: none;

}

.cutLine {
    border: 2px #e8e8e8 solid;
    width: 100%;
    background-color: #e8e8e8;
    margin-bottom: 20px;
    margin-top: 10px;
}

.partTtile {
    color: rgb(255 208 75);
    border: 3px solid black;
    border-radius: 10%;
    width: 150px;
    text-align: center;
    background-color: rgb(84 92 100);
    margin-bottom: 5px;
}

.el-carousel {
    height: 500px;
}

.el-carousel__item.is-active.is-animating {
    height: 500px;
}

.el-carousel__item.is-animating {
    height: 500px;
}

.scrollItem {
    width: 100%;
    height: 100%;
}

.body {

    padding-left: 50px;
    padding-right: 50px;
    background-color: #e8e8e8;
}

.listTitle {
    border-top: 6px solid rgb(255 208 75);
    background-color: whitesmoke;
    // padding-left: 25px;
    // padding-right: 25px;
    // padding-top: 50px;
    padding: 25px;
    font-family: Russo One, Arial, sans-serif;
    font-weight: 700 !important
}


.wrapper {
    background-color: whitesmoke;
    width: calc(100% - 50px);
    position: relative;
    columns: 5;
    column-gap: 5px;
    padding-left: 25px;
    padding-right: 25px;
}


.wf-item .wf-img {
    width: 100%;
    height: 100%;
}

.imgList {
    background-color: whitesmoke;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    padding-left: 25px;
    padding-right: 25px;
}

.imgItem {
    margin: 2px;
    width: calc(25% - 4px);
    height: 220px;

}

.BacktoTop {
    width: 50px;
    height: 50px;
    border-radius: 5%;
    position: fixed;
    z-index: 100;
    right: 10px;
    bottom: 10px;
    background-color: rgb(84 92 100);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    .topButton {
        text-align: center;
    }
}

.BacktoTop:hover {
    cursor: pointer;
}

$scrollHeightMid: 350px;
$scrollHeightMin: 250px;

@media screen and (min-width:577px) and (max-width:768px) {
    .body {
        padding-left: 10px;
        padding-right: 10px;
    }

    .scroll {
        height: $scrollHeightMid;

        .scroll-left {
            display: none;
        }

        .el-carousel {
            height: $scrollHeightMid;
        }

        .el-carousel__item.is-active.is-animating {
            height: $scrollHeightMid;
        }

        .el-carousel__item.is-animating {
            height: $scrollHeightMid;
        }
    }

    .scrollBottom {
        display: block;
        font-size: 16px;
        font-weight: 600;
        font-family: Russo One, Arial, sans-serif;
        padding: 10px;
    }

    .wrapper {
        columns: 4;
        column-gap: 2px;
    }

}

@media screen and (max-width:576px) {

    .body {
        padding-left: 5px;
        padding-right: 5px;
    }

    .scroll {
        height: $scrollHeightMin;

        .scroll-left {
            display: none;
        }

        .el-carousel {
            height: $scrollHeightMin;
        }

        .el-carousel__item.is-active.is-animating {
            height: $scrollHeightMin;
        }

        .el-carousel__item.is-animating {
            height: $scrollHeightMin;
        }
    }

    .scrollBottom {
        display: block;
        font-size: 14px;
        font-weight: 600;
        font-family: Russo One, Arial, sans-serif;
        padding: 5px;
    }

    .wrapper {
        columns: 2;
        column-gap: 2px;
    }

}
</style>