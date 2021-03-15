<template>
  <div class="NewSongs">
    <Back>最新音乐</Back>
    <ul class="nav">
      <li
        @click="Toggle(index, item.type)"
        v-for="(item, index) in NavList"
        :key="item.type"
      >
        <a href="#" :class="{ active: current == index }">{{ item.C_name }}</a>
      </li>
    </ul>
    <template v-if="SongList">
      <div class="NewSongs_box">
        <div
          class="cover"
          :style="'backgroundImage:url(' + NavList[current].picUrl + ')'"
        >
          <h1>{{ NavList[current].C_name }}</h1>
          <p>{{ NavList[current].E_name }}</p>
        </div>
        <div class="NewSongs_list">
          <div class="play_all" v-if="SongListPlus">
            <span class="text">播放全部</span>
            <span class="num">（共{{ SongList.length }}首）</span>
          </div>

          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="—— 我也是有底线的 ——"
            @load="onLoad"
            class="list"
          >
            <van-cell v-for="item in SongListPlus" :key="item.id">
              <template #title>
                <Song :picUrl="item.picUrl" :item="item" @click.native="$store.state.play.currentList = SongListPlus"></Song>
              </template>
            </van-cell>
          </van-list>

          <!-- <ul class="list">
            
          </ul> -->
        </div>
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
  </div>
</template>

<script>
import Back from "../components/Back";
import Song from "../components/Song";
export default {
  components: {
    Back,
    Song,
  },
  data() {
    return {
      current: 0,
      NavList: [
        {
          C_name: "推荐",
          E_name: "Recommend",
          type: 1,
          picUrl: require("../assets/RecommendCover.jpg"),
        },
        {
          C_name: "华语",
          E_name: "Mandarin Music",
          type: 7,
          picUrl: require("../assets/MandarinMusic.jpg"),
        },
        {
          C_name: "欧美",
          E_name: "Western Music",
          type: 96,
          picUrl: require("../assets/WesternMusic.jpg"),
        },
        {
          C_name: "韩国",
          E_name: "Korean Music",
          type: 16,
          picUrl: require("../assets/KoreanMusic.jpg"),
        },
        {
          C_name: "日本",
          E_name: "Japanese Music",
          type: 8,
          picUrl: require("../assets/JapaneseMusic.jpg"),
        },
      ],
      SongList: null,
      timer: null,
      SL: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    Toggle(cur, type) {
      this.SL = [];
      this.finished = false;
      this.loading = false;
      this.current = cur;
      if (cur == 0) {
        this.SongList = this.$store.state.NewMusicList.RecommendList;
        for (var i = 0; i < 10; i++) {
          this.SL.push(this.SongList.slice(i, i + 1)[0]);
        }
      } else {
        this.SongList = "";
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.axios.get("/top/song?type=" + type).then((response) => {
            if (this.current == cur) {
              this.SongList = response.data.data;
              for (var i = 0; i < 10; i++) {
                this.SL.push(this.SongList.slice(i, i + 1)[0]);
              }
            }
          });
        }, 600);
      }
    },
    onLoad() {
      if(this.SongList == null) return;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 数据全部加载完成
        if (this.SL.length >= this.SongList.length) {
          this.finished = true;
          return;
        }
        for (let i = 0; i < 10; i++) {
          this.SL.push(this.SongList.slice(Math.floor(this.SL.length / 10) * 10 + i, Math.floor(this.SL.length / 10) * 10 + i + 1)[0]);
        }
        // 加载状态结束
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    this.Toggle(0, 1);
  },
  computed: {
    SongListPlus() {
      if (this.SL == "") return;
      var Obj = {};
      Obj = this.SL.map((item) => {
        if (item.song) {
          return {
            id: item.id,
            name: item.name,
            ar: item.song.artists,
            al: { name: item.song.name },
            picUrl: item.picUrl,
          };
        } else {
          return {
            id: item.id,
            name: item.name,
            ar: item.artists,
            al: { name: item.album.name },
            picUrl: item.album.picUrl,
          };
        }
      });
      return Obj;
    },
  },
};
</script>

<style lang="less">
.NewSongs {
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
  .nav {
    width: 100%;
    height: 50px;
    display: flex;
    li {
      flex: 1;
      height: 50px;
      text-align: center;
      a {
        color: black;
        line-height: 50px;
        padding-bottom: 13px;
        border-bottom: 3px solid transparent;
      }
      a.active {
        color: #ff3a3a;
        border-bottom: 3px solid #ff5151;
      }
    }
  }
  .NewSongs_box {
    width: 100%;
    .cover {
      height: 100%;
      height: 180px;
      position: relative;
      background-size: cover;
      h1 {
        position: absolute;
        color: white;
        left: 20px;
        bottom: 30px;
        text-shadow: 1px 0px 1px black;
      }
      p {
        position: absolute;
        left: 20px;
        text-shadow: 1px 0px 1px black;
        letter-spacing: 2px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        bottom: 30px;
      }
    }
    .NewSongs_list {
      width: 100%;
      background-color: #fff;
      border-radius: 30px;

      transform: translateY(-20px);
      .play_all {
        width: 100%;
        padding: 15px;
        .text {
          color: #343434;
          font-size: 20px;
          padding-left: 30px;
          padding-bottom: 5px;
          background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
            no-repeat;
          background-position: -24px 2px;
          background-size: 166px 97px;
        }
        .num {
          color: #999999;
        }
      }
      .list {
      }
    }
    .van-cell{
      padding: 0;
      .van-cell__title{
        width: 100%;
      }
      .Song_info{
        padding: 0;
        .ar{
          margin-top: 0;
        }
      }
    }
  }
}
</style>