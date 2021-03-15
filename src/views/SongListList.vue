<template>
  <div class="SongListList">
    <Back>歌单详情</Back>
    <template v-if="!nodata">
      <template v-if="$store.state.currentPlayListInfo && $store.state.currentListSongInfo">
        <div class="SongList_introduce">
            <div class="cover" :style="'background-image:url('+$store.state.currentPlayListInfo.coverImgUrl+')'">
            </div>
            <div class="Info">
              <div class="photo">
                <img :src="$store.state.currentPlayListInfo.coverImgUrl" alt="">
                <span class="playCount">{{$store.state.currentPlayListInfo.playCount | FormatPlayCount}}</span>
                <span class="label">歌单</span>
              </div>
              <div class="name">
                <p class="SongName">{{$store.state.currentPlayListInfo.name}}</p>
                <div class="creator">
                  <img :src="$store.state.currentPlayListInfo.creator.avatarUrl" alt="">
                  <span class="nickname">{{$store.state.currentPlayListInfo.creator.nickname}}</span>
                </div>
              </div>
            </div>
        </div>
        <div class="List">
          <div class="title">歌曲列表</div>
          <ul>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="—— 我也是有底线的 ——"
              @load="onLoad"
            >
              <van-cell v-for="(item,index) in SL" :key="item.id">
                <template #title>
                  <Song :picUrl="item.picUrl" :item="item" :index="index" @click.native="$store.state.play.currentList = SL"></Song>
                </template>
              </van-cell>
            </van-list>
            <!-- <Song v-for="(item,index) in $store.state.currentListSongInfo" :key="item.id" :index="index" :item="item"></Song> -->
          </ul>
        </div>
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
    </template>
    <template v-else>
      <div class="nodata">
        该歌单暂无数据
      </div>
    </template>
  </div>
</template>

<script>
import Song from '../components/Song'
import Back from '@/components/Back'
export default {
  components:{
    Song,
    Back
  },
  data(){
    return {
      SL:[],
      loading: false,
      finished: false,
      nodata:false,
    }
  },
  created(){
    this.axios.get("/playlist/detail?id=" + this.$route.query.id).then((response)=>{
      console.log("当前歌单数据=>",response.data);
      if(!response.data.playlist){
        this.nodata = true;
        return;
      }
      this.$store.state.currentPlayListInfo = response.data.playlist;
      var SongListIds = '';
      for(var i=0;i<response.data.playlist.trackIds.length;i++){
        SongListIds += response.data.playlist.trackIds[i].id + ',';
      }
      SongListIds = SongListIds.slice(0,SongListIds.length-1)
      this.axios.get("/song/detail?ids=" + SongListIds).then((response)=>{
        this.$store.state.currentListSongInfo = response.data.songs
        this.SL = [];
        for (var i = 0; i < 10; i++) {
          this.SL.push(this.$store.state.currentListSongInfo.slice(i, i + 1)[0]);
        }
      })
    })
  },
  methods:{
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 数据全部加载完成
        if (this.SL.length >= this.$store.state.currentListSongInfo.length) {
          this.finished = true;
          return;
        }
        for (let i = 0; i < 10; i++) {
          this.SL.push(this.$store.state.currentListSongInfo.slice(Math.floor(this.SL.length / 10) * 10 + i, Math.floor(this.SL.length / 10) * 10 + i + 1)[0]);
          if(this.SL.length == this.$store.state.currentListSongInfo.length){
            break;
          }
        }
        // 加载状态结束
        this.loading = false;
      }, 1000);
    },
  },
  filters:{
        FormatPlayCount(InitValue){
            if(InitValue < 10**5){
                return InitValue;
            }else if(InitValue < 10**8){
                return (InitValue / 10**4).toFixed(1) + '万'
            }else{
                return (InitValue / 10**8).toFixed(1) + '亿'
            }
        },
    },
}
</script>

<style lang="less">
.SongListList{
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
  .SongList_introduce{
    width: 100%;
    height: 186px;
    overflow: hidden;
    position: relative;
    .cover{
      width: 100%;
      height: 100%;
      background-size: cover;
      transform: scale(1.5);
      filter: blur(20px);
    }
    .Info{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      padding: 25px 0 0 10px;
      .photo{
        position: absolute;
        width: 126px;
        height: 126px;
        img{
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
        .playCount{
          position: absolute;
          color: white;
          font-size: 12px;
          top: 3px;
          right: 3px;
          padding-left: 13px;
          background-position: 0;
          background-repeat: no-repeat;
          background-size: 11px 10px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
        }
        .label{
          position: absolute;
          left: 0;
          top: 8px;
          color: white;
          font-size: 12px;
          padding: 2px 8px;
          background-color: #ba3130;
          border-radius: 0 8px 8px 0;
        }
      }
      .name{
        width: (100% - 150px);
        position: absolute;
        left: 150px;
        overflow: hidden;
        .SongName{
          width: 100%;
          color: white;
        }
        .creator{
          margin-top: 40px;
          img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
          }
          .nickname{
            color: #c8c6c5;
            margin-left: 5px;
            text-shadow: 1px 0 1px black;
          }
        }
      }
    }
    
  }
  .List{
    width: 100%;
    padding-bottom: 20px;
    .title{
      width: 100%;
      height: 20px;
      background-color: #eeeff0;
      font-size: 12px;
      line-height: 20px;
      padding-left: 10px;
      color: #666666;
    }
    .van-cell{
      padding: 0;
      line-height: 1.15;
      .van-cell__title{
        width: 100%;
      }
    }
  }
  .nodata{
    width: 100%;
    height: 100vh;
    text-align: center;
    line-height: calc(100vh - 100px);
  }
}
</style>