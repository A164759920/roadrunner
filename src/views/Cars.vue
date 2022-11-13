<template>
    <div class="container">
        <div class="scroll">
            <div class="scroll-left">
                <div class="left-LOGO">
                    <div>ROADRUNNER</div>
                    <div style="color:whitesmoke;margin-left: 40%;">2002.top</div>
                </div>
                <div class="leftList">
                    <div class="leftItem" @click="toLocation('drag')">DRAGRACING</div>
                    <div class="leftItem" @click="toLocation('truck')">TRUCK</div>
                    <div class="leftItem" @click="toLocation('hotrod')">HOT ROD</div>
                    <div class="leftItem" @click="toLocation('fox')">FOX BODY</div>
                    <div class="leftItem" @click="toLocation('engine')">ENGINE BUILD</div>
                </div>
            </div>

            <div class="scroll-right">
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="(item, index) in scrollList" :key="index">
                        <img class="scrollItem" :src=item>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="scrollBottom">
            <div class="bottomItem" @click="toLocation('drag')">DRAGRACING</div>
            <div class="bottomItem" @click="toLocation('truck')">TRUCK</div>
            <div class="bottomItem" @click="toLocation('hot')">HOT ROD</div>
            <div class="bottomItem" @click="toLocation('fox')">FOX BODY</div>
            <div class="bottomItem" @click="toLocation('engine')">ENGINE BUILD</div>
        </div>
        <div class="body">
            <div class="listTitle">
                <em style="color:rgb(255 208 75)">RECENT </em>PHOTOS
            </div>
            <div class="imgList">
                <div class="partTtile" id="drag">DRAGRACING </div>
                <div class="drag">
                    <el-image class="imgItem" v-for="(item, index) in drag" :key="index" :src=item
                        :preview-src-list="drag" lazy>
                        <div slot="placeholder" class="imgItemDefault">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </div>
                <div class="cutLine"></div>
                <div class="partTtile" id="truck">TRUCK </div>
                <div class="truck">
                    <el-image class="imgItem" v-for="(item, index) in truck" :key="index" :src=item
                        :preview-src-list="truck" lazy>
                        <div slot="placeholder" class="imgItemDefault">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </div>

                <div class="cutLine"></div>
                <div class="partTtile" id="hotrod">HOT ROD </div>
                <div class="truck">
                    <el-image class="imgItem" v-for="(item, index) in hotrod" :key="index" :src=item
                        :preview-src-list="hotrod" lazy>
                        <div slot="placeholder" class="imgItemDefault">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </div>

                <div class="cutLine"></div>
                <div class="partTtile" id="fox">FOX BODY </div>
                <div class="truck">
                    <el-image class="imgItem" v-for="(item, index) in foxbody" :key="index" :src=item
                        :preview-src-list="fox" lazy>
                        <div slot="placeholder" class="imgItemDefault">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </div>

                <div class="cutLine"></div>
                <div class="partTtile" id="engine">ENGINE BUILD </div>
                <div class="truck">
                    <el-image class="imgItem" v-for="(item, index) in engine" :key="index" :src=item
                        :preview-src-list="engine" lazy>
                        <div slot="placeholder" class="imgItemDefault">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="footerLine"></div>
            <div class="footerInfo">
                <img class="Avatar" src="../../public/logo.png" alt="">
                <div class="webInfo">@ROADRUNNER2002.top</div>
                <div class=""></div>
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
            showTop: false,//是否显示返回顶部按钮
            KeyList: [
                "img/car/drag",
                "img/car/truck",
                "img/car/hotrod",
                "img/car/foxbody",
                "img/car/engine",
            ],
            scrollList: [], // 轮播图URL数据
            drag: [],
            truck: [],
            hotrod: [],
            foxbody: [],
            engine: []
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
        /**
         * 取出存储桶图片并初始化数据
         * @param {Array} KeyList 存储桶路径数组
         */
        initBucketPic(KeyList) {
            const that = this
            function SetPicDataByKey(Key, PicData) {
                const realKey = Key.split("/").slice(-1).toString()
                if (realKey === "truck") {
                    that.truck = PicData
                    that.scrollList.push(PicData[0])
                }
                if (realKey === "drag") {
                    that.drag = PicData
                    that.scrollList.push(PicData[0])
                }
                if (realKey === "engine") {
                    that.engine = PicData
                    that.scrollList.push(PicData[0])
                }
                if (realKey === "foxbody") {
                    that.foxbody = PicData
                    that.scrollList.push(PicData[0])
                }
                if (realKey === "hotrod") {
                    that.hotrod = PicData
                    that.scrollList.push(PicData[0])
                }
            }
            KeyList.forEach(Key => {
                _COS.getURLbyBucketKey(Key).then(urlList => {
                    SetPicDataByKey(Key, urlList)
                })

            });
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollEvent);
        // 图片数据初始化
        this.initBucketPic(this.KeyList)
        // _COS.COS_getBucket("img/car/song/song1")
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollEvent, false);
    },
}
</script>

<style scoped lang="scss">
$scrollHeightWeb: 550px;

.container {

    width: 100%;
    background-color: #e8e8e8;
    // min-width: 577px;
}

.scroll {
    width: 100%;
    height: $scrollHeightWeb;
    display: flex;
    background-color: rgb(84 92 100);
    position: relative;
    z-index: 1;

    .scroll-left {
        width: 30%;
        min-width: 225px;

        .left-LOGO {
            color: rgb(255 208 75);
            font-family: Russo One, Arial, sans-serif;
            font-weight: 700;
            background-color: black;
            font-size: 30px;
            padding-left: 5%;
            height: 75px;
            padding-top: 80px;
            padding-bottom: 20px;
            width: 100%;
        }

        .leftItem {
            border-bottom: 1px solid gray;
            color: whitesmoke;
            font-family: Russo One, Arial, sans-serif;
            font-weight: 600;
            font-size: 20px;
            height: 40px;
            line-height: 40px;
            padding-left: 30px;

        }

        .leftItem:hover {
            cursor: pointer;
            font-size: 23px;
            background-color: #393939;
            box-shadow: 3px 3px 3px rgb(255 208 75);
        }
    }

    .scroll-right {
        flex-grow: 1;
    }

}

.scrollBottom {
    display: none;

    .bottomItem {
        padding-top: 5px;
        width: 100%;
        height: 30px;
        background-color: rgb(84 92 100);
        color: whitesmoke;
        font-family: Russo One, Arial, sans-serif;
        font-weight: 550;
        font-size: 20px;
        text-align: center;
        border-bottom: 1px solid gray;
    }
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
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgb(84 92 100);
    margin-bottom: 5px;
}

.el-carousel {
    height: $scrollHeightWeb;
}

.el-carousel__item.is-active.is-animating {
    height: $scrollHeightWeb;
}

.el-carousel__item.is-animating {
    height: $scrollHeightWeb;
}

.scrollItem {
    width: 100%;
    height: 100%;
}

.body {
    // min-width: 577px;
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

.imgList {
    background-color: whitesmoke;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    padding-left: 25px;
    padding-right: 25px;

    .drag {
        width: 100%;
    }

    .truck {
        width: 100%;
    }

    .engine {
        width: 100%;
    }
}

.imgItem {
    margin: 2px;
    width: calc(25% - 4px);
    max-height: 250px;
}

.imgItemDefault {
    margin: 2px;
    width: 100%;
    height: 100px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;

}

.footer {
    height: 100px;
    background-color: #e8e8e8;
    padding-top: 20px;

    .footerLine {
        width: 90%;
        background-color: lightgray;
        height: 5px;
        margin: 0 auto;
    }

    .footerInfo {
        display: flex;
        width: 90%;
        margin: 0 auto;
        justify-content: center;

        .Avatar {
            width: 50px;
            height: 50px;

        }

        .webInfo {
            font-family: Russo One, Arial, sans-serif;
            color: gray;
            height: 50px;
            line-height: 50px;
        }
    }

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
    box-shadow: 0 0 10px #ddd;

    .topButton {
        text-align: center;
    }
}

.BacktoTop:hover {
    cursor: pointer;
}

$scrollHeightMid: 400px;
$scrollHeightMin: 250px;

@media screen and (min-width:577px) and (max-width:768px) {
    .imgItem {
        margin: 2px;
        width: calc(100%/3 - 4px);
        aspect-ratio: auto;
    }

    .imgItemDefault {
        width: 100%;
        height: 150px;
    }

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
    }

}

@media screen and (max-width:576px) {
    .imgItem {
        margin: 2px;
        width: calc(50% - 4px);
        aspect-ratio: auto;
    }

    .imgItemDefault {
        width: 100%;
        height: 100px;
    }

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
    }

}
</style>