<template>
  <div class="lyric" @click="lyricStateToggle">
      <div :class="{cover:true,pause:!icon_state}" v-if="lyricState">
          <img v-lazy="currentMusic.al.picUrl + `?imageView=1&type=webp&thumbnail=${picSize}x${picSize}`" alt="" ref="image">
            <template v-if="!playeffect">
                <i :class="{pause:!icon_state}"></i>
                <i :class="{pause:!icon_state}"></i>
                <i :class="{pause:!icon_state}"></i>
            </template>
            <template v-else>
                <div class="effect" :style="`backgroundImage:url(https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a244701ee85fecb5d4f6b5bd57.png?imageView=&quality=75&thumbnail=${picSize}x${picSize}`">
                </div>
            </template>
      </div>
      <ul class="lyricText" v-show="!lyricState" ref="ul" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <li v-for="(item,index) in lyric" :key="index">{{item.text || '-'}}</li>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            currentMusic:(state)=>state.play.currentMusic,
            icon_state:(state)=>state.play.icon_state,
            currentTime: (state) => state.play.time.currentTime,
            totalTime: (state) => state.play.time.totalTime,
            lyric: (state) => state.play.lyric,
            playeffect: (state) => state.playeffect,
            pulltime: (state) => state.pulltime,
        }),
    },
    data(){
        return {
            lyricState:true,
            lyricStr:null,
            picSize:null,
            scrollY:null,
            scrollState:false,
        }
    },
    methods:{
        lyricStateToggle(){
            this.lyricState = !this.lyricState
        },
        lyricColor(){
            var lis = document.querySelectorAll(".lyricText li");
            var topLength = 0;
            if(!this.scrollState){
                for(var i=0;i<this.lyric.length;i++){
                    topLength += lis[i].offsetHeight;
                    if(this.currentTime>this.lyric[i].time){
                        for(var j=0;j<this.lyric.length;j++){
                            lis[j].style.color="white";
                        }
                        lis[i].style.color = "red";
                        this.$refs.ul.style.transform = `translateX(-50%) translateY(${-topLength}px)`;
                    }
                }
            }
        },
        touchstart(e){
            this.startY = e.touches[0].clientY;
        },
        touchmove(e){
            if(this.lyric.length<=1) return;
            this.scrollY = Math.floor((this.startY - e.touches[0].clientY) / 33);
            this.scrollState=true;
        },
        touchend(){
            this.scrollState=false;
            if(!this.i || this.i < 0) return;
            this.$store.state.pulltime = this.lyric[this.i].time;
        }
    },
    mounted(){
        if(!this.lyric) return;
        this.lyricColor();
    },
    watch:{
        currentTime(){
            if(!this.lyric) return;
            this.lyricColor();
        },
        scrollY(n){
            var lis = document.querySelectorAll(".lyricText li");
            var topLength = 0;
            var index = this.lyric.findIndex(item=>{
                return item.time > this.currentTime
            })
            for(var i=0;i<=index;i++){
                topLength += lis[i].offsetHeight;
            }
            this.$refs.ul.style.transform = `translateX(-50%) translateY(${- (topLength + (33.4 * n))}px)`;
            this.i = index+n;
            for(var j=0;j<this.lyric.length;j++){
                lis[j].style.color="white";
            }
            if(this.i < 0) return;
            if(this.i >= this.lyric.length){
                this.i = this.lyric.length-1
            }
            lis[this.i].style.color = "red";
        }
    },
    created(){
        this.picSize = window.innerWidth * 0.6 - 6;
    }
}
</script>

<style lang="less">
.lyric{
    width: 100%;
    height: 60vh;
    overflow: hidden;
    margin-top: 10px;
    position: relative;
    z-index: 1;
    .pause{
        animation-play-state: paused !important;
    }
    .cover{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 60vw;
        height: 60vw;
        border-radius: 50%;
        border: 3px solid #272822;
        background-size: cover;
        z-index: 1;
        animation: rotate 8s linear 0s infinite;
        .effect{
            width: 60vw;
            height: 60vw;
            position: absolute;
            top: 50%;
            left: 50%;
            background-image: url(https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a244701ee85fecb5d4f6b5bd57.png?imageView=&quality=75&thumbnail=200y200);
            background-repeat: no-repeat;
            transform: translate(-50%,-50%) scale(1.2);
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        >i{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            border: 1px solid transparent;
            transform-origin: center;
            animation: zoom 1.8s linear 0s infinite;
            
            &:nth-of-type(1){
                animation-delay: -1.2s;
            }
            &:nth-of-type(2){
                animation-delay: -0.6s;
            }
        }
        @keyframes zoom {
            10%{
                border-color: #fffef9;
                // box-shadow: 0 0 15px #fffef9;
            }
            100%{
                transform: translate(-50%,-50%) scale(1.6);
            }
        }
        @keyframes rotate {
            100%{
                transform: translate(-50%,-50%) rotate(360deg);
            }
        }
    }
    .lyricText{
        width: 90%;
        position: absolute;
        left: 50%;
        padding-top: 50%;
        transform: translateX(-50%) translateY(0);
        color: white;
        li{
            width: 100%;
            text-align: center;
            letter-spacing: 2px;
            padding-bottom: 15px;
        }
    }
}
</style>