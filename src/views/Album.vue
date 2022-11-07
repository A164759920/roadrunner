<template>
    <div class="container">
        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css" />
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
                    <el-carousel-item>
                        <img class="scrollItem" src="../../source/music3.jpg" alt="" />
                    </el-carousel-item>
                    <el-carousel-item>
                        <img class="scrollItem" src="../../source/music1.jpg" alt="" />
                    </el-carousel-item>
                    <el-carousel-item>
                        <img class="scrollItem" src="../../source/music2.jpg" alt="" />
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
            <div class="musicList">
                <div class="musicItem" v-for="(item, index) in music" :key="getKey(index)">
                    <img class="cover" :src=item.pic alt="">
                    <div class="musicItemRight">
                        <div class="songName">{{ item.title }}</div>
                        <div class="downloadButton">DOWNLOAD</div>
                        <APlayer class="player" :music=item preload='none' />
                    </div>
                </div>

                <div class="musicItem-min" v-for="(item, index) in music" :key="index">
                    <div class="songName-min">{{ item.title }}</div>
                    <img class="cover-min" :src=item.pic alt="">
                    <APlayer class="player-min" :music=item preload="none" />
                    <div class="downloadButton-min">DOWNLOAD</div>
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
import APlayer from 'vue-aplayer';
export default {
    components: {
        APlayer
    },
    data: function () {
        return {
            showTop: false, //是否显示返回顶部按钮
            showMin: false,
            scrollList: [], // 轮播图url列表
            music: [] // 音乐Item列表
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
        downloadMp3(filePath) {
            //将音频文件转换为blob
            fetch(filePath)
                .then(res => res.blob())
                .then(blob => {
                    const a = document.createElement('a')//创建一个a标签
                    document.body.appendChild(a)
                    a.style.display = 'none'
                    //将blob转换为URL链接
                    const url = window.URL.createObjectURL(blob)
                    a.href = url
                    a.download = 'xxx.mp3'
                    a.click();
                    document.body.removeChild(a)
                    window.URL.revokeObjectURL(url)
                })``
        },
        getKey(key) {
            return "music" + key
        },
        initScrollList() {
            const that = this
            _COS.getURLbyBucketKey("img/music/scrollpic").then(urlList => {
                that.scrollList = urlList

            })
        },
        async initMusicItem(musicObj) {
            //FIXME:没有想好保存方法，多请求了一次  2022//11/17 已修复 By:scy
            const { musicKey, artist, title } = musicObj
            const musicItem = {
                Preload: 'none',
                title,
                artist,
            }
            try {
                const urlList = await _COS.getURLbyBucketKey(musicKey)
                if (urlList) {
                    urlList.forEach(url => {
                        const fileType = url.split("?")[0].split('.').slice(-1).toString()
                        if (fileType === "mp3") {
                            musicItem.src = url
                        }
                        if (fileType === "jpg" || fileType === "png") {
                            musicItem.pic = url
                        }
                    })
                    return musicItem
                }
            } catch (error) {
                return error
            }
        },
        async initMusicList(musicObjList) {
            const that = this
            const asyncTask = []
            musicObjList.forEach(musicObj => {
                asyncTask.push(that.initMusicItem(musicObj))
            })
            try {
                const res = Promise.all(asyncTask)
                return res
            } catch (error) {
                return error
            }
        }
    },
    mounted() {
        const that = this
        window.addEventListener('scroll', this.scrollEvent);
        // 数据初始化
        _COS.COS_getBucket("img/music/song").then(musicList => {
            const musicObjList = []
            musicList.forEach(musicObj => {
                //musicObj.Key形如 img/music/song/song1/歌手-歌名.mp3
                if (musicObj.Key.includes(".mp3")) {
                    const transObj = {}
                    const rawData = musicObj.Key.toString().split("/")
                    transObj.musicKey = "img/music/song/" + rawData[3]
                    transObj.artist = rawData[4].split('-')[0]
                    transObj.title = rawData[4].split('-')[1].split('.')[0]
                    musicObjList.push(transObj)
                }
            })
            that.initMusicList(musicObjList).then(musicItemList => {
                that.music = musicItemList
            })
        })
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollEvent, false);
    }

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
    border-top: 6px solid rgb(255 208 75);

    .musicList {

        width: 100%;
        background-color: rgb(84 92 100);

        .musicItem {
            width: 80%;
            margin: 0 auto;

            display: flex;
            // justify-content: center;
            // align-items: center;
            // flex-direction: column;
            background-color: rgba(232, 232, 232, 0.3);
            margin-top: 10px;

            .cover {
                width: 150px;
                height: 150px;
                border-radius: 5%;
                padding: 5px;
            }

            .musicItemRight {

                flex-grow: 1;
                position: relative;

                .player {
                    width: 90%;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }

                .songName {
                    font-weight: 600;
                    font-family: Russo One, Arial, sans-serif;
                    font-size: 20px;
                    text-align: center;
                    margin-top: 2%;
                }

                .downloadButton {
                    position: absolute;
                    right: 5px;
                    top: 35%;
                    color: whitesmoke;
                    background-color: rgb(84 92 100);
                    border: 2px solid rgb(255 208 75);
                    border-radius: 5%;
                    margin-bottom: 10px;
                }

                .downloadButton:hover {
                    cursor: pointer;
                }
            }

        }

        .musicItem-min {

            width: 90%;
            margin: 0 auto;
            margin-top: 5px;
            background-color: rgba(232, 232, 232, 0.3);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            display: none;

            .songName-min {
                font-weight: 600;
                font-family: Russo One, Arial, sans-serif;
                font-size: 20px;
                text-align: center;
                margin: 10px;
            }

            .cover-min {
                width: 50%;
                height: 50%;
                margin-bottom: 5px;
            }

            .player-min {
                width: 95%;
            }

            .downloadButton-min {
                width: 95%;
                text-align: center;
                color: whitesmoke;
                background-color: rgb(84 92 100);
                border: 2px solid rgb(255 208 75);
                border-radius: 5%;
                margin-bottom: 10px;
            }
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
        .musicList {

            .musicItem {
                display: none;
            }

            .musicItem-min {
                display: flex;
            }
        }

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


}

@media screen and (max-width:576px) {

    .body {
        padding-left: 5px;
        padding-right: 5px;

        .musicList {
            .musicItem {
                display: none;
            }

            .musicItem-min {
                display: flex;
            }
        }
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


}
</style>