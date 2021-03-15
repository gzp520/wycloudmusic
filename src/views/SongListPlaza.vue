<template>
  <div class="SongListPlaza">
    <Back>歌单广场</Back>
      <van-tabs title-active-color="#ff3a3a" title-inactive-color="#66645e" @click="Toggle()">
        <van-tab title="推荐">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in MusicList" :key="item.id">
                <RecommendItem :item="item"></RecommendItem>
              </div>
            </div>
          </div>
          <ul class="Recommend">
            <RecommendItem v-for="item in MusicListAll" :key="item.id" :item="item"></RecommendItem>
          </ul>
        </van-tab>
        <van-tab v-for="(item,index) in ListClassify" :title="item" :key="index" >
          <template v-if="$store.state.RecommendSongList">
            <RecommendList></RecommendList>
          </template>
          <template v-else>
            <div class="load">
              <div>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <p>加载中...</p>
              </div>
            </div>
          </template>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import Back from '../components/Back'
import RecommendItem from '../components/RecommendItem'
import Swiper from "swiper/swiper-bundle";
import "swiper/swiper-bundle.min.css";
import RecommendList from '../components/RecommendList'
export default {
  components:{
    Back,
    RecommendItem,
    RecommendList
  },
  data(){
    return {
      ListClassify:['华语','流行','摇滚','民谣','电子','另类/独立','轻音乐','综艺','影视原声','ACG'],
      PlayList:null,
      PlayListAll:null,
    }
  },
  methods:{
    Toggle(e){
      var E = e || window.event;
      this.$store.state.RecommendSongList = ''
      this.axios.get("/top/playlist?cat=" + E.toElement.innerText).then((response)=>{
        var result = response.data.playlists.map(item=>{
        return {...item,picUrl:item.coverImgUrl}
      })
        if(document.querySelector(".van-tab--active").innerText == E.toElement.innerText){
          this.$store.state.RecommendSongList = result
        }
      })
    }
  },
  created(){
    this.axios.get("/top/playlist").then((response)=>{
      this.PlayListAll = response.data.playlists.slice(3);
      this.PlayList = response.data.playlists.slice(0,3);
    })
  },
  computed:{
    MusicList(){
      if(!this.PlayList) return;
      var result = this.PlayList.map(item=>{
        return {...item,picUrl:item.coverImgUrl}
      })
      return result
    },
    MusicListAll(){
      if(!this.PlayListAll) return;
      var result = this.PlayListAll.map(item=>{
        return {...item,picUrl:item.coverImgUrl}
      });
      return result
    },
  },
  watch:{
    PlayList(){
      setTimeout(()=>{
        new Swiper(".swiper-container",{
          slidesPerView: 2,
          spaceBetween: 0,
          centeredSlides: true,
          loop: true,
        })
      },0)
    },
  },
}
</script>

<style lang="less">
.SongListPlaza{
  width: 100%;
  padding-top: 50px;
  .load{
    width: 100vw;
    height: calc(100vh - 150px);
    position: relative;
    >div{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      p{
        font-size: 14px;
        // color: #ff0000;
        font-weight: bold;
      }
      i{
        display: inline-block;
        width: 3px;
        height: 22px;
        background-color: red;
        margin-left: 3px;
        animation: jump .6s infinite -0.4s linear alternate;
        transform-origin: center bottom;
        &:nth-child(2){
          animation-delay: -0.2s;
        }
        &:nth-child(3){
          animation-delay: 0s;
        }
        &:nth-child(4){
          animation-delay: 0.2s;
        }
        &.pause{
          animation-play-state: paused;
        }
      }
      @keyframes jump {
        0%{
        }
        100%{
          transform: scaleY(0);
        }
      }
    }
    
  }
  .van-tabs--line{
    height: 40px;
    .van-tabs__wrap--scrollable{
      height: 100%;
      .van-tabs__nav{
        height: 100%;
        border-bottom: 1px solid #e2dfcf;
        padding-bottom: 0;
        .van-tab{
          height: 100%;
          padding: 0 18px;
        }
        .van-tabs__line{
          bottom: 0;
        }
      }
    }
  }
  .van-tabs__content{
    width: 100%;
    padding-bottom: 50px;
    .swiper-container {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    }
    .swiper-slide {
      width: 30%;
      text-align: center;
      font-size: 18px;
      background: #fff;
      transition: 300ms;
      // 其余的兄弟是 0.8
      transform: scale(0.8);
      opacity: 0.4;
      .RecommendItem{
        // width: 120%;
        background-color: #fff;
        border: 1px solid #eee;
        box-shadow: 0 0 10px #eee;
        border-radius: 8px;
        padding-bottom: 10px;
        &:nth-child(3n-1){
          margin-left:0;
          margin-right:0;
        }
        p{
          padding: 0 5px;
          text-align: left;
        }
      }
    }
  // 当前选中的 slide   中间那个
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
      z-index: 999;
      opacity: 1;
    }
    .Recommend{
      width: 100%;
      margin-top: 15px;
      padding: 0 10px;
      display: flex;
      flex-wrap: wrap;
      li{
        flex:((100% - 20px) / 3);
      }
    }
  }
  
}
</style>